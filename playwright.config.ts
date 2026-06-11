import { defineConfig, devices } from "@playwright/test";

/**
 * E2E de regressão contra um ambiente JÁ IMPLANTADO (prod por padrão).
 * Requer credenciais via env (não roda sem `E2E_SENHA`):
 *   E2E_BASE_URL  (default https://painel.mirantegov.cloud)
 *   E2E_SENHA     senha do usuário admin (00000000000) — obrigatória
 *   E2E_CLIENTES  IBGEs separados por vírgula (default 4117107,4117909,4126256)
 *   E2E_CPF       (default 00000000000)
 *
 * Uso:  E2E_SENHA=*** npm run test:e2e
 * Não é parte do CI de build (precisa de alvo implantado + credencial).
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 120_000,
  expect: { timeout: 20_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: process.env.E2E_BASE_URL || "https://painel.mirantegov.cloud",
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    ...devices["Desktop Chrome"],
  },
});
