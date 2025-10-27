# 🔧 修复 .env 文件错误

## ❌ 错误信息

```
⚠️  .env 文件不存在，请先配置环境变量
```

## ✅ 快速修复（3种方法）

### 方法1: 自动配置向导（最简单）⭐

```bash
./setup-env.sh
```

这个脚本会：
- ✅ 自动创建 .env 文件
- ✅ 引导你配置私钥
- ✅ 提示获取测试ETH
- ✅ 验证配置格式

**只需2分钟！**

---

### 方法2: 快速手动配置

```bash
# 1. 创建 .env 文件
cat > .env << 'EOF'
PRIVATE_KEY=0x你的私钥
SEPOLIA_RPC_URL=https://rpc.sepolia.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=
EOF

# 2. 编辑私钥
nano .env
```

---

### 方法3: 复制模板

```bash
# 复制模板
cp .env.deployment .env

# 编辑文件
nano .env

# 找到 PRIVATE_KEY= 这一行
# 填入你的私钥
```

---

## 🔑 获取私钥

### 从MetaMask导出

1. 打开MetaMask
2. 点击账户 → 账户详情
3. 点击"导出私钥"
4. 输入密码
5. 复制私钥（0x开头）

**示例格式：**
```
PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

---

## 💰 获取测试ETH

### Base Sepolia 水龙头

🔗 https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

1. 连接MetaMask
2. 切换到Base Sepolia网络
3. 点击"Send me ETH"
4. 等待1-2分钟

---

## ✅ 验证配置

### 检查文件是否存在

```bash
ls -la .env
```

应该看到：
```
-rw-r--r--  1 user  staff  655 Oct 27 18:43 .env
```

### 检查私钥是否配置

```bash
grep PRIVATE_KEY .env
```

应该看到：
```
PRIVATE_KEY=0x1234567890abcdef...
```

### 测试连接

```bash
npx hardhat console --network base-sepolia
```

如果能连接成功，说明配置正确！

---

## 🚀 配置完成后

### 继续部署

```bash
# 方式1: 一键部署
./deploy-all.sh

# 方式2: 仅部署合约
npx hardhat run scripts/deploy-contracts.js --network base-sepolia

# 方式3: 分步部署
# 查看 QUICK_START.md
```

---

## 🆘 仍然有问题？

### 常见错误

**错误1: 私钥格式不正确**
```
Error: invalid private key
```
解决：确保私钥以 `0x` 开头，长度为66个字符

**错误2: 余额不足**
```
Error: insufficient funds
```
解决：从水龙头获取测试ETH

**错误3: 网络连接失败**
```
Error: could not detect network
```
解决：检查网络连接，或更换RPC URL

---

## 📚 更多帮助

- 📖 [环境配置指南](./ENV_SETUP_GUIDE.md)
- 🚀 [快速开始](./QUICK_START.md)
- 📋 [完整部署指南](./COMPLETE_DEPLOYMENT_GUIDE.md)

---

## 🎯 快速命令总结

```bash
# 1. 运行配置向导
./setup-env.sh

# 2. 获取测试ETH
# 访问: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

# 3. 开始部署
./deploy-all.sh
```

**就这么简单！** 🎉
