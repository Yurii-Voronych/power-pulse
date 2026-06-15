import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";
import { connectDB } from "../db/mongodb";
import { hashToken } from "./sessions";
import Session from "@/models/Session";
import User from "@/models/User";
import { cache } from "react";

type SessionValidationResult = {
  userId: string;
};

const validateSessionUncached =
  async (): Promise<SessionValidationResult | null> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken) {
      try {
        const payload = verifyAccessToken(accessToken);
        await connectDB();
        const userExists = await User.exists({ _id: payload.userId });
        if (!userExists) {
          return null;
        }
        return { userId: payload.userId };
      } catch {}
    }

    if (!refreshToken) return null;

    await connectDB();

    const refreshTokenHash = hashToken(refreshToken);
    const session = await Session.findOne({ refreshTokenHash });

    if (!session) return null;

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ _id: session._id });
      return null;
    }

    const userExists = await User.exists({ _id: session.userId });

    if (!userExists) {
      await Session.deleteOne({ _id: session._id });
      return null;
    }

    return {
      userId: session.userId.toString(),
    };
  };
export const validateSession = cache(validateSessionUncached);
