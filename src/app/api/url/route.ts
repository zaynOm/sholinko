import { createNewLink } from "@/repositories/urlRepo";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const document = await createNewLink(body);
    return NextResponse.json(document);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
