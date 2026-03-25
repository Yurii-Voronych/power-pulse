import { connectDB } from "@/lib/services/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/requireAuth";

export async function GET() {
  try {
    await connectDB();

    const payload = await requireAuth();

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const res = NextResponse.json({ user });

    if (payload.accessToken) {
      res.cookies.set("accessToken", payload.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    return res;
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
