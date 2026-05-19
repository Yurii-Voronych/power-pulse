import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/server/auth/jwt";
import { refreshSession } from "@/lib/server/auth/sessions";

type AuthResult = {
  userId: string;
  accessToken?: string;
};
export const requireAuth = async (): Promise<AuthResult | null> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    try {
      return verifyAccessToken(accessToken);
    } catch {}
  }

  if (refreshToken) {
    const result = await refreshSession(refreshToken);

    if (!result) return null;

    return {
      userId: result.userId,
      accessToken: result.accessToken,
    };
  }

  return null;
};
