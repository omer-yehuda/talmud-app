"use client";

import type { PageInfo } from "@/types";
import { LABELS } from "@/lib/constants";
import { useNavigationState } from "@/hooks";
import { Icon } from "./ui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

interface MobileNavProps {
  pages: PageInfo[];
  activePageId: string | null;
  onPageChange: (pageId: string) => void;
}

export function MobileNav({ pages, activePageId, onPageChange }: MobileNavProps): React.ReactElement {
  const { isOpen, setIsOpen, toggleOpen, activePage, handlePageSelect } = useNavigationState({
    pages,
    activePageId,
    onPageChange,
  });

  return (
    <Box
      component="nav"
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      {isOpen && (
        <Box
          onClick={() => setIsOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
        />
      )}

      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            right: 0,
            bgcolor: "white",
            borderTop: "1px solid",
            borderColor: "grey.200",
            maxHeight: 320,
            overflow: "auto",
            zIndex: 50,
            boxShadow: 3,
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.id}
              onClick={() => handlePageSelect(page.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.5,
                textAlign: "right",
                borderBottom: "1px solid",
                borderColor: "grey.100",
                bgcolor: activePageId === page.id ? "#eef2ff" : "transparent",
                color: activePageId === page.id ? "#1e3a8a" : "inherit",
              }}
            >
              <Icon
                name={page.icon}
                sx={{ color: activePageId === page.id ? "secondary.main" : "#94a3b8" }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                  {page.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#94a3b8",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {page.description}
                </Typography>
              </Box>
              {activePageId === page.id && (
                <Icon name="check" sx={{ color: "secondary.main" }} />
              )}
            </MenuItem>
          ))}
        </Box>
      )}

      <Box
        sx={{
          bgcolor: "white",
          borderTop: "1px solid",
          borderColor: "grey.200",
          boxShadow: "0 -4px 6px -1px rgba(0,0,0,0.1)",
        }}
      >
        <Button
          onClick={toggleOpen}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            color: "inherit",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {activePage ? (
              <>
                <Icon name={activePage.icon} sx={{ color: "secondary.main" }} />
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "0.875rem", color: "#0f172a" }}>
                    {activePage.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                    {activePage.description}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography component="span" sx={{ color: "text.secondary" }}>
                {LABELS.selectPage}
              </Typography>
            )}
          </Box>
          <Icon
            name={isOpen ? "expand_more" : "expand_less"}
            sx={{ fontSize: "1.5rem", color: "#94a3b8" }}
          />
        </Button>
      </Box>
    </Box>
  );
}
