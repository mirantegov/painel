import { test, expect } from "@playwright/test";
import { login, abrirModulo } from "./helpers";

/**
 * Regressão do painel implantado: login (com máscara de CPF) + módulos do grupo A
 * (Despesas, Receitas, Planejamento) renderizando dados reais. Parametrizado por
 * cliente (IBGE) via `E2E_CLIENTES`. Assertivas ESTRUTURAIS (não fixam valores,
 * que variam por município/ano): login funciona, a aba ativa e o painel mostra
 * valores em R$ + gráficos.
 */
const SENHA = process.env.E2E_SENHA;
const CPF = process.env.E2E_CPF || "00000000000";
const CLIENTES = (process.env.E2E_CLIENTES || "4117107,4117909,4126256")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const MODULOS = ["Despesas", "Receitas", "Planejamento"] as const;

test.describe("painel — grupo A (dados reais)", () => {
  test.skip(!SENHA, "defina E2E_SENHA para rodar o E2E contra o ambiente implantado");

  for (const cliente of CLIENTES) {
    test(`cliente ${cliente}: login + Despesas/Receitas/Planejamento`, async ({ page }) => {
      await login(page, cliente, CPF, SENHA!);

      for (const nome of MODULOS) {
        const panel = await abrirModulo(page, nome);
        // valores monetários presentes
        await expect(panel.getByText(/R\$\s*[\d.]/).first()).toBeVisible();
        // pelo menos um gráfico renderizado
        expect(await panel.locator(".recharts-surface").count()).toBeGreaterThan(0);
      }
    });
  }
});
