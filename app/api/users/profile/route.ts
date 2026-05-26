import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db/mongodb";
import User from "@/models/User";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { editProfileSchemaServer } from "@/lib/shared/validators/profile/editProfileSchema.server";
import { calculateDailyNorm } from "@/lib/shared/calculations/calculateDailyNorm";
import { mapUserToDTO } from "@/lib/shared/mappers/mapUserToDTO";

export async function PATCH(req: Request) {
  try {
    const payload = await requireAuth();

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const parsed = editProfileSchemaServer.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error }, { status: 400 });
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
        name: data.name,
        email: data.email,
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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: mapUserToDTO(updatedUser),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Profile update error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
