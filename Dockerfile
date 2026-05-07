# Gunakan image Node.js yang ringan
FROM node:20-slim AS builder

# Install OpenSSL (diperlukan oleh Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install semua dependencies
RUN npm ci

# Copy seluruh source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build aplikasi Nuxt
RUN npm run build

# Tahap Produksi
FROM node:20-slim

# Install OpenSSL di tahap produksi
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy output build dan dependensi dari tahap builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expose port 3000
EXPOSE 3000

# Set environment variables untuk produksi
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Jalankan aplikasi (Nuxt 3 build output)
CMD ["node", ".output/server/index.mjs"]
