#!/usr/bin/env bash
set -euo pipefail

log() {
  printf '[setup-copilot-template] %s\n' "$1"
}

ensure_java() {
  if command -v java >/dev/null 2>&1; then
    return
  fi

  local candidates=()
  [ -n "${JAVA_HOME:-}" ] && candidates+=("$JAVA_HOME")
  [ -n "${HOME:-}" ] && candidates+=("$HOME/.jdks")
  [ -n "${USERPROFILE:-}" ] && candidates+=("$USERPROFILE/.jdks")
  candidates+=("/d/lucas/.jdks")

  local candidate root
  for root in "${candidates[@]}"; do
    [ -e "$root" ] || continue

    if [ -x "$root/bin/java" ]; then
      export JAVA_HOME="$root"
      export PATH="$JAVA_HOME/bin:$PATH"
      log "Using JDK from $JAVA_HOME."
      return
    fi

    candidate="$(find "$root" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sort -r | head -n 1 || true)"
    if [ -n "$candidate" ] && [ -x "$candidate/bin/java" ]; then
      export JAVA_HOME="$candidate"
      export PATH="$JAVA_HOME/bin:$PATH"
      log "Using JDK from $JAVA_HOME."
      return
    fi
  done

  echo "Java 21 is required. Set JAVA_HOME or install a JDK." >&2
  exit 1
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

command -v git >/dev/null 2>&1 || { echo "git is required." >&2; exit 1; }

log "Initializing AG-UI submodule."
git submodule update --init --remote

ensure_java

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
  log "Created .env from .env.example."
fi

if [ -f ./mvnw ] && [ -f ./pom.xml ]; then
  log "Building root Maven reactor, including AG-UI community SDK."
  ./mvnw clean install -Dgpg.skip=true -Dmaven.javadoc.skip=true -Plocal
else
  log "Root Maven wrapper/pom not found yet. Skipping root Maven bootstrap."
fi

if [ -f ./backend/mvnw ] && [ -f ./ag-ui/sdks/community/java/pom.xml ]; then
  log "Building AG-UI community Java SDK locally for backend usage."
  (cd backend && ./mvnw -f ../ag-ui/sdks/community/java/pom.xml install -Dmaven.test.skip=true -Dgpg.skip=true -Dmaven.javadoc.skip=true -Plocal)
fi

if [ -f ./backend/mvnw ]; then
  log "Compiling backend module."
  (cd backend && ./mvnw -DskipTests compile)
fi

if [ -f ./frontend/package.json ] && command -v npm >/dev/null 2>&1; then
  log "Installing frontend dependencies."
  (cd frontend && npm install)
elif [ -f ./frontend/package.json ]; then
  log "npm is not available in PATH. Skipping frontend install."
fi

log "Setup finished."
