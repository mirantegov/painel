"use client"

import { Demo } from "@/components/demo"
import { DespesaMunicipal } from "@/components/despesa-municipal"
import { ReceitaMunicipal } from "@/components/receita-municipal"
import { FinanceiroMunicipal } from "@/components/financeiro-municipal"
import { ComprasMunicipais } from "@/components/compras-municipais"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HugeiconsIcon } from "@hugeicons/react"
import { GridViewIcon, Analytics01Icon, MoneyAdd01Icon, BankIcon, ShoppingCartIcon } from "@hugeicons/core-free-icons"

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-muted p-4 sm:p-6 lg:p-12 dark:bg-background">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed right-4 top-4 z-50 sm:right-6 lg:right-12">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Radix Luma Components</h1>
          <p className="mt-2 text-muted-foreground">Demonstracao de componentes e sistema de gestao publica</p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-1 sm:w-auto sm:grid-cols-none sm:flex lg:grid-cols-5">
            <TabsTrigger value="demo" className="gap-2">
              <HugeiconsIcon icon={GridViewIcon} strokeWidth={2} className="size-4" />
              Demo
            </TabsTrigger>
            <TabsTrigger value="receita" className="gap-2">
              <HugeiconsIcon icon={MoneyAdd01Icon} strokeWidth={2} className="size-4" />
              Receita
            </TabsTrigger>
            <TabsTrigger value="despesa" className="gap-2">
              <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} className="size-4" />
              Despesa
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="gap-2">
              <HugeiconsIcon icon={BankIcon} strokeWidth={2} className="size-4" />
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="compras" className="gap-2">
              <HugeiconsIcon icon={ShoppingCartIcon} strokeWidth={2} className="size-4" />
              Compras
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="demo" className="mt-6">
            <Demo />
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
        </Tabs>
      </div>
    </div>
  )
}
