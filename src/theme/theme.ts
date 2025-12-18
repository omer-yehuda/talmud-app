"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    secondary: {
      main: "#2563eb",
      light: "#3b82f6",
      dark: "#1d4ed8",
    },
    background: {
      default: "#faf3e7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
  typography: {
    fontFamily: '"Heebo", sans-serif',
    h1: {
      fontFamily: '"Heebo", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Heebo", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Heebo", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Heebo", sans-serif',
    },
    body2: {
      fontFamily: '"Heebo", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
