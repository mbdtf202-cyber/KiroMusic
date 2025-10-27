# 🚀 KiroMusic 完整部署指南

## 📋 前置要求

### 必需软件
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### 可选软件
- Docker (用于容器化部署)
- PM2 (用于生产环境进程管理)

## 🔧 环境配置

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd kiromusic
```

### 2. 配置环境变量

创建 `.env` 文件：
```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的配置：
```env
# 区块链配置
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://rpc.sepolia.org
ETHERSCAN_API_KEY=your_etherscan_api_key

# IPFS配置
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
```

### 3. 配置前端环境变量

创建 `frontend/.env.local` 文件：
```bash
cp frontend/.env.local.example frontend/.env.local
```

## 🚀 快速部署

### 方法1: 使用自动部署脚本

```bash
# 给脚本执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

脚本会自动：
1. ✅ 安装所有依赖
2. ✅ 编译智能合约
3. ✅ 运行测试
4. ✅ 部署合约
5. ✅ 构建前端

### 方法2: 手动部署

#### 步骤1: 安装依赖
```bash
# 安装所有依赖
npm run install:all
```

#### 步骤2: 编译合约
```bash
npm run compile
```

#### 步骤3: 运行测试
```bash
npm test
```

#### 步骤4: 部署合约

**本地部署 (开发环境):**
```bash
# 终端1: 启动本地区块链
npm run node

# 终端2: 部署合约
npm run deploy:local
```

**Sepolia测试网部署:**
```bash
# 确保已设置PRIVATE_KEY环境变量
npm run deploy:sepolia
```

#### 步骤5: 启动服务

**开发环境 (同时启动前后端):**
```bash
npm run dev
```

**或分别启动:**
```bash
# 终端1: 启动后端
npm run backend

# 终端2: 启动前端
npm run frontend
```

#### 步骤6: 访问应用
- 前端: http://localhost:5173
- 后端API: http://localhost:3001/api
- 健康检查: http://localhost:3001/health

## 🌐 生产环境部署

### 前端部署 (Vercel)

1. 安装Vercel CLI:
```bash
npm install -g vercel
```

2. 部署:
```bash
cd frontend
vercel deploy --prod
```

3. 配置环境变量:
在Vercel Dashboard中设置：
- `VITE_PINATA_API_KEY`
- `VITE_PINATA_SECRET_KEY`
- `VITE_API_URL`
- `VITE_CHAIN_ID`

### 后端部署 (Railway/Render)

1. 创建 `Procfile`:
```
web: node backend/src/index.js
```

2. 推送到Git仓库

3. 在Railway/Render连接仓库并部署

4. 配置环境变量

### 智能合约部署到主网

⚠️ **警告**: 主网部署需要真实ETH，请确保：
1. 已完成安全审计
2. 已充分测试
3. 有足够的ETH支付Gas费

```bash
# 部署到以太坊主网
PRIVATE_KEY=your_key npx hardhat run scripts/deploy.js --network mainnet
```

## 🐳 Docker部署

### 构建镜像
```bash
# 构建前端镜像
docker build -t kiromusic-frontend ./frontend

# 构建后端镜像
docker build -t kiromusic-backend ./backend
```

### 使用Docker Compose
```bash
docker-compose up -d
```

## 📊 部署验证

### 1. 检查合约部署
```bash
# 查看部署信息
cat deployments/localhost-*.json
```

### 2. 测试API端点
```bash
# 健康检查
curl http://localhost:3001/health

# 获取NFT列表
curl http://localhost:3001/api/nfts

# 获取平台统计
curl http://localhost:3001/api/analytics/platform
```

### 3. 测试前端
访问 http://localhost:5173 并检查：
- ✅ 页面正常加载
- ✅ 钱包连接功能
- ✅ 合约交互功能

## 🔍 故障排查

### 问题1: 合约部署失败
```bash
# 检查网络连接
npx hardhat run scripts/deploy.js --network localhost --verbose

# 检查账户余额
npx hardhat run scripts/check-balance.js
```

### 问题2: 前端无法连接合约
1. 检查 `frontend/src/config/contracts.ts` 中的地址
2. 确保MetaMask连接到正确的网络
3. 检查浏览器控制台错误

### 问题3: 后端API错误
```bash
# 查看后端日志
npm run backend

# 检查端口占用
lsof -i :3001
```

## 📝 部署检查清单

### 部署前
- [ ] 所有测试通过
- [ ] 环境变量已配置
- [ ] 钱包有足够余额
- [ ] 代码已提交到Git

### 部署后
- [ ] 合约地址已记录
- [ ] 前端配置已更新
- [ ] API端点可访问
- [ ] 钱包可以连接
- [ ] 基本功能可用

### 生产环境额外检查
- [ ] SSL证书已配置
- [ ] 域名已解析
- [ ] 监控已设置
- [ ] 备份已配置
- [ ] 安全审计已完成

## 🎯 下一步

部署完成后，你可以：

1. **测试功能**
   - 连接钱包
   - 铸造NFT
   - 碎片化NFT
   - 领取版税
   - 参与DAO投票

2. **监控系统**
   - 查看合约事件
   - 监控API性能
   - 追踪用户行为

3. **优化性能**
   - 启用CDN
   - 配置缓存
   - 优化数据库查询

## 📞 获取帮助

如遇问题，请：
1. 查看文档: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
2. 检查日志
3. 提交Issue

---

**🎉 恭喜！你的KiroMusic平台已成功部署！**
