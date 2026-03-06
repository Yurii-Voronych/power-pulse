import { NextResponse } from "next/server";
import { AnySchema, ValidationError } from "yup";

export const validate = async <T>(schema: AnySchema, body: unknown) => {
  try {
    const data = await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    return { data: data as T };
  } catch (error) {
    if (error instanceof ValidationError) {
      const formattedErrors: Record<string, string> = {};

      error.inner.forEach((err) => {
        if (err.path && !formattedErrors[err.path]) {
          formattedErrors[err.path] = err.message;
        }
      });

      return {
        error: NextResponse.json({ errors: formattedErrors }, { status: 400 }),
      };
    }

    throw error;
  }
};
