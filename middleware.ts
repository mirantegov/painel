import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySession } from "@/lib/auth/jwt"

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "mp_session"
const LOGIN_PATH = "/login"
const DASHBOARD_PATH = "/"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_NAME)?.value
  const isAuthenticated = (await verifySession(token)) !== null

  if (pathname === DASHBOARD_PATH && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
  }

  if (pathname === LOGIN_PATH && isAuthenticated) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login"],
}
