import { env } from "@/env";
import { getLinkBySlug, updateLinkByDocumentId } from "@/repositories/linkRepo";
import {
  createNewViewer,
  getViewerByIp,
  updateViewerByDocumentId,
} from "@/repositories/viwerRepo";
import { LinkUpdate } from "@/types/links";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  const link = await getLinkBySlug(slug);

  if (!link || !link.active) {
    return NextResponse.json({ error: "Url not found" }, { status: 404 });
  }

  let platform = req.headers.get("sec-ch-ua-platform");
  platform = platform ? platform!.replaceAll(/['"]/g, "") : "Unknown";

  const result = await fetch(
    `https://api.geoapify.com/v1/ipinfo?apiKey=${env.GEO_API_KEY}`,
  );
  const geoData = await result.json();

  let viewer = await getViewerByIp(geoData.ip);

  const viewerData = {
    ip: geoData.ip!,
    country: geoData.country.name!,
    device: platform,
    "viewed-links": [link?.$id],
  };

  const updateLinkData: LinkUpdate = {
    clicks: link.clicks + 1,
  };

  if (!viewer) {
    viewer = await createNewViewer(viewerData);
    updateLinkData.uniqueClicks = link.uniqueClicks + 1;
  } else {
    const viewedLinks: string[] = viewer["viewed-links"] || [];

    if (!viewedLinks.includes(link.$id)) {
      viewedLinks.push(link.$id);
      updateLinkData.uniqueClicks = link.uniqueClicks + 1;
    }
    await updateViewerByDocumentId(viewer.$id, viewedLinks);
  }

  await updateLinkByDocumentId(link?.$id, updateLinkData);
  return NextResponse.redirect(link.originalUrl);
}
