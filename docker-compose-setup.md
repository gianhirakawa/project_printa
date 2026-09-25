# Wiring project_printa into the Pi harness

One-time setup, done on the Windows host — not inside this repo. Mirrors section 6 of the main Pi guide.

## 1. Confirm the project exists on Windows

```powershell
Get-ChildItem D:\dev-works\project_printa
```

(Extract/place this folder there first if you haven't already.)

## 2. Add the bind mount

Edit `D:\pi-agent\docker-compose.yml`. Under `services → pi-agent → volumes`, add:

```yaml
- D:/dev-works/project_printa:/workspace/printa
```

## 3. Recreate the container

```powershell
cd D:\pi-agent
docker compose up -d --force-recreate
```

## 4. Verify the mount

```powershell
docker compose exec pi-agent sh -lc "ls -la /workspace/printa"
```

You should see this folder's contents (`README.md`, `SPECS.md`, `MILESTONES.md`, `AGENTS.md`, `DEPLOY.md`, `content/`, `design/`, `integrations/`, `.pi/`, `docker-compose-setup.md`).

## 5. Launch Pi in the project

```powershell
docker compose exec -w /workspace/printa pi-agent pi
```

Check the footer shows `/workspace/printa` as the working directory, then run a harmless `git status` or file read before asking Pi to do any real work — same verification habit as any other project on the harness.

## Optional: project rules

`AGENTS.md` in this folder already covers project-specific guardrails (no fabricated pricing/reviews, no ecommerce scope creep in Phase 1, secrets handling for the leads form). Nothing further needed here unless you want to add more.
