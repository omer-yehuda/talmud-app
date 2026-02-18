"use client";

import type { PageInfo } from "@/types";
import { LABELS } from "@/lib/constants";
import { useNavigationState } from "@/hooks";
import { Icon } from "./ui";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

const MotionBox = motion(Box);

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
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 40,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            sx={{
              position: "absolute",
              bottom: "100%",
              left: 0,
              right: 0,
              bgcolor: "white",
              borderTop: "1px solid",
              borderColor: "grey.100",
              maxHeight: 360,
              overflow: "auto",
              zIndex: 50,
              borderRadius: "16px 16px 0 0",
              boxShadow: "0 -8px 30px rgba(0,0,0,0.12)",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 4,
                bgcolor: "grey.300",
                borderRadius: 2,
                mx: "auto",
                mt: 1.5,
                mb: 1,
              }}
            />
            {pages.map((page) => (
              <MenuItem
                key={page.id}
                onClick={() => handlePageSelect(page.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2.5,
                  py: 1.5,
                  textAlign: "right",
                  borderBottom: "1px solid",
                  borderColor: "grey.50",
                  bgcolor: activePageId === page.id ? "rgba(238, 242, 255, 0.5)" : "transparent",
                  color: activePageId === page.id ? "#1e3a8a" : "inherit",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon
                  name={page.icon}
                  sx={{
                    color: activePageId === page.id ? "secondary.main" : "rgba(148, 163, 184, 0.7)",
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
                      color: "rgba(148, 163, 184, 0.8)",
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
                  <Icon name="check" sx={{ color: "secondary.main", fontSize: "1rem" }} />
                )}
              </MenuItem>
            ))}
          </MotionBox>
        )}
      </AnimatePresence>

      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid",
          borderColor: "grey.100",
        }}
      >
        <Button
          onClick={toggleOpen}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.5,
            color: "inherit",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {activePage ? (
              <>
                <Icon name={activePage.icon} sx={{ color: "secondary.main", fontSize: "1.2rem" }} />
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "0.875rem", color: "#0f172a" }}>
                    {activePage.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(148, 163, 184, 0.8)" }}>
                    {activePage.description}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography component="span" sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                {LABELS.selectPage}
              </Typography>
            )}
          </Box>
          <MotionBox
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            sx={{ display: "inline-flex" }}
          >
            <Icon name="expand_less" sx={{ fontSize: "1.5rem", color: "rgba(148, 163, 184, 0.7)" }} />
          </MotionBox>
        </Button>
      </Box>
    </Box>
  );
}
