# ADR · Proxy TLS para a VPS de homologação

> Status: **Aceito (Traefik no Docker Compose)** — decisão tomada em 2026-06-09.
>
> Data de abertura: 2026-06-09.
> Data de decisão: 2026-06-09.
> Donos: time de plataforma do Mirante Painel.
> Relacionado: `docs/plano-consolidado-vps-pipeline.md` (Épico 2.0), `setup/vps/`.

## Domínio

Hostname principal definido: **`painel.mirantegov.cloud`**.

Subdomínios para auditoria (a publicar conforme necessidade, sempre com auth e/ou allowlist):
- `studio.mirantegov.cloud` — Supabase Studio (opcional).
- `minio.mirantegov.cloud` — MinIO console (privado por padrão).
- `clickhouse.mirantegov.cloud` — HTTP UI do ClickHouse (opcional).

## Contexto

O painel será homologado em uma VPS atrás de um domínio próprio. O plano consolidado VPS/Pipeline pede proxy HTTPS obrigatório antes de qualquer login real, com renovação automática de certificado e healthchecks de borda. Hoje o repositório carrega duas referências divergentes:

- `setup/vps/1-install.sh` e `setup/vps/2-build.sh` instalam **Nginx + Certbot diretamente no host** (Ubuntu), com reverse proxy para `localhost:3000` e renovação via timer do Certbot. O domínio padrão é `dash.hfgestaopublica.dev` e o app fica em `/opt/app`.
- O texto do plano original sugeriu **Caddy ou Traefik dentro do Docker Compose**, com TLS automático integrado ao stack e configuração versionada no repositório.

A decisão impacta diretamente:

- Onde fica o estado do TLS (volume Docker vs `/etc/letsencrypt` do host).
- Quem recarrega o certificado após renovação.
- Como portas de auditoria (Postgres `5432`, ClickHouse `8123/9100`, MinIO `9000/9001`, Supabase Studio) são publicadas — direto na borda ou via proxy.
- O quanto `setup/vps/` precisa ser reescrito ou apenas adaptado.

## Decisão

**Adotar Traefik no Docker Compose** como proxy TLS de borda.

Justificativa:

- Integração nativa com Docker via labels — cada serviço (`app`, futuros `studio`, `minio`, `clickhouse`) declara o roteamento no próprio `docker-compose.prod.yml`, sem editar arquivo no host.
- TLS automático via ACME/Let's Encrypt embutido, com HTTP-01 challenge na própria porta 80 do Traefik.
- Healthchecks Docker e descoberta de serviços feitos pelo próprio Traefik — combina com a meta "tudo via Docker Compose".
- Suporta o esquema multi-subdomínio acima sem reescrita por host.
- Estado dos certificados fica no volume Docker `traefik-acme` (entra no plano de backup do Épico 10).

## Opções

### Opção A — Nginx + Certbot no host (status atual)

Pros

- Já implementado e testado nos scripts `setup/vps/`.
- Renovação de certificado independente do ciclo de vida do compose; reload por `systemctl reload nginx`.
- Configuração estática previsível, fácil de inspecionar com `nginx -t`.
- Camada de borda continua de pé mesmo se o compose for derrubado.

Contras

- Configuração mora em `/etc/nginx/sites-available/...` no host, não no repositório (drift fácil).
- Duas camadas operacionais (host + compose) para manter alinhadas.
- Para adicionar subdomínio (Supabase Studio, MinIO console) é necessário editar Nginx no host, fora do fluxo de PR.
- Não combina bem com a meta de tudo via Docker Compose listada no plano consolidado.

### Opção B — Caddy no Docker Compose

Pros

- TLS automático com Let's Encrypt embutido (config em uma linha).
- Configuração versionada em `infra/caddy/Caddyfile`, parte do PR.
- Subdomínios extras são uma linha no Caddyfile.
- Combina com a diretriz "tudo via Docker Compose".

Contras

- Estado do certificado fica em volume Docker; precisa estar nos backups.
- Requer reconfigurar `setup/vps/` (sem Nginx, sem Certbot do host).
- Caddy é menos conhecido pelo time do que Nginx em ops Linux.

### Opção C — Traefik no Docker Compose

Pros

- Labels Docker descrevem cada serviço, ideal para multi-serviço (app, Studio, MinIO, ClickHouse via subdomínio).
- Dashboard administrativo embutido (com auth).
- Padrão de ponta em stacks self-hosted modernos.

Contras

- Curva de configuração maior que Caddy.
- Verbosidade nos `labels:` de cada serviço.
- Idem Opção B: precisa migrar `setup/vps/` e mover o estado do TLS para volume Docker.

## Critérios de avaliação

1. Esforço para sair do estado atual sem retrabalho.
2. Facilidade de adicionar subdomínios (Studio, MinIO console).
3. Quem precisa ter SSH no host para mudar uma rota.
4. Compatibilidade com healthchecks Docker e a rede `mirante` planejada.
5. Posição do TLS state (host vs volume Docker) no plano de backup.

## Plano de adoção

- Domínio principal: `painel.mirantegov.cloud`. DNS apontando para o IP da VPS (E1.2).
- Subdomínios de auditoria: registrar na zona DNS apenas conforme o roteador Traefik for sendo configurado.
- Cookie `mp_session` precisa de `secure: true` em produção — só funciona se o app receber `X-Forwarded-Proto: https`. Traefik injeta esse header por padrão.
- Endpoint `/api/health` (já criado) será o alvo do healthcheck do app no compose e de uma `traefik.http.services...path` opcional para watchdog externo.
- Estado do TLS fica em volume Docker (`traefik-acme`) — incluir nos backups (Épico 10).
- README e Épico 2 do plano consolidado já apontam para esta ADR.

## Consequências

1. **Scripts a refatorar:**
   - `setup/vps/1-install.sh` — remover Nginx + Certbot (passam a ser papel do Traefik no compose). Manter Docker, UFW (22/80/443), swap.
   - `setup/vps/2-build.sh` — substituir `certbot --nginx` por subir o compose com Traefik; remover bloco de Nginx site.
   - `setup-vps.sh` legado (porta 3000 exposta) — marcar como deprecado em favor do fluxo `setup/vps/` + Traefik.
2. **Novas variáveis em `.env.production`:**
   - `APP_DOMAIN=painel.mirantegov.cloud`
   - `TRAEFIK_ACME_EMAIL=...` (e-mail para Let's Encrypt)
   - `TRAEFIK_DASHBOARD_AUTH=...` (basic-auth para o dashboard, se exposto)
3. **Tarefas liberadas em E2.1:** subir Traefik no compose, ligar app via labels, healthcheck em `/api/health`, validar HTTPS no domínio.
