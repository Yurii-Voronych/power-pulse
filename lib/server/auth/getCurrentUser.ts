import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";
import { cache } from "react";
import { validateSession } from "./validateSession";
import Session from "@/models/Session";

const getCurrentUserUncached = async () => {
  const sessionRes = await validateSession();

  if (!sessionRes) return null;

  await connectDB();

  const user = await User.findById(sessionRes.userId).select("-password");

  if (!user) {
    await Session.deleteMany({
      userId: sessionRes.userId,
    });
    return null;
  }
  return user ? mapUserToDTO(user) : null;
};

export const getCurrentUser = cache(getCurrentUserUncached);
