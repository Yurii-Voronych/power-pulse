import { connectDB } from "@/lib/services/mongodb";
import Session from "@/models/Session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hashToken } from "@/lib/services/auth";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
      const refreshTokenHash = hashToken(refreshToken);

      await Session.deleteOne({ refreshTokenHash });
    }

    const response = NextResponse.json(
      { message: "Logged out" },
      { status: 200 },
    );

    response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
    response.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    console.error("Logout error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
