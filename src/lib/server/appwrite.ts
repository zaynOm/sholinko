"use server";
import { SESSION_KEY } from "@/constants";
import { env } from "@/env";
import { cookies } from "next/headers";
import { Account, Client, Databases } from "node-appwrite";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_KEY);
  if (!session || !session.value) {
    throw new Error("No Session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}
