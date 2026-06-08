# Mirante Painel — Painel de gestão pública municipal

## O que é este sistema

O **Mirante Painel** é uma aplicação web de **Next.js** pensada para **prefeituras, autarquias e equipes de planejamento** que precisam de um **único painel** para acompanhar, de forma didática, **indicadores de gestão pública**: finanças, pessoal, obras, políticas sociais, transparência e mais. A interface está em **português (Brasil)**, com gráficos, tabelas e cartões (KPIs) no estilo *dashboard* executivo.

> **Backend (Fase 1):** os módulos de entrega leem dados de um **Postgres** (Supabase self-hosted), **multi-tenant por município** (schema `mun_<id_ibge>`), com **autenticação própria** (JWT em cookie httpOnly) e **ACL por módulo/submódulo**. Os dados seedados ainda são **demonstrativos** (município Nova Londrina/PR); o pipeline real de ingestão (TCE/SICONFI → ClickHouse → Postgres) é entregue em fases seguintes (Épicos 4–6). Detalhes em [`ARCHITECTURE.md`](ARCHITECTURE.md).

### Navegação

O painel principal (`/`) organiza o conteúdo em **abas (tabs)**: o utilizador escolhe o módulo e vê indicadores e visualizações daquela área. Há opção de **modo apresentação** (scroll automático entre módulos) nas definições do menu de utilizador, útil em **reuniões ou telão**.

### Casos de uso típicos

| Cenário | Como o produto ajuda |
| --- | --- |
| **Síntese para liderança** | A aba **Geral** consolida visão de receita, despesa e alertas; ideal para reuniões rápidas. |
| **Fiscal e finanças** | **Despesas**, **Receitas**, **Financeiro**, **Tributos** e **Planejamento (orçamento)** apoiam leitura de execução e composição. |
| **Controle patrimonial e operacional** | **Frotas**, **Obras**, **Patrimônio** e **Processos** dão visão de frota, obras, bens e trâmites. |
| **Pessoas e contratação** | **Recursos Humanos** e **Licitações e Contratos** concentram indicadores de pessoal e compras. |
| **Políticas setoriais** | **Saúde**, **Educação** e **Assistência Social** exibem painéis temáticos para áreas sociais. |
| **Transparência e controle** | **Contas Públicas** reforça leitura de prestação de contas; **Legislativo**, **Previdência** e **Saneamento** ampliam o recorte institucional. |

---

## Stack

| Tecnologia | Versão |
| --- | --- |
| [Next.js](https://nextjs.org) | 16 |
| [React](https://react.dev) | 19 |
| TypeScript | 5 |
| [Tailwind CSS](https://tailwindcss.com) | 4 |
| [shadcn/ui](https://ui.shadcn.com) + Radix | latest |
| [Recharts](https://recharts.org) | 2 |
| [Hugeicons](https://hugeicons.com) | (ícones) |
| [PostgreSQL](https://www.postgresql.org) (via [Supabase](https://supabase.com) self-hosted) | 15 |
| [Supabase CLI](https://supabase.com/docs/guides/cli) (Postgres/Studio/REST local em Docker) | latest |
| [`pg`](https://node-postgres.com) (pool server-only) | 8 |
| [`jose`](https://github.com/panva/jose) (JWT HS256) + [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js) (hash de senha) | — |

> A autenticação é **própria** (não usa GoTrue do Supabase): login = **cliente (id IBGE) + CPF + senha**, sessão em JWT no cookie httpOnly `mp_session`. Veja [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## Temas e aparência

A aplicação combina **modo claro / escuro / sistema** ([`next-themes`](https://github.com/pacocoursey/next-themes)) com **paletas de cor nomeadas** (presets shadcn-compatible em OKLCH). O seletor fica no **ícone de paleta** no cabeçalho (ao lado do menu de utilizador).

- **Onde é guardado:** a paleta escolhida (exceto "Padrão") fica em `localStorage` (`lib/color-presets.ts`) e é reaplicada ao recarregar a página, com script no layout para reduzir *flash* de cor errada.
- **Onde estão os tokens:** variáveis CSS em [`app/globals.css`](app/globals.css) sob `html[data-color-preset="…"]` (claro) e `html.dark[data-color-preset="…"]` (escuro).

### Paletas disponíveis

| Nome | Descrição breve |
| --- | --- |
| **Padrão** | Tema neutro base do sistema. |
| **Dracula** | Paleta clássica estilo Dracula / theme explorer. |
| **Ocean Breeze** | Tons oklch estilo registry (águas / claridade). |
| **Floresta noturna** | Verdes profundos, boa leitura em escuro. |
| **Northern Lights** | Teal e violeta, registry (tweakcn / shadcn). |
| **Supabase** | Inspiração verde-menta / escuro (registry). |
| **Monokai** | Inspiração editor Monokai / VS Code. |
| **Midnight Blue** | Azul profundo (estética *midnight*). |
| **Blue Jeans** | Índigo / *denim* (tokens registry). |

O **modo** (claro, escuro, sistema) é independente da **paleta**: pode usar, por exemplo, *Supabase* no claro e no escuro; as variáveis ajustam contraste em cada combinação.

---

## Módulos do painel (abas)

Cada linha corresponde a uma aba no ecrã principal. Os ficheiros vivem em [`components/`](components/) (e subpastas, ex.: `legislativo/`, `orcamento/`, `previdencia/`, `saneamento/`).

| Aba (UI) | Ficheiro / área | Foco |
| --- | --- | --- |
| **Geral** | `visao-geral.tsx` | Consolidação, alertas, visão macro. |
| **Despesas** | `despesa-municipal.tsx` | Execução e análise de despesas. |
| **Receitas** | `receita-municipal.tsx` | Arrecadação e composição. |
| **Financeiro** | `financeiro-municipal.tsx` | Indicadores financeiros agregados. |
| **Tributos** | `tributacao-municipal.tsx` | Tributação municipal. |
| **Licitações e Contratos** | `compras-municipais.tsx` | Compras, licitações, contratos. |
| **Recursos Humanos** | `rh-municipal.tsx` | Folha, secretarias, indicadores de pessoal. |
| **Planejamento** | `orcamento-municipal.tsx` (+ `orcamento/`) | Orçamento municipal (LOA, visualizações). |
| **Saúde** | `saude.tsx` | Indicadores da área de saúde. |
| **Educação** | `educacao.tsx` | Indicadores educacionais. |
| **Assistência Social** | `assistencia-social.tsx` | Políticas sociais. |
| **Obras** | `obras.tsx` | Obras e investimentos. |
| **Frotas** | `frotas.tsx` | Frota e operações. |
| **Patrimônio** | `patrimonio.tsx` | Bens e inventário. |
| **Processos** | `processos.tsx` | Processos / tramitação. |
| **Contas Públicas** | `prestacao-contas.tsx` | Prestação de contas / transparência. |
| **Legislativo** | `legislativo/` | Câmara, sessões, proposituras, etc. |
| **Previdência** | `previdencia/` | RPPS / previdência municipal. |
| **Saneamento** | `saneamento/` | Água, esgoto, drenagem. |

Para **adicionar uma nova aba**, siga o fluxo descrito na secção [Como adicionar um novo módulo](#como-adicionar-um-novo-módulo).

---

## Requisitos mínimos de hardware

### VPS / Servidor

| Recurso | Mínimo recomendado | Observação |
| --- | --- | --- |
| CPU | 1 vCPU | O build Next.js é intensivo; 2 vCPUs reduzem o tempo de compilação |
| RAM | 1 GB | O script `setup-vps.sh` cria 2 GB de swap para compensar RAM baixa |
| Disco | 10 GB livres | A imagem Docker ocupa ~500 MB; reserve espaço para logs e swap |
| SO | Ubuntu 22.04 ou 24.04 LTS | Outros Debian-based podem funcionar, sem garantia |
| Porta aberta | 3000 (ou 80/443 com proxy) | O script de instalação configura o UFW automaticamente |

> **RAM insuficiente?** O build do Next.js pode falhar com menos de 1 GB de RAM sem swap. O script `setup-vps.sh` configura 2 GB de swap automaticamente.

### Máquina local (macOS)

| Recurso | Mínimo |
| --- | --- |
| macOS | 12 Monterey ou superior |
| Chip | Apple Silicon (M1/M2/M3/M4) ou Intel |
| RAM | 4 GB (8 GB recomendado para Colima + build) |
| Disco | 15 GB livres (Homebrew + Colima + imagem Docker) |

---

## Pré-requisitos

- **Node.js** 20 ou superior — [download](https://nodejs.org)
- **npm** 10 ou superior (incluído com o Node.js)
- **Docker Engine** + **Docker Compose** — usado pela **Supabase CLI** (sobe Postgres/Studio/REST locais) e pela imagem de produção da app
- **Supabase CLI** — [instalação](https://supabase.com/docs/guides/cli) (`brew install supabase/tap/supabase` no macOS); chamada via `npx supabase` nos scripts

Verifique as versões instaladas:

```bash
node -v
npm -v
docker -v
npx supabase --version
```

---

## Desenvolvimento local

A app lê dados de um **Postgres** local provido pela **Supabase CLI**. O fluxo completo:

```bash
git clone https://github.com/mirantegov/painel.git
cd painel
npm install

# 1) Sobe Postgres/Studio/REST locais (Docker, via Supabase CLI)
npm run db:start

# 2) Aplica as migrations (cria dims, fatos, módulos, auth/ACL, multi-tenant)
npm run db:reset

# 3) Importa os 5.571 municípios do IBGE → public.dim_municipio
npm run db:import-ibge

# 4) Provisiona o município demo (mun_4117107), seed dos snapshots e do usuário demo
npm run db:seed-demo

# 5) Sobe o Next em http://localhost:3000
npm run dev
```

Crie um **`.env.local`** (não versionado) com:

```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
JWT_SECRET=<uma-string-secreta-longa>
AUTH_COOKIE_NAME=mp_session
```

Abra [http://localhost:3000](http://localhost:3000). Será redirecionado para `/login` se não existir cookie de sessão válido.

> O **Studio** do Supabase (inspeção do banco) fica em [http://127.0.0.1:54323](http://127.0.0.1:54323). Veja [`docs/banco-de-dados.md`](docs/banco-de-dados.md) para o detalhe de schema, seed e fluxo de dados.

### Credenciais de demonstração

Login é por **cliente (id IBGE) + usuário (CPF) + senha** (município **Nova Londrina/PR**):

| Campo | Valor |
| --- | --- |
| Cliente (id IBGE) | `4117107` |
| Usuário (CPF) | `00000000000` |
| Senha | `Dx7$kP2w-Ra9mLZ` |

> Usuário demo provisionado pelo `db:seed-demo` (cargo Prefeito, acesso total à ACL). Senha de **desenvolvimento** — sobrescreva via env `DEMO_PASSWORD` ao seedar e troque antes de qualquer uso real. Veja [Como alterar as credenciais de acesso](#como-alterar-as-credenciais-de-acesso).

### Build e servidor de produção (local)

Útil para validar o mesmo artefacto que em Docker:

```bash
npm run build
npm run start
```

O servidor de produção local também usa a porta **3000** por defeito.

### Scripts npm

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção (`next build`) |
| `npm run start` | Serve o build (`next start`) |
| `npm run lint` | ESLint no projeto |
| `npm run typecheck` | TypeScript sem emitir ficheiros |
| `npm run format` | Prettier em `.ts` / `.tsx` |
| `npm run db:start` / `db:stop` / `db:status` | Sobe / para / inspeciona o stack local da Supabase CLI |
| `npm run db:reset` | Recria o banco aplicando `supabase/migrations/` |
| `npm run db:migration` | Cria um novo arquivo de migration |
| `npm run db:import-ibge` | Importa os municípios do IBGE → `public.dim_municipio` |
| `npm run db:seed-demo` | Provisiona o município demo + seed dos snapshots e do usuário demo |

---

## Docker

A imagem usa **multi-stage build** ([`Dockerfile`](Dockerfile)): instala dependências com `npm install`, corre `npm run build` (saída **`standalone`** configurada no Next.js) e executa como utilizador não-root.

### Subir o stack

Na raiz do repositório:

```bash
docker compose up -d --build
```

- **URL:** [http://localhost:3000](http://localhost:3000)  
- **Porta:** `3000` no host mapeada para `3000` no contentor ([`docker-compose.yml`](docker-compose.yml)).
- **Variável:** `NODE_ENV=production`.

### Comandos úteis

```bash
docker compose ps              # estado dos serviços
docker compose logs -f app     # logs da aplicação em tempo real
docker compose down            # parar e remover contentores
docker compose up -d --build   # rebuild após alterações ao código
```

A imagem da app espera um **Postgres acessível** via `DATABASE_URL` e os segredos `JWT_SECRET` / `AUTH_COOKIE_NAME` no ambiente. Use as credenciais de demonstração ([acima](#credenciais-de-demonstração)) para entrar. Em ambientes reais, configure **HTTPS**, segredos e o banco fora deste repositório.

---

## Como alterar as credenciais de acesso

Os usuários ficam na tabela **`public.usuarios`** do Postgres (não mais em código). Cada usuário é identificado por **(município `id_ibge`, CPF)** e a senha é guardada como **hash bcrypt** em `senha_hash`. O login valida `municipio_id_ibge + cpf + senha` e emite o JWT de sessão.

### Trocar a senha do usuário demo

A forma mais simples é re-seedar com outra senha (sobrescreve o hash):

```bash
DEMO_PASSWORD="sua-senha-forte" npm run db:seed-demo
```

### Criar / alterar um usuário manualmente

Gere o hash bcrypt e faça o `insert`/`update` em `public.usuarios`. Exemplo com a CLI do projeto:

```bash
# hash de uma senha (custo 10, igual ao usado no seed)
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 10))" "sua-senha-forte"
```

```sql
-- no Studio (http://127.0.0.1:54323) ou via psql
insert into public.usuarios (municipio_id_ibge, cpf, nome, cargo, senha_hash, ativo)
values ('4117107', '12345678901', 'Fulano de Tal', 'Secretário', '<hash-bcrypt>', true);
```

A ACL (módulos/submódulos liberados) fica em `public.usuario_modulos` / `public.usuario_submodulos` — o `db:seed-demo` libera tudo para o usuário demo. Veja [`docs/banco-de-dados.md`](docs/banco-de-dados.md).

> **Importante:** use uma senha com no mínimo 12 caracteres combinando letras, números e símbolos. Nunca versione segredos (`JWT_SECRET`, senhas) — eles vão no ambiente / `.env.local`.

---

## Atualizar o sistema

Quando uma nova versão do código for disponibilizada no repositório:

```bash
# Entre no diretório da aplicação
cd /opt/app          # ajuste para o diretório usado na sua instalação

# Baixe as alterações
git pull

# Reconstrua a imagem e reinicie
docker compose up -d --build
```

Para verificar se a atualização foi aplicada:

```bash
docker compose ps
docker compose logs --tail=50 app
```

> Em VPS configurada com o script `setup-vps.sh`, o diretório padrão é `/opt/app`.  
> Em macOS configurado com `setup-macos.sh`, o diretório padrão é `~/app`.

---

## Verificar se o sistema está funcionando

```bash
# Ver estado dos containers
docker compose ps

# Testar se a aplicação responde (deve retornar HTTP 200 ou 302)
curl -o /dev/null -sw "%{http_code}\n" http://localhost:3000/login

# Ver últimas linhas do log
docker compose logs --tail=100 app
```

Se o container aparecer como `Up` em `docker compose ps` e o `curl` retornar `200` ou `302`, o sistema está operacional.

---

## HTTPS e proxy reverso (Nginx)

Para disponibilizar o painel em um domínio com HTTPS, configure o **Nginx** como proxy reverso na frente da aplicação.

### Pré-requisito

- Domínio apontando para o IP do servidor (ex.: `painel.prefeitura.gov.br`)
- Nginx instalado: `sudo apt install nginx -y`
- Certbot para certificado gratuito: `sudo apt install certbot python3-certbot-nginx -y`

### 1. Crie o arquivo de configuração do Nginx

```bash
sudo nano /etc/nginx/sites-available/mirante-painel
```

Cole o conteúdo abaixo, substituindo `painel.prefeitura.gov.br` pelo seu domínio:

```nginx
server {
    listen 80;
    server_name painel.prefeitura.gov.br;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Ative a configuração

```bash
sudo ln -s /etc/nginx/sites-available/mirante-painel /etc/nginx/sites-enabled/
sudo nginx -t          # testar se a configuração está correta
sudo systemctl reload nginx
```

### 3. Emita o certificado SSL (HTTPS gratuito)

```bash
sudo certbot --nginx -d painel.prefeitura.gov.br
```

O Certbot configura o HTTPS automaticamente e renova o certificado a cada 90 dias.

### 4. Libere as portas no firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Após isso, o painel estará acessível em `https://painel.prefeitura.gov.br` sem necessidade de indicar a porta.

---

## Estrutura do projeto

```
painel/
├── app/
│   ├── layout.tsx          # Raiz: fonte Geist, tema, preset de cores
│   ├── page.tsx            # Dashboard principal (abas dos módulos)
│   ├── globals.css         # Tailwind + variáveis + presets de cor
│   ├── login/page.tsx      # Login (cliente IBGE + CPF + senha)
│   └── api/
│       ├── auth/login|logout/route.ts   # Login/logout (JWT em cookie)
│       └── data/[modulo]/route.ts       # Snapshot jsonb do módulo (por município da sessão)
├── components/
│   ├── ui/                 # Primitivas shadcn/ui
│   ├── use-snapshot.ts    # Hook: lê /api/data/<slug> com fallback bundlado
│   └── …                   # Um componente por módulo (ver tabela acima)
├── lib/
│   ├── auth/               # jwt (jose) · password (bcrypt) · session
│   ├── db.ts               # Pool Postgres + tenantQuery (search_path mun_<ibge>)
│   ├── data/modules.ts     # getModuloDados + allowlist slug→mod_*
│   ├── demo-*.ts           # Snapshots demo seedados em mod_* (fallback bundlado)
│   ├── modules-config.ts   # Catálogo de módulos + DEFAULT_ENABLED_MODULE_IDS
│   └── utils.ts
├── scripts/
│   ├── import-ibge.ts      # Importa municípios → public.dim_municipio
│   └── seed-demo.ts        # Provisiona município demo + seed snapshots + usuário
├── supabase/
│   ├── config.toml
│   └── migrations/         # Schema: dims, fatos, módulos, auth/ACL, multi-tenant
├── docs/                   # ARCHITECTURE complementar, planos e referências
├── middleware.ts           # Guarda rotas com JWT (cookie mp_session)
├── Dockerfile
├── docker-compose.yml
├── setup-macos.sh
└── setup-vps.sh
```

> Documentação de arquitetura: [`ARCHITECTURE.md`](ARCHITECTURE.md) (camadas, multi-tenant, auth/ACL) e [`docs/banco-de-dados.md`](docs/banco-de-dados.md) (schema, seed, fluxo de dados).

---

## Como adicionar um novo módulo

### 1. Crie o componente do módulo

Crie `components/meu-modulo.tsx`:

```tsx
export function MeuModulo() {
  return (
    <div>
      <h2>Meu Módulo</h2>
      {/* conteúdo */}
    </div>
  )
}
```

### 2. Registe a aba em `app/page.tsx`

1. Importe o componente.
2. Adicione o id em `TAB_ORDER`.
3. Adicione um `<TabsTrigger>` em `<TabsList>`.
4. Adicione `<TabsContent>` com o componente.

Os ícones vêm de `@hugeicons/core-free-icons`.

### 3. (Opcional) Servir dados do Postgres

Para o módulo ler do banco como os demais: registre o slug em `MODULE_TABLES` (`lib/data/modules.ts`) apontando para `mod_<slug>`, extraia os dados para `lib/demo-<slug>.ts` (`<SLUG>_SNAPSHOT` serializável), consuma no componente via `useSnapshot("<slug>", <SLUG>_SNAPSHOT)` e seede em `scripts/seed-demo.ts`. Detalhe do padrão em [`docs/banco-de-dados.md`](docs/banco-de-dados.md).

---

## Autenticação e rotas

| Rota | Comportamento |
| --- | --- |
| `/` | Exige sessão válida (cookie `mp_session` com JWT verificado); senão redireciona para `/login` |
| `/login` | Se já autenticado, redireciona para `/` |
| `POST /api/auth/login` | Valida `municipio + cpf + senha` contra `public.usuarios`, emite o JWT e grava o cookie |
| `POST /api/auth/logout` | Limpa o cookie de sessão |
| `GET /api/data/[modulo]` | Retorna o snapshot `jsonb` do módulo para o município da sessão (allowlist em `lib/data/modules.ts`) |

Sessão em **JWT HS256** (`jose`), cookie httpOnly `mp_session` com validade de **8 horas**, assinado com `JWT_SECRET`. O middleware ([`middleware.ts`](middleware.ts)) verifica o token; o município **sempre** sai do claim do JWT (nunca do cliente). Auth em [`lib/auth/`](lib/auth) (`jwt.ts`, `password.ts`, `session.ts`). Veja [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## Instalação automatizada no macOS (Apple Silicon)

```bash
chmod +x ./setup-macos.sh
./setup-macos.sh
```

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `REPO_URL` | `mirantegov/painel` | Repositório a clonar (`owner/repo` ou URL completa) |
| `APP_DIR` | `~/app` | Diretório local de instalação |
| `BUILD_NO_CACHE` | `0` | `1` para rebuild sem cache do Docker |
| `INSTALL_GH` | `0` | `1` para instalar o GitHub CLI |
| `INSTALL_NGROK` | `0` | `1` para instalar o ngrok (túnel para acesso externo) |
| `COLIMA_CPU` | `4` | CPUs alocadas para a VM Colima |
| `COLIMA_MEMORY` | `8` | RAM em GB alocada para a VM Colima |
| `COLIMA_DISK` | `60` | Disco em GB alocado para a VM Colima |

---

## Deploy em VPS Ubuntu (22.04 / 24.04)

```bash
curl -fsSL "https://raw.githubusercontent.com/mirantegov/painel/main/setup-vps.sh" -o setup-vps.sh
chmod +x setup-vps.sh
sudo ./setup-vps.sh
```

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `REPO_URL` | `mirantegov/painel` | Repositório a clonar (`owner/repo` ou URL completa) |
| `APP_DIR` | `/opt/app` | Diretório de instalação no servidor |
| `BUILD_NO_CACHE` | `0` | `1` para rebuild sem cache do Docker |
| `INSTALL_GH` | `0` | `1` para instalar o GitHub CLI |

O script configura automaticamente: Docker, firewall UFW (portas 22 e 3000), 2 GB de swap e um serviço `systemd` que reinicia a aplicação junto com o servidor.

---

## Troubleshooting

### Aplicação não abre no navegador

Verifique se o container está em execução:

```bash
docker compose ps
```

Se o status não for `Up`, veja os logs:

```bash
docker compose logs --tail=100 app
```

Verifique também se a porta 3000 está acessível:

```bash
# Na própria VPS
curl -I http://localhost:3000/login

# No firewall (Ubuntu)
sudo ufw status
```

---

### Tela de login aparece, mas não aceita a senha

Os usuários ficam em `public.usuarios` (Postgres). Verifique:

- O **banco está no ar** e a app o alcança (`DATABASE_URL` correto). Em dev: `npm run db:status`.
- O **seed rodou** (`npm run db:seed-demo`) — sem ele não há usuário demo.
- `JWT_SECRET` está definido no ambiente / `.env.local` (sem ele a sessão não é emitida).
- Login = **cliente (id IBGE) + CPF + senha** — confira os valores ([credenciais de demonstração](#credenciais-de-demonstração)).

Para redefinir a senha do usuário demo: `DEMO_PASSWORD="nova-senha" npm run db:seed-demo`.

---

### `npm install` falha com erro de permissão

```bash
rm -rf node_modules && npm install
```

---

### Porta 3000 já está em uso

Identifique o processo que ocupa a porta e encerre-o:

```bash
# Linux / macOS
lsof -i :3000
kill -9 <PID>

# Ou mude a porta no docker-compose.yml
# ports: - "8080:3000"   ← acesse em :8080
```

---

### Docker: `permission denied while trying to connect to the Docker daemon`

```bash
sudo usermod -aG docker $USER
# Faça logout e login de novo para a alteração ter efeito
```

---

### Build do Docker falha com erro de memória (`out of memory` / `OOM`)

O build do Next.js pode consumir mais de 1 GB de RAM. Soluções:

```bash
# Opção 1: criar swap na VPS (se não foi criado pelo script)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Opção 2: rebuild sem cache (às vezes resolve travamentos parciais)
docker compose build --no-cache
docker compose up -d
```

---

### Container para de funcionar após reinício do servidor

Confirme que o serviço systemd está habilitado:

```bash
systemctl status mirante-painel
systemctl enable mirante-painel   # habilita o reinício automático
```

Em macOS, verifique o Colima e o LaunchAgent:

```bash
colima status
brew services list | grep colima
launchctl list com.mirante.painel
```

---

### Build passa mas `typecheck` aponta erros

O `next.config.mjs` tem `ignoreBuildErrors: true`, o que permite que o build termine mesmo com erros de TypeScript. Para identificar e corrigir os erros antes de uma atualização:

```bash
npm run typecheck
```

---

### Certificado SSL expirado (HTTPS)

O Certbot renova automaticamente a cada 90 dias. Para renovar manualmente:

```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

## Licença e origem

Este repositório é um projeto de demonstração de painel analítico para gestão pública. Consulte o repositório para a licença aplicável.
