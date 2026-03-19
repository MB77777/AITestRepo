$ErrorActionPreference = "Stop"

function Write-Info {
    param([string]$Message)
    Write-Host "[start-copilot-template] $Message"
}

function Initialize-Java {
    if ($env:JAVA_HOME -and (Test-Path (Join-Path $env:JAVA_HOME "bin\java.exe"))) {
        $env:Path = "$(Join-Path $env:JAVA_HOME 'bin');$env:Path"
        return
    }

    if (Get-Command java -ErrorAction SilentlyContinue) {
        return
    }

    $candidates = @()
    if ($env:USERPROFILE) {
        $candidates += Join-Path $env:USERPROFILE ".jdks"
    }
    $candidates += "D:\lucas\.jdks"

    foreach ($candidateRoot in $candidates | Select-Object -Unique) {
        if (-not (Test-Path $candidateRoot)) {
            continue
        }

        $jdk = Get-ChildItem -Path $candidateRoot -Directory |
            Sort-Object Name -Descending |
            Select-Object -First 1

        if ($jdk -and (Test-Path (Join-Path $jdk.FullName "bin\java.exe"))) {
            $env:JAVA_HOME = $jdk.FullName
            $env:Path = "$(Join-Path $env:JAVA_HOME 'bin');$env:Path"
            Write-Info "Using JDK from $($env:JAVA_HOME)."
            return
        }
    }

    throw "Java 21 is required. Set JAVA_HOME or install a JDK."
}

function Start-ManagedProcess {
    param(
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$FilePath,
        [Parameter(Mandatory = $true)][string[]]$Arguments,
        [Parameter(Mandatory = $true)][string]$WorkingDirectory
    )

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $FilePath
    foreach ($argument in $Arguments) {
        [void]$startInfo.ArgumentList.Add($argument)
    }
    $startInfo.WorkingDirectory = $WorkingDirectory
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    $process.EnableRaisingEvents = $true

    $stdoutEvent = Register-ObjectEvent -InputObject $process -EventName OutputDataReceived -Action {
        if ($EventArgs.Data) {
            Write-Host "[$($Event.MessageData)] $($EventArgs.Data)"
        }
    } -MessageData $Name

    $stderrEvent = Register-ObjectEvent -InputObject $process -EventName ErrorDataReceived -Action {
        if ($EventArgs.Data) {
            Write-Host "[$($Event.MessageData)] $($EventArgs.Data)"
        }
    } -MessageData $Name

    if (-not $process.Start()) {
        throw "Failed to start $Name process."
    }

    $process.BeginOutputReadLine()
    $process.BeginErrorReadLine()

    return @{
        Name = $Name
        Process = $process
        StdoutEvent = $stdoutEvent
        StderrEvent = $stderrEvent
    }
}

function Stop-ManagedProcess {
    param($ManagedProcess)

    if (-not $ManagedProcess) {
        return
    }

    foreach ($eventSubscription in @($ManagedProcess.StdoutEvent, $ManagedProcess.StderrEvent)) {
        if ($eventSubscription) {
            Unregister-Event -SourceIdentifier $eventSubscription.Name -ErrorAction SilentlyContinue
            Remove-Job -Id $eventSubscription.Id -Force -ErrorAction SilentlyContinue
        }
    }

    $process = $ManagedProcess.Process
    if ($process -and -not $process.HasExited) {
        Write-Info "Stopping $($ManagedProcess.Name) process tree (PID $($process.Id))."
        taskkill /PID $process.Id /T /F | Out-Null
        $process.WaitForExit(5000) | Out-Null
    }

    if ($process) {
        $process.Dispose()
    }
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$frontendPort = if ($env:PORT) { $env:PORT } else { "3000" }
$backendPort = if ($env:SERVER_PORT) { $env:SERVER_PORT } else { "8080" }
$logsDir = Join-Path $repoRoot "logs"

$backendProcess = $null
$frontendProcess = $null

Push-Location $repoRoot

try {
    Initialize-Java
    New-Item -ItemType Directory -Force -Path $logsDir | Out-Null

    Write-Info "Backend URL: http://localhost:$backendPort"
    Write-Info "Frontend URL: http://localhost:$frontendPort"
    Write-Info "Logs directory: $logsDir"
    Write-Info "Press Ctrl+C to stop both processes."

    if ((Test-Path ".\mvnw.cmd") -and (Test-Path ".\pom.xml")) {
        Write-Info "Starting backend using root Maven reactor."
        $backendProcess = Start-ManagedProcess `
            -Name "BE" `
            -FilePath "cmd.exe" `
            -Arguments @("/c", "mvnw.cmd", "package", "spring-boot:test-run", "-pl", "langgraph4j-ag-ui-sdk") `
            -WorkingDirectory $repoRoot
    }
    elseif (Test-Path ".\backend\mvnw.cmd") {
        Write-Info "Root Maven reactor not found. Falling back to backend module start."
        $backendProcess = Start-ManagedProcess `
            -Name "BE" `
            -FilePath "cmd.exe" `
            -Arguments @("/c", ".\mvnw.cmd", "spring-boot:run") `
            -WorkingDirectory (Join-Path $repoRoot "backend")
    }
    else {
        throw "Backend start command not available."
    }

    if ((Test-Path ".\frontend\package.json") -and (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
        Write-Info "Starting frontend."
        $frontendProcess = Start-ManagedProcess `
            -Name "FE" `
            -FilePath "cmd.exe" `
            -Arguments @("/c", "npm", "run", "dev") `
            -WorkingDirectory (Join-Path $repoRoot "frontend")
    }
    else {
        throw "Frontend package or npm.cmd not available."
    }

    while ($true) {
        if ($backendProcess.Process.HasExited) {
            throw "Backend process exited with code $($backendProcess.Process.ExitCode)."
        }
        if ($frontendProcess.Process.HasExited) {
            throw "Frontend process exited with code $($frontendProcess.Process.ExitCode)."
        }
        Start-Sleep -Milliseconds 500
    }
}
finally {
    Stop-ManagedProcess $frontendProcess
    Stop-ManagedProcess $backendProcess
    Pop-Location
}
