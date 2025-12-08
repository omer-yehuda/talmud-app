export interface Commentary {
  title: string;
  text: string;
}

export interface StudyQuestion {
  text: string;
  answer: string;
}

export interface StudyTopic {
  id: number;
  page: string;
  title: string;
  image: string;
  caption: string;
  gemara: string;
  rashi?: Commentary;
  tosafot?: Commentary;
  question: StudyQuestion;
}

export interface ComparisonItem {
  label: string;
  diff: string;
  details: string;
  icon: string;
}

export type PageType = "study" | "comparison";

export interface PageInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: PageType;
}

export type StudyPageContent = {
  info: PageInfo & { type: "study" };
  studyTopic: StudyTopic;
};

export type ComparisonPageContent = {
  info: PageInfo & { type: "comparison" };
  comparisonItems: ComparisonItem[];
};

export type PageContent = StudyPageContent | ComparisonPageContent;

export function isStudyPage(content: PageContent): content is StudyPageContent {
  return content.info.type === "study";
}

export function isComparisonPage(content: PageContent): content is ComparisonPageContent {
  return content.info.type === "comparison";
}

export interface PagesListResponse {
  pages: PageInfo[];
  total: number;
}
