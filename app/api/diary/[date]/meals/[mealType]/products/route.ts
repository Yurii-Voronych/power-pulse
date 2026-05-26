import { requireAuth } from "@/lib/server/auth/requireAuth";
import { connectDB } from "@/lib/server/db/mongodb";
import { MEAL_TYPES } from "@/lib/shared/constants/constants";
import {
  getDiaryDateRange,
  validateDiaryDate,
} from "@/lib/shared/utils/diaryDate";
import Diary from "@/models/Diary";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const postDiarySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid product id"),
        weight: z.coerce.number().positive().max(10000),
      }),
    )
    .min(1)
    .max(50),
});

const jsonWithAuthCookie = (
  body: unknown,
  init: ResponseInit,
  accessToken?: string,
) => {
  const res = NextResponse.json(body, init);

  if (accessToken) {
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });
  }

  return res;
};

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      date: string;
      mealType: string;
    }>;
  },
) {
  try {
    await connectDB();
    const { date, mealType } = await params;

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

    const parsed = postDiarySchema.safeParse(body);
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

    const productIds = items.map((item) => item.productId);
    const uniqueProductIds = [...new Set(productIds)];

    if (productIds.length !== uniqueProductIds.length) {
      return jsonWithAuthCookie(
        { message: "Duplicate products are not allowed" },
        { status: 400 },
        payload.accessToken,
      );
    }

    const products = await Product.find({
      _id: {
        $in: uniqueProductIds,
      },
    });

    if (products.length !== uniqueProductIds.length) {
      return jsonWithAuthCookie(
        { message: "Invalid product id" },
        { status: 400 },
        payload.accessToken,
      );
    }

    const productById = new Map(
      products.map((product) => {
        return [product._id.toString(), product];
      }),
    );

    const productsSnapshots = items.map((item) => {
      const product = productById.get(item.productId);

      if (!product) {
        throw new Error("Product not found after validation");
      }

      return {
        productId: item.productId,
        weight: item.weight,
        mealType: meal.value,
        title: product.title,
        category: product.category,
        caloriesPer100g: product.caloriesPer100g,
      };
    });

    const diary = await Diary.findOne({ userId: payload.userId, date });
    if (!diary) {
      await Diary.create({
        userId: payload.userId,
        date,
        products: productsSnapshots,
      });
    } else {
      diary.products.push(...productsSnapshots);
      await diary.save();
    }
    return jsonWithAuthCookie(
      {
        message: "Products added",
        addedCount: productsSnapshots.length,
      },
      { status: 201 },
      payload.accessToken,
    );
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
