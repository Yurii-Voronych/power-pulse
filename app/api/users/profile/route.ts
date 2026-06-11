import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { editProfileSchemaServer } from "@/lib/shared/validators/profile/editProfileSchema.server";
import { calculateDailyNorm } from "@/lib/shared/calculations/calculateDailyNorm";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";
import { jsonWithAuthCookie } from "@/lib/server/api/jsonWithAuthCookie";

export async function PATCH(req: Request) {
  try {
    const payload = await requireAuth();

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const parsed = editProfileSchemaServer.safeParse(body);

    if (!parsed.success) {
      return jsonWithAuthCookie(
        { errors: parsed.error },
        { status: 400 },
        payload.accessToken,
      );
    }

    const data = parsed.data;

    await connectDB();

    const { calories, sportMinutes } = calculateDailyNorm({
      height: data.height,
      currentWeight: data.currentWeight,
      birthday: data.birthday,
      sex: data.sex,
      levelActivity: data.levelActivity,
    });

    const updatedUser = await User.findByIdAndUpdate(
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
          calories: calories,
          sportMinutes: sportMinutes,
        },
        isProfileCompleted: true,
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedUser) {
      return jsonWithAuthCookie(
        { message: "User not found" },
        { status: 404 },
        payload.accessToken,
      );
    }

    return jsonWithAuthCookie(
      {
        user: mapUserToDTO(updatedUser),
      },
      { status: 200 },
      payload.accessToken,
    );
  } catch (error) {
    console.error("Profile update error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
