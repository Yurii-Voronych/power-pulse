import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { generateRefreshToken, createSession } from "@/lib/server/auth/sessions";
import { signAccessToken } from "@/lib/server/auth/jwt";
import { registerSchemaServer } from "@/lib/shared/validators/auth/registerSchema.server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchemaServer.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error }, { status: 400 });
    }

    const { email, password, name } = parsed.data;

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      isProfileCompleted: false,
    });

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
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
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
    console.error("Register error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
