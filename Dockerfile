# Multi-stage build for React app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Create build arguments for environment variables
ARG VITE_OLLAMA_BASE=http://192.168.10.18/ollama/v1
ARG VITE_MODEL_NAME=gpt-oss:20b

# Set environment variables
ENV VITE_OLLAMA_BASE=$VITE_OLLAMA_BASE
ENV VITE_MODEL_NAME=$VITE_MODEL_NAME

# Build the app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
