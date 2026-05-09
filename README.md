# Analytics Dash — Painel de gestão pública municipal

## O que é este sistema

O **Analytics Dash** é uma aplicação web de **Next.js** pensada para **prefeituras, autarquias e equipes de planejamento** que precisam de um **único painel** para acompanhar, de forma didática, **indicadores de gestão pública**: finanças, pessoal, obras, políticas sociais, transparência e mais. A interface está em **português (Brasil)**, com gráficos, tabelas e cartões (KPIs) no estilo *dashboard* executivo.

> **Dados de demonstração:** todo o conteúdo numérico e textos são **fictícios e estáticos** — servem para apresentações, treinamento e protótipos, **não** para decisão com informações reais. A arquitetura não inclui integração com ERP, TCE ou APIs governamentais.

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

## Pré-requisitos

- **Node.js** 20 ou superior — [download](https://nodejs.org)
- **npm** 10 ou superior (incluído com o Node.js)
- **Docker Engine** + **Docker Compose** *(apenas para execução em container)*

Verifique as versões instaladas:

```bash
node -v
npm -v
docker -v
```

---

## Desenvolvimento local

```bash
git clone https://github.com/vagnerrods/dash.git
cd dash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Será redirecionado para `/login` se não existir cookie de sessão.

### Credenciais de demonstração

| Campo | Valor |
| --- | --- |
| Usuário | `admin` |
| Senha | `admin` |

> São credenciais fixas só para demo — não utilize em produção sem substituir por autenticação real.

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
docker compose logs -f app       # logs da aplicação (serviço app)
docker compose down             # parar e remover contentores
docker compose up -d --build    # rebuild após alterações ao código
```

Utilize as mesmas credenciais **admin / admin** para entrar. Em ambientes reais, configure **HTTPS**, segredos e autenticação fora deste repositório.

---

## Estrutura do projeto

```
dash/
├── app/
│   ├── layout.tsx          # Raiz: fonte Geist, tema, preset de cores
│   ├── page.tsx          # Dashboard principal (abas dos módulos)
│   ├── globals.css       # Tailwind + variáveis + presets de cor
│   └── login/page.tsx    # Login por cookie
├── components/
│   ├── ui/                 # Primitivas shadcn/ui
│   ├── theme-provider.tsx
│   ├── theme-selector.tsx  # Paleta + modo claro/escuro
│   ├── color-preset-provider.tsx
│   └── …                   # Um componente por módulo (ver tabela acima)
├── lib/
│   ├── color-presets.ts    # Lista de paletas e script anti-FOUC
│   └── utils.ts
├── middleware.ts           # Guarda rotas com cookie `auth`
├── Dockerfile
├── docker-compose.yml
├── setup-macos.sh
└── setup-vps.sh
```

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

---

## Autenticação e rotas

| Rota | Comportamento |
| --- | --- |
| `/` | Exige cookie `auth=1`; senão redireciona para `/login` |
| `/login` | Se já autenticado, redireciona para `/` |

Cookie com validade de **8 horas** (`max-age=28800`). Detalhes em [`middleware.ts`](middleware.ts) e [`app/login/page.tsx`](app/login/page.tsx).

---

## Instalação automatizada no macOS (Apple Silicon)

```bash
chmod +x ./setup-macos.sh
./setup-macos.sh
```

Variáveis opcionais: `REPO_URL`, `APP_DIR`, `BUILD_NO_CACHE`, `INSTALL_GH`, `INSTALL_NGROK`, `COLIMA_CPU`, `COLIMA_MEMORY`, `COLIMA_DISK`.

---

## Deploy em VPS Ubuntu (22.04 / 24.04)

```bash
curl -fsSL "https://raw.githubusercontent.com/vagnerrods/dash/main/setup-vps.sh" -o setup-vps.sh
chmod +x setup-vps.sh
sudo ./setup-vps.sh
```

Variáveis opcionais: `REPO_URL`, `BUILD_NO_CACHE`, `INSTALL_GH`, `INSTALL_NGROK`.

---

## Troubleshooting

**`npm install` falha com erro de permissão**

```bash
rm -rf node_modules && npm install
```

**Porta 3000 ocupada**

```bash
lsof -i :3000
kill -9 <PID>
```

**Docker: `permission denied`**

```bash
sudo usermod -aG docker $USER
# Faça logout e login de novo
```

**Build Docker sem memória**

Aumente memória no Docker Desktop ou adicione swap no servidor.

**Build passa mas `typecheck` falha**

O `next.config.mjs` pode ter `ignoreBuildErrors: true`. Corrija com `npm run typecheck` antes de PRs.

---

## Licença e origem

Este repositório é um projeto de demonstração de painel analítico para gestão pública. Consulte o repositório para a licença aplicável.
