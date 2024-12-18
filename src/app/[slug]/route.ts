import { env } from "@/env";
import { createAdminClient } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  const { database } = await createAdminClient();

  // TODO: add viewer info capture, click count increment

  const result = await database.listDocuments(
    env.DATABASE_ID,
    env.COLLECTION_LINKS_ID,
    [Query.equal("shortUrl", slug)],
  );

  if (result.documents.length > 0) {
    const originalUrl = result.documents[0].originalUrl;
    return NextResponse.redirect(originalUrl);
  } else {
    return NextResponse.json({ error: "Url not found" }, { status: 404 });
  }
}
