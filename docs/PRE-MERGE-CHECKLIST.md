# Checklist pré-merge

Guia rápido do que é validado **automaticamente no CI** e do que precisa ser rodado
**localmente antes de abrir/mergear** um PR.

## ✅ Coberto pelo CI (GitHub Actions — `.github/workflows/ci.yml`)

Roda em todo `pull_request` e em `push` para `main`. Bloqueia o merge se quebrar.

| Job | O que valida |
| --- | --- |
| **App** | `typecheck` · `lint` · `build` · `test:unit` (lógica grupo A + auth/JWT/bcrypt/format) · engine do exporter · `audit-modules` |
| **Dados** | sobe Postgres 17, aplica as migrations, roda `db:seed-demo` e `test:data` (integridade do seed: usuário/ACL, snapshots `mod_*` serializáveis, fatos grupo A) |
| **Exportador Go** | `go build` · `go vet` · `go test` |
| **Importador Go** | `go build` · `go vet` · `go test` · manifest sem drift |

E2E de regressão contra **produção** roda no `deploy.yml` (pós-deploy), gated por `E2E_SENHA`.

## 🟡 Rodar LOCALMENTE antes do merge

O **E2E local** (`test:e2e:local`) **não roda no CI** — exige build de produção +
navegador (Chromium) + Supabase local seedado, o que é pesado/lento para o CI. A cobertura
equivalente em produção é feita pelo job de e2e do deploy. Rode localmente quando mexer em
**login/auth, sessão (kiosk), middleware/guard de rota ou render dos módulos do grupo A**.

### Pré-requisitos (uma vez)

```bash
npm ci
npx playwright install chromium     # baixa o browser do Playwright
```

### Subir o Supabase local + seed

```bash
npm run db:start                    # sobe os containers (Docker precisa estar rodando)
npm run db:reset                    # aplica as migrations num banco limpo
npm run db:seed-demo                # provisiona o tenant demo (4117107) + dados
```

### Rodar as suítes locais

```bash
npm run test:unit                   # unitários puros (também rodam no CI)
npm run test:data                   # integridade dos dados seedados (também roda no CI)
npm run test:e2e:local              # E2E local — NÃO roda no CI; rodar aqui
```

`test:e2e:local` sobe o servidor sozinho (`build && start`, via `playwright.local.config.ts`,
`reuseExistingServer:true`). Se já houver um build servindo em `:3000`, ele é reaproveitado.

### Credenciais demo (default dos testes locais)

| Campo | Valor |
| --- | --- |
| Cliente (IBGE) | `4117107` |
| Usuário (CPF) | `00000000000` |
| Senha | `Dx7$kP2w-Ra9mLZ` |

Overrides via env: `E2E_CLIENTE_DADOS`, `E2E_CPF`, `E2E_SENHA`.

## Resumo: o que rodar antes de subir o merge

1. `npm run test:unit` e `npm run test:data` (rápidos; espelham o CI).
2. **Se tocou auth/sessão/middleware/módulos:** `npm run test:e2e:local`.
3. Abrir o PR — o CI roda App + Dados + Go automaticamente.
