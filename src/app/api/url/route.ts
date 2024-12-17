import { createUrl } from "@/repositories/urlRepo";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const document = await createUrl(body);
    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
