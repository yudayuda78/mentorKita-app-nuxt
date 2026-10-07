-- Sertakan userId agar ORDER BY (score DESC, createdAt ASC, userId ASC) sepenuhnya
-- terlayani index tanpa langkah Sort terpisah.
DROP INDEX IF EXISTS "SnbtFinalScore_snbtTryoutId_score_createdAt_idx";

CREATE INDEX "SnbtFinalScore_snbtTryoutId_score_createdAt_userId_idx"
  ON "SnbtFinalScore" ("snbtTryoutId", score DESC, "createdAt", "userId");
