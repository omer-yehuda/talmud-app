export const MASECHET = {
  name: "מגילה",
  fullName: "מסכת מגילה",
  title: "מסכת מגילה",
  firstPage: 2,
  lastPage: 32,
  pageRange: "דפים ב' - ל\"ב",
} as const;

export const LABELS = {
  selectPage: "בחר דף",
  journeyTitle: "בואו נחקור ביחד",
  rashiExplains: "רש״י: פירוש וביאור",
  tosafotDeepens: "תוספות: שאלות וחקירה",
} as const;

export const WELCOME_TEXT = {
  intro: `בואו נלמד ביחד! כאן אתם יכולים לחקור את דפי ב' עד ל"ב במסכת מגילה, עם פשט, רש"י ותוספות.`,
} as const;

export const ALT_TEXT = {
  beitMidrash: "בית המדרש",
} as const;

const API_PATHS = {
  images: "/api/images",
} as const;

export function getImagePath(imageId: string): string {
  return `${API_PATHS.images}/${imageId}`;
}
