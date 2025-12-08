"use client";

import { useState } from "react";
import type { ComparisonItem } from "@/types";
import { Icon } from "./ui";

interface ComparisonViewProps {
  items: ComparisonItem[];
}

export function ComparisonView({ items }: ComparisonViewProps): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 mb-4">
      <header className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Icon name="compare_arrows" className="text-indigo-600" />
          אין בין... ל... אלא...
        </h3>
        <span className="text-sm bg-slate-200 text-slate-600 px-2 py-1 rounded">
          ח עמוד א - ט עמוד ב
        </span>
      </header>

      <div className="p-6">
        <p className="text-muted mb-6 text-center">
          בחרו זוג מושגים כדי לראות את ההבדל ביניהם לפי הגמרא:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {items.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={item.label}
                onClick={() => setSelectedIndex(index)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border bg-white shadow-sm transition-all duration-200 text-center h-full hover:border-indigo-400 hover:bg-indigo-50 ${
                  isSelected ? "bg-indigo-50 border-indigo-400" : "border-slate-200"
                }`}
              >
                <Icon name={item.icon} className="text-3xl text-indigo-600" />
                <span className="font-bold text-muted text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-indigo-50 rounded-lg p-6 min-h-[150px] flex items-center justify-center">
          {selectedItem ? (
            <SelectedItemDisplay item={selectedItem} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </article>
  );
}

function SelectedItemDisplay({ item }: { item: ComparisonItem }): React.ReactElement {
  return (
    <div className="text-center w-full">
      <p className="text-xl font-bold text-indigo-900 mb-2">{item.label}</p>
      <p className="font-gemara text-2xl text-slate-800 mb-4">{`"${item.diff}"`}</p>
      <div className="bg-white p-4 rounded border border-slate-200 w-full text-right text-muted text-sm">
        <span className="font-bold">ביאור:</span> {item.details}
      </div>
    </div>
  );
}

function EmptyState(): React.ReactElement {
  return (
    <div className="text-center">
      <Icon name="balance" className="text-4xl text-slate-300 mb-2" />
      <p className="text-slate-400">בחר זוג להשוואה</p>
    </div>
  );
}
