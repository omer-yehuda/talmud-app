import { NextResponse } from "next/server";
import type { PagesListResponse } from "@/types";
import { pages } from "@/lib/data";
import { getCacheHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<PagesListResponse>> {
  return NextResponse.json(
    { pages, total: pages.length },
    { status: 200, headers: getCacheHeaders() }
  );
}
