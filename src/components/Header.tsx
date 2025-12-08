"use client";

import type { PageInfo } from "@/types";
import { MASECHET, LABELS } from "@/lib/constants";
import { colors } from "@/lib/styles";
import { useNavigationState } from "@/hooks";
import { Icon } from "./ui";

interface HeaderProps {
  pages: PageInfo[];
  activePageId: string | null;
  onPageChange: (pageId: string) => void;
  onGoHome: () => void;
}

export function Header({ pages, activePageId, onPageChange, onGoHome }: HeaderProps): React.ReactElement {
  const { isOpen, toggleOpen, activePage, handlePageSelect, dropdownRef } = useNavigationState({
    pages,
    activePageId,
    onPageChange,
    closeOnClickOutside: true,
  });

  return (
    <header className="bg-dark sticky top-0 z-50 shadow-lg text-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Icon name="menu_book" className="text-3xl text-primary-light" />
          <div>
            <h1 className="text-2xl font-bold font-gemara tracking-wide">
              {MASECHET.title}
            </h1>
            <p className="text-sm text-slate-400">
              {MASECHET.pageRange}
            </p>
          </div>
        </button>

        <div ref={dropdownRef} className="relative hidden md:block">
          <button
            onClick={toggleOpen}
            className="flex items-center gap-2 bg-dark-medium hover:bg-dark-light px-4 py-2 rounded-lg border border-slate-600 min-w-[200px] justify-between text-amber-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {activePage && (
                <Icon name={activePage.icon} style={{ color: colors.primary.light }} />
              )}
              <span className="font-medium">
                {activePage ? activePage.title : LABELS.selectPage}
              </span>
            </div>
            <Icon
              name={isOpen ? "expand_less" : "expand_more"}
              className="text-slate-400"
            />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-dark-medium border border-slate-600 rounded-lg shadow-xl max-h-96 overflow-auto z-50">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handlePageSelect(page.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-right border-b border-dark-light last:border-b-0 hover:bg-dark-light transition-colors ${
                    activePageId === page.id ? "bg-dark-light text-primary-light" : "text-amber-50"
                  }`}
                >
                  <Icon
                    name={page.icon}
                    style={{ color: activePageId === page.id ? colors.primary.light : colors.text.secondary }}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{page.title}</p>
                    <p className="text-xs text-slate-400 truncate">{page.description}</p>
                  </div>
                  {activePageId === page.id && (
                    <Icon name="check" style={{ color: colors.primary.light }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
