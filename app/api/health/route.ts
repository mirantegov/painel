import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Liveness + opcional readiness do app.
 * - GET /api/health        -> liveness (sempre 200 se o handler executar).
 * - GET /api/health?db=1   -> readiness: faz `select 1` no Postgres.
 *
 * Usado por:
 * - healthcheck do compose de produção,
 * - proxy TLS na borda,
 * - smoke test do Épico 11.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const checkDb = url.searchParams.get("db") === "1";

  if (!checkDb) {
    return NextResponse.json({ status: "ok" });
  }

  try {
    await query("select 1 as ok");
    return NextResponse.json({ status: "ok", db: "ok" });
  } catch (err) {
    return NextResponse.json(
      {
        status: "degraded",
        db: "error",
        error: err instanceof Error ? err.message : "unknown",
      },
      { status: 503 },
    );
  }
}
