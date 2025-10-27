# 🚀 KiroMusic AI后端启动指南

## 快速开始 (5分钟)

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件
nano .env
```

**必需的API密钥**:
- `OPENAI_API_KEY` - 用于GPT-4和DALL-E 3
- 其他API密钥可选（用于数据集成）

### 3. 启动服务

```bash
# 开发模式（自动重启）
npm run dev

# 或生产模式
npm start
```

### 4. 测试API

```bash
# 健康检查
curl http://localhost:3001/health

# 测试AI端点
curl http://localhost:3001/api/ai/predict-hits
```

---

## 📦 完整安装步骤

### 前置要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- 可选: MongoDB, Redis

### 安装依赖

```bash
cd backend
npm install
```

这将安装以下核心依赖:
- express - Web框架
- @tensorflow/tfjs-node - 机器学习
- openai - OpenAI API
- axios - HTTP客户端
- 其他30+个依赖包

---

## 🔑 API密钥获取

### OpenAI API (必需)

1. 访问 https://platform.openai.com/
2. 注册/登录账号
3. 进入 API Keys 页面
4. 创建新的API密钥
5. 复制密钥到 `.env` 文件

**费用**: 按使用量计费
- GPT-4: ~$0.03/1K tokens
- DALL-E 3: ~$0.04/image

### Spotify API (可选)

1. 访问 https://developer.spotify.com/
2. 创建应用
3. 获取 Client ID 和 Client Secret

### YouTube API (可选)

1. 访问 https://console.cloud.google.com/
2. 创建项目
3. 启用 YouTube Data API v3
4. 创建API密钥

### Twitter API (可选)

1. 访问 https://developer.twitter.com/
2. 申请开发者账号
3. 创建应用
4. 获取API密钥

---

## 🧪 测试AI功能

### 1. 音频指纹识别

```bash
curl -X POST http://localhost:3001/api/ai/fingerprint \
  -F "audio=@test-audio.mp3"
```

### 2. 投资推荐

```bash
curl http://localhost:3001/api/ai/investment-recommendation/1
```

### 3. 生成歌词

```bash
curl -X POST http://localhost:3001/api/ai/generate-lyrics \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A song about love",
    "style": "pop",
    "language": "en"
  }'
```

### 4. 生成封面

```bash
curl -X POST http://localhost:3001/api/ai/generate-cover \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Futuristic music album",
    "style": "cyberpunk"
  }'
```

---

## 📊 监控和日志

### 查看日志

```bash
# 实时日志
npm run dev

# 生产日志
pm2 logs kiromusic-backend
```

### 性能监控

访问: http://localhost:3001/health

返回:
```json
{
  "status": "ok",
  "timestamp": 1234567890
}
```

---

## 🐛 常见问题

### Q: 端口被占用

```bash
# 修改.env中的PORT
PORT=3002
```

### Q: OpenAI API错误

检查:
1. API密钥是否正确
2. 账户是否有余额
3. 网络连接是否正常

### Q: 内存不足

```bash
# 增加Node.js内存限制
node --max-old-space-size=4096 src/server.js
```

### Q: TensorFlow错误

```bash
# 重新安装TensorFlow
npm uninstall @tensorflow/tfjs-node
npm install @tensorflow/tfjs-node
```

---

## 🚀 生产部署

### 使用PM2

```bash
# 安装PM2
npm install -g pm2

# 启动服务
pm2 start src/server.js --name kiromusic-backend

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 重启服务
pm2 restart kiromusic-backend
```

### 使用Docker

```bash
# 构建镜像
docker build -t kiromusic-backend .

# 运行容器
docker run -p 3001:3001 \
  -e OPENAI_API_KEY=your_key \
  kiromusic-backend
```

### 部署到云端

**Heroku**:
```bash
heroku create kiromusic-backend
git push heroku main
```

**AWS**:
- 使用 Elastic Beanstalk
- 或 ECS + Fargate

**Vercel**:
```bash
vercel deploy
```

---

## 📈 性能优化

### 1. 启用缓存

```javascript
// 使用Redis缓存
const redis = require('redis');
const client = redis.createClient();
```

### 2. 负载均衡

```bash
# 使用PM2集群模式
pm2 start src/server.js -i max
```

### 3. CDN加速

- 使用Cloudflare
- 或AWS CloudFront

---

## 🔒 安全配置

### 1. 环境变量

```bash
# 永远不要提交.env文件
echo ".env" >> .gitignore
```

### 2. API速率限制

已配置:
- 15分钟窗口
- 每IP最多100请求

### 3. CORS配置

```javascript
// 只允许特定域名
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## 📚 更多资源

- [完整API文档](./API_DOCUMENTATION.md)
- [AI功能详解](./AI_IMPLEMENTATION_COMPLETE.md)
- [故障排除指南](./TROUBLESHOOTING.md)

---

## 🎉 成功！

如果你看到:
```
🚀 KiroMusic AI Backend running on port 3001
📊 Environment: development
```

恭喜！AI后端已成功启动！

现在可以:
1. ✅ 测试API端点
2. ✅ 集成前端
3. ✅ 开始开发
4. ✅ 向VC展示

---

**需要帮助？** 查看文档或提交Issue
