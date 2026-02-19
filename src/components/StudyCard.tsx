"use client";

import { useState } from "react";
import Image from "next/image";
import type { StudyTopic } from "@/types";
import { CommentaryBox } from "./CommentaryBox";
import { Icon } from "./ui";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface StudyCardProps {
  topic: StudyTopic;
}

export function StudyCard({ topic }: StudyCardProps): React.ReactElement {
  const [answerRevealed, setAnswerRevealed] = useState(false);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.04)",
        mb: 2,
      }}
    >
      <Box
        component="header"
        sx={{
          bgcolor: "grey.50",
          p: 2.5,
          borderBottom: "1px solid",
          borderColor: "grey.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "grey.800", fontSize: "1.1rem" }}>
          {topic.title}
        </Typography>
        <Box
          component="span"
          sx={{
            fontSize: "0.8rem",
            bgcolor: "rgba(37, 99, 235, 0.08)",
            color: "secondary.main",
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {topic.page}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "33.333%" },
            bgcolor: "grey.100",
            borderLeft: { md: "1px solid" },
            borderColor: "grey.100",
            position: "relative",
            minHeight: { xs: 220, md: 280 },
          }}
        >
          <Image
            src={topic.image}
            alt={topic.caption}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              color: "white",
              fontSize: "0.75rem",
              p: 1.5,
              pt: 3,
              width: "100%",
              zIndex: 10,
            }}
          >
            {topic.caption}
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "66.666%" },
            p: { xs: 2.5, md: 3.5 },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                mb: 1.5,
              }}
            >
              סוגיית הגמרא
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                lineHeight: 2,
                color: "#0f172a",
                fontFamily: '"Amiri", serif',
              }}
            >
              {topic.gemara}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {topic.rashi && (
              <Grid size={{ xs: 12, md: 6 }}>
                <CommentaryBox commentary={topic.rashi} type="rashi" />
              </Grid>
            )}
            {topic.tosafot && (
              <Grid size={{ xs: 12, md: 6 }}>
                <CommentaryBox commentary={topic.tosafot} type="tosafot" />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          background: "linear-gradient(135deg, rgba(238, 242, 255, 0.5), rgba(255, 255, 255, 0.8))",
          p: 3,
          borderTop: "1px solid",
          borderColor: "grey.100",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              bgcolor: "rgba(79, 70, 229, 0.08)",
              borderRadius: 2,
              p: 0.75,
              display: "flex",
            }}
          >
            <Icon name="help_outline" sx={{ fontSize: "1.25rem", color: "#4f46e5" }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#312e81", mb: 0.5, fontSize: "0.95rem" }}>
              שאלה לעיון
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.7 }}>
              {topic.question.text}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ position: "relative", mt: 2 }}>
          <MotionBox
            animate={{
              filter: answerRevealed ? "blur(0px)" : "blur(5px)",
              opacity: answerRevealed ? 1 : 0.4,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            sx={{
              bgcolor: "white",
              border: "1px solid rgba(199, 210, 254, 0.5)",
              borderRadius: 3,
              p: 2.5,
              color: "text.secondary",
              userSelect: !answerRevealed ? "none" : "auto",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            <Typography component="span" sx={{ fontWeight: 700 }}>
              תשובה:
            </Typography>{" "}
            {topic.question.answer}
          </MotionBox>

          <AnimatePresence>
            {!answerRevealed && (
              <MotionBox
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MotionButton
                  onClick={() => setAnswerRevealed(true)}
                  variant="contained"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#4f46e5",
                    "&:hover": { bgcolor: "#4338ca" },
                    color: "white",
                    px: 3.5,
                    py: 1.25,
                    borderRadius: 99,
                    boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
                    fontSize: "0.9rem",
                  }}
                >
                  <Icon name="visibility" sx={{ fontSize: "1.1rem" }} />
                  <Typography component="span">גלה תשובה</Typography>
                </MotionButton>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </MotionCard>
  );
}
