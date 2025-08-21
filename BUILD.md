# Docker Build & Deploy Guide

## 🐳 Containerize Kubernetes Documentation App

### Prerequisite
- Docker và Docker Compose đã được cài đặt
- File `.env` với API key hợp lệ

### 📋 Files đã tạo:
- `Dockerfile` - Multi-stage build với Nginx
- `nginx.conf` - Nginx configuration
- `docker-compose.yml` - Container orchestration
- `.dockerignore` - Ignore files cho Docker build

### 🚀 Cách sử dụng:

#### 1. Build Docker Image
```bash
# Build image
docker build -t kubernetes-docs-app .

# Hoặc với tag cụ thể
docker build -t kubernetes-docs-app:v1.0 .
```

#### 2. Run với Docker
```bash
# Chạy container đơn lẻ
docker run -d \
  --name kubernetes-docs \
  -p 3000:80 \
  -v $(pwd)/.env:/app/.env:ro \
  kubernetes-docs-app

# Truy cập: http://localhost:3000
```

#### 3. Run với Docker Compose (Recommended)
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

#### 4. Run trên Production Server
```bash
# Pull image (nếu push lên registry)
docker pull your-registry/kubernetes-docs-app:latest

# Run với environment variables
docker run -d \
  --name kubernetes-docs-prod \
  -p 80:80 \
  --restart unless-stopped \
  -e VITE_OPENAI_API_KEY=your-api-key \
  -e VITE_OPENAI_MODEL=openai/gpt-3.5-turbo \
  your-registry/kubernetes-docs-app:latest
```

### 🔧 Configuration:

#### Environment Variables
Tạo file `.env` trong thư mục project:
```env
VITE_OPENAI_API_KEY=sk-or-v1-your-api-key
VITE_OPENAI_MODEL=mistralai/mistral-small-3.1-24b-instruct:free
```

#### Nginx Configuration
- Serve static files
- Handle client-side routing (React Router)
- Gzip compression
- Security headers
- Health check endpoint: `/health`

### 📊 Container Features:

#### ✅ Production Ready:
- Multi-stage build (smaller image size)
- Nginx reverse proxy
- Health checks
- Restart policies
- Security headers
- Gzip compression

#### ✅ Development Friendly:
- Hot reloading (trong dev mode)
- Environment variable support
- Volume mounting cho .env
- Logging configuration

### 🔍 Troubleshooting:

#### Check container status:
```bash
docker ps
docker logs kubernetes-docs
```

#### Access container shell:
```bash
docker exec -it kubernetes-docs sh
```

#### Health check:
```bash
curl http://localhost:3000/health
```

### 📤 Deploy to Cloud:

#### Push to Docker Hub:
```bash
# Tag image
docker tag kubernetes-docs-app your-username/kubernetes-docs-app:latest

# Push
docker push your-username/kubernetes-docs-app:latest
```

#### Deploy to AWS/Azure/GCP:
- Use container services (ECS, Container Instances, Cloud Run)
- Set environment variables trong cloud console
- Configure load balancer nếu cần

### 🎯 Benefits:

1. **Portable**: Chạy được trên bất kỳ môi trường nào có Docker
2. **Consistent**: Môi trường giống nhau dev -> staging -> production  
3. **Scalable**: Dễ scale horizontal với container orchestration
4. **Isolated**: Không conflict với system dependencies
5. **Fast deployment**: Pull image và chạy ngay

**Container sẵn sàng production!** 🚀
