"use client";

import type { PageInfo } from "@/types";
import { MASECHET, LABELS } from "@/lib/constants";
import { useNavigationState } from "@/hooks";
import { Icon, MotionBox } from "./ui";
import { AnimatePresence } from "framer-motion";
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
        bgcolor: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <Box
        sx={{
          maxWidth: "80rem",
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: 1.5,
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
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.06)",
            },
          }}
        >
          <Icon name="menu_book" sx={{ fontSize: "1.75rem", color: "primary.light" }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: '"Amiri", serif',
                letterSpacing: "0.05em",
                fontSize: "1.1rem",
              }}
            >
              {MASECHET.fullName}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(148, 163, 184, 0.8)", fontSize: "0.7rem" }}
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
              bgcolor: "rgba(255, 255, 255, 0.06)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              minWidth: 200,
              justifyContent: "space-between",
              color: "#fef3c7",
              transition: "all 0.2s ease",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {activePage && (
                <Icon name={activePage.icon} sx={{ color: "primary.light", fontSize: "1.2rem" }} />
              )}
              <Typography component="span" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
                {activePage ? activePage.title : LABELS.selectPage}
              </Typography>
            </Box>
            <MotionBox
              sx={{ display: "inline-flex" }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name="expand_more" sx={{ color: "rgba(148, 163, 184, 0.8)" }} />
            </MotionBox>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <MotionBox
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                sx={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  mt: 1,
                  width: 300,
                  bgcolor: "rgba(15, 23, 42, 0.95)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 3,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  maxHeight: 400,
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
                      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      "&:last-child": { borderBottom: 0 },
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.06)",
                      },
                      bgcolor: activePageId === page.id ? "rgba(251, 191, 36, 0.08)" : "transparent",
                      color: activePageId === page.id ? "#fbbf24" : "#fef3c7",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <Icon
                      name={page.icon}
                      sx={{
                        color: activePageId === page.id ? "primary.light" : "rgba(148, 163, 184, 0.6)",
                        fontSize: "1.2rem",
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                        {page.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(148, 163, 184, 0.6)",
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
                      <Icon name="check" sx={{ color: "primary.light", fontSize: "1rem" }} />
                    )}
                  </MenuItem>
                ))}
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </AppBar>
  );
}
