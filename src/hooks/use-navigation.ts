"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { PageInfo } from "@/types";
import { createClickOutsideHandler } from "@/lib/utils";

interface UseNavigationStateOptions {
  pages: PageInfo[];
  activePageId: string | null;
  onPageChange: (pageId: string) => void;
  closeOnClickOutside?: boolean;
}

interface UseNavigationStateResult {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  activePage: PageInfo | undefined;
  handlePageSelect: (pageId: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export function useNavigationState({
  pages,
  activePageId,
  onPageChange,
  closeOnClickOutside = false,
}: UseNavigationStateOptions): UseNavigationStateResult {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activePage = pages.find((p) => p.id === activePageId);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handlePageSelect = useCallback((pageId: string): void => {
    onPageChange(pageId);
    setIsOpen(false);
  }, [onPageChange]);

  useEffect(() => {
    if (!closeOnClickOutside) return;

    const handleClickOutside = createClickOutsideHandler(dropdownRef, () => setIsOpen(false));
    document.addEventListener("mousedown", handleClickOutside);
    return (): void => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickOutside]);

  return {
    isOpen,
    setIsOpen,
    toggleOpen,
    activePage,
    handlePageSelect,
    dropdownRef,
  };
}
