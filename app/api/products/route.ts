import { requireAuth } from "@/lib/server/auth/requireAuth";
import { getProducts } from "@/lib/server/data/products/getProducts";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  page: z.coerce
    .number("must be a number")
    .int("integer")
    .positive("positive")
    .default(1),
  limit: z.coerce
    .number("must be a number")
    .int("integer")
    .positive("positive")
    .max(50)
    .default(12),
  search: z.string().trim().optional(),
});
export async function GET(req: NextRequest) {
  try {
    const payload = await requireAuth();

    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;

    const parsed = schema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid query params",
          issues: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const products = await getProducts(parsed.data);
    const res = NextResponse.json(products);

    if (payload.accessToken) {
      res.cookies.set("accessToken", payload.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });
    }

    return res;
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
