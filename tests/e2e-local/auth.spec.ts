import { test, expect } from "@playwright/test";
import { login } from "../e2e/helpers";

/**
 * Fluxo de autenticação contra o ambiente LOCAL seedado. Cobre o guard de rota,
 * login válido/inválido, logout e a sessão longa "manter conectado" (kiosk).
 */
const CLIENTE = process.env.E2E_CLIENTE_DADOS || "4117107";
const CPF = process.env.E2E_CPF || "00000000000";
const SENHA = process.env.E2E_SENHA || "Dx7$kP2w-Ra9mLZ";

const UM_DIA = 24 * 60 * 60;

/** Preenche o form de login (com máscara de CPF) sem submeter. */
async function preencherLogin(
  page: import("@playwright/test").Page,
  senha: string,
) {
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000); // hidratação (máscara/onSubmit)
  await page.locator("#municipio").fill(CLIENTE);
  await page.locator("#cpf").pressSequentially(CPF, { delay: 20 });
  // Espera a máscara aplicar (sinaliza que o React hidratou e o onSubmit está ativo).
  await expect(page.locator("#cpf")).toHaveValue(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
  await page.locator("#senha").fill(senha);
}

test.describe("auth — ambiente local", () => {
  test("guard: acessar / sem sessão redireciona para /login", async ({
    page,
  }) => {
    await page.context().clearCookies();
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("login inválido mostra erro genérico e permanece em /login", async ({
    page,
  }) => {
    await preencherLogin(page, "senha-errada-123");
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/Credenciais inv[aá]lidas/i)).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("login válido entra no painel", async ({ page }) => {
    await login(page, CLIENTE, CPF, SENHA);
    await expect(page.getByRole("tab").first()).toBeVisible();
  });

  test("sessão padrão expira em horas (não persiste no navegador)", async ({
    page,
    context,
  }) => {
    await login(page, CLIENTE, CPF, SENHA);
    const cookie = (await context.cookies()).find(
      (c) => c.name === "mp_session",
    );
    expect(cookie, "cookie mp_session deve existir").toBeTruthy();
    const segParaExpirar = cookie!.expires - Date.now() / 1000;
    expect(segParaExpirar).toBeGreaterThan(0);
    expect(segParaExpirar).toBeLessThan(UM_DIA); // 8h << 1 dia
  });

  test("'manter conectado' gera sessão longa (kiosk, ~1 ano)", async ({
    page,
    context,
  }) => {
    await preencherLogin(page, SENHA);
    await page.locator("#lembrar").click();
    await page.locator('button[type="submit"]').click();
    // Confirma que entrou no painel (aba visível) antes de inspecionar o cookie.
    await expect(page.getByRole("tab").first()).toBeVisible({
      timeout: 30_000,
    });

    const cookie = (await context.cookies()).find(
      (c) => c.name === "mp_session",
    );
    expect(cookie, "cookie mp_session deve existir").toBeTruthy();
    const segParaExpirar = cookie!.expires - Date.now() / 1000;
    expect(segParaExpirar).toBeGreaterThan(300 * UM_DIA); // > 300 dias
  });

  test("logout limpa a sessão e volta a barrar /", async ({ page }) => {
    await login(page, CLIENTE, CPF, SENHA);
    await page.request.post("/api/auth/logout");
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
  });
});
