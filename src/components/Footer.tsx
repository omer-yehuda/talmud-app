"use client";

import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        borderTop: "1px solid",
        borderColor: "grey.200",
        bgcolor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <Link
        href="https://github.com/omer-yehuda/talmud-app"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#57534e",
          textDecoration: "none",
          transition: "all 0.2s",
          "&:hover": {
            color: "#0f172a",
            transform: "translateY(-1px)",
          },
        }}
      >
        <GitHubIcon sx={{ fontSize: "1.25rem" }} />
        <Typography component="span" sx={{ fontWeight: 500 }}>
          קוד מקור
        </Typography>
      </Link>
      <Typography
        variant="caption"
        sx={{ color: "#94a3b8" }}
      >
        © {currentYear} עומר יהודה
      </Typography>
    </Box>
  );
}
