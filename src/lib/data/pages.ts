import type { PageInfo, PageContent } from "@/types";
import { studyTopics } from "./study-topics";
import { comparisonItems } from "./comparison-items";

export const pages: PageInfo[] = [
  { id: "2", title: "דף ב", description: "זמנים לקריאת המגילה", icon: "schedule", type: "study" },
  { id: "3", title: "דף ג", description: "מוקפות חומה מימות יהושע", icon: "location_city", type: "study" },
  { id: "4", title: "דף ד", description: "עיירות גדולות ועשרה בטלנים", icon: "groups", type: "study" },
  { id: "5", title: "דף ה", description: "הבדלי ימים ומצוות הפורים", icon: "gavel", type: "study" },
  { id: "6", title: "דף ו", description: "רקת–טבריה וחומת הים", icon: "castle", type: "study" },
  { id: "7", title: "דף ז", description: "כתיבת המגילה ורוח הקודש", icon: "history_edu", type: "study" },
  { id: "8", title: "דף ח", description: "דין 'אין בין'", icon: "compare_arrows", type: "study" },
  { id: "9", title: "דף ט", description: "המשך דיני 'אין בין'", icon: "difference", type: "study" },
  { id: "10", title: "דף י", description: "פתיחת המגילה – 'ויהי בימי'", icon: "warning", type: "study" },
  { id: "11", title: "דף יא", description: "אחשוורוש והמלכים שמלכו בעולם", icon: "public", type: "study" },
  { id: "12", title: "דף יב", description: "משתה ושתי – גזרות ומחלוקות", icon: "celebration", type: "study" },
  { id: "13", title: "דף יג", description: "שכר ועונש – המן ומרדכי", icon: "balance", type: "study" },
  { id: "14", title: "דף יד", description: "נביאים ותקנת קריאת המגילה", icon: "menu_book", type: "study" },
  { id: "15", title: "דף טו", description: "שבע נביאות – מי הן ומה נתנבאו", icon: "record_voice_over", type: "study" },
  { id: "16", title: "דף טז", description: "קריאת המגילה – זמנה ודיניה", icon: "auto_stories", type: "study" },
  { id: "17", title: "דף יז", description: "קריאה על פה ובלשונות שונות", icon: "translate", type: "study" },
  { id: "18", title: "דף יח", description: "פסולי המגילה – חסר ויתר", icon: "rule", type: "study" },
  { id: "19", title: "דף יט", description: "מי קורא ומי שומע", icon: "diversity_3", type: "study" },
  { id: "20", title: "דף כ", description: "ברכות המגילה", icon: "volunteer_activism", type: "study" },
  { id: "21", title: "דף כא", description: "דיני קריאת התורה", icon: "menu_book", type: "study" },
  { id: "22", title: "דף כב", description: "סדר הקריאה בימים מיוחדים", icon: "event", type: "study" },
  { id: "23", title: "דף כג", description: "מפטיר והפטרה", icon: "speaker_notes", type: "study" },
  { id: "24", title: "דף כד", description: "מעמדות ומושבות", icon: "accessibility_new", type: "study" },
  { id: "25", title: "דף כה", description: "כבוד בית הכנסת", icon: "synagogue", type: "study" },
  { id: "26", title: "דף כו", description: "מכירת בית הכנסת", icon: "sell", type: "study" },
  { id: "27", title: "דף כז", description: "קדושת ספרים וכתבי קודש", icon: "library_books", type: "study" },
  { id: "28", title: "דף כח", description: "דיני בית המדרש", icon: "school", type: "study" },
  { id: "29", title: "דף כט", description: "ארבע פרשיות – שקלים וזכור", icon: "view_quilt", type: "study" },
  { id: "30", title: "דף ל", description: "פרשת פרה והחודש", icon: "pets", type: "study" },
  { id: "31", title: "דף לא", description: "קריאות המועדים", icon: "celebration", type: "study" },
  { id: "32", title: "דף לב", description: "סיום המסכת – כבוד התורה", icon: "emoji_events", type: "study" },
];

export function getPageContent(id: string): PageContent | undefined {
  const page = pages.find((p) => p.id === id);
  if (!page) return undefined;

  if (page.type === "study") {
    const topic = studyTopics.find((t) => t.id === parseInt(id, 10));
    if (!topic) return undefined;

    return {
      info: { ...page, type: "study" as const },
      studyTopic: topic,
    };
  }

  return {
    info: { ...page, type: "comparison" as const },
    comparisonItems,
  };
}
