"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Analytics01Icon, City01Icon, LockIcon, UserIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [municipio, setMunicipio] = React.useState("")
  const [cpf, setCpf] = React.useState("")
  const [senha, setSenha] = React.useState("")
  const [error, setError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ municipio, cpf, senha }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setError(data?.error ?? "Não foi possível entrar.")
        setIsSubmitting(false)
        return
      }

      router.replace("/")
    } catch {
      setError("Falha de conexão. Tente novamente.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted p-4 dark:bg-background">
      <Card className="w-full max-w-md border-border/70 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} className="size-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Mirante Painel</CardTitle>
              <CardDescription>Portal de Gestão Pública Municipal</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="municipio" className="inline-flex items-center gap-2">
                <HugeiconsIcon icon={City01Icon} strokeWidth={2} className="size-4" />
                Cliente
              </Label>
              <Input
                id="municipio"
                name="municipio"
                inputMode="numeric"
                value={municipio}
                onChange={(event) => setMunicipio(event.target.value.replace(/\D/g, ""))}
                placeholder="Código IBGE do município"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="inline-flex items-center gap-2">
                <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-4" />
                Usuário (CPF)
              </Label>
              <Input
                id="cpf"
                name="cpf"
                inputMode="numeric"
                autoComplete="username"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
                placeholder="000.000.000-00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="inline-flex items-center gap-2">
                <HugeiconsIcon icon={LockIcon} strokeWidth={2} className="size-4" />
                Senha
              </Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                autoComplete="current-password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
