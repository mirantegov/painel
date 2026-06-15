import { test, expect } from "@playwright/test";
import { login, abrirModulo } from "../e2e/helpers";

/**
 * Smoke local dos módulos do grupo A com os dados seedados: login, abertura da aba
 * e presença de valores em R$ + ao menos um gráfico Recharts renderizado.
 */
const CLIENTE = process.env.E2E_CLIENTE_DADOS || "4117107";
const CPF = process.env.E2E_CPF || "00000000000";
const SENHA = process.env.E2E_SENHA || "Dx7$kP2w-Ra9mLZ";

const MODULOS = ["Despesas", "Receitas", "Planejamento"] as const;

test.describe("módulos — smoke local (dados seedados)", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, CLIENTE, CPF, SENHA);
  });

  for (const nome of MODULOS) {
    test(`${nome}: renderiza valores monetários e gráfico`, async ({
      page,
    }) => {
      const panel = await abrirModulo(page, nome);
      await expect(panel.getByText(/R\$\s*[\d.]/).first()).toBeVisible();
      expect(await panel.locator(".recharts-surface").count()).toBeGreaterThan(
        0,
      );
    });
  }
});
