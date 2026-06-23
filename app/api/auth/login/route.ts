import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  generateRefreshToken,
  createSession,
} from "@/lib/server/auth/sessions";
import { signAccessToken } from "@/lib/server/auth/jwt";

import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";
import { loginSchema } from "@/lib/shared/validators/auth/loginSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error }, { status: 400 });
    }

    const { email, password } = parsed.data;

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const refreshToken = generateRefreshToken();

    const userAgent = req.headers.get("user-agent") || "unknown";

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    await createSession(user._id.toString(), refreshToken, userAgent, ip);

    const accessToken = signAccessToken(user._id.toString());

    const response = NextResponse.json(
      {
        user: mapUserToDTO(user),
      },
      { status: 200 },
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("Login error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
