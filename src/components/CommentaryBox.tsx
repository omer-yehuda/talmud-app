"use client";

import { useState } from "react";
import type { Commentary } from "@/types";
import { Icon } from "./ui";

type CommentaryType = "rashi" | "tosafot";

interface CommentaryBoxProps {
  commentary: Commentary;
  type: CommentaryType;
}

const config: Record<CommentaryType, {
  icon: string;
  text: string;
  buttonHover: string;
  iconColor: string;
  titleColor: string;
  contentBg: string;
  contentBorder: string;
}> = {
  rashi: {
    icon: "lightbulb",
    text: 'רש"י מבאר',
    buttonHover: "hover:bg-amber-50",
    iconColor: "text-amber-600",
    titleColor: "text-amber-800",
    contentBg: "bg-amber-50",
    contentBorder: "border-r-2 border-amber-300",
  },
  tosafot: {
    icon: "quiz",
    text: "תוספות מקשה",
    buttonHover: "hover:bg-blue-50",
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
    contentBg: "bg-indigo-50",
    contentBorder: "border-r-2 border-blue-300",
  },
};

export function CommentaryBox({ commentary, type }: CommentaryBoxProps): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const styles = config[type];

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className={`flex items-center gap-2 mb-2 w-full p-1 rounded transition-colors ${styles.buttonHover}`}
      >
        <Icon name={styles.icon} className={styles.iconColor} />
        <span className={`font-bold ${styles.titleColor}`}>{styles.text}</span>
        <Icon
          name="expand_more"
          className={`text-sm mr-auto transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className={`text-muted p-3 rounded ${styles.contentBg} ${styles.contentBorder}`}>
          <span className="font-bold">{commentary.title}</span> {commentary.text}
        </div>
      )}
    </div>
  );
}
