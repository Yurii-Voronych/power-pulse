import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";

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

    const res = NextResponse.json({ user: mapUserToDTO(user) });

    if (payload.accessToken) {
      res.cookies.set("accessToken", payload.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });
    }

    return res;
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
