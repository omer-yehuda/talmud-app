import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import ThemeRegistry from "@/theme/ThemeRegistry";

export const metadata: Metadata = {
  title: "מסכת מגילה",
  description: "לימוד אינטראקטיבי של מסכת מגילה - פשט, רשי ותוספות",
  keywords: ["תלמוד", "מגילה", "תורה", "לימוד", "רשי", "תוספות"],
  authors: [{ name: "Talmud App" }],
  openGraph: {
    title: "מסכת מגילה",
    description: "לימוד אינטראקטיבי של מסכת מגילה",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Heebo:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="parchment-texture min-h-screen flex flex-col">
        <ThemeRegistry>
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
