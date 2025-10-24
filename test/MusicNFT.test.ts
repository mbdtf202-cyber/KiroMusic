import { expect } from "chai";
import { ethers } from "hardhat";
import { MusicNFT } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-toolbox/signers";

describe("MusicNFT", function () {
  let musicNFT: MusicNFT;
  let owner: SignerWithAddress;
  let artist: SignerWithAddress;
  let buyer: SignerWithAddress;

  beforeEach(async function () {
    [owner, artist, buyer] = await ethers.getSigners();
    
    const MusicNFT = await ethers.getContractFactory("MusicNFT");
    musicNFT = await MusicNFT.deploy();
    await musicNFT.waitForDeployment();
  });

  describe("Minting", function () {
    it("Should mint a new music NFT", async function () {
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal-agreement"));

      const tx = await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      await tx.wait();

      expect(await musicNFT.ownerOf(1)).to.equal(artist.address);
      
      const metadata = await musicNFT.musicMetadata(1);
      expect(metadata.encryptedMetadataURI).to.equal(metadataURI);
      expect(metadata.legalHash).to.equal(legalHash);
      expect(metadata.artist).to.equal(artist.address);
      expect(metadata.fractionalized).to.equal(false);
    });

    it("Should emit MusicNFTMinted event", async function () {
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal-agreement"));

      await expect(musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash))
        .to.emit(musicNFT, "MusicNFTMinted")
        .withArgs(1, artist.address, metadataURI, legalHash);
    });
  });

  describe("Fractionalization", function () {
    it("Should mark NFT as fractionalized", async function () {
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal-agreement"));

      await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      
      // Transfer to simulate fractionalizer contract
      await musicNFT.connect(artist).transferFrom(artist.address, owner.address, 1);
      
      await musicNFT.markAsFractionalized(1);
      
      const metadata = await musicNFT.musicMetadata(1);
      expect(metadata.fractionalized).to.equal(true);
    });
  });

  describe("Token URI", function () {
    it("Should return correct token URI", async function () {
      const metadataURI = "ipfs://QmTest123";
      const legalHash = ethers.keccak256(ethers.toUtf8Bytes("legal-agreement"));

      await musicNFT.mintMusicNFT(artist.address, metadataURI, legalHash);
      
      expect(await musicNFT.tokenURI(1)).to.equal(metadataURI);
    });
  });
});
