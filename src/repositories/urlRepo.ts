import { env } from "@/env";
import { createAdminClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";
import { getLoggedInUser } from "./authRepo";
import { formType } from "@/app/dashboard/links/new/page";
import { randomBytes } from "crypto";
import { Link } from "@/app/dashboard/links/columns";

export async function getLinksList(): Promise<Link[]> {
  const { database } = await createAdminClient();
  const user = await getLoggedInUser();

  if (!user) return [];

  const result = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")],
  );

  return result.documents;
}

export async function createNewLink(data: formType) {
  const { database } = await createAdminClient();
  const user = await getLoggedInUser();

  if (!user) return;

  const linksCount = await getLinksCount(user?.$id);
  const slug = await generateSlug();

  const newLink = {
    userId: user?.$id,
    originalUrl: data.originalUrl,
    title: data.title || `Link ${linksCount + 1}`,
    shortUrl: slug,
  };

  await database.createDocument(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    ID.unique(),
    newLink,
  );
}

async function getLinksCount() {
  const links = await getLinksList();
  return links.length;
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
