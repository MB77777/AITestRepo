#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

bash "$SCRIPT_DIR/setup-postgres.sh"
bash "$SCRIPT_DIR/setup-copilot-template.sh"
bash "$SCRIPT_DIR/start-copilot-template.sh"

printf '[run-copilot-template] Full local stack bootstrap finished.\n'
printf '[run-copilot-template] Open http://localhost:3000\n'
