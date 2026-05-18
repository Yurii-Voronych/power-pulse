import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URL);
}
