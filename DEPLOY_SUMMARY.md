# 🚀 Quick Deploy Guide

## Model Configuration
- **Model**: `mistralai/mistral-small-3.2-24b-instruct:free`
- **Provider**: OpenRouter
- **Cost**: FREE ✅

## Deploy Commands

### 1. Setup Environment
```bash
# Copy environment file
copy env.example .env

# Edit .env with your API key:
# VITE_OPENAI_API_KEY=sk-or-v1-your-api-key
# VITE_OPENAI_MODEL=mistralai/mistral-small-3.2-24b-instruct:free
```

### 2. Deploy Development (Port 3000)
```bash
# Windows
deploy.bat

# Linux/Mac  
chmod +x deploy.sh
./deploy.sh

# Manual
docker-compose up -d --build
```

### 3. Deploy Production (Port 80)
```bash
# Production deploy
docker-compose -f docker-compose.prod.yml up -d --build
```

## Access URLs

- **Development**: http://localhost:3000
- **Production**: http://localhost:80 
- **Health Check**: http://localhost/health

## Features

✅ **AI Assistant** with Mistral Small 3.2 24B  
✅ **Function Calling** for documentation search  
✅ **Kubernetes Documentation** search  
✅ **Vietnamese language** support  
✅ **Responsive design** 
✅ **Docker containerized**  
✅ **Production ready** with Nginx  
✅ **Health monitoring**  

## Troubleshooting

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Clean rebuild
docker-compose down
docker system prune -f
docker-compose up -d --build
```

## Success Indicators

✅ Container running: `docker-compose ps` shows "Up"  
✅ Health check: `curl http://localhost/health` returns "healthy"  
✅ Web app: Browser shows Kubernetes Documentation  
✅ AI Chat: Click 🤖 icon opens chat modal  
✅ AI Response: Send message gets response from Mistral

**Ready to deploy! 🎉**
