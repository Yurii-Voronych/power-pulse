import { connectDB } from "@/lib/services/mongodb";
import { verifyAccessToken } from "@/lib/services/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let payload;

    try {
      payload = verifyAccessToken(accessToken);
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

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
