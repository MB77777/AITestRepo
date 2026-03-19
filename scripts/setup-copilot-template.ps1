$ErrorActionPreference = "Stop"

function Write-Info {
    param([string]$Message)
    Write-Host "[setup-copilot-template] $Message"
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

$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot

try {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        throw "git is required."
    }

    Write-Info "Initializing AG-UI submodule."
    git submodule update --init --remote

    Initialize-Java

    if (-not (Test-Path ".env") -and (Test-Path ".env.example")) {
        Copy-Item ".env.example" ".env"
        Write-Info "Created .env from .env.example."
    }

    if ((Test-Path ".\mvnw.cmd") -and (Test-Path ".\pom.xml")) {
        Write-Info "Building root Maven reactor, including AG-UI community SDK."
        cmd /c "mvnw.cmd clean install -Dgpg.skip=true -Dmaven.javadoc.skip=true -Plocal"
    }
    else {
        Write-Warning "Root Maven wrapper/pom not found yet. Skipping root Maven bootstrap."
    }

    if ((Test-Path ".\backend\mvnw.cmd") -and (Test-Path ".\ag-ui\sdks\community\java\pom.xml")) {
        Write-Info "Building AG-UI community Java SDK locally for backend usage."
        Push-Location ".\backend"
        try {
            cmd /c ".\mvnw.cmd -f ..\ag-ui\sdks\community\java\pom.xml install -Dmaven.test.skip=true -Dgpg.skip=true -Dmaven.javadoc.skip=true -Plocal"
        }
        finally {
            Pop-Location
        }
    }

    if (Test-Path ".\backend\mvnw.cmd") {
        Write-Info "Compiling backend module."
        Push-Location ".\backend"
        try {
            cmd /c ".\mvnw.cmd -DskipTests compile"
        }
        finally {
            Pop-Location
        }
    }

    if ((Test-Path ".\frontend\package.json") -and (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Info "Installing frontend dependencies."
        Push-Location ".\frontend"
        try {
            npm install
        }
        finally {
            Pop-Location
        }
    }
    elseif (Test-Path ".\frontend\package.json") {
        Write-Warning "npm is not available in PATH. Skipping frontend install."
    }

    Write-Info "Setup finished."
}
finally {
    Pop-Location
}
