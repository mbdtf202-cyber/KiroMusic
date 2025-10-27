# KiroMusic 开发者指南

## 🚀 快速开始

### 1. 环境准备

```bash
# 安装依赖
npm install

# 前端依赖
cd frontend
npm install
```

### 2. 本地开发

```bash
# 启动本地区块链
npx hardhat node

# 部署合约
npx hardhat run scripts/deploy.js --network localhost

# 启动前端
cd frontend
npm run dev
```

### 3. 配置环境变量

创建 `frontend/.env` 文件：

```env
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
VITE_API_URL=http://localhost:3001/api
```

## 📚 核心概念

### NFT铸造流程

1. 用户上传音频文件和元数据
2. 文件上传到IPFS
3. 生成音频指纹
4. 调用MusicNFT合约铸造
5. 返回tokenId

```typescript
import { useMintNFT } from './hooks/useNFT';

const { mint, isUploading, isMinting } = useMintNFT();

// 铸造NFT
await mint(audioFile, metadata, legalHash);
```

### NFT碎片化流程

1. 批准NFT转移
2. 调用Fractionalizer合约
3. 生成ERC-20代币
4. 返回代币地址

```typescript
import { useFractionalize } from './hooks/useFractionalize';

const { startFractionalization, step } = useFractionalize();

// 碎片化NFT
startFractionalization(tokenId, 'Token Name', 'SYMBOL', '1000000');
```

### 版税分配流程

1. 平台存入版税到RoyaltyVault
2. 按持币比例计算每个持有者的份额
3. 持有者调用claim领取

```typescript
import { useClaimRoyalty } from './hooks/useRoyalty';

const { claim, isLoading } = useClaimRoyalty();

// 领取版税
claim(rMusicTokenAddress);
```

## 🛠️ 开发工具

### 合约交互

```typescript
// 读取合约数据
import { useContractRead } from 'wagmi';

const { data } = useContractRead({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: 'functionName',
  args: [arg1, arg2],
});

// 写入合约数据
import { useContractWrite } from 'wagmi';

const { write } = useContractWrite({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: 'functionName',
});

write({ args: [arg1, arg2] });
```

### IPFS操作

```typescript
import { ipfsService } from './services/ipfs';

// 上传文件
const result = await ipfsService.uploadAudio(file);

// 上传元数据
const metadata = await ipfsService.uploadMetadata(data);

// 获取元数据
const data = await ipfsService.getMetadata(cid);
```

### 格式化工具

```typescript
import { formatEther, formatAddress, formatDate } from './utils/format';

// 格式化ETH金额
const amount = formatEther(BigInt('1000000000000000000')); // "1.0000"

// 格式化地址
const addr = formatAddress('0x1234...5678'); // "0x1234...5678"

// 格式化日期
const date = formatDate(timestamp); // "Jan 1, 2024"
```

### 验证工具

```typescript
import { isValidAddress, isValidAudioFile } from './utils/validation';

// 验证地址
if (isValidAddress(address)) {
  // 地址有效
}

// 验证文件
if (isValidAudioFile(file)) {
  // 文件有效
}
```

## 🎨 UI组件使用

### 创建表单

```typescript
import { useState } from 'react';
import { Modal } from './components/Modal';
import { MintNFTForm } from './components/MintNFTForm';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Mint NFT
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Mint Music NFT"
      >
        <MintNFTForm />
      </Modal>
    </>
  );
}
```

### 显示NFT列表

```typescript
import { NFTCard } from './components/NFTCard';

function NFTList({ nfts }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {nfts.map(nft => (
        <NFTCard
          key={nft.tokenId}
          tokenId={nft.tokenId}
          name={nft.name}
          artist={nft.artist}
          coverImage={nft.coverImage}
        />
      ))}
    </div>
  );
}
```

### 消息通知

```typescript
import { useToast } from './hooks/useToast';

function MyComponent() {
  const { success, error } = useToast();

  const handleAction = async () => {
    try {
      await doSomething();
      success('操作成功！');
    } catch (err) {
      error('操作失败：' + err.message);
    }
  };

  return <button onClick={handleAction}>执行操作</button>;
}
```

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npx hardhat test

# 运行特定测试
npx hardhat test test/MusicNFT.test.ts

# 查看测试覆盖率
npx hardhat coverage
```

### 编写测试

```typescript
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MusicNFT', function () {
  it('Should mint NFT', async function () {
    const [owner] = await ethers.getSigners();
    const MusicNFT = await ethers.getContractFactory('MusicNFT');
    const nft = await MusicNFT.deploy();

    await nft.mintMusicNFT(
      owner.address,
      'ipfs://metadata',
      ethers.utils.formatBytes32String('legal')
    );

    expect(await nft.ownerOf(1)).to.equal(owner.address);
  });
});
```

## 📦 部署

### 部署到测试网

```bash
# 编译合约
npx hardhat compile

# 部署到Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# 验证合约
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### 部署前端

```bash
# 构建前端
cd frontend
npm run build

# 部署到Vercel
vercel deploy

# 或部署到Netlify
netlify deploy --prod
```

## 🔧 常见问题

### Q: 如何更新合约地址？

A: 编辑 `frontend/src/config/contracts.ts`

```typescript
export const CONTRACTS = {
  MusicNFT: '0xYourNewAddress',
  // ...
};
```

### Q: 如何添加新的音乐类型？

A: 编辑 `frontend/src/utils/constants.ts`

```typescript
export const MUSIC_GENRES = [
  'Pop',
  'Rock',
  'Your New Genre',
  // ...
];
```

### Q: 如何自定义主题？

A: 编辑 `frontend/tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
    },
  },
};
```

## 📖 API参考

详细API文档请参考：
- [组件文档](./frontend/COMPONENTS.md)
- [Hooks文档](./frontend/src/hooks/README.md)
- [工具函数文档](./frontend/src/utils/README.md)

## 🤝 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件
