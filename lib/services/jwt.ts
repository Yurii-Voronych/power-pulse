import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};
