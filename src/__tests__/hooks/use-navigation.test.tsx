import { renderHook, act } from "@testing-library/react";
import { useNavigationState } from "@/hooks/use-navigation";
import type { PageInfo } from "@/types";

const mockPages: PageInfo[] = [
  { id: "2", title: "דף ב", description: "זמנים לקריאת המגילה", icon: "schedule", type: "study" },
  { id: "3", title: "דף ג", description: "מוקפות חומה מימות יהושע", icon: "location_city", type: "study" },
  { id: "4", title: "דף ד", description: "עיירות גדולות ועשרה בטלנים", icon: "groups", type: "study" },
];

describe("useNavigationState", () => {
  it("initializes with isOpen false", () => {
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: "2",
        onPageChange: jest.fn(),
      })
    );

    expect(result.current.isOpen).toBe(false);
  });

  it("finds active page by id", () => {
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: "3",
        onPageChange: jest.fn(),
      })
    );

    expect(result.current.activePage?.id).toBe("3");
    expect(result.current.activePage?.title).toBe("דף ג");
  });

  it("returns undefined activePage when id not found", () => {
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: "999",
        onPageChange: jest.fn(),
      })
    );

    expect(result.current.activePage).toBeUndefined();
  });

  it("returns undefined activePage when activePageId is null", () => {
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: null,
        onPageChange: jest.fn(),
      })
    );

    expect(result.current.activePage).toBeUndefined();
  });

  it("toggleOpen switches isOpen state", () => {
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: "2",
        onPageChange: jest.fn(),
      })
    );

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggleOpen();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleOpen();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("setIsOpen directly sets state", () => {
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: "2",
        onPageChange: jest.fn(),
      })
    );

    act(() => {
      result.current.setIsOpen(true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setIsOpen(false);
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("handlePageSelect calls onPageChange and closes dropdown", () => {
    const onPageChange = jest.fn();
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: "2",
        onPageChange,
      })
    );

    act(() => {
      result.current.setIsOpen(true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handlePageSelect("3");
    });

    expect(onPageChange).toHaveBeenCalledWith("3");
    expect(result.current.isOpen).toBe(false);
  });

  it("provides dropdownRef", () => {
    const { result } = renderHook(() =>
      useNavigationState({
        pages: mockPages,
        activePageId: "2",
        onPageChange: jest.fn(),
      })
    );

    expect(result.current.dropdownRef).toBeDefined();
    expect(result.current.dropdownRef.current).toBeNull();
  });

  it("updates activePage when activePageId changes", () => {
    const { result, rerender } = renderHook(
      ({ activePageId }) =>
        useNavigationState({
          pages: mockPages,
          activePageId,
          onPageChange: jest.fn(),
        }),
      { initialProps: { activePageId: "2" } }
    );

    expect(result.current.activePage?.id).toBe("2");

    rerender({ activePageId: "4" });

    expect(result.current.activePage?.id).toBe("4");
  });

  it("updates activePage when pages array changes", () => {
    const { result, rerender } = renderHook(
      ({ pages }) =>
        useNavigationState({
          pages,
          activePageId: "5",
          onPageChange: jest.fn(),
        }),
      { initialProps: { pages: mockPages } }
    );

    expect(result.current.activePage).toBeUndefined();

    const newPages = [
      ...mockPages,
      { id: "5", title: "דף ה", description: "תוכן חדש", icon: "book", type: "study" as const },
    ];

    rerender({ pages: newPages });

    expect(result.current.activePage?.id).toBe("5");
  });
});
