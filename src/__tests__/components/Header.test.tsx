import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/components/Header";
import type { PageInfo } from "@/types";

const mockPages: PageInfo[] = [
  { id: "2", title: "דף ב", description: "זמנים לקריאת המגילה", icon: "schedule", type: "study" },
  { id: "3", title: "דף ג", description: "מוקפות חומה מימות יהושע", icon: "location_city", type: "study" },
  { id: "4", title: "דף ד", description: "עיירות גדולות ועשרה בטלנים", icon: "groups", type: "study" },
];

const defaultProps = {
  pages: mockPages,
  activePageId: "2" as string | null,
  onPageChange: jest.fn(),
  onGoHome: jest.fn(),
};

describe("Header", () => {
  it("renders masechet title", () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText("מסכת מגילה")).toBeInTheDocument();
  });

  it("renders page range", () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText(/דפים ב' - ל"ב/)).toBeInTheDocument();
  });

  it("shows active page title in dropdown button", () => {
    render(<Header {...defaultProps} activePageId="3" />);

    expect(screen.getByText("דף ג")).toBeInTheDocument();
  });

  it("shows select page text when no active page", () => {
    render(<Header {...defaultProps} activePageId={null} />);

    expect(screen.getByText("בחר דף")).toBeInTheDocument();
  });

  it("calls onGoHome when clicking the logo", () => {
    const onGoHome = jest.fn();
    render(<Header {...defaultProps} onGoHome={onGoHome} />);

    const logoButton = screen.getByText("מסכת מגילה").closest("button");
    fireEvent.click(logoButton!);

    expect(onGoHome).toHaveBeenCalled();
  });

  it("opens dropdown menu on button click", () => {
    render(<Header {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const dropdownButton = buttons.find((btn) => btn.textContent?.includes("דף ב"));
    fireEvent.click(dropdownButton!);

    expect(screen.getByText("דף ג")).toBeInTheDocument();
    expect(screen.getByText("דף ד")).toBeInTheDocument();
  });

  it("closes dropdown menu on second click", () => {
    render(<Header {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const dropdownButton = buttons.find((btn) => btn.textContent?.includes("דף ב"));
    fireEvent.click(dropdownButton!);
    fireEvent.click(dropdownButton!);

    expect(screen.queryByText("מוקפות חומה מימות יהושע")).not.toBeInTheDocument();
  });

  it("calls onPageChange when selecting a page", () => {
    const onPageChange = jest.fn();
    render(<Header {...defaultProps} onPageChange={onPageChange} />);

    const buttons = screen.getAllByRole("button");
    const dropdownButton = buttons.find((btn) => btn.textContent?.includes("דף ב"));
    fireEvent.click(dropdownButton!);

    const pageOption = screen.getByText("דף ג").closest("button");
    fireEvent.click(pageOption!);

    expect(onPageChange).toHaveBeenCalledWith("3");
  });

  it("closes dropdown after selecting a page", () => {
    render(<Header {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const dropdownButton = buttons.find((btn) => btn.textContent?.includes("דף ב"));
    fireEvent.click(dropdownButton!);

    const pageOption = screen.getByText("דף ג").closest("button");
    fireEvent.click(pageOption!);

    expect(screen.queryByText("מוקפות חומה מימות יהושע")).not.toBeInTheDocument();
  });

  it("shows expand_more icon when closed", () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText("expand_more")).toBeInTheDocument();
  });

  it("shows expand_less icon when open", () => {
    render(<Header {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const dropdownButton = buttons.find((btn) => btn.textContent?.includes("דף ב"));
    fireEvent.click(dropdownButton!);

    expect(screen.getByText("expand_less")).toBeInTheDocument();
  });

  it("renders all pages in dropdown", () => {
    render(<Header {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    const dropdownButton = buttons.find((btn) => btn.textContent?.includes("דף ב"));
    fireEvent.click(dropdownButton!);

    mockPages.forEach((page) => {
      expect(screen.getByText(page.description)).toBeInTheDocument();
    });
  });
});
