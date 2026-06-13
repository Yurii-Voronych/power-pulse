import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { profileUpdateSchemaServer } from "@/lib/shared/validators/profile/editProfileSchema.server";
import { calculateDailyNorm } from "@/lib/shared/calculations/calculateDailyNorm";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";
import {
  clearAuthCookies,
  jsonWithAuthCookie,
} from "@/lib/server/api/jsonWithAuthCookie";

type MongoDuplicateKeyError = {
  code: number;
  keyPattern?: Record<string, number>;
};

const isDuplicateEmailError = (
  error: unknown,
): error is MongoDuplicateKeyError => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const mongoError = error as MongoDuplicateKeyError;

  return (
    mongoError.code === 11000 && mongoError.keyPattern?.email !== undefined
  );
};
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const payload = await requireAuth();

    if (!payload) {
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
      );
    }
    let body;
    try {
      body = await req.json();
    } catch {
      return jsonWithAuthCookie(
        { message: "Invalid JSON body" },
        { status: 400 },
        payload.accessToken,
      );
    }

    const parsed = profileUpdateSchemaServer.safeParse(body);

    if (!parsed.success) {
      return jsonWithAuthCookie(
        { errors: parsed.error },
        { status: 400 },
        payload.accessToken,
      );
    }

    const data = parsed.data;

    const { calories, sportMinutes } = calculateDailyNorm({
      height: data.height,
      currentWeight: data.currentWeight,
      birthday: data.birthday,
      sex: data.sex,
      levelActivity: data.levelActivity,
    });

    let updatedUser;

    try {
      updatedUser = await User.findByIdAndUpdate(
        payload.userId,
        {
          ...(data.name !== undefined && { name: data.name }),
          ...(data.email !== undefined && { email: data.email }),
          profile: {
            height: data.height,
            currentWeight: data.currentWeight,
            desiredWeight: data.desiredWeight,
            birthday: data.birthday,
            sex: data.sex,
            levelActivity: data.levelActivity,
          },
          dailyNorm: {
            calories,
            sportMinutes,
          },
          isProfileCompleted: true,
        },
        {
          returnDocument: "after",
          runValidators: true,
        },
      );
    } catch (error) {
      if (isDuplicateEmailError(error)) {
        return jsonWithAuthCookie(
          {
            code: "EMAIL_ALREADY_IN_USE",
            field: "email",
          },
          { status: 409 },
          payload.accessToken,
        );
      }

      throw error;
    }

    if (!updatedUser) {
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
      );
    }

    return jsonWithAuthCookie(
      { user: mapUserToDTO(updatedUser) },
      { status: 200 },
      payload.accessToken,
    );
  } catch (error) {
    console.error("Profile update error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
