import { NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "mp_session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
