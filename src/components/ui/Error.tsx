"use client";

import { Icon } from "./Icon";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center gap-4 p-6 text-center bg-red-50 rounded-xl border border-red-200">
      <Icon name="error" className="text-4xl text-red-500" />
      <p className="text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          נסה שוב
        </button>
      )}
    </div>
  );
}

export function ErrorPage({ message, onRetry }: ErrorProps): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <Icon name="error" className="text-7xl text-red-500" />
        <h1 className="text-2xl font-bold text-slate-800">שגיאה בטעינת הנתונים</h1>
        <p className="text-muted">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-8 py-3 bg-secondary-main text-white rounded-lg font-medium hover:bg-secondary-dark transition-colors"
          >
            נסה שוב
          </button>
        )}
      </div>
    </div>
  );
}
