import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getModuloDados } from "@/lib/data/modules";

export const runtime = "nodejs";

/**
 * Dados de um módulo (snapshot jsonb) para o município da sessão.
 * GET /api/data/<modulo>?ano=YYYY[&chave=...]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ modulo: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { modulo } = await params;
  const sp = req.nextUrl.searchParams;
  const ano = Number(sp.get("ano")) || new Date().getFullYear();
  const chave = sp.get("chave") ?? undefined;

  try {
    const dados = await getModuloDados(modulo, session.municipio, ano, chave);
    return NextResponse.json({ dados });
  } catch {
    return NextResponse.json({ error: "módulo inválido" }, { status: 400 });
  }
}
