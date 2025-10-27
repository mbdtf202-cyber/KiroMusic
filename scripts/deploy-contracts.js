/**
 * 智能合约部署脚本
 * 支持多个网络：Sepolia测试网、Base Sepolia、主网等
 */

const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 开始部署KiroMusic智能合约...\n");

  const [deployer] = await hre.ethers.getSigners();
  const network = hre.network.name;
  
  console.log("📍 部署网络:", network);
  console.log("👤 部署账户:", deployer.address);
  console.log("💰 账户余额:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)), "ETH\n");

  // 1. 部署 MusicNFT
  console.log("1️⃣ 部署 MusicNFT 合约...");
  const MusicNFT = await hre.ethers.getContractFactory("MusicNFT");
  const musicNFT = await MusicNFT.deploy();
  await musicNFT.waitForDeployment();
  const musicNFTAddress = await musicNFT.getAddress();
  console.log("✅ MusicNFT 部署成功:", musicNFTAddress, "\n");

  // 2. 部署 RoyaltyVault
  console.log("2️⃣ 部署 RoyaltyVault 合约...");
  const RoyaltyVault = await hre.ethers.getContractFactory("RoyaltyVault");
  const royaltyVault = await RoyaltyVault.deploy();
  await royaltyVault.waitForDeployment();
  const royaltyVaultAddress = await royaltyVault.getAddress();
  console.log("✅ RoyaltyVault 部署成功:", royaltyVaultAddress, "\n");

  // 3. 部署 Fractionalizer
  console.log("3️⃣ 部署 Fractionalizer 合约...");
  const Fractionalizer = await hre.ethers.getContractFactory("Fractionalizer");
  const fractionalizer = await Fractionalizer.deploy(musicNFTAddress, royaltyVaultAddress);
  await fractionalizer.waitForDeployment();
  const fractionalizerAddress = await fractionalizer.getAddress();
  console.log("✅ Fractionalizer 部署成功:", fractionalizerAddress, "\n");

  // 4. 部署 KiroDAO
  console.log("4️⃣ 部署 KiroDAO 合约...");
  const KiroDAO = await hre.ethers.getContractFactory("KiroDAO");
  const kiroDAO = await KiroDAO.deploy();
  await kiroDAO.waitForDeployment();
  const kiroDAOAddress = await kiroDAO.getAddress();
  console.log("✅ KiroDAO 部署成功:", kiroDAOAddress, "\n");

  // 保存部署地址
  const deploymentInfo = {
    network: network,
    chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      MusicNFT: musicNFTAddress,
      RoyaltyVault: royaltyVaultAddress,
      Fractionalizer: fractionalizerAddress,
      KiroDAO: kiroDAOAddress
    }
  };

  // 保存到文件
  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(deploymentsDir, `${network}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("📝 部署信息已保存到:", deploymentFile, "\n");

  // 更新前端配置
  const frontendConfigPath = path.join(__dirname, '../frontend/src/config/contracts.ts');
  const configContent = `/**
 * 智能合约地址配置
 * 网络: ${network}
 * 部署时间: ${deploymentInfo.timestamp}
 */

export const CONTRACTS = {
  MusicNFT: '${musicNFTAddress}',
  RoyaltyVault: '${royaltyVaultAddress}',
  Fractionalizer: '${fractionalizerAddress}',
  KiroDAO: '${kiroDAOAddress}',
} as const;

export const CHAIN_ID = ${deploymentInfo.chainId};
export const NETWORK_NAME = '${network}';
`;

  fs.writeFileSync(frontendConfigPath, configContent);
  console.log("✅ 前端配置已更新:", frontendConfigPath, "\n");

  // 打印总结
  console.log("=" .repeat(60));
  console.log("🎉 所有合约部署完成！");
  console.log("=" .repeat(60));
  console.log("\n📋 合约地址:");
  console.log("  MusicNFT:       ", musicNFTAddress);
  console.log("  RoyaltyVault:   ", royaltyVaultAddress);
  console.log("  Fractionalizer: ", fractionalizerAddress);
  console.log("  KiroDAO:        ", kiroDAOAddress);
  console.log("\n🔗 区块链浏览器:");
  
  const explorerUrls = {
    sepolia: 'https://sepolia.etherscan.io',
    'base-sepolia': 'https://sepolia.basescan.org',
    mainnet: 'https://etherscan.io',
    base: 'https://basescan.org'
  };
  
  const explorerUrl = explorerUrls[network] || 'https://etherscan.io';
  console.log(`  ${explorerUrl}/address/${musicNFTAddress}`);
  
  console.log("\n⚠️  下一步:");
  console.log("  1. 验证合约: npx hardhat verify --network", network, musicNFTAddress);
  console.log("  2. 重新部署前端: cd frontend && vercel --prod");
  console.log("  3. 测试合约功能");
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 部署失败:", error);
    process.exit(1);
  });
