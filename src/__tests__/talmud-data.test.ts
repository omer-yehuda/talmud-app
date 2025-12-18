import {
  studyTopics,
  comparisonItems,
  pages,
  getPageContent,
} from "@/lib/data";
import { isStudyPage } from "@/types";

describe("Talmud Data Library", () => {
  describe("studyTopics", () => {
    it("should contain 31 study topics (pages 2-32)", () => {
      expect(studyTopics).toHaveLength(31);
    });

    it("should have valid structure for each topic", () => {
      studyTopics.forEach((topic) => {
        expect(topic).toHaveProperty("id");
        expect(topic).toHaveProperty("page");
        expect(topic).toHaveProperty("title");
        expect(topic).toHaveProperty("image");
        expect(topic).toHaveProperty("caption");
        expect(topic).toHaveProperty("gemara");
        expect(topic).toHaveProperty("rashi");
        expect(topic).toHaveProperty("tosafot");
        expect(topic).toHaveProperty("question");
        expect(topic.question).toHaveProperty("text");
        expect(topic.question).toHaveProperty("answer");
      });
    });

    it("should have unique IDs for each topic", () => {
      const ids = studyTopics.map((topic) => topic.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have unique page references for each topic", () => {
      const pageRefs = studyTopics.map((topic) => topic.page);
      const uniquePages = new Set(pageRefs);
      expect(uniquePages.size).toBe(pageRefs.length);
    });

    it("should have valid values for required fields", () => {
      studyTopics.forEach((topic) => {
        expect(topic.id).toBeGreaterThan(0);
        expect(topic.title.length).toBeGreaterThan(0);
        expect(topic.gemara.length).toBeGreaterThan(0);
        expect(topic.question.text.length).toBeGreaterThan(0);
        expect(topic.question.answer.length).toBeGreaterThan(0);
      });
    });

    it("should have rashi and tosafot commentaries for each topic", () => {
      studyTopics.forEach((topic) => {
        expect(topic.rashi).toBeDefined();
        expect(topic.rashi?.title.length).toBeGreaterThan(0);
        expect(topic.rashi?.text.length).toBeGreaterThan(0);
        expect(topic.tosafot).toBeDefined();
        expect(topic.tosafot?.title.length).toBeGreaterThan(0);
        expect(topic.tosafot?.text.length).toBeGreaterThan(0);
      });
    });

    it("should have valid Hebrew page letters", () => {
      const hebrewLetters = ["ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל", "לא", "לב"];
      studyTopics.forEach((topic) => {
        expect(hebrewLetters).toContain(topic.page);
      });
    });
  });

  describe("comparisonItems", () => {
    it("should contain 4 comparison items", () => {
      expect(comparisonItems).toHaveLength(4);
    });

    it("should have valid structure for each item", () => {
      comparisonItems.forEach((item) => {
        expect(item).toHaveProperty("label");
        expect(item).toHaveProperty("diff");
        expect(item).toHaveProperty("details");
        expect(item).toHaveProperty("icon");
      });
    });

    it("should have non-empty strings for all fields", () => {
      comparisonItems.forEach((item) => {
        expect(item.label.length).toBeGreaterThan(0);
        expect(item.diff.length).toBeGreaterThan(0);
        expect(item.details.length).toBeGreaterThan(0);
        expect(item.icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe("pages", () => {
    it("should contain 31 pages (daf 2 through daf 32)", () => {
      expect(pages).toHaveLength(31);
    });

    it("should have valid structure for each page", () => {
      pages.forEach((page) => {
        expect(page).toHaveProperty("id");
        expect(page).toHaveProperty("title");
        expect(page).toHaveProperty("description");
        expect(page).toHaveProperty("icon");
        expect(page).toHaveProperty("type");
      });
    });

    it("should have unique IDs for each page", () => {
      const ids = pages.map((page) => page.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have page IDs from 2 to 32", () => {
      const ids = pages.map((page) => parseInt(page.id, 10)).sort((a, b) => a - b);
      expect(ids[0]).toBe(2);
      expect(ids[ids.length - 1]).toBe(32);
    });

    it("should have all pages as study type", () => {
      pages.forEach((page) => {
        expect(page.type).toBe("study");
      });
    });
  });

  describe("getPageContent", () => {
    it("should return study content for first page", () => {
      const content = getPageContent("2");
      expect(content).toBeDefined();
      expect(content?.info.type).toBe("study");
      expect(content?.info.title).toBe("דף ב");
      if (content && isStudyPage(content)) {
        expect(content.studyTopic).toBeDefined();
        expect(content.studyTopic.id).toBe(2);
        expect(content.studyTopic.page).toBe("ב");
      }
    });

    it("should return study content for middle page", () => {
      const content = getPageContent("15");
      expect(content).toBeDefined();
      expect(content?.info.type).toBe("study");
      expect(content?.info.title).toBe("דף טו");
      if (content && isStudyPage(content)) {
        expect(content.studyTopic).toBeDefined();
        expect(content.studyTopic.page).toBe("טו");
      }
    });

    it("should return study content for last page", () => {
      const content = getPageContent("32");
      expect(content).toBeDefined();
      expect(content?.info.type).toBe("study");
      expect(content?.info.title).toBe("דף לב");
      if (content && isStudyPage(content)) {
        expect(content.studyTopic).toBeDefined();
        expect(content.studyTopic.id).toBe(32);
        expect(content.studyTopic.page).toBe("לב");
      }
    });

    it("should return undefined for invalid ID", () => {
      expect(getPageContent("invalid_id")).toBeUndefined();
      expect(getPageContent("1")).toBeUndefined();
      expect(getPageContent("33")).toBeUndefined();
    });

    it("should have matching ID between info and studyTopic", () => {
      pages.forEach((page) => {
        const content = getPageContent(page.id);
        expect(content).toBeDefined();
        if (content && isStudyPage(content)) {
          expect(content.studyTopic.id).toBe(parseInt(page.id, 10));
        }
      });
    });
  });
});
