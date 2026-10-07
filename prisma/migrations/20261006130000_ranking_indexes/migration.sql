-- Extensions untuk pencarian substring cepat (nama/sekolah)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Tie-break leaderboard: waktu skor final pertama tercapai
ALTER TABLE "SnbtFinalScore" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Covering index: filter per tryout + order (score desc, createdAt asc)
CREATE INDEX "SnbtFinalScore_snbtTryoutId_score_createdAt_idx"
  ON "SnbtFinalScore" ("snbtTryoutId", score DESC, "createdAt");

-- Index pencarian trigram untuk leaderboard search
CREATE INDEX "UserProfile_fullName_trgm_idx"
  ON "UserProfile" USING gin ("fullName" gin_trgm_ops);
CREATE INDEX "UserProfile_schoolOrigin_trgm_idx"
  ON "UserProfile" USING gin ("schoolOrigin" gin_trgm_ops);
