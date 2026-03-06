import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/services/jwt";

export async function requireAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const payload = verifyAccessToken(accessToken);
    return payload;
  } catch {
    throw new Error("Invalid token");
  }
}
