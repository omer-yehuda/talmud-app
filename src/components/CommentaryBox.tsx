"use client";

import { useState } from "react";
import type { Commentary } from "@/types";
import { Icon } from "./ui";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

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
    hoverBg: "#fffbeb",
    iconColor: "#d97706",
    titleColor: "#92400e",
    contentBg: "#fffbeb",
    contentBorder: "#fcd34d",
  },
  tosafot: {
    icon: "quiz",
    text: "תוספות",
    hoverBg: "#eff6ff",
    iconColor: "#2563eb",
    titleColor: "#1e40af",
    contentBg: "#eef2ff",
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
          p: 0.5,
          borderRadius: 1,
          justifyContent: "flex-start",
          color: "inherit",
          "&:hover": {
            bgcolor: styles.hoverBg,
          },
        }}
      >
        <Icon name={styles.icon} sx={{ color: styles.iconColor }} />
        <Typography
          component="span"
          sx={{ fontWeight: 700, color: styles.titleColor }}
        >
          {styles.text}
        </Typography>
        <Box
          component="span"
          sx={{
            ml: "auto",
            transition: "transform 0.2s",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <Icon name="expand_more" sx={{ fontSize: "0.875rem" }} />
        </Box>
      </Button>

      <Collapse in={expanded}>
        <Box
          sx={{
            color: "text.secondary",
            p: 1.5,
            borderRadius: 1,
            bgcolor: styles.contentBg,
            borderRight: `2px solid ${styles.contentBorder}`,
          }}
        >
          <Typography component="span" sx={{ fontWeight: 700 }}>
            {commentary.title}
          </Typography>{" "}
          {commentary.text}
        </Box>
      </Collapse>
    </Box>
  );
}
