import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/server/auth/jwt";
import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import type { User as UserType } from "@/types/types";
import { refreshSession } from "./sessions";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  await connectDB();

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);

      return await User.findById(payload.userId)
        .select("-password")
        .lean<UserType>();
    } catch {}
  }

  if (refreshToken) {
    const result = await refreshSession(refreshToken);

    if (!result) return null;

    return await User.findById(result.userId)
      .select("-password")
      .lean<UserType>();
  }

  return null;
};
