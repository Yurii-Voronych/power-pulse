import { connectDB } from "@/lib/services/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/requireAuth";

export async function GET() {
  try {
    await connectDB();

    const payload = await requireAuth();

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          profile: user.profile,
          dailyNorm: user.dailyNorm,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Auth me error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
