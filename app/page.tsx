"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { VisaoGeral } from "@/components/visao-geral";
import { DespesaMunicipal } from "@/components/despesa-municipal";
import { ReceitaMunicipal } from "@/components/receita-municipal";
import { FinanceiroMunicipal } from "@/components/financeiro-municipal";
import { ComprasMunicipais } from "@/components/compras-municipais";
import { RHMunicipal } from "@/components/rh-municipal";
import { PrestacaoContas } from "@/components/prestacao-contas";
import { Frotas } from "@/components/frotas";
import { Obras } from "@/components/obras";
import { Educacao } from "@/components/educacao";
import { Saude } from "@/components/saude";
import { Patrimonio } from "@/components/patrimonio";
import { Processos } from "@/components/processos";
import { AssistenciaSocial } from "@/components/assistencia-social";
import { TributacaoMunicipal } from "@/components/tributacao-municipal";
import { OrcamentoMunicipal } from "@/components/orcamento-municipal";
import { Legislativo } from "@/components/legislativo/legislativo";
import { Previdencia } from "@/components/previdencia/previdencia";
import { Saneamento } from "@/components/saneamento/saneamento";
import { ThemeSelector } from "@/components/theme-selector";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Analytics01Icon,
  MoneyAdd01Icon,
  BankIcon,
  ShoppingCartIcon,
  UserMultipleIcon,
  SecurityCheckIcon,
  Invoice01Icon,
  Home01Icon,
  UserIcon,
  Cancel01Icon,
  Settings01Icon,
  Wallet01Icon,
  DeliveryTruck01Icon,
  ConstructionIcon,
  BookOpen02Icon,
  Stethoscope02Icon,
  Archive02Icon,
  CourtLawIcon,
  HandHelpingIcon,
  SavingsIcon,
  DropletIcon,
} from "@hugeicons/core-free-icons";

const TAB_ORDER = [
  "visao-geral",
  "despesa",
  "receita",
  "financeiro",
  "tributacao",
  "compras",
  "rh",
  "orcamento",
  "saude",
  "educacao",
  "assistencia-social",
  "obras",
  "frotas",
  "patrimonio",
  "processos",
  "prestacao-contas",
  "legislativo",
  "previdencia",
  "saneamento",
];
const SCROLL_DELAY_MS = 5000;
const SCROLL_SPEED_PX = 0.75;

export default function Page() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth=; path=/; max-age=0; samesite=lax";
    router.replace("/login");
  };

  const [activeTab, setActiveTab] = React.useState("visao-geral");
  const [autoScrollEnabled, setAutoScrollEnabled] = React.useState(false);
  const scrollTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const cleanup = () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    if (!autoScrollEnabled) {
      cleanup();
      return;
    }

    const getScrollEl = () =>
      document.scrollingElement ?? document.documentElement;
    getScrollEl().scrollTop = 0;
    let accumulator = 0;

    const goToNextTab = () => {
      setActiveTab((prev) => {
        const idx = TAB_ORDER.indexOf(prev);
        return TAB_ORDER[(idx + 1) % TAB_ORDER.length];
      });
    };

    const scrollStep = () => {
      const el = getScrollEl();
      const maxScroll = el.scrollHeight - el.clientHeight;
      const before = el.scrollTop;

      if (before > 0 && before >= maxScroll - 10) {
        goToNextTab();
        return;
      }

      accumulator += SCROLL_SPEED_PX;
      const target = Math.floor(accumulator);
      el.scrollTop = target;

      if (el.scrollTop === before && target > before) {
        scrollTimerRef.current = setTimeout(() => {
          goToNextTab();
        }, 7000);
        return;
      }

      rafRef.current = requestAnimationFrame(scrollStep);
    };

    scrollTimerRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(scrollStep);
    }, SCROLL_DELAY_MS);

    return cleanup;
  }, [autoScrollEnabled, activeTab]);

  return (
    <div className="flex min-h-screen w-full flex-col items-stretch justify-start bg-muted px-[5%] py-4 sm:py-6 dark:bg-background">
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HugeiconsIcon
                icon={Analytics01Icon}
                strokeWidth={2}
                className="size-6"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Analytics Dash
              </h1>
              <p className="text-sm text-muted-foreground">
                Portal de Gestão Pública Municipal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  aria-label="Menu do usuário"
                >
                  <HugeiconsIcon
                    icon={UserIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="gap-2">
                    <HugeiconsIcon
                      icon={Settings01Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    Configurações
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => setAutoScrollEnabled((prev) => !prev)}
                      className="gap-2"
                    >
                      <Switch
                        checked={autoScrollEnabled}
                        className="pointer-events-none"
                      />
                      Scroll Automático
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout} className="gap-2">
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeSelector />
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
            <TabsTrigger value="visao-geral" className="gap-2">
              <HugeiconsIcon
                icon={Home01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Geral
            </TabsTrigger>
            <TabsTrigger value="despesa" className="gap-2">
              <HugeiconsIcon
                icon={Analytics01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Despesas
            </TabsTrigger>
            <TabsTrigger value="receita" className="gap-2">
              <HugeiconsIcon
                icon={MoneyAdd01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Receitas
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="gap-2">
              <HugeiconsIcon
                icon={BankIcon}
                strokeWidth={2}
                className="size-4"
              />
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="tributacao" className="gap-2">
              <HugeiconsIcon
                icon={Invoice01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Tributos
            </TabsTrigger>
            <TabsTrigger value="compras" className="gap-2">
              <HugeiconsIcon
                icon={ShoppingCartIcon}
                strokeWidth={2}
                className="size-4"
              />
              Licitações e Contratos
            </TabsTrigger>
            <TabsTrigger value="rh" className="gap-2">
              <HugeiconsIcon
                icon={UserMultipleIcon}
                strokeWidth={2}
                className="size-4"
              />
              Recursos Humanos
            </TabsTrigger>
            <TabsTrigger value="orcamento" className="gap-2">
              <HugeiconsIcon
                icon={Wallet01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Planejamento
            </TabsTrigger>
            <TabsTrigger value="saude" className="gap-2">
              <HugeiconsIcon
                icon={Stethoscope02Icon}
                strokeWidth={2}
                className="size-4"
              />
              Saúde
            </TabsTrigger>
            <TabsTrigger value="educacao" className="gap-2">
              <HugeiconsIcon
                icon={BookOpen02Icon}
                strokeWidth={2}
                className="size-4"
              />
              Educação
            </TabsTrigger>
            <TabsTrigger value="assistencia-social" className="gap-2">
              <HugeiconsIcon
                icon={HandHelpingIcon}
                strokeWidth={2}
                className="size-4"
              />
              Assistência Social
            </TabsTrigger>
            <TabsTrigger value="obras" className="gap-2">
              <HugeiconsIcon
                icon={ConstructionIcon}
                strokeWidth={2}
                className="size-4"
              />
              Obras
            </TabsTrigger>
            <TabsTrigger value="frotas" className="gap-2">
              <HugeiconsIcon
                icon={DeliveryTruck01Icon}
                strokeWidth={2}
                className="size-4"
              />
              Frotas
            </TabsTrigger>
            <TabsTrigger value="patrimonio" className="gap-2">
              <HugeiconsIcon
                icon={Archive02Icon}
                strokeWidth={2}
                className="size-4"
              />
              Patrimônio
            </TabsTrigger>
            <TabsTrigger value="processos" className="gap-2">
              <HugeiconsIcon
                icon={CourtLawIcon}
                strokeWidth={2}
                className="size-4"
              />
              Processos
            </TabsTrigger>
            <TabsTrigger value="prestacao-contas" className="gap-2">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                strokeWidth={2}
                className="size-4"
              />
              Contas Públicas
            </TabsTrigger>
            <TabsTrigger value="legislativo" className="gap-2">
              <HugeiconsIcon
                icon={BankIcon}
                strokeWidth={2}
                className="size-4"
              />
              Legislativo
            </TabsTrigger>
            <TabsTrigger value="previdencia" className="gap-2">
              <HugeiconsIcon
                icon={SavingsIcon}
                strokeWidth={2}
                className="size-4"
              />
              Previdência
            </TabsTrigger>
            <TabsTrigger value="saneamento" className="gap-2">
              <HugeiconsIcon
                icon={DropletIcon}
                strokeWidth={2}
                className="size-4"
              />
              Saneamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral" className="mt-6">
            <VisaoGeral />
          </TabsContent>

          <TabsContent value="orcamento" className="mt-6">
            <OrcamentoMunicipal />
          </TabsContent>

          <TabsContent value="receita" className="mt-6">
            <ReceitaMunicipal />
          </TabsContent>

          <TabsContent value="despesa" className="mt-6">
            <DespesaMunicipal />
          </TabsContent>

          <TabsContent value="financeiro" className="mt-6">
            <FinanceiroMunicipal />
          </TabsContent>

          <TabsContent value="compras" className="mt-6">
            <ComprasMunicipais />
          </TabsContent>

          <TabsContent value="rh" className="mt-6">
            <RHMunicipal />
          </TabsContent>

          <TabsContent value="tributacao" className="mt-6">
            <TributacaoMunicipal />
          </TabsContent>

          <TabsContent value="frotas" className="mt-6">
            <Frotas />
          </TabsContent>

          <TabsContent value="obras" className="mt-6">
            <Obras />
          </TabsContent>

          <TabsContent value="educacao" className="mt-6">
            <Educacao />
          </TabsContent>

          <TabsContent value="assistencia-social" className="mt-6">
            <AssistenciaSocial />
          </TabsContent>

          <TabsContent value="saude" className="mt-6">
            <Saude />
          </TabsContent>

          <TabsContent value="patrimonio" className="mt-6">
            <Patrimonio />
          </TabsContent>

          <TabsContent value="processos" className="mt-6">
            <Processos />
          </TabsContent>

          <TabsContent value="prestacao-contas" className="mt-6">
            <PrestacaoContas />
          </TabsContent>

          <TabsContent value="legislativo" className="mt-6">
            <Legislativo />
          </TabsContent>

          <TabsContent value="previdencia" className="mt-6">
            <Previdencia />
          </TabsContent>

          <TabsContent value="saneamento" className="mt-6">
            <Saneamento />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
