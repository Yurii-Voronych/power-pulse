import {
  clearAuthCookies,
  jsonWithAuthCookie,
} from "@/lib/server/api/jsonWithAuthCookie";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { connectDB } from "@/lib/server/db/mongodb";
import {
  getDiaryDateRange,
  validateDiaryDate,
} from "@/lib/shared/utils/diaryDate";
import Diary from "@/models/Diary";
import Exercise from "@/models/Exercise";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid diary exercise id");
const timeSchema = z.object({
  time: z.coerce.number().int().positive().max(1440),
});
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
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
      );
    }
    const user = await User.findById(payload.userId).select("createdAt");
    if (!user) {
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
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
    const diary = await Diary.findOneAndUpdate(
      {
        userId: payload.userId,
        date,
        exercises: { $elemMatch: { _id: diaryExerciseId } },
      },
      { $pull: { exercises: { _id: diaryExerciseId } } },
    );
    if (!diary) {
      return jsonWithAuthCookie(
        { message: "Diary exercises not found" },
        { status: 404 },
        payload.accessToken,
      );
    }

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

export async function PATCH(
  req: NextRequest,
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
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
      );
    }
    const user = await User.findById(payload.userId).select(
      "createdAt profile.currentWeight",
    );
    if (!user) {
      return clearAuthCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
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
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonWithAuthCookie(
        { message: "Invalid JSON body" },
        { status: 400 },
        payload.accessToken,
      );
    }
    const parsed = timeSchema.safeParse(body);
    if (!parsed.success) {
      return jsonWithAuthCookie(
        { message: "Invalid time value" },
        { status: 400 },
        payload.accessToken,
      );
    }

    const time = parsed.data.time;

    const diary = await Diary.findOne({
      userId: payload.userId,
      date,
      exercises: { $elemMatch: { _id: diaryExerciseId } },
    });
    if (!diary)
      return jsonWithAuthCookie(
        { message: "Diary not found" },
        { status: 404 },
        payload.accessToken,
      );

    const exercise = diary.exercises.id(diaryExerciseId);
    if (!exercise) {
      return jsonWithAuthCookie(
        { message: "Diary exercise not found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    const sourceExercise = await Exercise.findById(exercise.exerciseId);
    if (!sourceExercise) {
      return jsonWithAuthCookie(
        { message: "Exercise not found" },
        { status: 404 },
        payload.accessToken,
      );
    }

    const userWeight = user.profile?.currentWeight;
    const caloriesPerHour =
      typeof sourceExercise.met === "number" && typeof userWeight === "number"
        ? sourceExercise.met * userWeight
        : sourceExercise.burnedCalories;

    if (typeof caloriesPerHour !== "number" || Number.isNaN(caloriesPerHour)) {
      return jsonWithAuthCookie(
        { message: "Exercise calories data is invalid" },
        { status: 400 },
        payload.accessToken,
      );
    }
    const updatedDiary = await Diary.findOneAndUpdate(
      {
        userId: payload.userId,
        date,
        exercises: { $elemMatch: { _id: diaryExerciseId } },
      },
      {
        $set: {
          "exercises.$.time": time,
          "exercises.$.burnedCalories": Math.ceil(
            (caloriesPerHour * time) / 60,
          ),
        },
      },
      { new: true },
    );
    if (!updatedDiary) {
      return jsonWithAuthCookie(
        { message: "Diary exercises not found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    const updatedExercise = updatedDiary.exercises.id(diaryExerciseId);
    if (!updatedExercise) {
      return jsonWithAuthCookie(
        { message: "Diary exercise not found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    return jsonWithAuthCookie(
      {
        message: "Exercise updated",
        exercise: {
          id: updatedExercise._id.toString(),
          exerciseId: updatedExercise.exerciseId.toString(),
          bodyPart: updatedExercise.bodyPart,
          equipment: updatedExercise.equipment,
          name: updatedExercise.name,
          target: updatedExercise.target,
          burnedCalories: updatedExercise.burnedCalories,
          time: updatedExercise.time,
        },
      },
      { status: 200 },
      payload.accessToken,
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
