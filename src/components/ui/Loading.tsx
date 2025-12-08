"use client";

import { Icon } from "./Icon";

export function Loading({ text = "טוען...", icon = "menu_book" }: { text?: string; icon?: string }): React.ReactElement {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Icon name={icon} className="text-6xl text-primary-main animate-pulse" />
        {text && <p className="text-lg text-muted font-medium">{text}</p>}
      </div>
    </div>
  );
}

export function LoadingPage(): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loading />
    </div>
  );
}

export function LoadingContent(): React.ReactElement {
  return <Loading text="טוען תוכן..." icon="hourglass_empty" />;
}
