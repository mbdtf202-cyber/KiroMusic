# ⚡ 快速开始指南

## 🎯 3步完成部署

### 步骤1: 配置环境变量 (2分钟)

运行配置向导：

```bash
./setup-env.sh
```

向导会引导你：
1. ✅ 配置MetaMask私钥
2. ✅ 获取测试ETH
3. ✅ 配置API Keys（可选）

**或者手动配置：**

```bash
# 编辑 .env 文件
nano .env

# 填入你的私钥
PRIVATE_KEY=0x你的私钥
```

### 步骤2: 获取测试ETH (1分钟)

访问水龙头获取免费测试ETH：

🔗 https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

1. 连接MetaMask
2. 切换到Base Sepolia网络
3. 点击"Send me ETH"
4. 等待1-2分钟

### 步骤3: 一键部署 (15分钟)

```bash
./deploy-all.sh
```

按照提示选择要部署的组件即可！

---

## 🆘 遇到问题？

### 问题1: .env 文件不存在

**解决方案：**
```bash
./setup-env.sh
```

### 问题2: 私钥格式错误

**正确格式：**
- 必须以 `0x` 开头
- 后面跟64位十六进制字符
- 示例: `0x1234567890abcdef...`

**如何获取：**
1. 打开MetaMask
2. 点击账户详情
3. 点击"导出私钥"
4. 输入密码
5. 复制私钥

### 问题3: 余额不足

**解决方案：**
访问水龙头获取测试ETH：
https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

### 问题4: 部署失败

**检查清单：**
- [ ] .env 文件存在
- [ ] 私钥格式正确
- [ ] 账户有测试ETH
- [ ] 网络连接正常

**查看详细日志：**
```bash
npx hardhat run scripts/deploy-contracts.js --network base-sepolia
```

---

## 📋 完整检查清单

### 部署前

- [ ] Node.js 已安装 (v18+)
- [ ] npm 已安装
- [ ] Git 已安装
- [ ] MetaMask 已安装

### 配置

- [ ] .env 文件已创建
- [ ] 私钥已配置
- [ ] 测试ETH已获取
- [ ] 网络设置正确

### 部署

- [ ] 智能合约已部署
- [ ] 后端已部署
- [ ] 前端已更新
- [ ] 测试已通过

---

## 🚀 快速命令参考

```bash
# 配置环境
./setup-env.sh

# 一键部署
./deploy-all.sh

# 仅部署合约
npx hardhat run scripts/deploy-contracts.js --network base-sepolia

# 仅部署后端
cd backend && railway up

# 仅部署前端
cd frontend && vercel --prod

# 运行测试
node scripts/test-deployment.js
```

---

## 📚 更多帮助

- 📖 [完整部署指南](./COMPLETE_DEPLOYMENT_GUIDE.md)
- 📊 [部署仪表板](./DEPLOYMENT_DASHBOARD.md)
- 🔍 [文档索引](./DEPLOYMENT_INDEX.md)
- 🎯 [下一步计划](./NEXT_STEPS.md)

---

## 💡 专业提示

1. **备份私钥** - 将私钥保存在安全的地方
2. **使用测试网** - 先在测试网充分测试
3. **检查余额** - 确保有足够的ETH支付Gas
4. **验证合约** - 部署后验证合约代码
5. **监控日志** - 关注部署过程的日志输出

---

**准备好了吗？开始吧！** 🚀

```bash
./setup-env.sh
```
