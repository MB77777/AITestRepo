#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$REPO_ROOT/.env"
ENV_EXAMPLE="$REPO_ROOT/.env.example"
SEED_FILE="/docker-entrypoint-initdb.d/01-clients.sql"
DOCKER_STARTED_BY_SCRIPT=0
COMPOSE_CMD=""

log() {
  printf '[setup-postgres] %s\n' "$1"
}

fail() {
  printf '[setup-postgres] ERROR: %s\n' "$1" >&2
  exit 1
}

is_wsl() {
  grep -qiE '(microsoft|wsl)' /proc/version 2>/dev/null
}

has_systemd() {
  [ "$(ps -p 1 -o comm= 2>/dev/null || true)" = "systemd" ]
}

run_root() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
    return
  fi

  if command -v sudo >/dev/null 2>&1; then
    sudo "$@"
    return
  fi

  fail "Docker installation requires root or sudo."
}

ensure_env_file() {
  if [ -f "$ENV_FILE" ]; then
    log ".env already exists."
    return
  fi

  if [ -f "$ENV_EXAMPLE" ]; then
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    log "Created .env from .env.example."
    return
  fi

  cat > "$ENV_FILE" <<'EOF'
POSTGRES_DB=app_dev
POSTGRES_USER=app
POSTGRES_PASSWORD=app_password
POSTGRES_PORT=5433
EOF
  log "Created .env with default values."
}

load_env() {
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
}

docker_ready() {
  command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1
}

detect_compose_cmd() {
  if docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
    return 0
  fi

  if command -v docker-compose >/dev/null 2>&1 && docker-compose version >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
    return 0
  fi

  COMPOSE_CMD=""
  return 1
}

run_compose() {
  if [ "$COMPOSE_CMD" = "docker compose" ]; then
    docker compose "$@"
    return
  fi

  if [ "$COMPOSE_CMD" = "docker-compose" ]; then
    docker-compose "$@"
    return
  fi

  fail "Docker Compose is not available."
}

docker_packages_installed() {
  dpkg -s docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin >/dev/null 2>&1
}

install_compose_plugin_manually() {
  if ! command -v curl >/dev/null 2>&1; then
    if command -v apt-get >/dev/null 2>&1; then
      log "curl is not installed; installing curl with apt-get so Docker Compose can be downloaded."
      run_root apt-get update -y
      run_root apt-get install -y curl
    else
      fail "curl is required to download the Docker Compose plugin but is not installed. Please install curl and re-run this script."
    fi
  fi

  local arch
  arch="$(uname -m)"
  case "$arch" in
    x86_64) arch="x86_64" ;;
    aarch64) arch="aarch64" ;;
    armv7l) arch="armv7" ;;
    *)
      fail "Unsupported architecture for manual Compose install: $arch"
      ;;
  esac

  log "Installing Docker Compose plugin manually into /usr/local/lib/docker/cli-plugins."
  run_root install -d -m 0755 /usr/local/lib/docker/cli-plugins
  run_root curl -SL "https://github.com/docker/compose/releases/download/v5.0.1/docker-compose-linux-$arch" -o /usr/local/lib/docker/cli-plugins/docker-compose
  run_root chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
}

print_docker_diagnostics() {
  log "Docker diagnostics:"
  printf '  init: %s\n' "$(ps -p 1 -o comm= 2>/dev/null || echo unknown)"
  printf '  docker cli: %s\n' "$(docker --version 2>/dev/null || echo unavailable)"
  printf '  docker compose: %s\n' "$(docker compose version 2>/dev/null || echo unavailable)"
  printf '  docker-compose: %s\n' "$(docker-compose version 2>/dev/null || echo unavailable)"
  printf '  docker socket: %s\n' "$(ls -l /var/run/docker.sock 2>/dev/null || echo missing)"
  printf '  dockerd process: %s\n' "$(pgrep -a dockerd 2>/dev/null || echo not-running)"

  if command -v systemctl >/dev/null 2>&1; then
    printf '  systemctl is-enabled docker: %s\n' "$(systemctl is-enabled docker 2>/dev/null || echo unavailable)"
    printf '  systemctl is-active docker: %s\n' "$(systemctl is-active docker 2>/dev/null || echo unavailable)"
    systemctl status docker --no-pager 2>/dev/null || true
    journalctl -u docker --no-pager -n 50 2>/dev/null || true
  fi

  if command -v service >/dev/null 2>&1; then
    service docker status 2>/dev/null || true
  fi

  if [ -f /tmp/dockerd.log ]; then
    tail -n 50 /tmp/dockerd.log || true
  fi
}

install_docker_if_missing() {
  if docker_packages_installed; then
    log "Docker packages already installed."
    return
  fi

  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    return
  fi

  if ! command -v apt-get >/dev/null 2>&1; then
    fail "Automatic Docker installation is supported only on Ubuntu/Debian with apt."
  fi

  log "Installing Docker Engine and Compose plugin."
  run_root env DEBIAN_FRONTEND=noninteractive apt-get update
  run_root env DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates curl gnupg
  run_root install -m 0755 -d /etc/apt/keyrings
  if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | run_root gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    run_root chmod a+r /etc/apt/keyrings/docker.gpg
  fi

  . /etc/os-release
  ARCH="$(dpkg --print-architecture)"
  REPO_LINE="deb [arch=$ARCH signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $VERSION_CODENAME stable"
  if ! run_root grep -F "$REPO_LINE" /etc/apt/sources.list.d/docker.list >/dev/null 2>&1; then
    printf '%s\n' "$REPO_LINE" | run_root tee /etc/apt/sources.list.d/docker.list >/dev/null
  fi

  run_root env DEBIAN_FRONTEND=noninteractive apt-get update
  run_root env DEBIAN_FRONTEND=noninteractive apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
}

ensure_compose_available() {
  if detect_compose_cmd; then
    return
  fi

  if [ -L /usr/local/lib/docker/cli-plugins/docker-compose ] && readlink /usr/local/lib/docker/cli-plugins/docker-compose 2>/dev/null | grep -q '^/mnt/wsl/docker-desktop/'; then
    print_docker_diagnostics
    fail "Docker daemon works, but Compose is blocked by broken Docker Desktop WSL plugin links under /usr/local/lib/docker/cli-plugins. Remove or rename those stale docker-* links, or restore Docker Desktop, then rerun the script."
  fi

  install_compose_plugin_manually

  if detect_compose_cmd; then
    return
  fi

  print_docker_diagnostics
  fail "Docker daemon is running, but Docker Compose could not be activated."
}

start_docker_if_needed() {
  if docker_ready; then
    return
  fi

  if is_wsl && ! has_systemd; then
    fail "Docker is installed in Ubuntu WSL, but systemd is not enabled. Docker was installed as a Linux service and needs systemd in this setup. Run the Windows PowerShell wrapper again: powershell -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\setup-postgres.ps1"
  fi

  if command -v systemctl >/dev/null 2>&1; then
    run_root systemctl enable --now containerd docker || true
  fi

  if command -v service >/dev/null 2>&1; then
    run_root service docker start || true
  fi

  if docker_ready; then
    return
  fi

  if ! pgrep -x dockerd >/dev/null 2>&1; then
    log "Starting dockerd in background."
    run_root sh -c 'nohup dockerd >/tmp/dockerd.log 2>&1 &' || true
    DOCKER_STARTED_BY_SCRIPT=1
  fi

  for _ in $(seq 1 20); do
    if docker_ready; then
      return
    fi
    sleep 2
  done

  if [ "$DOCKER_STARTED_BY_SCRIPT" -eq 1 ]; then
    print_docker_diagnostics
    fail "Docker daemon did not start. Check /tmp/dockerd.log inside Ubuntu."
  fi

  print_docker_diagnostics
  fail "Docker is installed but unavailable. Start the daemon and rerun the script."
}

wait_for_postgres() {
  for _ in $(seq 1 30); do
    STATUS="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' ai-course-postgres 2>/dev/null || true)"
    if [ "$STATUS" = "healthy" ]; then
      return
    fi
    sleep 2
  done
  fail "PostgreSQL container did not become healthy in time."
}

apply_seed() {
  run_compose -f "$REPO_ROOT/compose.yaml" exec -T postgres \
    psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$SEED_FILE" >/dev/null
}

verify_db() {
  run_compose -f "$REPO_ROOT/compose.yaml" exec -T postgres \
    psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT id, name, email FROM clients ORDER BY id;" 
}

main() {
  cd "$REPO_ROOT"

  ensure_env_file
  load_env
  install_docker_if_missing
  start_docker_if_needed
  ensure_compose_available

  log "Starting PostgreSQL container."
  run_compose -f "$REPO_ROOT/compose.yaml" up -d postgres
  wait_for_postgres

  log "Applying idempotent seed."
  apply_seed

  log "Verification query result:"
  verify_db

  log "PostgreSQL is ready at localhost:${POSTGRES_PORT}."
}

main "$@"
