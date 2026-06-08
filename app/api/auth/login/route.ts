import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { signSession, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/jwt";

export const runtime = "nodejs";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "mp_session";

type UsuarioRow = {
  id_user: string;
  nome: string;
  cargo: string;
  senha_hash: string;
};

export async function POST(req: Request) {
  let body: { municipio?: string; cpf?: string; senha?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const municipio = body.municipio?.trim();
  const cpf = body.cpf?.replace(/\D/g, "");
  const senha = body.senha ?? "";

  if (!municipio || !cpf || !senha) {
    return NextResponse.json(
      { error: "Informe cliente, usuário e senha." },
      { status: 400 },
    );
  }

  const rows = await query<UsuarioRow>(
    `select id_user, nome, cargo, senha_hash
       from public.usuarios
      where municipio_id_ibge = $1 and cpf = $2 and ativo = true
      limit 1`,
    [municipio, cpf],
  );

  // Mensagem genérica (não revela qual campo falhou).
  const invalid = NextResponse.json(
    { error: "Credenciais inválidas." },
    { status: 401 },
  );

  const user = rows[0];
  if (!user) return invalid;

  const ok = await verifyPassword(senha, user.senha_hash);
  if (!ok) return invalid;

  const token = await signSession({
    id_user: user.id_user,
    municipio,
    nome: user.nome,
    cargo: user.cargo,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
