import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/diary", "/profile", "/exercises", "/products"];
const authRoutes = ["/auth"];

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken && !refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if ((accessToken || refreshToken) && isAuthRoute) {
    return NextResponse.redirect(new URL("/diary", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
