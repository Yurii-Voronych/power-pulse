import { jsonWithAuthCookie } from "@/lib/server/api/jsonWithAuthCookie";
import { requireAuth } from "@/lib/server/auth/requireAuth";
import { connectDB } from "@/lib/server/db/mongodb";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import {
  getDiaryDateRange,
  validateDiaryDate,
} from "@/lib/shared/utils/diaryDate";
import Diary from "@/models/Diary";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const weightSchema = z.object({
  weight: z.coerce.number().positive().max(10000),
});
const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid diary product id");
export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      date: string;
      mealType: string;
      diaryProductId: string;
    }>;
  },
) {
  try {
    await connectDB();
    const { date, mealType, diaryProductId } = await params;

    const payload = await requireAuth();
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(payload.userId).select("createdAt");
    if (!user) {
      return jsonWithAuthCookie(
        { message: "User not Found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    const parsedDiaryProductId = objectIdSchema.safeParse(diaryProductId);

    if (!parsedDiaryProductId.success) {
      return jsonWithAuthCookie(
        { message: "Invalid diary product id" },
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
    const meal = MEAL_TYPES.find((meal) => meal.value === mealType);
    if (!meal) {
      return jsonWithAuthCookie(
        { message: "Invalid mealType" },
        { status: 400 },
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
    const parsed = weightSchema.safeParse(body);
    if (!parsed.success) {
      return jsonWithAuthCookie(
        { message: "Invalid request body" },
        { status: 400 },
        payload.accessToken,
      );
    }
    const weight = parsed.data.weight;
    const diary = await Diary.findOne({
      userId: payload.userId,
      date,
      products: {
        $elemMatch: {
          _id: diaryProductId,
          mealType: meal.value,
        },
      },
    });
    if (!diary) {
      return jsonWithAuthCookie(
        { message: "Diary product not found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    const product = diary.products.id(diaryProductId);

    if (!product || product.mealType !== meal.value) {
      return jsonWithAuthCookie(
        { message: "Diary product not found" },
        { status: 404 },
        payload.accessToken,
      );
    }

    product.weight = weight;
    await diary.save();
    return jsonWithAuthCookie(
      {
        message: "Product updated",
        product: {
          id: product._id.toString(),
          productId: product.productId.toString(),
          mealType: product.mealType,
          title: product.title,
          category: product.category,
          caloriesPer100g: product.caloriesPer100g,
          weight: product.weight,
        },
      },
      { status: 200 },
      payload.accessToken,
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
export async function DELETE(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      date: string;
      mealType: string;
      diaryProductId: string;
    }>;
  },
) {
  try {
    await connectDB();
    const { date, mealType, diaryProductId } = await params;

    const payload = await requireAuth();
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(payload.userId).select("createdAt");
    if (!user) {
      return jsonWithAuthCookie(
        { message: "User not Found" },
        { status: 404 },
        payload.accessToken,
      );
    }
    const parsedDiaryProductId = objectIdSchema.safeParse(diaryProductId);

    if (!parsedDiaryProductId.success) {
      return jsonWithAuthCookie(
        { message: "Invalid diary product id" },
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
    const meal = MEAL_TYPES.find((meal) => meal.value === mealType);
    if (!meal) {
      return jsonWithAuthCookie(
        { message: "Invalid mealType" },
        { status: 400 },
        payload.accessToken,
      );
    }
    const diary = await Diary.findOne({
      userId: payload.userId,
      date,
      products: {
        $elemMatch: {
          _id: diaryProductId,
          mealType: meal.value,
        },
      },
    });
    if (!diary) {
      return jsonWithAuthCookie(
        { message: "Diary product not found" },
        { status: 404 },
        payload.accessToken,
      );
    }

    diary.products.pull({ _id: diaryProductId });
    await diary.save();

    return jsonWithAuthCookie(
      {
        message: "Product deleted",
        deletedProductId: diaryProductId,
      },
      { status: 200 },
      payload.accessToken,
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
