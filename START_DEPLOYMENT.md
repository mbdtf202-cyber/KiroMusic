# 🚀 开始完整部署

## 📋 你需要做的（5分钟）

### 步骤1: 配置环境

```bash
./setup-env.sh
```

**需要准备**:
1. **MetaMask私钥**
   - 打开MetaMask
   - 账户详情 → 导出私钥
   - 复制私钥（0x开头）

2. **Base Sepolia测试ETH**
   - 访问: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
   - 连接钱包
   - 获取免费测试ETH

### 步骤2: 运行完整部署

```bash
./complete-setup.sh
```

这个脚本会自动：
- ✅ 编译智能合约
- ✅ 部署到Base Sepolia
- ✅ 更新前端配置
- ✅ 重新部署前端
- ✅ 运行测试

**预计时间**: 10-15分钟

---

## 🎯 完成后

### 你将拥有

1. **部署的智能合约**
   - MusicNFT (ERC-721)
   - RoyaltyVault (版税分配)
   - Fractionalizer (碎片化)
   - KiroDAO (治理)

2. **完整的前端应用**
   - 钱包连接
   - NFT铸造
   - NFT碎片化
   - 版税分配
   - DAO治理

3. **测试验证**
   - 所有功能可用
   - 交易正常

### 访问应用

- **前端**: https://kiromusic-9x788p0gb-mbdtf202-cybers-projects.vercel.app
- **合约**: 在Base Sepolia浏览器查看

---

## 📝 详细步骤

### 1. 配置MetaMask私钥

#### 导出私钥

1. 打开MetaMask扩展
2. 点击右上角账户图标
3. 选择"账户详情"
4. 点击"导出私钥"
5. 输入MetaMask密码
6. 复制显示的私钥

**格式**: `0x1234567890abcdef...` (66个字符)

#### 运行配置向导

```bash
./setup-env.sh
```

按照提示粘贴私钥。

### 2. 获取测试ETH

#### 访问水龙头

🔗 https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

#### 步骤

1. 连接MetaMask钱包
2. 确保切换到**Base Sepolia**网络
3. 点击"Send me ETH"
4. 等待1-2分钟

#### 添加Base Sepolia网络

如果MetaMask中没有Base Sepolia网络：

- **网络名称**: Base Sepolia
- **RPC URL**: https://sepolia.base.org
- **链ID**: 84532
- **货币符号**: ETH
- **区块浏览器**: https://sepolia.basescan.org

### 3. 运行完整部署

```bash
./complete-setup.sh
```

脚本会自动完成所有步骤。

---

## ✅ 验证部署

### 检查合约

```bash
# 查看部署信息
cat deployments/base-sepolia.json
```

### 访问网站

https://kiromusic-9x788p0gb-mbdtf202-cybers-projects.vercel.app

### 测试功能

1. **连接钱包**
   - 点击"Connect Wallet"
   - 选择MetaMask
   - 切换到Base Sepolia

2. **测试NFT铸造**
   - 进入Artist页面
   - 上传音乐文件
   - 填写元数据
   - 点击"Mint NFT"

3. **测试碎片化**
   - 选择已铸造的NFT
   - 设置碎片化参数
   - 点击"Fractionalize"

---

## 🆘 遇到问题？

### 问题1: 私钥格式错误

**错误**: `invalid private key`

**解决**:
- 确保私钥以`0x`开头
- 长度为66个字符
- 只包含0-9和a-f

### 问题2: 余额不足

**错误**: `insufficient funds`

**解决**:
- 访问水龙头获取测试ETH
- 确保切换到Base Sepolia网络
- 等待交易确认

### 问题3: 部署失败

**错误**: `deployment failed`

**解决**:
- 检查网络连接
- 确认有足够的测试ETH
- 查看错误日志
- 重新运行脚本

---

## 📚 相关文档

- [完整实现计划](./COMPLETE_IMPLEMENTATION.md)
- [环境配置指南](./docs/troubleshooting/FIX_ENV_ERROR.md)
- [快速开始](./docs/deployment/QUICK_START.md)
- [使用指南](./USAGE_GUIDE.md)

---

## 🎉 准备好了吗？

### 开始配置

```bash
./setup-env.sh
```

### 然后部署

```bash
./complete-setup.sh
```

**只需15分钟，你就能拥有一个完整的Web3音乐平台！** 🚀

---

**需要帮助？查看 [DOCS_INDEX.md](./DOCS_INDEX.md)**
