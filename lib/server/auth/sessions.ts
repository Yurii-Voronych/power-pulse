import crypto from "crypto";
import bcrypt from "bcryptjs";
import Session from "@/models/Session";
import { signAccessToken } from "./jwt";

export const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const verifyRefreshToken = async (token: string, hash: string) => {
  return bcrypt.compare(token, hash);
};

export const createSession = async (
  userId: string,
  refreshToken: string,
  userAgent?: string,
  ip?: string,
) => {
  const refreshTokenHash = hashToken(refreshToken);

  return Session.create({
    userId,
    refreshTokenHash,
    userAgent,
    ip,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
};

export const refreshSession = async (refreshToken: string, rotate = false) => {
  const refreshTokenHash = hashToken(refreshToken);

  const session = await Session.findOne({ refreshTokenHash });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await Session.deleteOne({ _id: session._id });
    return null;
  }

  const accessToken = signAccessToken(session.userId.toString());

  if (!rotate) {
    return {
      accessToken,
      userId: session.userId.toString(),
    };
  }

  const newRefreshToken = generateRefreshToken();
  const newRefreshTokenHash = hashToken(newRefreshToken);

  session.refreshTokenHash = newRefreshTokenHash;
  session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await session.save();

  return {
    accessToken,
    refreshToken: newRefreshToken,
    userId: session.userId.toString(),
  };
};
