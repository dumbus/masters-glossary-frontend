# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Set Node.js memory limits for 1GB RAM VPS (leave ~300MB for system)
ENV NODE_OPTIONS="--max-old-space-size=512"

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve the application on port 3000
# serve listens on 0.0.0.0 by default when port is exposed in Docker
CMD ["serve", "-s", "dist", "-l", "3000"]
