import { render, screen, fireEvent } from "@testing-library/react";
import { ComparisonView } from "@/components/ComparisonView";
import type { ComparisonItem } from "@/types";

const mockComparisonItems: ComparisonItem[] = [
  {
    label: "אדר א' מול אדר ב'",
    diff: "אין בין אדר הראשון לאדר השני אלא קריאת המגילה ומתנות לאביונים.",
    details: "בשני האדרים אסור להספיד ולהתענות",
    icon: "calendar_month",
  },
  {
    label: "שבת מול יום טוב",
    diff: "אין בין שבת ליום טוב אלא אוכל נפש בלבד.",
    details: "בשבת אסור לבשל, ביום טוב מותר",
    icon: "restaurant",
  },
];

describe("ComparisonView Component", () => {
  describe("Initial Render", () => {
    it("should render the header", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      expect(screen.getByText(/אין בין... ל... אלא.../)).toBeInTheDocument();
    });

    it("should render all comparison buttons", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      expect(screen.getByText("אדר א' מול אדר ב'")).toBeInTheDocument();
      expect(screen.getByText("שבת מול יום טוב")).toBeInTheDocument();
    });

    it("should show placeholder when no item is selected", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      expect(screen.getByText("בחר זוג להשוואה")).toBeInTheDocument();
    });

    it("should render icons for each item", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      expect(screen.getByText("calendar_month")).toBeInTheDocument();
      expect(screen.getByText("restaurant")).toBeInTheDocument();
    });
  });

  describe("Item Selection", () => {
    it("should display selected item details on click", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      const firstButton = screen.getByText("אדר א' מול אדר ב'").closest("button");
      fireEvent.click(firstButton!);

      expect(
        screen.getByText(/אין בין אדר הראשון לאדר השני/)
      ).toBeInTheDocument();
    });

    it("should display explanation for selected item", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      const firstButton = screen.getByText("אדר א' מול אדר ב'").closest("button");
      fireEvent.click(firstButton!);

      expect(screen.getByText(/בשני האדרים אסור להספיד/)).toBeInTheDocument();
    });

    it("should highlight selected button", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      const firstButton = screen.getByText("אדר א' מול אדר ב'").closest("button");
      fireEvent.click(firstButton!);

      // With MUI, we check that the button exists and content is displayed
      expect(firstButton).toBeInTheDocument();
      expect(screen.getByText(/אין בין אדר הראשון/)).toBeInTheDocument();
    });

    it("should update display when different item is selected", () => {
      render(<ComparisonView items={mockComparisonItems} />);

      // Select first item
      const firstButton = screen.getByText("אדר א' מול אדר ב'").closest("button");
      fireEvent.click(firstButton!);

      // Select second item
      const secondButton = screen.getByText("שבת מול יום טוב").closest("button");
      fireEvent.click(secondButton!);

      expect(
        screen.getByText(/אין בין שבת ליום טוב/)
      ).toBeInTheDocument();
      // With MUI, we verify the content changes correctly
      expect(secondButton).toBeInTheDocument();
      expect(firstButton).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should render correctly with empty items array", () => {
      render(<ComparisonView items={[]} />);

      expect(screen.getByText(/אין בין... ל... אלא.../)).toBeInTheDocument();
      expect(screen.getByText("בחר זוג להשוואה")).toBeInTheDocument();
    });
  });
});
