import { getLinkBySlug, updateLinkByDocumentId } from "@/repositories/urlRepo";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;

  // TODO: add viewer info capture, click count increment

  const link = await getLinkBySlug(slug);

  if (link) {
    return NextResponse.redirect(link.originalUrl);
  } else {
    return NextResponse.json({ error: "Url not found" }, { status: 404 });
  }
}
