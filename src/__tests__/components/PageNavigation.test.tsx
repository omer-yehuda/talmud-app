import { render, screen, fireEvent } from "@testing-library/react";
import { PageNavigation } from "@/components/PageNavigation";
import type { PageInfo } from "@/types";

const mockPages: PageInfo[] = [
  { id: "2", title: "דף ב", description: "זמנים לקריאת המגילה", icon: "schedule", type: "study" },
  { id: "3", title: "דף ג", description: "מוקפות חומה מימות יהושע", icon: "location_city", type: "study" },
  { id: "4", title: "דף ד", description: "עיירות גדולות ועשרה בטלנים", icon: "groups", type: "study" },
];

describe("PageNavigation", () => {
  it("returns null when no activePageId", () => {
    const { container } = render(
      <PageNavigation pages={mockPages} activePageId={null} onPageChange={jest.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("returns null when pages array is empty", () => {
    const { container } = render(
      <PageNavigation pages={[]} activePageId="2" onPageChange={jest.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("returns null when activePageId not found in pages", () => {
    const { container } = render(
      <PageNavigation pages={mockPages} activePageId="999" onPageChange={jest.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders prev and next buttons", () => {
    render(<PageNavigation pages={mockPages} activePageId="3" onPageChange={jest.fn()} />);

    expect(screen.getByText("הדף הקודם")).toBeInTheDocument();
    expect(screen.getByText("הדף הבא")).toBeInTheDocument();
  });

  it("shows correct page titles for prev and next", () => {
    render(<PageNavigation pages={mockPages} activePageId="3" onPageChange={jest.fn()} />);

    expect(screen.getByText("דף ב")).toBeInTheDocument();
    expect(screen.getByText("דף ד")).toBeInTheDocument();
  });

  it("disables prev button on first page", () => {
    render(<PageNavigation pages={mockPages} activePageId="2" onPageChange={jest.fn()} />);

    const prevButton = screen.getByText("הדף הקודם").closest("button");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<PageNavigation pages={mockPages} activePageId="4" onPageChange={jest.fn()} />);

    const nextButton = screen.getByText("הדף הבא").closest("button");
    expect(nextButton).toBeDisabled();
  });

  it("shows dash when prev page is unavailable", () => {
    render(<PageNavigation pages={mockPages} activePageId="2" onPageChange={jest.fn()} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("—");
  });

  it("shows dash when next page is unavailable", () => {
    render(<PageNavigation pages={mockPages} activePageId="4" onPageChange={jest.fn()} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toHaveTextContent("—");
  });

  it("calls onPageChange with prev page id when prev button clicked", () => {
    const onPageChange = jest.fn();
    render(<PageNavigation pages={mockPages} activePageId="3" onPageChange={onPageChange} />);

    const prevButton = screen.getByText("הדף הקודם").closest("button");
    fireEvent.click(prevButton!);

    expect(onPageChange).toHaveBeenCalledWith("2");
  });

  it("calls onPageChange with next page id when next button clicked", () => {
    const onPageChange = jest.fn();
    render(<PageNavigation pages={mockPages} activePageId="3" onPageChange={onPageChange} />);

    const nextButton = screen.getByText("הדף הבא").closest("button");
    fireEvent.click(nextButton!);

    expect(onPageChange).toHaveBeenCalledWith("4");
  });

  it("does not call onPageChange when clicking disabled prev button", () => {
    const onPageChange = jest.fn();
    render(<PageNavigation pages={mockPages} activePageId="2" onPageChange={onPageChange} />);

    const prevButton = screen.getByText("הדף הקודם").closest("button");
    fireEvent.click(prevButton!);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("does not call onPageChange when clicking disabled next button", () => {
    const onPageChange = jest.fn();
    render(<PageNavigation pages={mockPages} activePageId="4" onPageChange={onPageChange} />);

    const nextButton = screen.getByText("הדף הבא").closest("button");
    fireEvent.click(nextButton!);

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
