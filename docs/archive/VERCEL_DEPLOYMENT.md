# 🚀 Vercel 部署指南

## 快速部署 (5分钟)

### 方法1: 使用Vercel CLI (推荐)

#### 1. 安装Vercel CLI
```bash
npm install -g vercel
```

#### 2. 登录Vercel
```bash
vercel login
```

#### 3. 部署前端
```bash
# 进入前端目录
cd frontend

# 首次部署
vercel

# 生产部署
vercel --prod
```

就这么简单！✨

---

### 方法2: 使用Vercel Dashboard

#### 1. 访问Vercel
打开 https://vercel.com 并登录

#### 2. 导入项目
- 点击 "Add New Project"
- 选择 "Import Git Repository"
- 连接你的GitHub账号
- 选择KiroMusic仓库

#### 3. 配置项目
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 4. 配置环境变量
在Vercel Dashboard中添加以下环境变量：

```
VITE_API_URL=https://your-backend-url.vercel.app/api
VITE_CHAIN_ID=1
VITE_NETWORK_NAME=mainnet
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

#### 5. 部署
点击 "Deploy" 按钮

---

## 详细配置

### 前端部署配置

#### package.json 检查
确保 `frontend/package.json` 有正确的构建脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

#### vite.config.ts 优化
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'web3-vendor': ['wagmi', 'viem', '@rainbow-me/rainbowkit'],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
```

---

## 后端部署到Vercel

### 选项A: Serverless Functions

#### 1. 创建API目录结构
```bash
mkdir -p api
```

#### 2. 创建Serverless函数
```javascript
// api/health.js
module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now(),
  });
};

// api/ai/fingerprint.js
const formidable = require('formidable');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 处理文件上传和AI分析
  // ...
  
  res.status(200).json({ success: true });
};
```

#### 3. 配置vercel.json
```json
{
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### 选项B: 使用Railway部署后端 (推荐)

后端更适合部署到Railway，因为：
- 支持长时间运行的进程
- 更好的数据库连接
- 更灵活的配置

```bash
# 安装Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 初始化项目
cd backend
railway init

# 部署
railway up
```

---

## 环境变量配置

### Vercel Dashboard配置

1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加以下变量：

#### 前端环境变量
```
VITE_API_URL=https://your-backend.railway.app/api
VITE_CHAIN_ID=1
VITE_NETWORK_NAME=mainnet
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

#### 后端环境变量 (如果使用Vercel Functions)
```
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
```

---

## 自定义域名

### 1. 在Vercel中添加域名
- 进入项目设置
- 点击 "Domains"
- 添加你的域名 (例如: kiromusic.io)

### 2. 配置DNS
在你的域名提供商处添加以下记录：

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. 等待DNS传播
通常需要几分钟到几小时

---

## 性能优化

### 1. 启用边缘缓存
```json
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. 图片优化
使用Vercel的图片优化：

```typescript
import Image from 'next/image'; // 如果使用Next.js

// 或使用Vite的图片优化
import coverImage from './cover.jpg?w=400&h=400&format=webp';
```

### 3. 代码分割
已在vite.config.ts中配置

---

## 监控和分析

### 1. Vercel Analytics
```bash
npm install @vercel/analytics
```

```typescript
// main.tsx
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
```

### 2. Web Vitals
Vercel自动收集Web Vitals数据

---

## CI/CD自动部署

### GitHub集成
Vercel会自动：
- 为每个PR创建预览部署
- 为main分支创建生产部署
- 提供部署状态检查

### 配置自动部署
```yaml
# .github/workflows/vercel.yml
name: Vercel Deployment

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

---

## 故障排除

### 构建失败

#### 问题1: 依赖安装失败
```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm install
```

#### 问题2: TypeScript错误
```bash
# 检查类型错误
npm run build
```

#### 问题3: 环境变量未定义
- 确保在Vercel Dashboard中配置了所有环境变量
- 变量名必须以 `VITE_` 开头

### 运行时错误

#### 问题1: API请求失败
- 检查VITE_API_URL是否正确
- 确保后端已部署并运行
- 检查CORS配置

#### 问题2: 钱包连接失败
- 确保VITE_WALLETCONNECT_PROJECT_ID已配置
- 检查网络配置

---

## 部署检查清单

### 部署前
- [ ] 所有测试通过
- [ ] 构建成功
- [ ] 环境变量已配置
- [ ] 合约地址已更新

### 部署后
- [ ] 网站可访问
- [ ] 所有页面正常加载
- [ ] 钱包可以连接
- [ ] API调用正常
- [ ] 图片和资源加载正常

---

## 成本

### Vercel定价
- **Hobby (免费)**
  - 100GB带宽/月
  - 无限部署
  - 自动HTTPS
  - 适合个人项目

- **Pro ($20/月)**
  - 1TB带宽/月
  - 优先构建
  - 密码保护
  - 分析功能

- **Enterprise (定制)**
  - 无限带宽
  - 专属支持
  - SLA保证

---

## 快速命令参考

```bash
# 安装CLI
npm install -g vercel

# 登录
vercel login

# 开发预览
vercel dev

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod

# 查看部署列表
vercel ls

# 查看日志
vercel logs

# 删除部署
vercel rm deployment-url
```

---

## 下一步

部署完成后：

1. ✅ 测试所有功能
2. ✅ 配置自定义域名
3. ✅ 设置监控和告警
4. ✅ 优化性能
5. ✅ 开始推广

---

## 🎉 恭喜！

你的KiroMusic项目现在已经在线了！

**访问地址**: https://your-project.vercel.app

**下一步**: 
- 部署后端到Railway
- 配置自定义域名
- 开始Beta测试

---

需要帮助？
- Vercel文档: https://vercel.com/docs
- Vercel支持: https://vercel.com/support
- Discord社区: https://vercel.com/discord
