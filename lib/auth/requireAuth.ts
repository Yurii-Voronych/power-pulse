import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/services/jwt";

export const requireAuth = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const payload = verifyAccessToken(accessToken);
    return payload;
  } catch {
    return null;
  }
};
