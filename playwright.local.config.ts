import { defineConfig, devices } from "@playwright/test";

/**
 * E2E LOCAL — roda contra `next dev` + Supabase local (npm run db:start + db:seed-demo).
 * Diferente de playwright.config.ts (regressão contra prod implantado): este sobe o
 * servidor automaticamente e usa as credenciais demo, sem depender de E2E_SENHA.
 *
 * Pré-requisitos:  npm run db:start && npm run db:seed-demo
 * Uso:            npm run test:e2e:local
 */
const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e-local",
  timeout: 120_000,
  expect: { timeout: 20_000 },
  retries: 0,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    // Build de produção: hidratação determinística (a máscara de CPF e o onSubmit
    // dependem de hidratação completa, o que `next dev` não garante a tempo).
    command: "npm run build && npm run start",
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 240_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
