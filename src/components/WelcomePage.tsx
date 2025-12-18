"use client";

import Image from "next/image";
import { MASECHET, LABELS, WELCOME_TEXT, ALT_TEXT, getImagePath } from "@/lib/constants";
import { Icon } from "./ui";
import type { PageInfo } from "@/types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

interface WelcomePageProps {
  pages: PageInfo[];
  onPageSelect: (pageId: string) => void;
}

export function WelcomePage({ pages, onPageSelect }: WelcomePageProps): React.ReactElement {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", height: 288, overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Image
            src={getImagePath("beit-midrash")}
            alt={ALT_TEXT.beitMidrash}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(15, 23, 42, 0.7)" }} />
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            color: "white",
            textAlign: "center",
            px: 2,
          }}
        >
          <Icon name="menu_book" sx={{ fontSize: "3.75rem", color: "primary.light", mb: 1 }} />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: '"Amiri", serif',
              fontSize: { xs: "1.875rem", md: "2.25rem" },
            }}
          >
            {MASECHET.fullName}
          </Typography>
          <Typography sx={{ fontSize: "1.125rem", color: "#94a3b8" }}>
            {MASECHET.pageRange}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#0f172a",
            mb: 2,
            textAlign: "center",
          }}
        >
          {LABELS.journeyTitle}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            lineHeight: 1.75,
            mb: 3,
            textAlign: "center",
            maxWidth: 576,
            mx: "auto",
          }}
        >
          {WELCOME_TEXT.intro}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            fontSize: "0.875rem",
            color: "text.secondary",
            fontWeight: 500,
            bgcolor: "#fffbeb",
            p: 2,
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component="span"
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
            <Typography component="span">{LABELS.rashiExplains}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component="span"
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "secondary.main",
              }}
            />
            <Typography component="span">{LABELS.tosafotDeepens}</Typography>
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#0f172a",
            mb: 2,
            textAlign: "center",
          }}
        >
          {LABELS.selectPage}
        </Typography>

        <Grid container spacing={2}>
          {pages.map((page) => (
            <Grid key={page.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Button
                onClick={() => onPageSelect(page.id)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.200",
                  bgcolor: "white",
                  transition: "all 0.2s",
                  width: "100%",
                  "&:hover": {
                    borderColor: "secondary.main",
                    bgcolor: "grey.50",
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                  },
                }}
              >
                <Icon name={page.icon} sx={{ fontSize: "1.875rem", color: "secondary.main" }} />
                <Typography component="span" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  {page.title}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textAlign: "center",
                  }}
                >
                  {page.description}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}
