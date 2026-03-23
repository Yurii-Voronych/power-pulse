import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/services/jwt";
import { connectDB } from "@/lib/services/mongodb";
import User from "@/models/User";
import type { User as UserType } from "@/types/types";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;

  await connectDB();

  if (accessToken) {
    try {
      const payload = verifyAccessToken(accessToken);

      return await User.findById(payload.userId)
        .select("-password")
        .lean<UserType>();
    } catch {}
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          cookie: `refreshToken=${refreshToken}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const newAccessToken = (await cookies()).get("accessToken")?.value;
    if (!newAccessToken) return null;

    const payload = verifyAccessToken(newAccessToken);

    return await User.findById(payload.userId)
      .select("-password")
      .lean<UserType>();
  } catch {
    return null;
  }
};
