# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies only
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Copy rest of the code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy only built files and production deps
COPY package*.json ./
RUN npm ci --only=production --prefer-offline --no-audit --progress=false

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
