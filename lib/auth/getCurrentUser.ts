import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/services/jwt";
import { connectDB } from "@/lib/services/mongodb";
import User from "@/models/User";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const payload = verifyAccessToken(accessToken);

    await connectDB();

    const user = await User.findById(payload.userId).select("-password").lean();

    return user;
  } catch {
    return null;
  }
};
