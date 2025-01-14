"use server";

import {
  deleteLinkByDocumentId,
  LinkUpdate,
  updateLinkByDocumentId,
} from "@/repositories/linkRepo";
import { getViewerByLinkId } from "@/repositories/viwerRepo";
import { revalidatePath } from "next/cache";

export async function updateLinkAction(documentId: string, data: LinkUpdate) {
  try {
    await updateLinkByDocumentId(documentId, data);
    revalidatePath("/dashboard/links");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteLinkAction(documentId: string) {
  try {
    await deleteLinkByDocumentId(documentId);
    revalidatePath("/dashboard/links");
  } catch (error) {
    console.error(error);
  }
}

export async function getViewersByLinkIdAction(linkId: string) {
  return getViewerByLinkId(linkId);
}
