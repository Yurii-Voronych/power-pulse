import { jsonWithAuthCookie } from "@/lib/server/api/jsonWithAuthCookie";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { connectDB } from "@/lib/server/db/mongodb";
import {
  getDiaryDateRange,
  validateDiaryDate,
} from "@/lib/shared/utils/diaryDate";
import Diary from "@/models/Diary";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid diary exercise id");
export async function DELETE(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      date: string;
      diaryExerciseId: string;
    }>;
  },
) {
  try {
    await connectDB();
    const { date, diaryExerciseId } = await params;
    const payload = await requireAuth();
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(payload.userId).select("createdAt ");
    if (!user) {
      return jsonWithAuthCookie(
        { message: "User not Found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    const parsedExerciseId = objectIdSchema.safeParse(diaryExerciseId);

    if (!parsedExerciseId.success) {
      return jsonWithAuthCookie(
        { message: "Invalid diary exercise id" },
        { status: 400 },
        payload.accessToken,
      );
    }
    const validRange = getDiaryDateRange(user.createdAt.toISOString());
    const dateValidation = validateDiaryDate(date, validRange);
    if (dateValidation.status === "invalid") {
      return jsonWithAuthCookie(
        { message: "Invalid date" },
        { status: 400 },
        payload.accessToken,
      );
    }

    if (dateValidation.status === "redirect") {
      return jsonWithAuthCookie(
        { message: "Date is outside allowed range" },
        { status: 403 },
        payload.accessToken,
      );
    }
    const diary = await Diary.findOne({
      userId: payload.userId,
      date,
      exercises: { $elemMatch: { _id: diaryExerciseId } },
    });
    if (!diary) {
      return jsonWithAuthCookie(
        { message: "Diary exercises not found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    diary.exercises.pull({ _id: diaryExerciseId });
    await diary.save();

    return jsonWithAuthCookie(
      {
        message: "Exercise deleted",
        deletedExerciseId: diaryExerciseId,
      },
      { status: 200 },
      payload.accessToken,
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// export async function PATCH(
//   req: NextRequest,
//   {
//     params,
//   }: {
//     params: Promise<{
//       date: string;
//       diaryExerciseId: string;
//     }>;
//   },
// ) {
//   try {
//     await connectDB();
//     const { date, diaryExerciseId } = await params;
//     const payload = await requireAuth();
//     if (!payload) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     const user = await User.findById(payload.userId).select(
//       "profile.currentWeight",
//     );
//     if (!user) {
//       return jsonWithAuthCookie(
//         { message: "User not Found" },
//         { status: 404 },
//         payload.accessToken,
//       );
//     }

//     return jsonWithAuthCookie(
//       {
//         message: "Exercises deleted",
//       },
//       { status: 200 },
//       payload.accessToken,
//     );
//   } catch {
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
