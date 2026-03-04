import crypto from "crypto";
import bcrypt from "bcryptjs";
import Session from "@/models/Session";

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
