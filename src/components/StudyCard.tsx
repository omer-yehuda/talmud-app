"use client";

import { useState } from "react";
import Image from "next/image";
import type { StudyTopic } from "@/types";
import { CommentaryBox } from "./CommentaryBox";
import { Icon } from "./ui";

interface StudyCardProps {
  topic: StudyTopic;
}

export function StudyCard({ topic }: StudyCardProps): React.ReactElement {
  const [answerRevealed, setAnswerRevealed] = useState(false);

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 mb-4">
      <header className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">{topic.title}</h3>
        <span className="text-sm bg-slate-200 text-slate-600 px-2 py-1 rounded">
          {topic.page}
        </span>
      </header>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-slate-100 md:border-l border-slate-200 relative min-h-[250px]">
          <Image
            src={topic.image}
            alt={topic.caption}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs p-2 w-full z-10">
            {topic.caption}
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6">
          <div className="mb-6">
            <p className="text-muted text-sm font-bold uppercase tracking-wider mb-2">
              סוגיית הגמרא
            </p>
            <p className="text-xl leading-relaxed text-slate-900 font-gemara">
              {topic.gemara}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.rashi && <CommentaryBox commentary={topic.rashi} type="rashi" />}
            {topic.tosafot && <CommentaryBox commentary={topic.tosafot} type="tosafot" />}
          </div>
        </div>
      </div>

      <section className="bg-linear-to-l from-indigo-50 to-white p-6 border-t border-slate-200">
        <div className="flex items-start gap-3 mb-4">
          <Icon name="help_outline" className="text-2xl text-indigo-600" />
          <div>
            <p className="font-bold text-indigo-900 mb-1">שאלה לעיון</p>
            <p className="text-muted">{topic.question.text}</p>
          </div>
        </div>

        <div className="relative mt-4">
          <div
            className={`bg-white border border-indigo-200 rounded-lg p-4 text-muted transition-all duration-300 ${
              !answerRevealed ? "blur-sm select-none" : ""
            }`}
          >
            <span className="font-bold">תשובה:</span> {topic.question.answer}
          </div>

          {!answerRevealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setAnswerRevealed(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-lg transition-colors"
              >
                <Icon name="visibility" />
                <span>גלה תשובה</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
