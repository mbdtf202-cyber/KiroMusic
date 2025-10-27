# ⚡ 快速部署指南

5分钟内完成KiroMusic的完整部署！

## 🎯 前提条件

- Node.js 18+
- npm 或 yarn
- Vercel账号
- MetaMask钱包（用于部署合约）
- 测试ETH（从水龙头获取）

## 🚀 一键部署

### 方法1: 使用自动化脚本

```bash
# 1. 克隆并安装依赖
git clone <your-repo>
cd KiroMusicFi
npm install

# 2. 配置环境变量
cp .env.deployment .env
# 编辑 .env 文件，填入你的私钥

# 3. 运行一键部署脚本
./deploy-all.sh
```

按照提示选择要部署的组件即可！

### 方法2: 手动分步部署

#### Step 1: 部署智能合约 (2分钟)

```bash
# 获取测试ETH
# Base Sepolia: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

# 部署合约
npx hardhat run scripts/deploy-contracts.js --network base-sepolia
```

#### Step 2: 部署后端 (1分钟)

选择一个平台：

**Railway (推荐)**
```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
```

**或 Vercel**
```bash
cd backend
vercel --prod
```

#### Step 3: 配置前端环境变量 (1分钟)

```bash
# 使用脚本自动配置
./scripts/setup-vercel-env.sh

# 或手动在Vercel Dashboard配置
```

#### Step 4: 重新部署前端 (1分钟)

```bash
cd frontend
vercel --prod
```

## ✅ 验证部署

```bash
# 运行自动化测试
node scripts/test-deployment.js
```

## 🎉 完成！

访问你的网站：
- 前端: https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app
- 后端: 你的Railway/Vercel URL

## 📋 部署检查清单

- [ ] 智能合约已部署到Base Sepolia
- [ ] 后端已部署到Railway/Vercel
- [ ] 前端环境变量已配置
- [ ] 前端已重新部署
- [ ] 所有测试通过

## 🆘 遇到问题？

查看详细文档：
- [完整部署指南](./COMPLETE_DEPLOYMENT_GUIDE.md)
- [故障排查](./COMPLETE_DEPLOYMENT_GUIDE.md#-故障排查)

## 🔗 有用的链接

- **Base Sepolia水龙头**: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **Base Sepolia浏览器**: https://sepolia.basescan.org
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard

---

**提示**: 首次部署建议使用测试网（Base Sepolia），测试无误后再部署到主网。
