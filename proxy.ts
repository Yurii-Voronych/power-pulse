import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/diary"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if ((accessToken || refreshToken) && (isAuthRoute || pathname === "/")) {
    return NextResponse.redirect(new URL("/diary", req.url));
  }

  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
        method: "POST",
        headers: { Cookie: `refreshToken=${refreshToken}` },
      });

      if (!refreshRes.ok) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      const response = NextResponse.redirect(req.url);
      refreshRes.headers.getSetCookie().forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
      return response;
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/diary/:path*", "/auth/:path*", "/"],
};
