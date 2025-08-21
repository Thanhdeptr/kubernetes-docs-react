#!/bin/bash

# Kubernetes Documentation React App - Server Deployment Script
# Usage: ./deploy-server.sh

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Configuration
REPO_URL="https://github.com/your-username/kubernetes-docs-react.git"
PROJECT_DIR="/var/www/kubernetes-docs-react"
BACKUP_DIR="/var/www/backups/kubernetes-docs-react"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup current version if exists
if [ -d "$PROJECT_DIR" ]; then
    print_status "Creating backup of current version..."
    cp -r "$PROJECT_DIR" "$BACKUP_DIR/backup_$TIMESTAMP"
    print_status "Backup created: backup_$TIMESTAMP"
fi

# Clone or pull repository
if [ -d "$PROJECT_DIR" ]; then
    print_status "Pulling latest changes from repository..."
    cd "$PROJECT_DIR"
    git fetch origin
    git reset --hard origin/main
    git clean -fd
else
    print_status "Cloning repository..."
    git clone "$REPO_URL" "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

# Install dependencies
print_status "Installing Node.js dependencies..."
npm ci --production=false

# Build project
print_status "Building project for production..."
npm run build

# Set proper permissions
print_status "Setting file permissions..."
sudo chown -R www-data:www-data "$PROJECT_DIR"
sudo chmod -R 755 "$PROJECT_DIR"

# Restart services if needed
if command -v systemctl &> /dev/null; then
    print_status "Restarting Nginx..."
    sudo systemctl reload nginx
    
    # If using PM2
    if command -v pm2 &> /dev/null; then
        print_status "Restarting PM2 processes..."
        pm2 restart all
    fi
fi

# Cleanup old backups (keep last 5)
print_status "Cleaning up old backups..."
cd "$BACKUP_DIR"
ls -t | tail -n +6 | xargs -r rm -rf

print_status "✅ Deployment completed successfully!"
print_status "🌐 Your application should be available at: https://your-domain.com"

# Optional: Health check
print_status "Performing health check..."
if curl -f -s https://your-domain.com > /dev/null; then
    print_status "✅ Health check passed!"
else
    print_warning "⚠️  Health check failed. Please check your configuration."
fi

echo ""
print_status "Deployment completed at: $(date)"
