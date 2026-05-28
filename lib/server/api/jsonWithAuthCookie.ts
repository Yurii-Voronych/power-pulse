import { NextResponse } from "next/server";

export const jsonWithAuthCookie = (
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
