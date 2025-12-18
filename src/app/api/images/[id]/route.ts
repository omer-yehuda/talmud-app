import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "src", "assets", "images");

type ImageEntry = { filename: string; type: "png" | "svg" };

const VALID_IMAGES: Record<string, ImageEntry> = {
  "beit-midrash": { filename: "6bdf1127-745a-41cd-99e0-f1a6f4ffca73.png", type: "png" },
  "tiberias": { filename: "dfb5f465-22db-4a91-9cfe-ecf00f069d78.png", type: "png" },
  "ahasuerus": { filename: "8b434647-0756-4189-8bd9-a4c70e90e2e1.png", type: "png" },
  "calendar": { filename: "calendar.svg", type: "svg" },
  "walls": { filename: "walls.svg", type: "svg" },
  "minyan": { filename: "minyan.svg", type: "svg" },
  "mishloachmanot": { filename: "mishloachmanot.svg", type: "svg" },
  "megillah": { filename: "megillah.svg", type: "svg" },
  "compare": { filename: "compare.svg", type: "svg" },
  "warrior": { filename: "warrior.svg", type: "svg" },
  "crown": { filename: "crown.svg", type: "svg" },
  "vashti": { filename: "vashti.svg", type: "svg" },
  "justice": { filename: "justice.svg", type: "svg" },
  "prophets": { filename: "prophets.svg", type: "svg" },
  "prophetesses": { filename: "prophetesses.svg", type: "svg" },
  "reading": { filename: "reading.svg", type: "svg" },
  "languages": { filename: "languages.svg", type: "svg" },
  "scroll": { filename: "scroll.svg", type: "svg" },
  "congregation": { filename: "congregation.svg", type: "svg" },
  "blessing": { filename: "blessing.svg", type: "svg" },
  "torah": { filename: "torah.svg", type: "svg" },
  "special_days": { filename: "special_days.svg", type: "svg" },
  "haftara": { filename: "haftara.svg", type: "svg" },
  "standing": { filename: "standing.svg", type: "svg" },
  "synagogue": { filename: "synagogue.svg", type: "svg" },
  "sale": { filename: "sale.svg", type: "svg" },
  "books": { filename: "books.svg", type: "svg" },
  "four_portions": { filename: "four_portions.svg", type: "svg" },
  "red_heifer": { filename: "red_heifer.svg", type: "svg" },
  "holidays": { filename: "holidays.svg", type: "svg" },
  "conclusion": { filename: "conclusion.svg", type: "svg" },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const imageEntry = VALID_IMAGES[id];

  if (!imageEntry) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  try {
    const imagePath = path.join(IMAGES_DIR, imageEntry.filename);
    const imageBuffer = await readFile(imagePath);
    const contentType = imageEntry.type === "svg" ? "image/svg+xml" : "image/png";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
