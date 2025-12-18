"use client";

import type { PageInfo } from "@/types";
import { MASECHET, LABELS } from "@/lib/constants";
import { useNavigationState } from "@/hooks";
import { Icon } from "./ui";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

interface HeaderProps {
  pages: PageInfo[];
  activePageId: string | null;
  onPageChange: (pageId: string) => void;
  onGoHome: () => void;
}

export function Header({ pages, activePageId, onPageChange, onGoHome }: HeaderProps): React.ReactElement {
  const { isOpen, toggleOpen, activePage, handlePageSelect, dropdownRef } = useNavigationState({
    pages,
    activePageId,
    onPageChange,
    closeOnClickOutside: true,
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#0f172a",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: "80rem",
          mx: "auto",
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          onClick={onGoHome}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "#fef3c7",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Icon name="menu_book" sx={{ fontSize: "1.875rem", color: "primary.light" }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: '"Amiri", serif',
                letterSpacing: "0.05em",
              }}
            >
              {MASECHET.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#94a3b8" }}
            >
              {MASECHET.pageRange}
            </Typography>
          </Box>
        </Button>

        <Box
          ref={dropdownRef}
          sx={{
            position: "relative",
            display: { xs: "none", md: "block" },
          }}
        >
          <Button
            onClick={toggleOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#1e293b",
              "&:hover": {
                bgcolor: "#334155",
              },
              px: 2,
              py: 1,
              borderRadius: 2,
              border: "1px solid #475569",
              minWidth: 200,
              justifyContent: "space-between",
              color: "#fef3c7",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {activePage && (
                <Icon name={activePage.icon} sx={{ color: "primary.light" }} />
              )}
              <Typography component="span" sx={{ fontWeight: 500 }}>
                {activePage ? activePage.title : LABELS.selectPage}
              </Typography>
            </Box>
            <Icon
              name={isOpen ? "expand_less" : "expand_more"}
              sx={{ color: "#94a3b8" }}
            />
          </Button>

          {isOpen && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                right: 0,
                mt: 1,
                width: 288,
                bgcolor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: 2,
                boxShadow: 6,
                maxHeight: 384,
                overflow: "auto",
                zIndex: 50,
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
                    borderBottom: "1px solid #334155",
                    "&:last-child": {
                      borderBottom: 0,
                    },
                    "&:hover": {
                      bgcolor: "#334155",
                    },
                    bgcolor: activePageId === page.id ? "#334155" : "transparent",
                    color: activePageId === page.id ? "#fbbf24" : "#fef3c7",
                  }}
                >
                  <Icon
                    name={page.icon}
                    sx={{ color: activePageId === page.id ? "primary.light" : "#94a3b8" }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 500 }}>{page.title}</Typography>
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
                    <Icon name="check" sx={{ color: "primary.light" }} />
                  )}
                </MenuItem>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </AppBar>
  );
}
