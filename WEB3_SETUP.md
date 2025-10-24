# 🔗 Web3 配置指南

## 当前状态

✅ **前端已启动**: http://localhost:3000/  
✅ **所有页面正常工作**  
⚠️ **需要配置 Web3 连接**

---

## 🎯 快速配置（3步）

### 步骤 1: 获取 WalletConnect Project ID

1. 访问 https://cloud.walletconnect.com
2. 注册/登录账号
3. 点击 "Create New Project"
4. 输入项目名称: "KiroMusic"
5. 复制 **Project ID**

### 步骤 2: 更新前端配置

编辑 `frontend/src/config/wagmi.ts`:

```typescript
export const config = getDefaultConfig({
  appName: 'KiroMusic',
  projectId: 'YOUR_PROJECT_ID_HERE', // 👈 粘贴你的 Project ID
  chains: [mainnet, sepolia, hardhat],
  ssr: false,
});
```

### 步骤 3: 重启前端

```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
cd frontend
npm run dev
```

---

## 🔐 部署智能合约（可选）

### 本地测试网

```bash
# Terminal 1: 启动本地区块链
npx hardhat node

# Terminal 2: 部署合约
npm run deploy:local
```

**保存输出的合约地址！**

### Sepolia 测试网

1. **获取测试 ETH**:
   - 访问 https://sepoliafaucet.com
   - 输入你的钱包地址
   - 获取免费测试 ETH

2. **配置环境变量**:
   ```bash
   # 编辑 .env 文件
   PRIVATE_KEY=your_metamask_private_key
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   ```

3. **部署**:
   ```bash
   npm run deploy:sepolia
   ```

### 更新合约地址

编辑 `frontend/src/config/contracts.ts`:

```typescript
export const CONTRACTS = {
  MusicNFT: '0xYourDeployedAddress1',
  RoyaltyVault: '0xYourDeployedAddress2',
  Fractionalizer: '0xYourDeployedAddress3',
};
```

---

## 🧪 测试钱包连接

### 1. 安装 MetaMask
- Chrome: https://metamask.io/download/
- 创建钱包或导入现有钱包

### 2. 添加 Sepolia 网络
在 MetaMask 中:
1. 点击网络下拉菜单
2. 选择 "Show test networks"
3. 选择 "Sepolia"

### 3. 连接钱包
1. 访问 http://localhost:3000
2. 点击 "Connect Wallet"
3. 选择 MetaMask
4. 批准连接
5. 查看地址显示

---

## 📋 完整测试流程

### 艺术家流程
1. ✅ 连接钱包
2. ✅ 导航到 /artist
3. ✅ 上传曲目信息
4. ⚠️ 铸造 NFT（需要合约）
5. ⚠️ 分数化（需要合约）

### 投资者流程
1. ✅ 连接钱包
2. ✅ 浏览资产
3. ⚠️ 购买 rMUSIC（需要合约）
4. ⚠️ 查看投资组合（需要合约）

### DAO 流程
1. ✅ 连接钱包
2. ✅ 查看提案
3. ⚠️ 投票（需要合约）
4. ⚠️ 创建提案（需要合约）

---

## 🔧 故障排除

### "Cannot connect wallet"
- 确保 MetaMask 已安装
- 检查 WalletConnect Project ID 是否正确
- 刷新页面重试

### "Wrong network"
- 在 MetaMask 中切换到正确网络
- 本地: Hardhat (Chain ID: 1337)
- 测试网: Sepolia (Chain ID: 11155111)

### "Transaction failed"
- 检查是否有足够的 ETH
- 验证合约地址是否正确
- 查看浏览器控制台错误

---

## 🎯 当前可测试的功能

### ✅ 无需 Web3 即可测试
- 所有页面导航
- UI/UX 交互
- 表单输入
- 动画效果
- 响应式设计
- 搜索和筛选
- 模态框

### ⚠️ 需要 Web3 配置
- 钱包连接
- 合约交互
- NFT 铸造
- 代币购买
- 投票功能
- 真实交易

---

## 📊 配置检查清单

- [ ] WalletConnect Project ID 已获取
- [ ] `frontend/src/config/wagmi.ts` 已更新
- [ ] MetaMask 已安装
- [ ] 测试网 ETH 已获取（可选）
- [ ] 智能合约已部署（可选）
- [ ] `frontend/src/config/contracts.ts` 已更新（可选）
- [ ] 前端已重启
- [ ] 钱包连接测试成功

---

## 🚀 快速开始（仅 UI 测试）

如果你只想测试 UI 而不需要真实的 Web3 功能：

1. ✅ 前端已经在运行
2. ✅ 访问 http://localhost:3000
3. ✅ 浏览所有页面
4. ✅ 测试所有交互
5. ✅ 查看动画效果

**Connect Wallet 按钮会显示，但需要配置才能真正连接。**

---

## 💡 推荐配置顺序

### 最小配置（仅 UI）
✅ 已完成 - 前端正在运行

### 基础配置（钱包连接）
1. 获取 WalletConnect Project ID
2. 更新 wagmi.ts
3. 重启前端
4. 测试钱包连接

### 完整配置（合约交互）
1. 完成基础配置
2. 部署智能合约
3. 更新合约地址
4. 端到端测试

---

## 🎉 你现在可以做什么

### 立即可用
- ✅ 浏览所有页面
- ✅ 测试 UI/UX
- ✅ 查看设计效果
- ✅ 测试响应式
- ✅ 演示给他人看

### 5分钟后可用（配置 WalletConnect）
- ✅ 连接钱包
- ✅ 显示地址
- ✅ 切换网络
- ✅ 查看余额

### 15分钟后可用（部署合约）
- ✅ 铸造 NFT
- ✅ 分数化资产
- ✅ 购买代币
- ✅ 投票治理
- ✅ 完整功能

---

**当前状态**: 🟢 前端运行中  
**访问地址**: http://localhost:3000/  
**下一步**: 配置 WalletConnect 或直接测试 UI

🎵 享受你的 KiroMusic 平台！
