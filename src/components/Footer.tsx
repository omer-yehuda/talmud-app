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
        borderColor: "rgba(0,0,0,0.04)",
        bgcolor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <Link
        href="https://github.com/omer-yehuda/talmud-app"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          color: "#78716c",
          textDecoration: "none",
          transition: "all 0.2s ease",
          fontSize: "0.85rem",
          "&:hover": {
            color: "#0f172a",
          },
        }}
      >
        <GitHubIcon sx={{ fontSize: "1.1rem" }} />
        <Typography component="span" sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
          קוד מקור
        </Typography>
      </Link>
      <Typography
        variant="caption"
        sx={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.75rem" }}
      >
        &copy; {currentYear} עומר יהודה
      </Typography>
    </Box>
  );
}
