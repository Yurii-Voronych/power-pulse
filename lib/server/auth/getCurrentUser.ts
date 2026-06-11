import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/server/auth/jwt";
import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { refreshSession } from "./sessions";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";
import { cache } from "react";

const getCurrentUserUncached = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!accessToken && !refreshToken) return null;
  await connectDB();

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);

      const user = await User.findById(payload.userId).select("-password");

      return user ? mapUserToDTO(user) : null;
    } catch {}
  }

  if (refreshToken) {
    const result = await refreshSession(refreshToken);

    if (!result) return null;

    const user = await User.findById(result.userId).select("-password");

    return user ? mapUserToDTO(user) : null;
  }

  return null;
};

export const getCurrentUser = cache(getCurrentUserUncached);
