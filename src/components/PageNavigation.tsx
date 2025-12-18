"use client";

import type { PageInfo } from "@/types";
import { Icon } from "./ui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
    <Box
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
    </Box>
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
    <Button
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.200",
        bgcolor: "white",
        transition: "all 0.2s",
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        "&:hover": isDisabled
          ? {}
          : {
              bgcolor: "grey.50",
              borderColor: "secondary.main",
            },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isPrev && (
          <Icon
            name="arrow_forward"
            sx={{ color: isDisabled ? "text.secondary" : "secondary.main" }}
          />
        )}
        <Typography
          component="span"
          sx={{
            fontSize: "0.75rem",
            color: "text.secondary",
            fontWeight: 500,
          }}
        >
          {isPrev ? "הדף הקודם" : "הדף הבא"}
        </Typography>
        {!isPrev && (
          <Icon
            name="arrow_back"
            sx={{ color: isDisabled ? "text.secondary" : "secondary.main" }}
          />
        )}
      </Box>
      <Typography
        component="span"
        sx={{
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {page ? page.title : "—"}
      </Typography>
    </Button>
  );
}
