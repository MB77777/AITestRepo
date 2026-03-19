# AI in Programming Course Repo

Course workspace for 5-day training.

## Structure
- backend/ - Spring Boot starter app (seeded from Silky master)
- frontend/ - UI app for course demo
- ag-ui/ - git submodule with AG-UI community Java SDK used by the MVP template
- exercises/ - isolated exercise code samples
- prompts/ - copy/paste prompts used during sessions
- materials/ - scripts, handouts, references
- materials/scripts/ - helper scripts for setup/demo

## CopilotKit Template MVP
- This repo uses the `langgraph4j-copilotkit` integration pattern.
- For MVP/demo we use the original AG-UI Java community SDK through a git submodule and a local Maven build.
- This is intentional for the course template.
- For production, prefer official published Maven artifacts when available, or a separately maintained internal build/artifact pipeline instead of coupling SDK source code to the app repo.

## Prerequisites
- Java 21 available as `java`
- Node.js and `npm` available in the terminal
- Git available in the terminal
- Windows users: PowerShell for `.ps1` scripts. Linux uses `.sh` bash scripts
- WSL Ubuntu only if you use the provided PostgreSQL Docker setup on Windows

## Quick Start

### Recommended scripted path
1. Start PostgreSQL on Windows:
   `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-postgres.ps1`
   or on Linux:
   `bash ./scripts/setup-postgres.sh`
2. Bootstrap the CopilotKit template:
   `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-copilot-template.ps1`
   or on Linux:
   `bash ./scripts/setup-copilot-template.sh`
3. Start backend and frontend:
   `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-copilot-template.ps1`
   or on Linux:
   `bash ./scripts/start-copilot-template.sh`
4. Open:
   `http://localhost:3000`

### One-command path
- Windows:
  `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\run-copilot-template.ps1`
- Bash:
  `bash ./scripts/run-copilot-template.sh`

### Manual path
1. Start PostgreSQL with the existing setup script.
2. Initialize the AG-UI submodule:
   `git submodule update --init --remote`
3. Build the root Maven reactor:
   Windows:
   `mvnw.cmd clean install -Dgpg.skip=true -Dmaven.javadoc.skip=true -Plocal`
   Bash:
   `./mvnw clean install -Dgpg.skip=true -Dmaven.javadoc.skip=true -Plocal`
4. Start the backend:
   Windows:
   `mvnw.cmd package spring-boot:test-run -pl langgraph4j-ag-ui-sdk`
   Bash:
   `./mvnw package spring-boot:test-run -pl langgraph4j-ag-ui-sdk`
5. Start the frontend:
   `cd frontend`
   `npm install`
   `npm run dev`
6. Open:
   `http://localhost:3000`

## Environment
- `.env` stores local variables used by PostgreSQL and the MVP backend.
- The current MVP backend is configured for OpenRouter through:
  - `OPENROUTER_API_KEY`
  - `OPENROUTER_BASE_URL`
  - `OPENROUTER_MODEL`
  - `OPENROUTER_FALLBACK_MODEL`
  - `OPENROUTER_TEMPERATURE`
- Frontend can optionally override the backend AG-UI URL with:
  - `AGUI_BACKEND_URL`

## PostgreSQL Setup
- Windows 11 / Windows Server 2022 with WSL Ubuntu: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-postgres.ps1`
- Ubuntu: `bash ./scripts/setup-postgres.sh`
- Local credentials are created in `.env` if the file does not exist.
- Host connection: `localhost:5433`

### Why WSL needs systemd
- Inside Ubuntu WSL this setup installs normal Linux Docker Engine.
- Docker Engine runs as the Linux service `docker.service`.
- In WSL, the reliable way to manage that service is `systemd`.
- Without `systemd`, Docker can install successfully but the daemon may still not start.

### What the Windows script does
1. Checks that `wsl.exe` exists.
2. Checks that Ubuntu exists in WSL.
3. Checks whether Ubuntu WSL is already using `systemd`.
4. If not, it updates `/etc/wsl.conf` to:

```ini
[boot]
systemd=true
```

5. Runs `wsl --shutdown` automatically.
6. Starts Ubuntu again.
7. Installs Docker Engine and `docker compose` in Ubuntu if needed.
8. Creates `.env` from `.env.example` if missing.
9. Starts PostgreSQL, waits for health, and runs a verification query.

### Manual fix if needed
1. Open Ubuntu in WSL.
2. Run `sudo nano /etc/wsl.conf`
3. Paste:

```ini
[boot]
systemd=true
```

4. Save the file.
5. In Windows PowerShell run: `wsl --shutdown`
6. Run again:
   `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-postgres.ps1`

### Why not just start Docker manually
- Sometimes `dockerd` can be started manually.
- For a course, that is less predictable and harder to support across different machines.
- `systemd` gives a more standard Ubuntu setup and fewer machine-specific fixes.
