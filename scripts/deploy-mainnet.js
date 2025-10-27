/**
 * 主网部署脚本
 * 使用前请确保：
 * 1. 已在测试网充分测试
 * 2. 钱包有足够的ETH
 * 3. 已进行安全审计
 */

const hre = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🚀 开始部署到主网...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("部署账户:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("账户余额:", hre.ethers.utils.formatEther(balance), "ETH");

  // 确认部署
  console.log("\n⚠️  警告: 即将部署到主网!");
  console.log("预计Gas费用: ~0.5-1 ETH");
  console.log("按Ctrl+C取消，或等待10秒继续...\n");
  
  await new Promise(resolve => setTimeout(resolve, 10000));

  // 1. 部署MusicNFT
  console.log("\n📝 部署 MusicNFT...");
  const MusicNFT = await hre.ethers.getContractFactory("MusicNFT");
  const musicNFT = await MusicNFT.deploy();
  await musicNFT.deployed();
  console.log("✅ MusicNFT 部署到:", musicNFT.address);

  // 2. 部署Fractionalizer
  console.log("\n📝 部署 Fractionalizer...");
  const Fractionalizer = await hre.ethers.getContractFactory("Fractionalizer");
  const fractionalizer = await Fractionalizer.deploy();
  await fractionalizer.deployed();
  console.log("✅ Fractionalizer 部署到:", fractionalizer.address);

  // 3. 部署RoyaltyVault
  console.log("\n📝 部署 RoyaltyVault...");
  const RoyaltyVault = await hre.ethers.getContractFactory("RoyaltyVault");
  const royaltyVault = await RoyaltyVault.deploy();
  await royaltyVault.deployed();
  console.log("✅ RoyaltyVault 部署到:", royaltyVault.address);

  // 4. 部署KiroDAO
  console.log("\n📝 部署 KiroDAO...");
  const KiroDAO = await hre.ethers.getContractFactory("KiroDAO");
  const kiroDAO = await KiroDAO.deploy();
  await kiroDAO.deployed();
  console.log("✅ KiroDAO 部署到:", kiroDAO.address);

  // 保存部署地址
  const addresses = {
    network: "mainnet",
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      MusicNFT: musicNFT.address,
      Fractionalizer: fractionalizer.address,
      RoyaltyVault: royaltyVault.address,
      KiroDAO: kiroDAO.address,
    },
  };

  fs.writeFileSync(
    'deployments/mainnet.json',
    JSON.stringify(addresses, null, 2)
  );

  console.log("\n✅ 所有合约部署完成!");
  console.log("📄 部署信息已保存到 deployments/mainnet.json");

  // 生成前端配置
  const frontendConfig = `// 自动生成 - 请勿手动编辑
export const CONTRACTS = {
  MusicNFT: '${musicNFT.address}',
  Fractionalizer: '${fractionalizer.address}',
  RoyaltyVault: '${royaltyVault.address}',
  KiroDAO: '${kiroDAO.address}',
} as const;
`;

  fs.writeFileSync(
    'frontend/src/config/contracts.ts',
    frontendConfig
  );

  console.log("📄 前端配置已更新");

  // 验证合约
  console.log("\n🔍 等待区块确认后验证合约...");
  await new Promise(resolve => setTimeout(resolve, 60000)); // 等待1分钟

  console.log("\n验证 MusicNFT...");
  await hre.run("verify:verify", {
    address: musicNFT.address,
    constructorArguments: [],
  });

  console.log("\n验证 Fractionalizer...");
  await hre.run("verify:verify", {
    address: fractionalizer.address,
    constructorArguments: [],
  });

  console.log("\n验证 RoyaltyVault...");
  await hre.run("verify:verify", {
    address: royaltyVault.address,
    constructorArguments: [],
  });

  console.log("\n验证 KiroDAO...");
  await hre.run("verify:verify", {
    address: kiroDAO.address,
    constructorArguments: [],
  });

  console.log("\n🎉 部署和验证全部完成!");
  console.log("\n📋 下一步:");
  console.log("1. 更新前端环境变量");
  console.log("2. 部署前端到生产环境");
  console.log("3. 更新文档中的合约地址");
  console.log("4. 公告部署完成");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
