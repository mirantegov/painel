import { test, expect, type Page } from "@playwright/test";

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

async function login(page: Page, cliente: string) {
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000); // hidratação do React (máscara/onSubmit)
  await page.locator("#municipio").fill(cliente);
  await page.locator("#cpf").pressSequentially(CPF, { delay: 20 });
  // máscara aplicada = app hidratado
  await expect(page.locator("#cpf")).toHaveValue(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
  await page.locator("#senha").fill(SENHA!);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/$|\/(?!login)/, { timeout: 30_000 });
  await expect(page.getByRole("tab").first()).toBeVisible();
}

async function abrirModulo(page: Page, nome: string) {
  const tab = page.getByRole("tab", { name: new RegExp(`^${nome}$`, "i") });
  await tab.click();
  const panelId = (await tab.getAttribute("aria-controls")) ?? "";
  const panel = page.locator(`[id="${panelId}"]`);
  await expect(panel).toHaveAttribute("data-state", "active");
  await page.waitForFunction(
    (id) => (document.getElementById(id)?.innerText.length ?? 0) > 300,
    panelId,
    { timeout: 20_000 },
  );
  return panel;
}

test.describe("painel — grupo A (dados reais)", () => {
  test.skip(!SENHA, "defina E2E_SENHA para rodar o E2E contra o ambiente implantado");

  for (const cliente of CLIENTES) {
    test(`cliente ${cliente}: login + Despesas/Receitas/Planejamento`, async ({ page }) => {
      await login(page, cliente);

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
