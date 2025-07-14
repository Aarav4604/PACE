# Multi-stage build for PACE API Server
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S pace && \
    adduser -S pace -u 1001

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache curl

# Copy built application from builder
COPY --from=builder --chown=pace:pace /app/dist ./dist
COPY --from=builder --chown=pace:pace /app/node_modules ./node_modules
COPY --from=builder --chown=pace:pace /app/package*.json ./

# Switch to non-root user
USER pace

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/healthz || exit 1

# Expose port
EXPOSE 3000

# Run the application
CMD ["node", "dist/main.js"] 