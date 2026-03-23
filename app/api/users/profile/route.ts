import { NextResponse } from "next/server";
import { connectDB } from "@/lib/services/mongodb";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth/requireAuth";
import { editProfileSchemaServer } from "@/lib/validators/profile/editProfileSchema.server";
import { calculateDailyNorm } from "@/lib/services/calculateDailyNorm";

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

    const user = await User.findById(payload.userId).select("-password");

    const { calories, sportMinutes } = calculateDailyNorm({
      height: data.height,
      currentWeight: data.currentWeight,
      birthday: data.birthday,
      sex: data.sex,
      levelActivity: data.levelActivity,
    });

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        name: data.name,
        email: data.email,
        profile: {
          height: data.height,
          currentWeight: data.currentWeight,
          desiredWeight: data.desiredWeight,
          birthday: data.birthday,
          blood: data.blood,
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

    return NextResponse.json(
      {
        user: {
          id: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
          profile: updatedUser.profile,
          dailyNorm: updatedUser.dailyNorm,
          isProfileCompleted: updatedUser.isProfileCompleted,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Profile update error", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
