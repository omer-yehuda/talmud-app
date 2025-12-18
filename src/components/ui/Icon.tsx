"use client";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

interface IconProps {
  name: string;
  className?: string;
  sx?: SxProps<Theme>;
}

export function Icon({ name, className = "", sx }: IconProps): React.ReactElement {
  return (
    <Box
      component="span"
      className={`material-symbols-outlined ${className}`}
      sx={sx}
    >
      {name}
    </Box>
  );
}
