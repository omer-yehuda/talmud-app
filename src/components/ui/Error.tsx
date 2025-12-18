"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "./Icon";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorProps): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        textAlign: "center",
        bgcolor: "#fef2f2",
        borderRadius: 3,
        border: "1px solid #fecaca",
      }}
    >
      <Icon name="error" sx={{ fontSize: "2.25rem", color: "#ef4444" }} />
      <Typography sx={{ color: "#b91c1c" }}>{message}</Typography>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="contained"
          sx={{
            px: 3,
            py: 1,
            bgcolor: "#ef4444",
            color: "white",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#dc2626",
            },
          }}
        >
          נסה שוב
        </Button>
      )}
    </Box>
  );
}

export function ErrorPage({ message, onRetry }: ErrorProps): React.ReactElement {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textAlign: "center",
          maxWidth: "md",
        }}
      >
        <Icon name="error" sx={{ fontSize: "4.5rem", color: "#ef4444" }} />
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "grey.800" }}
        >
          שגיאה בטעינת הנתונים
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{message}</Typography>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: "secondary.main",
              color: "white",
              fontWeight: 500,
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            נסה שוב
          </Button>
        )}
      </Box>
    </Box>
  );
}
