import { connectDB } from "@/lib/services/mongodb";
import Session from "@/models/Session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { generateRefreshToken, hashToken } from "@/lib/services/auth";
import { signAccessToken } from "@/lib/services/jwt";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const refreshTokenHash = hashToken(refreshToken);

    const session = await Session.findOne({ refreshTokenHash });

    if (!session) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ _id: session._id });

      return NextResponse.json({ message: "Session expired" }, { status: 401 });
    }

    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = hashToken(newRefreshToken);

    session.refreshTokenHash = newRefreshTokenHash;
    session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await session.save();

    const accessToken = signAccessToken(session.userId.toString());

    const response = NextResponse.json(
      { message: "Session refreshed" },
      { status: 200 },
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    response.cookies.set("refreshToken", newRefreshToken, {
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
