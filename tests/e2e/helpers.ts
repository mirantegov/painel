import { expect, type Page } from "@playwright/test";

/** Login no painel (cliente IBGE + CPF + senha) com espera de hidratação/máscara. */
export async function login(page: Page, cliente: string, cpf: string, senha: string) {
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000); // hidratação do React (máscara/onSubmit)
  await page.locator("#municipio").fill(cliente);
  await page.locator("#cpf").pressSequentially(cpf, { delay: 20 });
  await expect(page.locator("#cpf")).toHaveValue(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
  await page.locator("#senha").fill(senha);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/$|\/(?!login)/, { timeout: 30_000 });
  await expect(page.getByRole("tab").first()).toBeVisible();
}

/** Abre uma aba/módulo e espera o painel ativo ter conteúdo. Retorna o locator do painel. */
export async function abrirModulo(page: Page, nome: string) {
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
