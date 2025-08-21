#!/bin/bash

# Deploy script for Kubernetes Documentation App

set -e

echo "🚀 Starting deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create .env file with your API keys."
    echo "📋 Copy from template: cp env.example .env"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Validate required environment variables
if [ -z "$VITE_OPENAI_API_KEY" ]; then
    echo "❌ VITE_OPENAI_API_KEY not found in .env file"
    exit 1
fi

echo "✅ Environment variables loaded"

# Stop and remove existing containers
echo "🔄 Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Remove old images to save space
echo "🧹 Cleaning up old images..."
docker image prune -f

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up -d --build

# Wait for health check
echo "🏥 Waiting for health check..."
sleep 10

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo "🌐 Application is running at: http://localhost:3000"
    echo "🏥 Health check: http://localhost:3000/health"
    
    # Show logs
    echo "📋 Recent logs:"
    docker-compose logs --tail=20
else
    echo "❌ Deployment failed!"
    echo "📋 Error logs:"
    docker-compose logs
    exit 1
fi

echo "🎉 Deployment completed successfully!"
