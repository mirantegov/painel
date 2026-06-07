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
