export function getCacheHeaders(): Record<string, string> {
  const isDev = process.env.NODE_ENV === "development";
  return {
    "Cache-Control": isDev
      ? "no-store, no-cache, must-revalidate"
      : "public, max-age=3600, stale-while-revalidate=86400",
  };
}
