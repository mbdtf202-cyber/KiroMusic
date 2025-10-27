# 🐳 Docker Deployment Guide

Complete guide for deploying KiroMusic using Docker and Docker Compose.

---

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB RAM minimum
- 10GB disk space

### Install Docker

**macOS/Windows:**
- Download [Docker Desktop](https://www.docker.com/products/docker-desktop)

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

---

## 🚀 Quick Start

### 1. Clone and Configure

```bash
# Clone repository
git clone https://github.com/mbdtf202-cyber/KiroMusic.git
cd KiroMusic

# Configure environment
cp .env.deployment .env
nano .env  # Add your configuration
```

### 2. Build and Run

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 3. Access Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

---

## 📦 Docker Commands

### Basic Operations

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f [service_name]

# Check status
docker-compose ps

# Execute command in container
docker-compose exec backend sh
```

### Build and Rebuild

```bash
# Build images
docker-compose build

# Rebuild specific service
docker-compose build backend

# Force rebuild (no cache)
docker-compose build --no-cache

# Pull latest images
docker-compose pull
```

### Data Management

```bash
# Remove all containers and volumes
docker-compose down -v

# Remove only containers
docker-compose down

# Backup MongoDB data
docker-compose exec mongodb mongodump --out /backup

# Restore MongoDB data
docker-compose exec mongodb mongorestore /backup
```

---

## 🏗️ Architecture

### Services

```
┌─────────────────────────────────────────┐
│           Docker Network                │
│                                         │
│  ┌──────────┐  ┌──────────┐           │
│  │ Frontend │  │ Backend  │           │
│  │  :3000   │  │  :3001   │           │
│  └────┬─────┘  └────┬─────┘           │
│       │             │                  │
│       │      ┌──────┴──────┐          │
│       │      │             │          │
│       │  ┌───▼────┐  ┌────▼───┐      │
│       │  │MongoDB │  │ Redis  │      │
│       │  │ :27017 │  │ :6379  │      │
│       │  └────────┘  └────────┘      │
│       │                               │
└───────┼───────────────────────────────┘
        │
    ┌───▼────┐
    │ User   │
    └────────┘
```

### Volumes

- `backend_node_modules` - Backend dependencies
- `frontend_node_modules` - Frontend dependencies
- `mongodb_data` - Database persistence
- `redis_data` - Cache persistence

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file in project root:

```env
# Node Environment
NODE_ENV=production

# Server
PORT=3001

# Database
MONGODB_URI=mongodb://admin:password@mongodb:27017/kiromusic?authSource=admin
REDIS_URL=redis://redis:6379

# API Keys
OPENAI_API_KEY=your_openai_key
PINATA_JWT=your_pinata_jwt

# Blockchain
PRIVATE_KEY=your_private_key
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Docker Compose Override

Create `docker-compose.override.yml` for local customization:

```yaml
version: '3.8'

services:
  backend:
    environment:
      - DEBUG=true
    ports:
      - "9229:9229"  # Node.js debugger
```

---

## 🔧 Development Mode

### Hot Reload Development

```bash
# Start with development configuration
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Or use watch mode
docker-compose watch
```

### Debug Mode

```bash
# Start backend with debugger
docker-compose run --service-ports backend \
  node --inspect=0.0.0.0:9229 backend/src/server.js
```

---

## 🚢 Production Deployment

### Build Production Image

```bash
# Build optimized image
docker build -t kiromusic:latest .

# Tag for registry
docker tag kiromusic:latest your-registry/kiromusic:latest

# Push to registry
docker push your-registry/kiromusic:latest
```

### Deploy to Server

```bash
# On production server
docker pull your-registry/kiromusic:latest

# Run with production config
docker run -d \
  --name kiromusic \
  -p 3001:3001 \
  --env-file .env.production \
  --restart unless-stopped \
  your-registry/kiromusic:latest
```

### Using Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml kiromusic

# Check services
docker service ls

# Scale services
docker service scale kiromusic_backend=3
```

### Using Kubernetes

```bash
# Convert to Kubernetes
kompose convert -f docker-compose.yml

# Deploy to Kubernetes
kubectl apply -f .

# Check pods
kubectl get pods
```

---

## 📊 Monitoring

### Health Checks

```bash
# Check backend health
curl http://localhost:3001/health

# Check all services
docker-compose ps
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df

# Clean up
docker system prune -a
```

---

## 🔒 Security

### Best Practices

1. **Use secrets for sensitive data**
```bash
# Create secret
echo "my_secret" | docker secret create db_password -

# Use in compose
secrets:
  db_password:
    external: true
```

2. **Run as non-root user**
```dockerfile
USER nodejs
```

3. **Scan images for vulnerabilities**
```bash
docker scan kiromusic:latest
```

4. **Use specific image versions**
```yaml
image: node:18-alpine  # Not 'latest'
```

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

**Container won't start:**
```bash
# Check logs
docker-compose logs backend

# Inspect container
docker inspect kiromusic-backend

# Check events
docker events
```

**Out of disk space:**
```bash
# Clean up
docker system prune -a --volumes

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

**Network issues:**
```bash
# Recreate network
docker-compose down
docker network prune
docker-compose up -d
```

---

## 📈 Performance Optimization

### Multi-stage Builds

Already implemented in `Dockerfile` to reduce image size.

### Layer Caching

```dockerfile
# Copy package files first
COPY package*.json ./
RUN npm ci

# Then copy source (changes more frequently)
COPY . .
```

### Resource Limits

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

---

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build image
        run: docker build -t kiromusic .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push kiromusic:latest
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 🎯 Quick Reference

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose build --no-cache

# Clean up
docker system prune -a

# Check health
curl http://localhost:3001/health
```

---

**Ready to deploy with Docker!** 🐳🚀
