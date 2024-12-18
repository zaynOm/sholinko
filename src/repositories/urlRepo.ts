import { env } from "@/env";
import { createAdminClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";
import { randomBytes } from "crypto";

async function getLinksCount(userId: string) {
  const { database } = await createAdminClient();

  const result = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    [Query.equal("userId", userId)],
  );

  return result.documents.length;
}

async function generateSlug() {
  const slug = randomBytes(5).toString("base64").slice(0, 5);
  if (!isSlugAvailibale(slug)) {
    generateSlug();
  }
  return slug;
}

async function isSlugAvailibale(url: string) {
  const { database } = await createAdminClient();

  const result = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    [Query.equal("shortUrl", url)],
  );

  return result.documents.length === 0;
}
