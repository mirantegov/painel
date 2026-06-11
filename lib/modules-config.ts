import type { ComponentType } from "react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Home01Icon,
  Analytics01Icon,
  MoneyAdd01Icon,
  BankIcon,
  Invoice01Icon,
  ShoppingCartIcon,
  FileClockIcon,
  UserMultipleIcon,
  Wallet01Icon,
  Stethoscope02Icon,
  BookOpen02Icon,
  HandHelpingIcon,
  ConstructionIcon,
  DeliveryTruck01Icon,
  Archive02Icon,
  CourtLawIcon,
  SecurityCheckIcon,
  SavingsIcon,
  DropletIcon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";
import { VisaoGeral } from "@/components/visao-geral";
import { DespesaMunicipal } from "@/components/despesa-municipal";
import { ReceitaMunicipal } from "@/components/receita-municipal";
import { FinanceiroMunicipal } from "@/components/financeiro-municipal";
import { TributacaoMunicipal } from "@/components/tributacao-municipal";
import { ComprasMunicipais } from "@/components/compras-municipais";
import { LicitacoesPainel } from "@/components/licitacoes-painel";
import { RHMunicipal } from "@/components/rh-municipal";
import { OrcamentoMunicipal } from "@/components/orcamento-municipal";
import { Saude } from "@/components/saude";
import { Educacao } from "@/components/educacao";
import { AssistenciaSocial } from "@/components/assistencia-social";
import { Obras } from "@/components/obras";
import { Frotas } from "@/components/frotas";
import { Patrimonio } from "@/components/patrimonio";
import { Processos } from "@/components/processos";
import { PrestacaoContas } from "@/components/prestacao-contas";
import { Legislativo } from "@/components/legislativo/legislativo";
import { Previdencia } from "@/components/previdencia/previdencia";
import { Saneamento } from "@/components/saneamento/saneamento";
import { DefesaCivil } from "@/components/defesa-civil";

export const DISABLED_MODULES_STORAGE_KEY = "dash-disabled-modules";

export type ModuleConfig = {
  id: string;
  label: string;
  icon: IconSvgElement;
  component: ComponentType;
};

/**
 * Módulos habilitados na UI. Os demais (registrados em MODULES) ficam ocultos
 * nas tabs e no submenu "Módulos". Reabilitar = adicionar o id aqui.
 */
export const ENABLED_MODULE_IDS = new Set<string>([
  "despesa",
  "receita",
  "orcamento",
]);

/** Registro central dos módulos. A ordem define a ordem do menu e do scroll automático. */
export const MODULES: ModuleConfig[] = [
  {
    id: "visao-geral",
    label: "Geral",
    icon: Home01Icon,
    component: VisaoGeral,
  },
  {
    id: "despesa",
    label: "Despesas",
    icon: Analytics01Icon,
    component: DespesaMunicipal,
  },
  {
    id: "receita",
    label: "Receitas",
    icon: MoneyAdd01Icon,
    component: ReceitaMunicipal,
  },
  {
    id: "financeiro",
    label: "Financeiro",
    icon: BankIcon,
    component: FinanceiroMunicipal,
  },
  {
    id: "tributacao",
    label: "Tributos",
    icon: Invoice01Icon,
    component: TributacaoMunicipal,
  },
  {
    id: "orcamento",
    label: "Planejamento",
    icon: Wallet01Icon,
    component: OrcamentoMunicipal,
  },
  {
    id: "prestacao-contas",
    label: "Contas Públicas",
    icon: SecurityCheckIcon,
    component: PrestacaoContas,
  },
  {
    id: "compras",
    label: "Licitações e Contratos",
    icon: ShoppingCartIcon,
    component: ComprasMunicipais,
  },
  {
    id: "rh",
    label: "Recursos Humanos",
    icon: UserMultipleIcon,
    component: RHMunicipal,
  },
  { id: "saude", label: "Saúde", icon: Stethoscope02Icon, component: Saude },
  {
    id: "educacao",
    label: "Educação",
    icon: BookOpen02Icon,
    component: Educacao,
  },
  {
    id: "assistencia-social",
    label: "Assistência Social",
    icon: HandHelpingIcon,
    component: AssistenciaSocial,
  },
  {
    id: "defesa-civil",
    label: "Defesa Civil",
    icon: Alert02Icon,
    component: DefesaCivil,
  },
  { id: "obras", label: "Obras", icon: ConstructionIcon, component: Obras },
  {
    id: "frotas",
    label: "Frotas",
    icon: DeliveryTruck01Icon,
    component: Frotas,
  },
  {
    id: "patrimonio",
    label: "Patrimônio",
    icon: Archive02Icon,
    component: Patrimonio,
  },
  {
    id: "processos",
    label: "Processos",
    icon: CourtLawIcon,
    component: Processos,
  },
  {
    id: "previdencia",
    label: "Previdência",
    icon: SavingsIcon,
    component: Previdencia,
  },
  {
    id: "saneamento",
    label: "Saneamento",
    icon: DropletIcon,
    component: Saneamento,
  },
  {
    id: "legislativo",
    label: "Legislativo",
    icon: BankIcon,
    component: Legislativo,
  },
  {
    id: "licitacoes-painel",
    label: "Painel de licitações",
    icon: FileClockIcon,
    component: LicitacoesPainel,
  },
];

export const MODULE_IDS = MODULES.map((m) => m.id);

/** Módulos de entrega (dados no banco) — visíveis no menu por padrão. */
export const DEFAULT_ENABLED_MODULE_IDS = [
  "visao-geral",
  "despesa",
  "receita",
  "financeiro",
  "tributacao",
  "orcamento",
  "prestacao-contas",
  "compras",
  "rh",
  "licitacoes-painel",
];

/**
 * Módulos ainda mockados (não no banco) — ocultos no menu por padrão.
 * Não são removidos do código; o usuário pode reativá-los em Configurações/Módulos.
 */
export const DEFAULT_DISABLED_MODULE_IDS = MODULE_IDS.filter(
  (id) => !DEFAULT_ENABLED_MODULE_IDS.includes(id),
);

/** Título e subtítulo padronizados, exibidos na faixa abaixo do menu. */
export const MODULE_HEADERS: Record<string, { titulo: string; subtitulo: string }> = {
  "visao-geral": {
    titulo: "Visão Geral",
    subtitulo: "Panorama consolidado do município",
  },
  despesa: {
    titulo: "Despesas",
    subtitulo: "Execução orçamentária da despesa",
  },
  receita: {
    titulo: "Receitas",
    subtitulo: "Arrecadação e previsão de receitas",
  },
  financeiro: {
    titulo: "Financeiro",
    subtitulo: "Disponibilidades e fluxo de caixa",
  },
  tributacao: {
    titulo: "Tributos",
    subtitulo: "Arrecadação tributária e dívida ativa",
  },
  orcamento: {
    titulo: "Planejamento",
    subtitulo: "Orçamento: receita e despesa (LOA)",
  },
  "prestacao-contas": {
    titulo: "Contas Públicas",
    subtitulo: "Obrigações, certidões e conformidade (TCE/PR, SICONFI)",
  },
  compras: {
    titulo: "Licitações e Contratos",
    subtitulo: "Compras, licitações e contratos",
  },
  rh: {
    titulo: "Recursos Humanos",
    subtitulo: "Servidores, folha e quadro de pessoal",
  },
  saude: {
    titulo: "Saúde",
    subtitulo: "Atenção, produção e indicadores de saúde",
  },
  educacao: {
    titulo: "Educação",
    subtitulo: "Rede, matrículas e indicadores educacionais",
  },
  "assistencia-social": {
    titulo: "Assistência Social",
    subtitulo: "Programas, benefícios e equipamentos sociais",
  },
  "defesa-civil": {
    titulo: "Defesa Civil",
    subtitulo: "Ocorrências, riscos e ações de proteção",
  },
  obras: {
    titulo: "Obras",
    subtitulo: "Obras públicas e execução de intervenções",
  },
  frotas: {
    titulo: "Frotas",
    subtitulo: "Veículos, manutenção e consumo",
  },
  patrimonio: {
    titulo: "Patrimônio",
    subtitulo: "Bens, inventário e depreciação",
  },
  processos: {
    titulo: "Processos",
    subtitulo: "Processos administrativos e tramitação",
  },
  previdencia: {
    titulo: "Previdência",
    subtitulo: "RPPS — benefícios e equilíbrio atuarial",
  },
  saneamento: {
    titulo: "Saneamento",
    subtitulo: "Água, esgoto e drenagem urbana",
  },
  legislativo: {
    titulo: "Legislativo",
    subtitulo: "Câmara: vereadores, sessões e proposituras",
  },
  "licitacoes-painel": {
    titulo: "Painel de Licitações",
    subtitulo: "Licitações em andamento",
  },
};
