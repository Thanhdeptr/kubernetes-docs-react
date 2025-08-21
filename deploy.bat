@echo off
REM Deploy script for Kubernetes Documentation App (Windows)

echo 🚀 Starting deployment...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo ❌ .env file not found. Please create .env file with your API keys.
    echo 📋 Copy from template: copy env.example .env
    exit /b 1
)

echo ✅ Environment variables file found

REM Stop and remove existing containers
echo 🔄 Stopping existing containers...
docker-compose down 2>nul

REM Remove old images to save space
echo 🧹 Cleaning up old images...
docker image prune -f

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up -d --build

REM Wait for health check
echo 🏥 Waiting for health check...
timeout /t 10 /nobreak >nul

REM Check if container is running
docker-compose ps | findstr "Up" >nul
if errorlevel 1 (
    echo ❌ Deployment failed!
    echo 📋 Error logs:
    docker-compose logs
    exit /b 1
) else (
    echo ✅ Deployment successful!
    echo 🌐 Application is running at: http://localhost:3000
    echo 🏥 Health check: http://localhost:3000/health
    
    REM Show logs
    echo 📋 Recent logs:
    docker-compose logs --tail=20
)

echo 🎉 Deployment completed successfully!
pause
