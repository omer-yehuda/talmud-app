"use client";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

interface IconProps {
  name: string;
  className?: string;
  sx?: SxProps<Theme>;
  label?: string;
}

export const Icon = ({ name, className = "", sx, label }: IconProps): React.ReactElement => {
  const ariaProps = label
    ? { "aria-label": label, role: "img" as const }
    : { "aria-hidden": true as const };

  return (
    <Box
      component="span"
      className={`material-symbols-outlined ${className}`}
      sx={sx}
      {...ariaProps}
    >
      {name}
    </Box>
  );
};
