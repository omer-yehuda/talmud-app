import { useState, useEffect, useCallback } from "react";
import type { PageInfo, PageContent } from "@/types";

interface UsePagesResult {
  pages: PageInfo[];
  isLoading: boolean;
  error: string | null;
}

interface UsePageContentResult {
  content: PageContent | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePages(): UsePagesResult {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPages(): Promise<void> {
      try {
        const res = await fetch("/api/pages");
        if (!res.ok) throw new Error(`Failed to fetch pages: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setPages(data.pages);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load pages");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPages();
    return (): void => { cancelled = true; };
  }, []);

  return { pages, isLoading, error };
}

export function usePageContent(pageId: string | null): UsePageContentResult {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    if (!pageId) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/pages/${pageId}`);
      if (!res.ok) throw new Error(`Failed to fetch content: ${res.status}`);
      const data: PageContent = await res.json();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content");
      setContent(null);
    } finally {
      setIsLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, isLoading, error, refetch: fetchContent };
}
