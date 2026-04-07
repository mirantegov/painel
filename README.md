# dash

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_BBOxBYQQlJw0HT6kL4rhS7Macaa6)

## Deploy na VPS (Ubuntu, automatizado)

Requisitos: VPS Ubuntu 22.04 ou 24.04 com acesso root (SSH), registro DNS **A** apontando o domínio para o IP público da VPS (antes ou logo após o deploy; o Caddy obtém certificado Let's Encrypt quando o DNS já resolve).

### Instalação em uma linha (repositório público padrão)

No servidor:

```bash
curl -fsSL "https://raw.githubusercontent.com/vagnerrods/v0-shadcn-ui-components/main/setup-vps.sh" -o setup-vps.sh
chmod +x setup-vps.sh
sudo ./setup-vps.sh
```

O script usa por padrão `REPO_URL=vagnerrods/v0-shadcn-ui-components` e `DOMAIN=dash.hfgestaopublica.dev`. Para outro fork ou domínio:

```bash
sudo DOMAIN=seu.dominio.com REPO_URL=seu-usuario/seu-repo ./setup-vps.sh
```

Com build sem cache (mais lento, útil em troubleshooting):

```bash
sudo BUILD_NO_CACHE=1 ./setup-vps.sh
```

### O que o script faz

- Atualiza o sistema e instala dependências (Git, UFW, etc.).
- Instala Docker Engine e o plugin Compose.
- Configura UFW (portas 22, 80, 443).
- Cria swap de 2 GB se ainda não existir (`fallocate`, com fallback para `dd`).
- Clona o repositório em `/opt/app` de forma atômica (clone para `/opt/app.new` e só então substitui `/opt/app`, evitando deixar o diretório vazio se o clone falhar).
- Opcionalmente alinha a primeira linha do `Caddyfile` ao `DOMAIN` (`UPDATE_CADDYFILE_DOMAIN=1`, padrão).
- Executa `docker compose build` e `docker compose up -d`.

### Variáveis úteis

| Variável | Descrição |
|----------|-----------|
| `REPO_URL` | `owner/repo` (HTTPS GitHub público) ou URL completa (privado/SSH). |
| `DOMAIN` | Hostname servido pelo Caddy (deve corresponder ao DNS). |
| `UPDATE_CADDYFILE_DOMAIN` | `1` (padrão) atualiza a 1ª linha do `Caddyfile`; `0` não altera o arquivo. |
| `BUILD_NO_CACHE` | `1` força `docker compose build --no-cache`. |
| `INSTALL_NGROK` | `1` instala ngrok (túnel; opcional para dev). |
| `INSTALL_GH` | `1` instala a GitHub CLI. |

### Repositório privado

Use URL com token, URL SSH, ou instale o GitHub CLI (`INSTALL_GH=1`), execute `gh auth login` e `gh auth setup-git`, depois clone manualmente em `/opt/app` e rode `docker compose up -d --build`.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/vagnerrods/v0-shadcn-ui-components" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
