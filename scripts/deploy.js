const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting deployment...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());
  console.log("");

  // Deploy MusicNFT
  console.log("📀 Deploying MusicNFT...");
  const MusicNFT = await hre.ethers.getContractFactory("MusicNFT");
  const musicNFT = await MusicNFT.deploy();
  await musicNFT.waitForDeployment();
  const musicNFTAddress = await musicNFT.getAddress();
  console.log("✅ MusicNFT deployed to:", musicNFTAddress);
  console.log("");

  // Deploy Fractionalizer
  console.log("🔀 Deploying Fractionalizer...");
  const Fractionalizer = await hre.ethers.getContractFactory("Fractionalizer");
  const fractionalizer = await Fractionalizer.deploy(musicNFTAddress);
  await fractionalizer.waitForDeployment();
  const fractionalizerAddress = await fractionalizer.getAddress();
  console.log("✅ Fractionalizer deployed to:", fractionalizerAddress);
  console.log("");

  // Deploy RoyaltyVault
  console.log("💎 Deploying RoyaltyVault...");
  const RoyaltyVault = await hre.ethers.getContractFactory("RoyaltyVault");
  const royaltyVault = await RoyaltyVault.deploy(deployer.address); // Treasury address
  await royaltyVault.waitForDeployment();
  const royaltyVaultAddress = await royaltyVault.getAddress();
  console.log("✅ RoyaltyVault deployed to:", royaltyVaultAddress);
  console.log("");

  // Deploy KiroDAO
  console.log("🏛️  Deploying KiroDAO...");
  const KiroDAO = await hre.ethers.getContractFactory("KiroDAO");
  const kiroDAO = await KiroDAO.deploy();
  await kiroDAO.waitForDeployment();
  const kiroDAOAddress = await kiroDAO.getAddress();
  console.log("✅ KiroDAO deployed to:", kiroDAOAddress);
  console.log("");

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      MusicNFT: musicNFTAddress,
      Fractionalizer: fractionalizerAddress,
      RoyaltyVault: royaltyVaultAddress,
      KiroDAO: kiroDAOAddress,
    },
  };

  // Save to JSON file
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const filename = `${hre.network.name}-${Date.now()}.json`;
  fs.writeFileSync(
    path.join(deploymentsDir, filename),
    JSON.stringify(deploymentInfo, null, 2)
  );

  // Update frontend config
  const contractsConfig = `// Auto-generated contract addresses
export const CONTRACTS = {
  MusicNFT: '${musicNFTAddress}',
  Fractionalizer: '${fractionalizerAddress}',
  RoyaltyVault: '${royaltyVaultAddress}',
  KiroDAO: '${kiroDAOAddress}',
} as const;

export const MUSIC_NFT_ABI = [
  'function mintMusicNFT(address artist, string memory encryptedMetadataURI, bytes32 legalHash) public returns (uint256)',
  'function musicMetadata(uint256 tokenId) public view returns (tuple(string encryptedMetadataURI, bytes32 legalHash, address artist, uint256 mintTimestamp, bool fractionalized))',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function approve(address to, uint256 tokenId) external',
] as const;

export const FRACTIONALIZER_ABI = [
  'function fractionalize(address nftContract, uint256 tokenId, string memory tokenName, string memory tokenSymbol, uint256 totalSupply) external returns (address)',
  'function fractionalizedNFTs(uint256 id) public view returns (tuple(address nftContract, uint256 tokenId, address rMusicToken, address owner, uint256 totalSupply, uint256 createdAt))',
] as const;

export const ROYALTY_VAULT_ABI = [
  'function depositRoyalty(address rMusicToken) external payable',
  'function claimRoyalty(address rMusicToken) external',
  'function getClaimableRoyalty(address rMusicToken, address holder) external view returns (uint256)',
  'function totalDeposited(address rMusicToken) external view returns (uint256)',
] as const;

export const KIRO_DAO_ABI = [
  'function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description) public returns (uint256)',
  'function castVote(uint256 proposalId, uint8 support) public returns (uint256)',
  'function execute(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash) public payable returns (uint256)',
  'function state(uint256 proposalId) public view returns (uint8)',
  'function proposalVotes(uint256 proposalId) public view returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes)',
] as const;
`;

  fs.writeFileSync(
    path.join(__dirname, "..", "frontend", "src", "config", "contracts.ts"),
    contractsConfig
  );

  console.log("📋 Deployment Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", hre.network.config.chainId);
  console.log("Deployer:", deployer.address);
  console.log("");
  console.log("Contract Addresses:");
  console.log("  MusicNFT:", musicNFTAddress);
  console.log("  Fractionalizer:", fractionalizerAddress);
  console.log("  RoyaltyVault:", royaltyVaultAddress);
  console.log("  KiroDAO:", kiroDAOAddress);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
  console.log("✅ Deployment completed successfully!");
  console.log("📁 Deployment info saved to:", filename);
  console.log("🔧 Frontend config updated!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
