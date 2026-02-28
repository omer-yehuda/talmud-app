"use client";

import { useState } from "react";
import type { ComparisonItem } from "@/types";
import { Icon, MotionCard, MotionBox, MotionButton } from "./ui";
import { AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface ComparisonViewProps {
  items: ComparisonItem[];
}

export function ComparisonView({ items }: ComparisonViewProps): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.04)",
        mb: 2,
      }}
    >
      <Box
        component="header"
        sx={{
          bgcolor: "grey.50",
          p: 2.5,
          borderBottom: "1px solid",
          borderColor: "grey.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "grey.800",
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "1.1rem",
          }}
        >
          <Box
            sx={{
              bgcolor: "rgba(79, 70, 229, 0.08)",
              borderRadius: 2,
              p: 0.5,
              display: "flex",
            }}
          >
            <Icon name="compare_arrows" sx={{ color: "accent.main" }} />
          </Box>
          אין בין... ל... אלא...
        </Typography>
        <Box
          component="span"
          sx={{
            fontSize: "0.8rem",
            bgcolor: "rgba(37, 99, 235, 0.08)",
            color: "secondary.main",
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          ח עמוד א - ט עמוד ב
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Typography sx={{ color: "text.secondary", mb: 3, textAlign: "center", fontSize: "0.9rem" }}>
          בחרו זוג מושגים כדי לראות את ההבדל ביניהם לפי הגמרא:
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {items.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <Grid key={item.label} size={{ xs: 6, md: 3 }}>
                <MotionButton
                  onClick={() => setSelectedIndex(index)}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    p: 2.5,
                    borderRadius: 3,
                    border: "2px solid",
                    borderColor: isSelected ? "accent.light" : "grey.200",
                    bgcolor: isSelected ? "rgba(238, 242, 255, 0.6)" : "white",
                    boxShadow: isSelected
                      ? "0 4px 14px rgba(99, 102, 241, 0.15)"
                      : "0 1px 3px rgba(0,0,0,0.04)",
                    textAlign: "center",
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      borderColor: "accent.light",
                      bgcolor: "rgba(238, 242, 255, 0.4)",
                    },
                  }}
                >
                  <Icon name={item.icon} sx={{ fontSize: "1.75rem", color: "accent.main" }} />
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 700,
                      color: isSelected ? "accent.dark" : "text.secondary",
                      fontSize: "0.85rem",
                    }}
                  >
                    {item.label}
                  </Typography>
                </MotionButton>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            bgcolor: "rgba(238, 242, 255, 0.4)",
            borderRadius: 3,
            p: 3.5,
            minHeight: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(99, 102, 241, 0.08)",
          }}
        >
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <SelectedItemDisplay key={selectedItem.label} item={selectedItem} />
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </MotionCard>
  );
}

function SelectedItemDisplay({ item }: { item: ComparisonItem }): React.ReactElement {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      sx={{ textAlign: "center", width: "100%" }}
    >
      <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "accent.dark", mb: 1.5 }}>
        {item.label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Amiri", serif',
          fontSize: "1.4rem",
          color: "grey.800",
          mb: 2.5,
          lineHeight: 1.6,
        }}
      >
        {`"${item.diff}"`}
      </Typography>
      <Box
        sx={{
          bgcolor: "white",
          p: 2.5,
          borderRadius: 2.5,
          border: "1px solid rgba(0,0,0,0.05)",
          width: "100%",
          textAlign: "right",
          color: "text.secondary",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <Typography component="span" sx={{ fontWeight: 700 }}>
          ביאור:
        </Typography>{" "}
        {item.details}
      </Box>
    </MotionBox>
  );
}

function EmptyState(): React.ReactElement {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{ textAlign: "center" }}
    >
      <Icon name="balance" sx={{ fontSize: "2.25rem", color: "rgba(203, 213, 225, 0.6)", mb: 1 }} />
      <Typography sx={{ color: "rgba(148, 163, 184, 0.8)", fontSize: "0.9rem" }}>
        בחר זוג להשוואה
      </Typography>
    </MotionBox>
  );
}
