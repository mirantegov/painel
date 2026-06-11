# Runbook — CD (deploy automático para a VPS via GitHub Actions)

> Status: **workflow pronto** (`.github/workflows/deploy.yml`); falta **provisionar o
> self-hosted runner** na VPS (passo manual, abaixo). Enquanto o runner não existir, o
> workflow fica enfileirado sem rodar (inócuo).

## Por que self-hosted runner (e não SSH a partir do runner do GitHub)

O SSH/Postgres/ClickHouse da VPS são **allowlisted por IP fixo** (ver `docs/ACESSOS.local.md`,
SG só com os IPs do time). Runners hospedados pelo GitHub têm **IP dinâmico fora da allowlist** →
um job `ssh deploy@...` seria **bloqueado pelo security group**. Abrir o SG para as faixas do
GitHub Actions é amplo e inseguro.

Solução: um **self-hosted runner instalado na própria VPS**. Ele se conecta ao GitHub **por saída**
(long-poll HTTPS), pega o job e implanta **localmente** em `/opt/mirante/painel` — sem nenhuma porta
de entrada nova. O workflow roda em `runs-on: [self-hosted, vps]`.

## Disparo do deploy

`deploy.yml` dispara quando o workflow **CI** conclui com sucesso em `main`
(`workflow_run`), ou manualmente (`workflow_dispatch`). Passos: `git pull --ff-only` +
`docker compose ... up -d --build app` + healthcheck em `https://painel.mirantegov.cloud/login`.
`concurrency: deploy-vps` serializa deploys.

## Provisionar o runner (uma vez, na VPS)

> Ação de **alto impacto** (cria serviço persistente que executa código do CI em prod).
> Requer um **registration token** (curto, ~1h) e roda como o usuário `deploy`.

1. Gerar o registration token (na máquina do dev, com o PAT de admin do repo):
   ```bash
   GH_TOKEN=<PAT> gh api -X POST repos/mirantegov/painel/actions/runners/registration-token -q .token
   ```
2. Na VPS (`ssh -i ~/.ssh/marin_aws deploy@52.55.147.97`):
   ```bash
   V=2.335.1
   mkdir -p /opt/mirante/actions-runner && cd /opt/mirante/actions-runner
   curl -fsSL -o runner.tar.gz \
     https://github.com/actions/runner/releases/download/v$V/actions-runner-linux-x64-$V.tar.gz
   tar xzf runner.tar.gz && rm -f runner.tar.gz
   ./config.sh --url https://github.com/mirantegov/painel \
     --token <REGISTRATION_TOKEN> --labels vps --name vps-prod --unattended --replace
   sudo ./svc.sh install deploy     # instala como serviço systemd (usuário deploy)
   sudo ./svc.sh start
   sudo ./svc.sh status
   ```
3. Conferir no GitHub: **Settings → Actions → Runners** → `vps-prod` `Idle`.
4. Testar: **Actions → Deploy (VPS) → Run workflow** (`workflow_dispatch`) e ver o healthcheck verde.

## Operação / manutenção

- **Logs do runner:** `sudo ./svc.sh status`; jobs aparecem em Actions → Deploy (VPS).
- **Atualizar o runner:** ele se auto-atualiza; para forçar, `sudo ./svc.sh stop && ./config.sh remove --token <novo> && (reconfig)`.
- **Remover:** `sudo ./svc.sh uninstall && ./config.sh remove --token <removal-token>`.
- **Segurança:** o runner executa qualquer workflow que rode em `main` — manter a proteção de
  branch e a revisão de PR como gate (já há CI obrigatório). Não expor o runner a forks.

## Deploy manual (fallback, sem CD)

```bash
ssh -i ~/.ssh/marin_aws deploy@52.55.147.97
cd /opt/mirante/painel
git pull --ff-only origin main
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build app
```
