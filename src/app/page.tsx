"use client";

import { useState } from "react";
import {
  Header,
  MobileNav,
  StudyCard,
  ComparisonView,
  PageNavigation,
  WelcomePage,
  LoadingPage,
  LoadingContent,
  ErrorPage,
  ErrorMessage,
} from "@/components";
import { usePages, usePageContent } from "@/hooks/use-pages";
import { isStudyPage, isComparisonPage } from "@/types";

export default function HomePage(): React.ReactElement {
  const { pages, isLoading: loadingPages, error: pagesError } = usePages();
  const [activePageId, setActivePageId] = useState<string | null>(null);

  const {
    content,
    isLoading: loadingContent,
    error: contentError,
    refetch,
  } = usePageContent(activePageId);

  const handleGoHome = (): void => {
    setActivePageId(null);
  };

  if (loadingPages) {
    return <LoadingPage />;
  }

  if (pagesError && !pages.length) {
    return <ErrorPage message={pagesError} />;
  }

  const isHome = activePageId === null;

  return (
    <>
      <Header
        pages={pages}
        activePageId={activePageId}
        onPageChange={setActivePageId}
        onGoHome={handleGoHome}
      />

      <MobileNav pages={pages} activePageId={activePageId} onPageChange={setActivePageId} />

      <main className="grow max-w-7xl mx-auto w-full px-4 py-8 pb-24 md:pb-8 flex flex-col gap-8">
        {isHome ? (
          <WelcomePage pages={pages} onPageSelect={setActivePageId} />
        ) : (
          <>
            <PageNavigation pages={pages} activePageId={activePageId} onPageChange={setActivePageId} />
            <div className="transition-all duration-300">
              <PageContent content={content} isLoading={loadingContent} error={contentError} onRetry={refetch} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

interface PageContentProps {
  content: ReturnType<typeof usePageContent>["content"];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

function PageContent({ content, isLoading, error, onRetry }: PageContentProps): React.ReactElement | null {
  if (isLoading) {
    return <LoadingContent />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!content) {
    return null;
  }

  if (isComparisonPage(content)) {
    return <ComparisonView items={content.comparisonItems} />;
  }

  if (isStudyPage(content)) {
    return <StudyCard topic={content.studyTopic} />;
  }

  return null;
}
