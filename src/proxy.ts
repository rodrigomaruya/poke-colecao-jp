import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/perfil", "/configuracoes"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*", "/configuracoes/:path*"],
};
