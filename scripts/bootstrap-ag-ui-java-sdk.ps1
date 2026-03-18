param(
    [string]$AgUiRepo = (Join-Path (Resolve-Path "$PSScriptRoot\..") "_tmp_ag_ui")
)

$workspaceRoot = Resolve-Path "$PSScriptRoot\.."
$backendDir = Join-Path $workspaceRoot "backend"
$agUiPom = Join-Path $AgUiRepo "sdks\community\java\pom.xml"

if (-not (Test-Path $AgUiRepo)) {
    git clone https://github.com/ag-ui-protocol/ag-ui.git $AgUiRepo
}

if (-not (Test-Path $agUiPom)) {
    throw "AG-UI Java SDK pom.xml not found at $agUiPom"
}

Push-Location $backendDir
try {
    & ".\mvnw.cmd" -f $agUiPom install "-DskipTests" "-Dgpg.skip=true" "-Dcentral.skip=true"
}
finally {
    Pop-Location
}
