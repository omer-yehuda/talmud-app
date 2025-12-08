"use client";

import type { PageInfo } from "@/types";
import { Icon } from "./ui";

interface PageNavigationProps {
  pages: PageInfo[];
  activePageId: string | null;
  onPageChange: (pageId: string) => void;
}

export function PageNavigation({
  pages,
  activePageId,
  onPageChange,
}: PageNavigationProps): React.ReactElement | null {
  if (!activePageId || pages.length === 0) return null;

  const currentIndex = pages.findIndex((p) => p.id === activePageId);
  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-stretch gap-4">
      <NavButton
        page={prevPage}
        direction="prev"
        onClick={() => prevPage && onPageChange(prevPage.id)}
      />
      <NavButton
        page={nextPage}
        direction="next"
        onClick={() => nextPage && onPageChange(nextPage.id)}
      />
    </div>
  );
}

interface NavButtonProps {
  page: PageInfo | null;
  direction: "prev" | "next";
  onClick: () => void;
}

function NavButton({ page, direction, onClick }: NavButtonProps): React.ReactElement {
  const isDisabled = !page;
  const isPrev = direction === "prev";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex-1 flex flex-col items-center gap-1 p-4 rounded-lg border border-slate-200 bg-white transition-all duration-200 ${
        isDisabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-slate-50 hover:border-secondary-main"
      }`}
    >
      <div className="flex items-center gap-2">
        {isPrev && (
          <Icon
            name="arrow_forward"
            className={isDisabled ? "text-muted" : "text-secondary-main"}
          />
        )}
        <span className="text-xs text-muted font-medium">
          {isPrev ? "הדף הקודם" : "הדף הבא"}
        </span>
        {!isPrev && (
          <Icon
            name="arrow_back"
            className={isDisabled ? "text-muted" : "text-secondary-main"}
          />
        )}
      </div>
      <span className="text-sm font-bold text-slate-900">
        {page ? page.title : "—"}
      </span>
    </button>
  );
}
