"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Icon } from "./Icon";

const MotionBox = motion(Box);

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
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
          textAlign: "center",
        }}
      >
        <MotionBox
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon name={icon} sx={{ fontSize: "3.5rem", color: "primary.main" }} />
        </MotionBox>
        {text && (
          <Typography
            sx={{
              fontSize: "1rem",
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            {text}
          </Typography>
        )}
      </MotionBox>
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
      }}
    >
      <Loading />
    </Box>
  );
}

export function LoadingContent(): React.ReactElement {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <Box sx={{ p: 2.5, bgcolor: "grey.50", borderBottom: "1px solid", borderColor: "grey.100" }}>
          <Skeleton variant="text" width="40%" height={28} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ width: { xs: "100%", md: "33%" }, minHeight: 220 }}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Box>
          <Box sx={{ flex: 1, p: 3 }}>
            <Skeleton variant="text" width="30%" height={20} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="85%" />
            <Skeleton variant="text" width="90%" sx={{ mb: 3 }} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="rounded" width="48%" height={50} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rounded" width="48%" height={50} sx={{ borderRadius: 2 }} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "grey.100" }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rounded" height={60} sx={{ mt: 2, borderRadius: 2 }} />
        </Box>
      </Box>
    </MotionBox>
  );
}
