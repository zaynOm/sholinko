import { env } from "@/env";
import { createAdminClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";

type Viewer = {
  ip: string;
  country: string;
  device: string;
  "viewed-links": string[];
};

export async function getViewerByIp(ip: string) {
  const { database } = await createAdminClient();

  const viewers = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_VIEWERS_ID,
    [Query.equal("ip", ip)],
  );
  return viewers.documents[0];
}

export async function createNewViewer(data: Viewer) {
  const { database } = await createAdminClient();

  const viewer = await database.createDocument(
    env.DATABASE_ID,
    env.COLLECTION_VIEWERS_ID,
    ID.unique(),
    data,
  );

  return viewer;
}

export async function updateViewerByDocumentId(
  documentId: string,
  viewedLinks: string[],
) {
  const { database } = await createAdminClient();

  await database.updateDocument(
    env.DATABASE_ID,
    env.COLLECTION_VIEWERS_ID,
    documentId,
    {
      "viewed-links": viewedLinks,
    },
  );
}

export async function getViewerByLinkId(linkId: string | null) {
  if (!linkId) return [];

  const { database } = await createAdminClient();

  const viewers = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_VIEWERS_ID,
    [Query.search("viewed-links", linkId)],
  );

  return viewers.documents;
}
