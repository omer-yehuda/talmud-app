"use client";

import Image from "next/image";
import { MASECHET, LABELS, WELCOME_TEXT, ALT_TEXT, getImagePath } from "@/lib/constants";
import { colors } from "@/lib/styles";
import { Icon } from "./ui";
import type { PageInfo } from "@/types";

interface WelcomePageProps {
  pages: PageInfo[];
  onPageSelect: (pageId: string) => void;
}

export function WelcomePage({ pages, onPageSelect }: WelcomePageProps): React.ReactElement {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getImagePath("beit-midrash")}
            alt={ALT_TEXT.beitMidrash}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white text-center px-4">
          <Icon name="menu_book" className="text-6xl text-primary-light mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold font-gemara">
            {MASECHET.fullName}
          </h1>
          <p className="text-lg text-slate-400">
            {MASECHET.pageRange}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
          {LABELS.journeyTitle}
        </h2>
        <p className="text-muted leading-relaxed mb-6 text-center max-w-xl mx-auto">
          {WELCOME_TEXT.intro}
        </p>

        <div className="flex justify-center gap-6 text-sm text-muted font-medium bg-amber-50 p-4 rounded-lg mb-8">
          <div className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors.primary.main }}
            />
            <span>{LABELS.rashiExplains}</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors.secondary.main }}
            />
            <span>{LABELS.tosafotDeepens}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
          {LABELS.selectPage}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageSelect(page.id)}
              className="flex flex-col items-center gap-2 p-6 rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-secondary-main hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon name={page.icon} className="text-3xl text-secondary-main" />
              <span className="font-bold text-slate-900">{page.title}</span>
              <span className="text-sm text-muted text-center">{page.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
