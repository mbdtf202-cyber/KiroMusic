# Multi-stage Dockerfile for KiroMusic

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Stage 3: Final Image
FROM node:18-alpine

WORKDIR /app

# Install production dependencies
RUN apk add --no-cache \
    tini \
    curl

# Copy backend from builder
COPY --from=backend-builder /app/backend ./backend

# Copy frontend build from builder
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Copy contracts and scripts
COPY contracts ./contracts
COPY scripts ./scripts
COPY hardhat.config.js ./
COPY package*.json ./

# Install root dependencies (for Hardhat)
RUN npm ci --only=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose ports
EXPOSE 3001 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Use tini to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Start backend server
CMD ["node", "backend/src/server.js"]
