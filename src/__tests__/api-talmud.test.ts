import { studyTopics, comparisonItems } from "@/lib/data";

describe("Talmud API Data Service", () => {
  describe("studyTopics data", () => {
    it("should have 31 study topics (covering pages 2-32)", () => {
      expect(studyTopics).toHaveLength(31);
    });

    it("should return topics with required fields", () => {
      studyTopics.forEach((topic) => {
        expect(topic.id).toBeDefined();
        expect(topic.title).toBeDefined();
        expect(topic.page).toBeDefined();
        expect(topic.gemara).toBeDefined();
        expect(topic.question).toBeDefined();
        expect(topic.question.text).toBeDefined();
        expect(topic.question.answer).toBeDefined();
      });
    });

    it("should have valid image paths", () => {
      studyTopics.forEach((topic) => {
        expect(topic.image).toBeDefined();
        expect(typeof topic.image).toBe("string");
      });
    });

    it("should have valid captions", () => {
      studyTopics.forEach((topic) => {
        expect(topic.caption).toBeDefined();
        expect(topic.caption.length).toBeGreaterThan(0);
      });
    });
  });

  describe("comparisonItems data", () => {
    it("should have 4 comparison items", () => {
      expect(comparisonItems).toHaveLength(4);
    });

    it("should return comparison items with required fields", () => {
      comparisonItems.forEach((item) => {
        expect(item.label).toBeDefined();
        expect(item.diff).toBeDefined();
        expect(item.details).toBeDefined();
        expect(item.icon).toBeDefined();
      });
    });

    it("should have valid Material Symbols icon names", () => {
      const validIcons = [
        "calendar_month",
        "restaurant",
        "front_hand",
        "menu_book",
      ];
      comparisonItems.forEach((item) => {
        expect(validIcons).toContain(item.icon);
      });
    });
  });

  describe("Data integrity", () => {
    it("should have unique topic IDs", () => {
      const ids = studyTopics.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have unique comparison labels", () => {
      const labels = comparisonItems.map((c) => c.label);
      const uniqueLabels = new Set(labels);
      expect(uniqueLabels.size).toBe(labels.length);
    });

    it("should have non-empty Hebrew text in all topics", () => {
      studyTopics.forEach((topic) => {
        expect(topic.title).toMatch(/[\u0590-\u05FF]/);
        expect(topic.gemara).toMatch(/[\u0590-\u05FF]/);
      });
    });

    it("should have non-empty Hebrew text in all comparisons", () => {
      comparisonItems.forEach((item) => {
        expect(item.label).toMatch(/[\u0590-\u05FF]/);
        expect(item.diff).toMatch(/[\u0590-\u05FF]/);
      });
    });
  });
});
