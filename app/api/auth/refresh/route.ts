import { refreshSession } from "@/lib/services/auth";
import { connectDB } from "@/lib/services/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const result = await refreshSession(refreshToken, true);
    if (!result || !result.refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = NextResponse.json(
      { message: "Session refreshed" },
      { status: 200 },
    );

    response.cookies.set("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    response.cookies.set("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("Refresh error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
