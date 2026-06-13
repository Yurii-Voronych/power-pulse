import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";
import {
  clearAuthCookies,
  jsonWithAuthCookie,
} from "@/lib/server/api/jsonWithAuthCookie";

export async function GET() {
  try {
    await connectDB();

    const payload = await requireAuth();

    if (!payload) {
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
      );
    }

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
      );
    }

    return jsonWithAuthCookie(
      { user: mapUserToDTO(user) },
      { status: 200 },
      payload.accessToken,
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
