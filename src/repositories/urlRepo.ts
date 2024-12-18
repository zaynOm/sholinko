import { env } from "@/env";
import { createAdminClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";

async function isSlugAvailibale(url: string) {
  const { database } = await createAdminClient();

  const result = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    [Query.equal("shortUrl", url)],
  );

  return result.documents.length === 0;
}
