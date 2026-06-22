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
import User from "@/models/User";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import Exercise from "@/models/Exercise";
import Diary from "@/models/Diary";
import { DiaryExercise } from "@/lib/shared/types/diary";

const postDiaryExercisesSchema = z.object({
  items: z
    .array(
      z.object({
        exerciseId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid exercise id"),
        time: z.coerce.number().int().positive().max(1440),
      }),
    )
    .min(1)
    .max(50),
});
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      date: string;
    }>;
  },
) {
  try {
    await connectDB();
    const { date } = await params;
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
    const userWeight = user.profile?.currentWeight;
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
    const parsed = postDiaryExercisesSchema.safeParse(body);
    if (!parsed.success) {
      return jsonWithAuthCookie(
        {
          message: "Invalid request body",
          issues: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
        payload.accessToken,
      );
    }
    const items = parsed.data.items;

    const exercisesIds = items.map((exercise) => exercise.exerciseId);
    const uniqueExercisesIds = [...new Set(exercisesIds)];
    if (exercisesIds.length !== uniqueExercisesIds.length) {
      return jsonWithAuthCookie(
        { message: "Duplicate exercises are not allowed" },
        { status: 400 },
        payload.accessToken,
      );
    }
    const exercises = await Exercise.find({
      _id: {
        $in: uniqueExercisesIds,
      },
    });
    if (exercises.length !== uniqueExercisesIds.length) {
      return jsonWithAuthCookie(
        { message: "Invalid exercise id" },
        { status: 400 },
        payload.accessToken,
      );
    }
    const exerciseById = new Map(
      exercises.map((exercise) => [exercise._id.toString(), exercise]),
    );
    const exerciseSnapshots = items.map((item) => {
      const exercise = exerciseById.get(item.exerciseId);

      if (!exercise) {
        throw new Error("Exercise not found after validation");
      }

      const caloriesPerHour =
        typeof exercise.met === "number" && typeof userWeight === "number"
          ? exercise.met * userWeight
          : exercise.burnedCalories;

      if (
        typeof caloriesPerHour !== "number" ||
        Number.isNaN(caloriesPerHour)
      ) {
        throw new Error("Exercise calories data is invalid");
      }

      return {
        exerciseId: item.exerciseId,
        bodyPart: exercise.bodyPart,
        equipment: exercise.equipment,
        name: exercise.name,
        target: exercise.target,
        burnedCalories: Math.ceil((caloriesPerHour * item.time) / 60),
        time: item.time,
      };
    });
    const updatedDiary = await Diary.findOneAndUpdate(
      { userId: payload.userId, date },
      {
        $push: {
          exercises: { $each: exerciseSnapshots },
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    const addedExercises = updatedDiary.exercises
      .slice(-exerciseSnapshots.length)
      .map(
        (exercise: {
          _id: { toString: () => string };
          exerciseId: { toString: () => string };
          bodyPart: string;
          equipment: string;
          name: string;
          target: string;
          burnedCalories: number;
          time: number;
        }): DiaryExercise => ({
          id: exercise._id.toString(),
          exerciseId: exercise.exerciseId.toString(),
          bodyPart: exercise.bodyPart,
          equipment: exercise.equipment,
          name: exercise.name,
          target: exercise.target,
          burnedCalories: exercise.burnedCalories,
          time: exercise.time,
        }),
      );
    return jsonWithAuthCookie(
      {
        message: "Exercises added",
        addedCount: exerciseSnapshots.length,
        exercises: addedExercises,
      },
      { status: 201 },
      payload.accessToken,
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
