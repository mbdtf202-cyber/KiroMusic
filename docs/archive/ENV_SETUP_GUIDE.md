# 🔧 环境配置指南

## 问题：.env 文件不存在

如果你看到这个错误：
```
⚠️  .env 文件不存在，请先配置环境变量
```

不用担心！按照以下步骤快速解决。

---

## ✅ 解决方案

### 方法1: 使用配置向导（推荐）

运行自动配置向导：

```bash
./setup-env.sh
```

向导会引导你完成：
1. 配置MetaMask私钥
2. 获取测试ETH
3. 配置API Keys

**只需2分钟！**

### 方法2: 手动创建

1. **创建 .env 文件**

```bash
cp .env.deployment .env
```

2. **编辑文件**

```bash
nano .env
```

3. **填入私钥**

找到这一行：
```
PRIVATE_KEY=
```

改为：
```
PRIVATE_KEY=0x你的私钥
```

4. **保存并退出**

按 `Ctrl+X`，然后按 `Y`，最后按 `Enter`

---

## 🔑 如何获取私钥

### 从MetaMask导出私钥

1. 打开MetaMask扩展
2. 点击右上角的账户图标
3. 选择"账户详情"
4. 点击"导出私钥"
5. 输入MetaMask密码
6. 复制显示的私钥（以0x开头）

**⚠️ 重要提示：**
- 私钥非常重要，不要分享给任何人
- 不要将私钥提交到Git
- 建议使用测试账户，不要用主账户

---

## 💰 获取测试ETH

### Base Sepolia 水龙头

1. 访问：https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

2. 连接MetaMask钱包

3. 确保切换到 **Base Sepolia** 网络

4. 点击 "Send me ETH"

5. 等待1-2分钟，ETH会自动到账

**如何添加Base Sepolia网络：**

在MetaMask中：
- 网络名称: Base Sepolia
- RPC URL: https://sepolia.base.org
- 链ID: 84532
- 货币符号: ETH
- 区块浏览器: https://sepolia.basescan.org

---

## ✅ 验证配置

### 检查 .env 文件

```bash
cat .env | grep PRIVATE_KEY
```

应该看到：
```
PRIVATE_KEY=0x1234567890abcdef...
```

### 检查私钥格式

正确的私钥格式：
- ✅ 以 `0x` 开头
- ✅ 后面跟64位十六进制字符（0-9, a-f）
- ✅ 总长度66个字符

错误示例：
- ❌ `1234567890abcdef...` (缺少0x)
- ❌ `0x123` (太短)
- ❌ `0xGHIJKL...` (包含非法字符)

### 检查账户余额

```bash
# 使用Hardhat控制台
npx hardhat console --network base-sepolia
```

然后输入：
```javascript
const balance = await ethers.provider.getBalance("你的地址");
console.log(ethers.formatEther(balance), "ETH");
```

---

## 🚀 配置完成后

### 继续部署

```bash
# 一键部署
./deploy-all.sh

# 或分步部署
npx hardhat run scripts/deploy-contracts.js --network base-sepolia
```

---

## 🆘 常见问题

### Q: 私钥会被泄露吗？

A: 不会。`.env` 文件已添加到 `.gitignore`，不会被提交到Git。但请注意：
- 不要截图包含私钥的内容
- 不要在公共场合展示 .env 文件
- 使用测试账户，不要用主账户

### Q: 测试ETH不够怎么办？

A: 
1. 每24小时可以从水龙头获取一次
2. 可以使用多个水龙头
3. 部署到测试网的Gas费很低，0.1 ETH足够

### Q: 忘记私钥怎么办？

A: 
1. 从MetaMask重新导出
2. 或使用助记词恢复账户
3. 更新 .env 文件中的私钥

### Q: 可以使用多个账户吗？

A: 可以。在 .env 中配置不同的私钥，或创建多个 .env 文件（如 .env.test, .env.prod）

---

## 📋 配置检查清单

部署前确认：

- [ ] .env 文件已创建
- [ ] PRIVATE_KEY 已配置
- [ ] 私钥格式正确（0x开头，66字符）
- [ ] 账户有测试ETH（至少0.1 ETH）
- [ ] 网络设置为Base Sepolia
- [ ] .env 已添加到 .gitignore

---

## 🎯 下一步

配置完成后，运行：

```bash
./deploy-all.sh
```

或查看：
- [快速开始](./QUICK_START.md)
- [完整部署指南](./COMPLETE_DEPLOYMENT_GUIDE.md)

---

**需要帮助？** 查看 [DEPLOYMENT_INDEX.md](./DEPLOYMENT_INDEX.md) 获取更多资源。
