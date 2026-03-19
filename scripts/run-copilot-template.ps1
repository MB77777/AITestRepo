$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot

& (Join-Path $PSScriptRoot "setup-postgres.ps1")
& (Join-Path $PSScriptRoot "setup-copilot-template.ps1")
& (Join-Path $PSScriptRoot "start-copilot-template.ps1")

Write-Host "[run-copilot-template] Full local stack bootstrap finished."
Write-Host "[run-copilot-template] Open http://localhost:3000"
