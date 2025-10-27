# 🚀 KiroMusic 完整部署指南

本指南将帮助你完成前端、后端和智能合约的完整部署。

## 📋 目录

1. [前端部署 (Vercel)](#1-前端部署-vercel)
2. [后端部署 (Railway/Render)](#2-后端部署)
3. [智能合约部署](#3-智能合约部署)
4. [环境变量配置](#4-环境变量配置)
5. [测试验证](#5-测试验证)

---

## 1. 前端部署 (Vercel)

### ✅ 已完成

前端已成功部署到Vercel：
- **URL**: https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app
- **Dashboard**: https://vercel.com/mbdtf202-cybers-projects/kiromusic

### 配置环境变量

1. 访问 [Vercel Dashboard](https://vercel.com/mbdtf202-cybers-projects/kiromusic/settings/environment-variables)

2. 添加以下环境变量：

```env
# API配置
VITE_API_URL=https://your-backend-url.railway.app/api

# 区块链配置
VITE_CHAIN_ID=84532
VITE_NETWORK_NAME=base-sepolia

# IPFS配置
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
VITE_PINATA_JWT=your_pinata_jwt_token

# WalletConnect (可选)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

3. 点击 "Save" 后，Vercel会自动重新部署

---

## 2. 后端部署

### 选项A: Railway (推荐)

1. **安装Railway CLI**
```bash
npm install -g @railway/cli
```

2. **登录Railway**
```bash
railway login
```

3. **初始化项目**
```bash
cd backend
railway init
```

4. **配置环境变量**
```bash
railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set OPENAI_API_KEY=your_key
railway variables set CORS_ORIGIN=https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app
```

5. **部署**
```bash
railway up
```

6. **获取URL**
```bash
railway domain
```

### 选项B: Render

1. 访问 [Render Dashboard](https://dashboard.render.com/)

2. 点击 "New +" → "Web Service"

3. 连接GitHub仓库

4. 配置：
   - **Name**: kiromusic-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

5. 添加环境变量（参考 `backend/.env.example`）

6. 点击 "Create Web Service"

### 选项C: Vercel Serverless

```bash
cd backend
vercel --prod
```

---

## 3. 智能合约部署

### 准备工作

1. **安装依赖**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. **配置环境变量**
```bash
cp .env.deployment .env
# 编辑 .env 文件，填入你的私钥和API密钥
```

3. **获取测试ETH**
   - Sepolia: https://sepoliafaucet.com/
   - Base Sepolia: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

### 部署到测试网 (Base Sepolia)

```bash
# 编译合约
npx hardhat compile

# 部署到Base Sepolia测试网
npx hardhat run scripts/deploy-contracts.js --network base-sepolia
```

### 部署到主网 (Base)

⚠️ **警告**: 确保你有足够的ETH支付Gas费用

```bash
npx hardhat run scripts/deploy-contracts.js --network base
```

### 验证合约

```bash
# 验证MusicNFT合约
npx hardhat verify --network base-sepolia <CONTRACT_ADDRESS>

# 验证其他合约
npx hardhat verify --network base-sepolia <FRACTIONALIZER_ADDRESS> <MUSIC_NFT_ADDRESS> <ROYALTY_VAULT_ADDRESS>
```

### 部署后自动更新

部署脚本会自动：
1. 保存合约地址到 `deployments/<network>.json`
2. 更新前端配置 `frontend/src/config/contracts.ts`

---

## 4. 环境变量配置

### 前端环境变量 (Vercel)

在Vercel Dashboard中配置：

```env
VITE_API_URL=https://kiromusic-backend.railway.app/api
VITE_CHAIN_ID=84532
VITE_NETWORK_NAME=base-sepolia
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
VITE_PINATA_JWT=eyJhbGc...
```

### 后端环境变量 (Railway/Render)

```env
NODE_ENV=production
PORT=3001
OPENAI_API_KEY=sk-...
CORS_ORIGIN=https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app
JWT_SECRET=your_random_secret
MONGODB_URI=mongodb+srv://...
REDIS_URL=redis://...
```

### 智能合约环境变量 (本地)

```env
PRIVATE_KEY=0x...
SEPOLIA_RPC_URL=https://rpc.sepolia.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
ETHERSCAN_API_KEY=...
BASESCAN_API_KEY=...
```

---

## 5. 测试验证

### 前端测试

1. 访问: https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app

2. 测试功能：
   - ✅ 页面加载
   - ✅ 钱包连接 (MetaMask/WalletConnect)
   - ✅ 切换网络到Base Sepolia
   - ✅ 浏览音乐NFT
   - ✅ 查看市场数据

### 后端测试

```bash
# 健康检查
curl https://your-backend-url.railway.app/health

# 测试AI接口
curl https://your-backend-url.railway.app/api/ai/predict-hits?limit=5
```

### 智能合约测试

```bash
# 运行测试套件
npx hardhat test

# 在测试网上测试
npx hardhat console --network base-sepolia
```

```javascript
// 在控制台中
const MusicNFT = await ethers.getContractAt("MusicNFT", "CONTRACT_ADDRESS");
const balance = await MusicNFT.balanceOf("YOUR_ADDRESS");
console.log("NFT Balance:", balance.toString());
```

---

## 🎯 快速部署命令

### 一键部署所有服务

```bash
# 1. 部署智能合约
npx hardhat run scripts/deploy-contracts.js --network base-sepolia

# 2. 部署后端
cd backend && railway up && cd ..

# 3. 更新前端环境变量并重新部署
cd frontend && vercel --prod && cd ..
```

---

## 📊 部署检查清单

### 前端 ✅
- [x] 构建成功
- [x] 部署到Vercel
- [ ] 配置环境变量
- [ ] 更新合约地址
- [ ] 测试钱包连接

### 后端
- [ ] 选择部署平台 (Railway/Render/Vercel)
- [ ] 配置环境变量
- [ ] 部署成功
- [ ] 测试API端点
- [ ] 配置CORS

### 智能合约
- [ ] 编译合约
- [ ] 获取测试ETH
- [ ] 部署到测试网
- [ ] 验证合约
- [ ] 更新前端配置
- [ ] 测试合约功能

### 集成测试
- [ ] 前端可以连接后端
- [ ] 前端可以调用合约
- [ ] 钱包连接正常
- [ ] NFT铸造功能
- [ ] 碎片化功能
- [ ] 版税分配功能

---

## 🆘 故障排查

### 前端问题

**问题**: 无法连接钱包
- 检查网络配置是否正确
- 确保MetaMask已安装
- 切换到正确的网络

**问题**: API请求失败
- 检查VITE_API_URL是否正确
- 检查后端CORS配置
- 查看浏览器控制台错误

### 后端问题

**问题**: 部署失败
- 检查package.json中的start脚本
- 确保所有依赖已安装
- 查看部署日志

**问题**: API返回500错误
- 检查环境变量配置
- 查看服务器日志
- 验证数据库连接

### 智能合约问题

**问题**: 部署失败
- 确保有足够的测试ETH
- 检查RPC URL是否正确
- 验证私钥格式

**问题**: 交易失败
- 检查Gas费用设置
- 确保账户有足够余额
- 查看区块链浏览器错误信息

---

## 📞 获取帮助

- **Vercel文档**: https://vercel.com/docs
- **Railway文档**: https://docs.railway.app/
- **Hardhat文档**: https://hardhat.org/docs
- **Base文档**: https://docs.base.org/

---

## 🎉 完成！

恭喜！你的KiroMusic平台已经完全部署。现在可以：

1. 分享你的网站链接
2. 邀请用户测试
3. 收集反馈
4. 持续优化

**下一步**: 查看 `GO_TO_MARKET_PLAN.md` 了解如何推广你的平台！
