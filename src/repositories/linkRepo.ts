import { formType } from "@/app/dashboard/links/new/page";
import { env } from "@/env";
import { createAdminClient } from "@/lib/server/appwrite";
import { randomBytes } from "crypto";
import { ID, Query } from "node-appwrite";
import { getLoggedInUser } from "./authRepo";
import { Link, LinkUpdate } from "@/types/links";

export async function deleteLinkByDocumentId(documentId: string) {
  const { database } = await createAdminClient();

  await database.deleteDocument(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    documentId,
  );
}

export async function updateLinkByDocumentId(
  documentId: string,
  data: LinkUpdate,
) {
  const { database } = await createAdminClient();

  await database.updateDocument(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    documentId,
    data,
  );
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  const { database } = await createAdminClient();

  const result = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    [Query.equal("shortUrl", slug)],
  );

  if (result.documents.length > 0) {
    return result.documents[0] as Link;
  }
  return null;
}

export async function getLinksList(): Promise<Link[]> {
  const { database } = await createAdminClient();
  const user = await getLoggedInUser();

  if (!user) return [];

  const result = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")],
  );

  return result.documents as Link[];
}

export async function createNewLink(data: formType) {
  const { database } = await createAdminClient();
  const user = await getLoggedInUser();

  if (!user) return;

  const linksCount = await getLinksCount();
  const slug = await generateSlug();

  const newLink = {
    userId: user?.$id,
    originalUrl: data.originalUrl,
    title: data.title || `Link ${linksCount + 1}`,
    shortUrl: slug,
  };

  return await database.createDocument(
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
  const slug = randomBytes(10).toString("base64").replace("/", "").slice(0, 5);

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
