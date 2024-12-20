import { SESSION_KEY } from "@/constants";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.json({ message: "Can't get userId or secret" });
  }

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_KEY, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
}
