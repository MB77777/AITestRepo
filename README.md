# AI in Programming Course Repo

Course workspace for 5-day training.

## Structure
- backend/ - Spring Boot starter app (seeded from Silky master)
- frontend/ - UI app for course demo
- exercises/ - isolated exercise code samples
- prompts/ - copy/paste prompts used during sessions
- materials/ - scripts, handouts, references
- materials/scripts/ - helper scripts for setup/demo

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
