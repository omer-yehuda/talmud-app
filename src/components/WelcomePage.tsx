"use client";

import Image from "next/image";
import { MASECHET, LABELS, WELCOME_TEXT, ALT_TEXT, getImagePath } from "@/lib/constants";
import { Icon } from "./ui";
import type { PageInfo } from "@/types";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

interface WelcomePageProps {
  pages: PageInfo[];
  onPageSelect: (pageId: string) => void;
}

export function WelcomePage({ pages, onPageSelect }: WelcomePageProps): React.ReactElement {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <Box sx={{ position: "relative", height: { xs: 260, md: 320 }, overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Image
            src={getImagePath("beit-midrash")}
            alt={ALT_TEXT.beitMidrash}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.5) 50%, rgba(15, 23, 42, 0.3) 100%)",
            }}
          />
        </Box>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            color: "white",
            textAlign: "center",
            px: 3,
          }}
        >
          <Icon name="menu_book" sx={{ fontSize: "3.5rem", color: "primary.light", mb: 0.5 }} />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: '"Amiri", serif',
              fontSize: { xs: "2rem", md: "2.5rem" },
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {MASECHET.fullName}
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "rgba(148, 163, 184, 0.9)" }}>
            {MASECHET.pageRange}
          </Typography>
        </MotionBox>
      </Box>

      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <MotionBox
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              mb: 1.5,
              textAlign: "center",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            {LABELS.journeyTitle}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 3,
              textAlign: "center",
              maxWidth: 520,
              mx: "auto",
              fontSize: "0.95rem",
            }}
          >
            {WELCOME_TEXT.intro}
          </Typography>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            fontSize: "0.85rem",
            color: "text.secondary",
            fontWeight: 500,
            bgcolor: "rgba(255, 251, 235, 0.7)",
            p: 2,
            borderRadius: 3,
            mb: 4,
            border: "1px solid rgba(245, 158, 11, 0.12)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "primary.main",
              }}
            />
            <Typography component="span" sx={{ fontSize: "0.85rem" }}>
              {LABELS.rashiExplains}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "secondary.main",
              }}
            />
            <Typography component="span" sx={{ fontSize: "0.85rem" }}>
              {LABELS.tosafotDeepens}
            </Typography>
          </Box>
        </MotionBox>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#0f172a",
            mb: 2.5,
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          {LABELS.selectPage}
        </Typography>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={2}>
            {pages.map((page) => (
              <Grid key={page.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <MotionBox variants={itemVariants}>
                  <MotionButton
                    onClick={() => onPageSelect(page.id)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "grey.200",
                      bgcolor: "white",
                      width: "100%",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      "&:hover": {
                        borderColor: "secondary.light",
                        bgcolor: "rgba(37, 99, 235, 0.02)",
                        boxShadow: "0 4px 20px rgba(37, 99, 235, 0.1)",
                      },
                    }}
                  >
                    <Icon name={page.icon} sx={{ fontSize: "1.75rem", color: "secondary.main" }} />
                    <Typography component="span" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>
                      {page.title}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.8rem",
                        color: "text.secondary",
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      {page.description}
                    </Typography>
                  </MotionButton>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Box>
    </MotionCard>
  );
}
