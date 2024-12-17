"use server";

import { SESSION_KEY } from "@/constants";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGoogle() {
  debugger;
  const { account } = await createAdminClient();

  const headerList = await headers();
  const origin = headerList.get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/sign-up`,
  );

  return redirect(redirectUrl);
}

export async function logout() {
  const { account } = await createSessionClient();

  account.deleteSession("current");
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);

  redirect("/sign-up");
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
