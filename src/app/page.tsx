"use client";

import { useState, useCallback } from "react";
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
import { MotionBox } from "@/components/ui";
import { AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";

export default function HomePage(): React.ReactElement {
  const { pages, isLoading: loadingPages, error: pagesError } = usePages();
  const [activePageId, setActivePageId] = useState<string | null>(null);

  const {
    content,
    isLoading: loadingContent,
    error: contentError,
    refetch,
  } = usePageContent(activePageId);

  const handleGoHome = useCallback((): void => {
    setActivePageId(null);
  }, []);

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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          maxWidth: "80rem",
          mx: "auto",
          width: "100%",
          px: { xs: 1.5, md: 3 },
          py: 4,
          pb: { xs: 12, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <AnimatePresence mode="wait">
          {isHome ? (
            <MotionBox
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <WelcomePage pages={pages} onPageSelect={setActivePageId} />
            </MotionBox>
          ) : (
            <MotionBox
              key={`page-${activePageId}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PageNavigation pages={pages} activePageId={activePageId} onPageChange={setActivePageId} />
              <Box sx={{ mt: 2 }}>
                <PageContent content={content} isLoading={loadingContent} error={contentError} onRetry={refetch} />
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
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
