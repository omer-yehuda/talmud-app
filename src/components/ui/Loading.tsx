"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Icon } from "./Icon";

export function Loading({ text = "טוען...", icon = "menu_book" }: { text?: string; icon?: string }): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
        }}
      >
        <Icon name={icon} className="text-6xl text-primary-main animate-pulse" />
        {text && (
          <Typography
            sx={{
              fontSize: "1.125rem",
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export function LoadingPage(): React.ReactElement {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
      }}
    >
      <Loading />
    </Box>
  );
}

export function LoadingContent(): React.ReactElement {
  return <Loading text="טוען תוכן..." icon="hourglass_empty" />;
}
