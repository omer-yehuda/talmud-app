import { render, screen, fireEvent } from "@testing-library/react";
import { StudyCard } from "@/components/StudyCard";
import type { StudyTopic } from "@/types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const mockTopic: StudyTopic = {
  id: 6,
  page: "ו",
  title: "רקת היא טבריה",
  image: "/api/images/tiberias",
  caption: "טבריה העתיקה על שפת הכינרת",
  gemara: "אמר רבי יוחנן: למה נקרא שמה רקת? משום שאפילו ריקנין שבה מלאים מצוות כרימון.",
  rashi: {
    title: 'רש"י (ד"ה רקת):',
    text: "למה נקרא שמה רקת - משום שיושבת על שפת הים",
  },
  tosafot: {
    title: 'תוספות (ד"ה ורקת):',
    text: "תוספות מקשים: אם רקת היא טבריה, איך היא נחשבת מוקפת חומה?",
  },
  question: {
    text: "מדוע נקראה טבריה בשם רקת?",
    answer: "בגלל שאפילו ריקנין שבה מלאים מצוות כרימון",
  },
};

describe("StudyCard", () => {
  it("renders topic title and page", () => {
    render(<StudyCard topic={mockTopic} />);

    expect(screen.getByText("רקת היא טבריה")).toBeInTheDocument();
    expect(screen.getByText("ו")).toBeInTheDocument();
  });

  it("renders gemara text", () => {
    render(<StudyCard topic={mockTopic} />);

    expect(screen.getByText(/אמר רבי יוחנן/)).toBeInTheDocument();
  });

  it("renders image with caption", () => {
    render(<StudyCard topic={mockTopic} />);

    expect(screen.getByAltText("טבריה העתיקה על שפת הכינרת")).toBeInTheDocument();
    expect(screen.getByText("טבריה העתיקה על שפת הכינרת")).toBeInTheDocument();
  });

  it("renders question text", () => {
    render(<StudyCard topic={mockTopic} />);

    expect(screen.getByText("מדוע נקראה טבריה בשם רקת?")).toBeInTheDocument();
  });

  it("hides answer initially with reveal button", () => {
    render(<StudyCard topic={mockTopic} />);

    expect(screen.getByText("גלה תשובה")).toBeInTheDocument();
  });

  it("reveals answer when button is clicked", () => {
    render(<StudyCard topic={mockTopic} />);

    const revealButton = screen.getByText("גלה תשובה").closest("button");
    fireEvent.click(revealButton!);

    expect(screen.queryByText("גלה תשובה")).not.toBeInTheDocument();
  });

  it("renders rashi commentary", () => {
    render(<StudyCard topic={mockTopic} />);

    expect(screen.getByText('רש"י מבאר')).toBeInTheDocument();
  });

  it("renders tosafot commentary", () => {
    render(<StudyCard topic={mockTopic} />);

    expect(screen.getByText("תוספות מקשה")).toBeInTheDocument();
  });

  it("renders without rashi when not provided", () => {
    const topicWithoutRashi = { ...mockTopic, rashi: undefined };
    render(<StudyCard topic={topicWithoutRashi} />);

    expect(screen.queryByText('רש"י מבאר')).not.toBeInTheDocument();
  });

  it("renders without tosafot when not provided", () => {
    const topicWithoutTosafot = { ...mockTopic, tosafot: undefined };
    render(<StudyCard topic={topicWithoutTosafot} />);

    expect(screen.queryByText("תוספות מקשה")).not.toBeInTheDocument();
  });
});
