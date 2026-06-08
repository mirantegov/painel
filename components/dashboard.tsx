"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeSelector } from "@/components/theme-selector";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  UserIcon,
  Cancel01Icon,
  Settings01Icon,
  GridIcon,
} from "@hugeicons/core-free-icons";
import { MODULES, MODULE_HEADERS } from "@/lib/modules-config";
import { useModuleVisibility } from "@/components/module-visibility-provider";
import { SubmoduleAccessProvider } from "@/components/submodule-access";
import { YearProvider } from "@/components/year-provider";
import { ModuleHeader } from "@/components/module-header";

const SCROLL_DELAY_MS = 5000;
const SCROLL_SPEED_PX = 0.75;

type DashboardProps = {
  allowedModuleIds: string[];
  allowedSubmodules: Record<string, string[]>;
  userName: string;
};

export function Dashboard({
  allowedModuleIds,
  allowedSubmodules,
  userName,
}: DashboardProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/login");
  };

  const allowedSet = React.useMemo(
    () => new Set(allowedModuleIds),
    [allowedModuleIds],
  );

  const { visibleModules, isVisible, toggle } = useModuleVisibility();

  // Módulos que o usuário pode acessar (ACL), na ordem do menu.
  const menuModules = React.useMemo(
    () => MODULES.filter((m) => allowedSet.has(m.id)),
    [allowedSet],
  );
  // Módulos efetivamente renderizados = permitidos ∩ não ocultos localmente.
  const modules = React.useMemo(
    () => visibleModules.filter((m) => allowedSet.has(m.id)),
    [visibleModules, allowedSet],
  );

  const [activeTab, setActiveTab] = React.useState(
    () => allowedModuleIds[0] ?? "",
  );
  const [autoScrollEnabled, setAutoScrollEnabled] = React.useState(false);

  // Se a aba ativa não estiver disponível, volta para o primeiro módulo.
  React.useEffect(() => {
    if (modules.length === 0) {
      return;
    }
    if (!modules.some((m) => m.id === activeTab)) {
      setActiveTab(modules[0].id);
    }
  }, [modules, activeTab]);

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
      const order = modules.map((m) => m.id);
      if (order.length === 0) {
        return;
      }
      setActiveTab((prev) => {
        const idx = order.indexOf(prev);
        return order[(idx + 1) % order.length];
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
  }, [autoScrollEnabled, activeTab, modules]);

  return (
    <YearProvider>
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
                Mirante Painel
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
                <DropdownMenuLabel className="truncate">
                  {userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="gap-2">
                    <HugeiconsIcon
                      icon={GridIcon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    Módulos
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[70vh] overflow-y-auto">
                    {menuModules.map((m) => (
                      <DropdownMenuItem
                        key={m.id}
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => toggle(m.id)}
                        className="gap-2"
                      >
                        <Switch
                          checked={isVisible(m.id)}
                          className="pointer-events-none"
                        />
                        {m.label}
                      </DropdownMenuItem>
                    ))}
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
        <SubmoduleAccessProvider value={allowedSubmodules}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-2xl p-2">
              {modules.map((m) => (
                <TabsTrigger key={m.id} value={m.id} className="gap-2">
                  <HugeiconsIcon
                    icon={m.icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  {m.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {modules.map((m) => {
              const ModuleComponent = m.component;
              const header = MODULE_HEADERS[m.id];
              return (
                <TabsContent key={m.id} value={m.id} className="mt-6 space-y-6">
                  {header && (
                    <ModuleHeader
                      titulo={header.titulo}
                      subtitulo={header.subtitulo}
                    />
                  )}
                  <ModuleComponent />
                </TabsContent>
              );
            })}
          </Tabs>
        </SubmoduleAccessProvider>
      </div>
    </div>
    </YearProvider>
  );
}
