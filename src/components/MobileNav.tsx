"use client";

import type { PageInfo } from "@/types";
import { LABELS } from "@/lib/constants";
import { useNavigationState } from "@/hooks";
import { Icon } from "./ui";

interface MobileNavProps {
  pages: PageInfo[];
  activePageId: string | null;
  onPageChange: (pageId: string) => void;
}

export function MobileNav({ pages, activePageId, onPageChange }: MobileNavProps): React.ReactElement {
  const { isOpen, setIsOpen, toggleOpen, activePage, handlePageSelect } = useNavigationState({
    pages,
    activePageId,
    onPageChange,
  });

  return (
    <nav className="block md:hidden fixed bottom-0 left-0 right-0 z-50">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 bg-white border-t border-slate-200 max-h-80 overflow-auto z-50 shadow-lg">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => handlePageSelect(page.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-right border-b border-slate-100 ${
                activePageId === page.id ? "bg-indigo-50 text-blue-900" : ""
              }`}
            >
              <Icon
                name={page.icon}
                className={activePageId === page.id ? "text-secondary-main" : "text-slate-400"}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{page.title}</p>
                <p className="text-xs text-slate-400 truncate">{page.description}</p>
              </div>
              {activePageId === page.id && (
                <Icon name="check" className="text-secondary-main" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button
          onClick={toggleOpen}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-3">
            {activePage ? (
              <>
                <Icon name={activePage.icon} className="text-secondary-main" />
                <div className="text-right">
                  <p className="font-medium text-sm text-slate-900">{activePage.title}</p>
                  <p className="text-xs text-slate-400">{activePage.description}</p>
                </div>
              </>
            ) : (
              <span className="text-muted">{LABELS.selectPage}</span>
            )}
          </div>
          <Icon
            name={isOpen ? "expand_more" : "expand_less"}
            className="text-2xl text-slate-400"
          />
        </button>
      </div>
    </nav>
  );
}
