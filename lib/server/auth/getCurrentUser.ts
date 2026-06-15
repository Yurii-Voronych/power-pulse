import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";
import { cache } from "react";
import { validateSession } from "./validateSession";

const getCurrentUserUncached = async () => {
  const session = await validateSession();

  if (!session) return null;

  await connectDB();

  const user = await User.findById(session.userId).select("-password");

  return user ? mapUserToDTO(user) : null;
};

export const getCurrentUser = cache(getCurrentUserUncached);
