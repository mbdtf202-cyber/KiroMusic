import { expect } from "chai";
import { ethers } from "hardhat";
import { Fractionalizer, MusicNFT, RoyaltyVault } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-toolbox/signers";

describe("Fractionalizer", function () {
  let fractionalizer: Fractionalizer;
  let musicNFT: MusicNFT;
  let royaltyVault: RoyaltyVault;
  let owner: SignerWithAddress;
  let artist: SignerWithAddress;
  let treasury: SignerWithAddress;

  beforeEach(async function () {
    [owner, artist, treasury] = await ethers.getSigners();
    
    // Deploy contracts
    const MusicNFT = await ethers.getContractFactory("MusicNFT");
    musicNFT = await MusicNFT.deploy();
    await musicNFT.waitForDeployment();

    const RoyaltyVault = await ethers.getContractFactory("RoyaltyVault");
    royaltyVault = await RoyaltyVault.deploy(treasury.address);
    await royaltyVault.waitForDeployment();

    const Fractionalizer = await ethers.getContractFactory("Fractionalizer");
    fractionalizer = await Fractionalizer.deploy(await royaltyVault.getAddress());
    await fractionalizer.waitForDeployment();
  });

  describe("Fractionalization", function () {
    it("Should fractionalize NFT into tokens", async function () {
      // Mint NFT
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal"));
      
      await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      
      // Approve fractionalizer
      await musicNFT.connect(artist).approve(await fractionalizer.getAddress(), 1);
      
      // Fractionalize
      const totalSupply = ethers.parseEther("1000");
      const tx = await fractionalizer.connect(artist).fractionalize(
        await musicNFT.getAddress(),
        1,
        "Fractional Music Token",
        "FMT",
        totalSupply
      );

      await expect(tx).to.emit(fractionalizer, "NFTFractionalized");
      
      // Check NFT ownership
      expect(await musicNFT.ownerOf(1)).to.equal(await fractionalizer.getAddress());
      
      // Check fractionalization data
      const data = await fractionalizer.fractionalizedNFTs(1);
      expect(data.owner).to.equal(artist.address);
      expect(data.totalSupply).to.equal(totalSupply);
    });

    it("Should only allow NFT owner to fractionalize", async function () {
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal"));
      
      await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      
      await expect(
        fractionalizer.connect(owner).fractionalize(
          await musicNFT.getAddress(),
          1,
          "FMT",
          "FMT",
          ethers.parseEther("1000")
        )
      ).to.be.revertedWith("Not NFT owner");
    });

    it("Should mark NFT as fractionalized", async function () {
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal"));
      
      await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      await musicNFT.connect(artist).approve(await fractionalizer.getAddress(), 1);
      
      await fractionalizer.connect(artist).fractionalize(
        await musicNFT.getAddress(),
        1,
        "FMT",
        "FMT",
        ethers.parseEther("1000")
      );

      const metadata = await musicNFT.musicMetadata(1);
      expect(metadata.fractionalized).to.be.true;
    });

    it("Should transfer all tokens to original owner", async function () {
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal"));
      const totalSupply = ethers.parseEther("1000");
      
      await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      await musicNFT.connect(artist).approve(await fractionalizer.getAddress(), 1);
      
      const tx = await fractionalizer.connect(artist).fractionalize(
        await musicNFT.getAddress(),
        1,
        "FMT",
        "FMT",
        totalSupply
      );

      const receipt = await tx.wait();
      const event = receipt!.logs.find(
        (log: any) => log.fragment && log.fragment.name === "NFTFractionalized"
      );
      
      const data = await fractionalizer.fractionalizedNFTs(1);
      const RoyaltyToken = await ethers.getContractFactory("RoyaltyToken");
      const token = RoyaltyToken.attach(data.rMusicToken);
      
      expect(await token.balanceOf(artist.address)).to.equal(totalSupply);
    });
  });

  describe("Fractionalization Counter", function () {
    it("Should increment counter correctly", async function () {
      expect(await fractionalizer.fractionalizedCount()).to.equal(0);
      
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal"));
      
      await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      await musicNFT.connect(artist).approve(await fractionalizer.getAddress(), 1);
      
      await fractionalizer.connect(artist).fractionalize(
        await musicNFT.getAddress(),
        1,
        "FMT",
        "FMT",
        ethers.parseEther("1000")
      );

      expect(await fractionalizer.fractionalizedCount()).to.equal(1);
    });
  });
});
