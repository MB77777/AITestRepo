[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

function Write-Info {
    param([string]$Message)
    Write-Host "[setup-postgres] $Message"
}

function Invoke-WslRoot {
    param(
        [string]$DistroName,
        [string]$Command
    )
    wsl.exe -d $DistroName -u root -- bash -lc $Command
    return $LASTEXITCODE
}

function Convert-ToWslPath {
    param([string]$WindowsPath)

    $normalized = $WindowsPath -replace "\\", "/"
    if ($normalized -match "^([A-Za-z]):/(.*)$") {
        $drive = $matches[1].ToLower()
        $rest = $matches[2]
        return "/mnt/$drive/$rest"
    }

    throw "Cannot convert path to WSL format: $WindowsPath"
}

function Normalize-UnixLineEndings {
    param([string]$Path)

    $content = [System.IO.File]::ReadAllText($Path)
    $normalized = $content -replace "`r`n", "`n"

    if ($normalized -ceq $content) {
        return
    }

    $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($Path, $normalized, $utf8NoBom)
    Write-Info "Normalized LF line endings in $Path"
}

function Get-UbuntuDistroName {
    $distros = wsl.exe -l -q |
        ForEach-Object { ($_ -replace "`0", "").Trim() } |
        Where-Object { $_ }

    if (-not $distros) {
        throw "No WSL distros found. Install Ubuntu first."
    }

    $exactMatch = $distros | Where-Object { $_ -eq "Ubuntu" } | Select-Object -First 1
    if ($exactMatch) {
        return $exactMatch
    }

    $ubuntuMatch = $distros |
        Where-Object { $_ -match '^Ubuntu([-\s].*)?$' } |
        Select-Object -First 1
    if ($ubuntuMatch) {
        return $ubuntuMatch
    }

    $fallbackMatch = $distros |
        Where-Object { $_ -match 'Ubuntu' } |
        Select-Object -First 1
    if ($fallbackMatch) {
        return $fallbackMatch
    }

    throw "Ubuntu distro not found in WSL. Available distros: $($distros -join ', ')"
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$wslRepoRoot = Convert-ToWslPath -WindowsPath $repoRoot
$bashScriptPath = Join-Path $PSScriptRoot "setup-postgres.sh"

if (-not (Get-Command wsl.exe -ErrorAction SilentlyContinue)) {
    throw "WSL is not installed. Install WSL2 with Ubuntu or use Ubuntu directly."
}

$ubuntuDistro = Get-UbuntuDistroName
Write-Info "Using WSL distro '$ubuntuDistro'."

Normalize-UnixLineEndings -Path $bashScriptPath

Write-Info "Checking whether WSL distro '$ubuntuDistro' uses systemd."
$systemdCheck = Invoke-WslRoot -DistroName $ubuntuDistro -Command "ps -p 1 -o comm= 2>/dev/null | grep -qx systemd"
if ($systemdCheck -ne 0) {
    Write-Info "systemd is not enabled in WSL distro '$ubuntuDistro'. Enabling it automatically."
    Invoke-WslRoot -DistroName $ubuntuDistro -Command @'
mkdir -p /etc
python3 - <<'PY'
from pathlib import Path

path = Path("/etc/wsl.conf")
content = path.read_text() if path.exists() else ""
lines = content.splitlines()

has_boot = False
has_systemd = False
updated = []
for line in lines:
    stripped = line.strip()
    if stripped == "[boot]":
        has_boot = True
    if stripped == "systemd=true":
        has_systemd = True
    updated.append(line)

if not has_boot:
    if updated and updated[-1].strip():
        updated.append("")
    updated.append("[boot]")
    updated.append("systemd=true")
elif not has_systemd:
    result = []
    inserted = False
    in_boot = False
    for line in updated:
        stripped = line.strip()
        if stripped.startswith("[") and stripped.endswith("]"):
            if in_boot and not inserted:
                result.append("systemd=true")
                inserted = True
            in_boot = stripped == "[boot]"
            result.append(line)
            continue
        result.append(line)
    if in_boot and not inserted:
        result.append("systemd=true")
    updated = result

new_content = "\n".join(updated).strip() + "\n"
path.write_text(new_content)
PY
'@ | Out-Null

    Write-Info "systemd was enabled in /etc/wsl.conf."
    Write-Info "Restarting WSL with 'wsl --shutdown' so Ubuntu picks up the change."
    wsl.exe --shutdown
}

Write-Info "Running PostgreSQL setup inside WSL distro '$ubuntuDistro'."
$command = "cd '$wslRepoRoot' && bash './scripts/setup-postgres.sh'"
wsl.exe -d $ubuntuDistro -u root -- bash -lc $command