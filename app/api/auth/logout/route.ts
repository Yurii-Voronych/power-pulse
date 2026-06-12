import { connectDB } from "@/lib/server/db/mongodb";
import Session from "@/models/Session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hashToken } from "@/lib/server/auth/sessions";
import { clearAuthCookies } from "@/lib/server/api/jsonWithAuthCookie";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
      const refreshTokenHash = hashToken(refreshToken);

      await Session.deleteOne({ refreshTokenHash });
    }

    const response = clearAuthCookies(
      NextResponse.json({ message: "Logged out" }, { status: 200 }),
    );
    return response;
  } catch {
    return clearAuthCookies(
      NextResponse.json({ message: "Server error" }, { status: 500 }),
    );
  }
}
