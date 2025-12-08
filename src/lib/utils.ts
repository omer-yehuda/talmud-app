export function createClickOutsideHandler(
  ref: React.RefObject<HTMLElement | null>,
  onClickOutside: () => void
): (event: MouseEvent) => void {
  return (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside();
    }
  };
}

export function getCacheHeaders(): Record<string, string> {
  const isDev = process.env.NODE_ENV === "development";
  return {
    "Cache-Control": isDev
      ? "no-store, no-cache, must-revalidate"
      : "public, max-age=3600, stale-while-revalidate=86400",
  };
}
