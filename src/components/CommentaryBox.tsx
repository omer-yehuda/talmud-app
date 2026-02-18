"use client";

import { useState } from "react";
import type { Commentary } from "@/types";
import { Icon } from "./ui";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MotionBox = motion(Box);

type CommentaryType = "rashi" | "tosafot";

interface CommentaryBoxProps {
  commentary: Commentary;
  type: CommentaryType;
}

const config: Record<CommentaryType, {
  icon: string;
  text: string;
  hoverBg: string;
  iconColor: string;
  titleColor: string;
  contentBg: string;
  contentBorder: string;
}> = {
  rashi: {
    icon: "lightbulb",
    text: 'רש"י',
    hoverBg: "rgba(255, 251, 235, 0.6)",
    iconColor: "#d97706",
    titleColor: "#92400e",
    contentBg: "rgba(255, 251, 235, 0.5)",
    contentBorder: "#fcd34d",
  },
  tosafot: {
    icon: "quiz",
    text: "תוספות",
    hoverBg: "rgba(239, 246, 255, 0.6)",
    iconColor: "#2563eb",
    titleColor: "#1e40af",
    contentBg: "rgba(238, 242, 255, 0.5)",
    contentBorder: "#93c5fd",
  },
};

export function CommentaryBox({ commentary, type }: CommentaryBoxProps): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const styles = config[type];

  return (
    <Box>
      <Button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
          width: "100%",
          p: 1,
          borderRadius: 2,
          justifyContent: "flex-start",
          color: "inherit",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: styles.hoverBg,
          },
        }}
      >
        <Box
          sx={{
            bgcolor: styles.hoverBg,
            borderRadius: 1.5,
            p: 0.5,
            display: "flex",
          }}
        >
          <Icon name={styles.icon} sx={{ color: styles.iconColor, fontSize: "1.1rem" }} />
        </Box>
        <Typography
          component="span"
          sx={{ fontWeight: 700, color: styles.titleColor, fontSize: "0.9rem" }}
        >
          {styles.text}
        </Typography>
        <MotionBox
          sx={{ ml: "auto", display: "inline-flex" }}
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Icon name="expand_more" sx={{ fontSize: "1rem", color: "text.secondary" }} />
        </MotionBox>
      </Button>

      <AnimatePresence initial={false}>
        {expanded && (
          <MotionBox
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            sx={{ overflow: "hidden" }}
          >
            <Box
              sx={{
                color: "text.secondary",
                p: 2,
                borderRadius: 2,
                bgcolor: styles.contentBg,
                borderRight: `3px solid ${styles.contentBorder}`,
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              <Typography component="span" sx={{ fontWeight: 700 }}>
                {commentary.title}
              </Typography>{" "}
              {commentary.text}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
