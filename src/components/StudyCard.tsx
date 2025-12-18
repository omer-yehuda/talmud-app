"use client";

import { useState } from "react";
import Image from "next/image";
import type { StudyTopic } from "@/types";
import { CommentaryBox } from "./CommentaryBox";
import { Icon } from "./ui";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

interface StudyCardProps {
  topic: StudyTopic;
}

export function StudyCard({ topic }: StudyCardProps): React.ReactElement {
  const [answerRevealed, setAnswerRevealed] = useState(false);

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
        <Typography variant="h6" sx={{ fontWeight: 700, color: "grey.800" }}>
          {topic.title}
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
            borderColor: "grey.200",
            position: "relative",
            minHeight: 250,
          }}
        >
          <Image
            src={topic.image}
            alt={topic.caption}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              fontSize: "0.75rem",
              p: 1,
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
            p: 3,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 1,
              }}
            >
              סוגיית הגמרא
            </Typography>
            <Typography
              sx={{
                fontSize: "1.25rem",
                lineHeight: 1.75,
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
          background: "linear-gradient(to left, #eef2ff, white)",
          p: 3,
          borderTop: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
          <Icon name="help_outline" sx={{ fontSize: "1.5rem", color: "#4f46e5" }} />
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#312e81", mb: 0.5 }}>
              שאלה לעיון
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {topic.question.text}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ position: "relative", mt: 2 }}>
          <Box
            sx={{
              bgcolor: "white",
              border: "1px solid #c7d2fe",
              borderRadius: 2,
              p: 2,
              color: "text.secondary",
              transition: "all 0.3s",
              filter: !answerRevealed ? "blur(4px)" : "none",
              userSelect: !answerRevealed ? "none" : "auto",
            }}
          >
            <Typography component="span" sx={{ fontWeight: 700 }}>
              תשובה:
            </Typography>{" "}
            {topic.question.answer}
          </Box>

          {!answerRevealed && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => setAnswerRevealed(true)}
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "#4f46e5",
                  "&:hover": {
                    bgcolor: "#4338ca",
                  },
                  color: "white",
                  px: 3,
                  py: 1,
                  borderRadius: 99,
                  boxShadow: 3,
                }}
              >
                <Icon name="visibility" />
                <Typography component="span">גלה תשובה</Typography>
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
