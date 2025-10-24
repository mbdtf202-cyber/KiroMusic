import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying KiroMusic contracts...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy MusicNFT
  console.log("\n📀 Deploying MusicNFT...");
  const MusicNFT = await ethers.getContractFactory("MusicNFT");
  const musicNFT = await MusicNFT.deploy();
  await musicNFT.waitForDeployment();
  console.log("✅ MusicNFT deployed to:", await musicNFT.getAddress());

  // Deploy RoyaltyVault
  console.log("\n💰 Deploying RoyaltyVault...");
  const RoyaltyVault = await ethers.getContractFactory("RoyaltyVault");
  const royaltyVault = await RoyaltyVault.deploy(deployer.address); // Treasury = deployer
  await royaltyVault.waitForDeployment();
  console.log("✅ RoyaltyVault deployed to:", await royaltyVault.getAddress());

  // Deploy Fractionalizer
  console.log("\n🔀 Deploying Fractionalizer...");
  const Fractionalizer = await ethers.getContractFactory("Fractionalizer");
  const fractionalizer = await Fractionalizer.deploy(await royaltyVault.getAddress());
  await fractionalizer.waitForDeployment();
  console.log("✅ Fractionalizer deployed to:", await fractionalizer.getAddress());

  console.log("\n✨ Deployment complete!\n");
  console.log("Contract Addresses:");
  console.log("==================");
  console.log("MusicNFT:", await musicNFT.getAddress());
  console.log("RoyaltyVault:", await royaltyVault.getAddress());
  console.log("Fractionalizer:", await fractionalizer.getAddress());
  console.log("\n💾 Save these addresses for frontend configuration!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
