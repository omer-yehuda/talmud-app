import { NextResponse } from "next/server";
import type { PageContent } from "@/types";
import { getPageContent } from "@/lib/data";
import { getCacheHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<PageContent | { error: string; message: string }>> {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Bad Request", message: "Page ID is required" },
      { status: 400 }
    );
  }

  const content = getPageContent(id);

  if (!content) {
    return NextResponse.json(
      { error: "Not Found", message: `Page with ID '${id}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(content, { status: 200, headers: getCacheHeaders() });
}
