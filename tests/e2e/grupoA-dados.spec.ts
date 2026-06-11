import { test, expect } from "@playwright/test";
import { login, abrirModulo } from "./helpers";

/**
 * Asserções data-driven do Lote A — confirmam que os campos que saíram do mock
 * vêm da base, e guardam contra a volta dos valores hardcoded. Rodam contra o
 * ambiente implantado para UM cliente que tem dados ingeridos (default 4117107,
 * Nova Londrina). Específicas desse município, porém robustas a mudança de valor.
 */
const SENHA = process.env.E2E_SENHA;
const CPF = process.env.E2E_CPF || "00000000000";
const CLIENTE = process.env.E2E_CLIENTE_DADOS || "4117107";

test.describe(`grupo A — dados da base (cliente ${CLIENTE})`, () => {
  test.skip(!SENHA, "defina E2E_SENHA para rodar contra o ambiente implantado");

  test.beforeEach(async ({ page }) => {
    await login(page, CLIENTE, CPF, SENHA!);
  });

  test("Planejamento: entidade líder vem da base (não o literal antigo)", async ({ page }) => {
    const panel = await abrirModulo(page, "Planejamento");
    // o KPI "Entidade Líder" deixou de ser o literal "Prefeitura Municipal"
    await expect(panel.getByText("Prefeitura Municipal", { exact: true })).toHaveCount(0);
    // entidade real do município aparece (KPI + tabela "Receita por Entidade")
    await expect(panel.getByText(/MUNIC[IÍ]PIO DE NOVA LONDRINA/i).first()).toBeVisible();
  });

  test("Planejamento: receita por origem (grupos PCASP) renderizada", async ({ page }) => {
    const panel = await abrirModulo(page, "Planejamento");
    await expect(panel.getByText(/Receitas Pr[oó]prias/i).first()).toBeVisible();
    await expect(
      panel.getByText(/Transfer[eê]ncias (Estaduais|Federais)/i).first(),
    ).toBeVisible();
  });

  test("Despesas: tabela por secretaria com nomes reais de órgão", async ({ page }) => {
    const panel = await abrirModulo(page, "Despesas");
    // nomes reais resolvidos do raw (não as siglas hardcoded do pie antigo)
    expect(await panel.getByText(/SECRETARIA/i).count()).toBeGreaterThan(0);
  });

  test("Despesas: principais fornecedores vêm da base (CNPJ/CPF presente)", async ({ page }) => {
    const panel = await abrirModulo(page, "Despesas");
    // topFornecedores traz documento real (14 dígitos CNPJ ou 11 CPF, com/sem máscara)
    await expect(
      panel.getByText(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{11,14}/).first(),
    ).toBeVisible();
  });

  test("Receitas: corrente vs capital derivado da categoria", async ({ page }) => {
    const panel = await abrirModulo(page, "Receitas");
    await expect(panel.getByText(/Receitas Correntes/i).first()).toBeVisible();
    await expect(panel.getByText(/Receitas de Capital/i).first()).toBeVisible();
  });
});
