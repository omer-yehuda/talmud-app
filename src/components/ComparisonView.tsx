"use client";

import { useState } from "react";
import type { ComparisonItem } from "@/types";
import { Icon } from "./ui";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

interface ComparisonViewProps {
  items: ComparisonItem[];
}

export function ComparisonView({ items }: ComparisonViewProps): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <Card
      component="article"
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "grey.200",
        mb: 2,
      }}
    >
      <Box
        component="header"
        sx={{
          bgcolor: "grey.50",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "grey.200",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "grey.800",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Icon name="compare_arrows" sx={{ color: "#4f46e5" }} />
          אין בין... ל... אלא...
        </Typography>
        <Box
          component="span"
          sx={{
            fontSize: "0.875rem",
            bgcolor: "grey.200",
            color: "grey.600",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          ח עמוד א - ט עמוד ב
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}>
          בחרו זוג מושגים כדי לראות את ההבדל ביניהם לפי הגמרא:
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {items.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <Grid key={item.label} size={{ xs: 6, md: 3 }}>
                <Button
                  onClick={() => setSelectedIndex(index)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: isSelected ? "#818cf8" : "grey.200",
                    bgcolor: isSelected ? "#eef2ff" : "white",
                    boxShadow: 1,
                    transition: "all 0.2s",
                    textAlign: "center",
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      borderColor: "#818cf8",
                      bgcolor: "#eef2ff",
                    },
                  }}
                >
                  <Icon name={item.icon} sx={{ fontSize: "1.875rem", color: "#4f46e5" }} />
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 700,
                      color: "text.secondary",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>

        <Box
          sx={{
            bgcolor: "#eef2ff",
            borderRadius: 2,
            p: 3,
            minHeight: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedItem ? (
            <SelectedItemDisplay item={selectedItem} />
          ) : (
            <EmptyState />
          )}
        </Box>
      </Box>
    </Card>
  );
}

function SelectedItemDisplay({ item }: { item: ComparisonItem }): React.ReactElement {
  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#312e81", mb: 1 }}>
        {item.label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Amiri", serif',
          fontSize: "1.5rem",
          color: "grey.800",
          mb: 2,
        }}
      >
        {`"${item.diff}"`}
      </Typography>
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "grey.200",
          width: "100%",
          textAlign: "right",
          color: "text.secondary",
          fontSize: "0.875rem",
        }}
      >
        <Typography component="span" sx={{ fontWeight: 700 }}>
          ביאור:
        </Typography>{" "}
        {item.details}
      </Box>
    </Box>
  );
}

function EmptyState(): React.ReactElement {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Icon name="balance" sx={{ fontSize: "2.25rem", color: "#cbd5e1", mb: 1 }} />
      <Typography sx={{ color: "#94a3b8" }}>בחר זוג להשוואה</Typography>
    </Box>
  );
}
