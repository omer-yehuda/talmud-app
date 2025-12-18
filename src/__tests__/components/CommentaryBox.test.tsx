import { render, screen, fireEvent } from "@testing-library/react";
import { CommentaryBox } from "@/components/CommentaryBox";
import type { Commentary } from "@/types";

const mockRashiCommentary: Commentary = {
  title: 'רש"י (רקת:',
  text: "למה נקרא שמה רקת - משום שיושבת על שפת הים",
};

const mockTosafotCommentary: Commentary = {
  title: 'ורקת:',
  text: "תוספות מקשים: אם רקת היא טבריה, איך היא נחשבת מוקפת חומה?",
};

describe("CommentaryBox Component", () => {
  describe("Rashi Commentary", () => {
    it("should render Rashi header", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      expect(screen.getByText('רש"י')).toBeInTheDocument();
    });

    it("should display lightbulb icon for Rashi", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      expect(screen.getByText("lightbulb")).toBeInTheDocument();
    });

    it("should expand content on click", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      const header = screen.getByRole("button");
      fireEvent.click(header);

      expect(screen.getByText(/למה נקרא שמה רקת/)).toBeVisible();
    });

    it("should toggle aria-expanded on multiple clicks", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      const header = screen.getByRole("button");

      expect(header).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(header);
      expect(header).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(header);
      expect(header).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Tosafot Commentary", () => {
    it("should render Tosafot header", () => {
      render(
        <CommentaryBox commentary={mockTosafotCommentary} type="tosafot" />
      );

      expect(screen.getByText("תוספות")).toBeInTheDocument();
    });

    it("should display quiz icon for Tosafot", () => {
      render(
        <CommentaryBox commentary={mockTosafotCommentary} type="tosafot" />
      );

      expect(screen.getByText("quiz")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper role and aria attributes", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should be keyboard accessible", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Content Display", () => {
    it("should display commentary title", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByText(mockRashiCommentary.title)).toBeInTheDocument();
    });

    it("should display commentary text", () => {
      render(
        <CommentaryBox commentary={mockRashiCommentary} type="rashi" />
      );

      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByText(/למה נקרא שמה רקת/)).toBeInTheDocument();
    });
  });
});
