"use client";

import type { PageInfo } from "@/types";
import { Icon, MotionBox, MotionButton } from "./ui";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PageNavigationProps {
  pages: PageInfo[];
  activePageId: string | null;
  onPageChange: (pageId: string) => void;
}

export function PageNavigation({
  pages,
  activePageId,
  onPageChange,
}: PageNavigationProps): React.ReactElement | null {
  if (!activePageId || pages.length === 0) return null;

  const currentIndex = pages.findIndex((p) => p.id === activePageId);
  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 2,
      }}
    >
      <NavButton
        page={prevPage}
        direction="prev"
        onClick={() => prevPage && onPageChange(prevPage.id)}
      />
      <NavButton
        page={nextPage}
        direction="next"
        onClick={() => nextPage && onPageChange(nextPage.id)}
      />
    </MotionBox>
  );
}

interface NavButtonProps {
  page: PageInfo | null;
  direction: "prev" | "next";
  onClick: () => void;
}

function NavButton({ page, direction, onClick }: NavButtonProps): React.ReactElement {
  const isDisabled = !page;
  const isPrev = direction === "prev";

  return (
    <MotionButton
      onClick={onClick}
      disabled={isDisabled}
      whileHover={isDisabled ? undefined : { y: -2, scale: 1.01 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
        bgcolor: "white",
        opacity: isDisabled ? 0.35 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        "&:hover": isDisabled
          ? {}
          : {
              bgcolor: "rgba(37, 99, 235, 0.02)",
              borderColor: "secondary.light",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.08)",
            },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isPrev && (
          <Icon
            name="arrow_forward"
            sx={{ color: isDisabled ? "text.secondary" : "secondary.main", fontSize: "1.1rem" }}
          />
        )}
        <Typography
          component="span"
          sx={{
            fontSize: "0.7rem",
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {isPrev ? "הדף הקודם" : "הדף הבא"}
        </Typography>
        {!isPrev && (
          <Icon
            name="arrow_back"
            sx={{ color: isDisabled ? "text.secondary" : "secondary.main", fontSize: "1.1rem" }}
          />
        )}
      </Box>
      <Typography
        component="span"
        sx={{
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {page ? page.title : "—"}
      </Typography>
    </MotionButton>
  );
}
