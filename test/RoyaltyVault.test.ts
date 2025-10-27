import { expect } from "chai";
import { ethers } from "hardhat";
import { RoyaltyVault, RoyaltyToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-toolbox/signers";

describe("RoyaltyVault", function () {
  let royaltyVault: RoyaltyVault;
  let royaltyToken: RoyaltyToken;
  let owner: SignerWithAddress;
  let treasury: SignerWithAddress;
  let holder1: SignerWithAddress;
  let holder2: SignerWithAddress;

  beforeEach(async function () {
    [owner, treasury, holder1, holder2] = await ethers.getSigners();
    
    // Deploy RoyaltyVault
    const RoyaltyVault = await ethers.getContractFactory("RoyaltyVault");
    royaltyVault = await RoyaltyVault.deploy(treasury.address);
    await royaltyVault.waitForDeployment();

    // Deploy RoyaltyToken
    const RoyaltyToken = await ethers.getContractFactory("RoyaltyToken");
    royaltyToken = await RoyaltyToken.deploy(
      "Test Music Token",
      "TMT",
      1,
      await royaltyVault.getAddress(),
      ethers.parseEther("1000")
    );
    await royaltyToken.waitForDeployment();

    // Distribute tokens
    await royaltyToken.transfer(holder1.address, ethers.parseEther("400"));
    await royaltyToken.transfer(holder2.address, ethers.parseEther("600"));
  });

  describe("Royalty Distribution", function () {
    it("Should deposit royalties correctly", async function () {
      const depositAmount = ethers.parseEther("1");
      
      await expect(
        royaltyVault.depositRoyalty(await royaltyToken.getAddress(), {
          value: depositAmount,
        })
      ).to.emit(royaltyVault, "RoyaltyDeposited");

      const pool = await royaltyVault.royaltyPools(await royaltyToken.getAddress());
      expect(pool.totalCollected).to.equal(depositAmount);
    });

    it("Should calculate fees correctly", async function () {
      const depositAmount = ethers.parseEther("100");
      const platformFee = (depositAmount * 2n) / 100n; // 2%
      const reserve = (depositAmount * 3n) / 100n; // 3%
      const holderAmount = depositAmount - platformFee - reserve;

      await royaltyVault.depositRoyalty(await royaltyToken.getAddress(), {
        value: depositAmount,
      });

      const pool = await royaltyVault.royaltyPools(await royaltyToken.getAddress());
      expect(pool.pendingDistribution).to.equal(holderAmount);
    });

    it("Should allow holders to claim royalties", async function () {
      const depositAmount = ethers.parseEther("100");
      
      await royaltyVault.depositRoyalty(await royaltyToken.getAddress(), {
        value: depositAmount,
      });

      const holder1BalanceBefore = await ethers.provider.getBalance(holder1.address);
      
      const tx = await royaltyVault.connect(holder1).claimRoyalty(await royaltyToken.getAddress());
      const receipt = await tx.wait();
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;

      const holder1BalanceAfter = await ethers.provider.getBalance(holder1.address);
      
      // Holder1 has 40% of tokens, should get 40% of holder amount
      const expectedAmount = (depositAmount * 95n * 40n) / 10000n;
      
      expect(holder1BalanceAfter - holder1BalanceBefore + gasUsed).to.be.closeTo(
        expectedAmount,
        ethers.parseEther("0.01")
      );
    });

    it("Should distribute proportionally to token holdings", async function () {
      const depositAmount = ethers.parseEther("100");
      
      await royaltyVault.depositRoyalty(await royaltyToken.getAddress(), {
        value: depositAmount,
      });

      const claimable1 = await royaltyVault.getClaimableRoyalty(
        await royaltyToken.getAddress(),
        holder1.address
      );
      const claimable2 = await royaltyVault.getClaimableRoyalty(
        await royaltyToken.getAddress(),
        holder2.address
      );

      // Holder1: 40%, Holder2: 60%
      expect(claimable1 * 3n).to.equal(claimable2 * 2n);
    });
  });

  describe("Fee Management", function () {
    it("Should allow owner to update fees", async function () {
      await royaltyVault.updateFees(1, 2);
      
      expect(await royaltyVault.platformFeePercent()).to.equal(1);
      expect(await royaltyVault.reservePercent()).to.equal(2);
    });

    it("Should reject fees that are too high", async function () {
      await expect(
        royaltyVault.updateFees(5, 6)
      ).to.be.revertedWith("Fees too high");
    });

    it("Should only allow owner to update fees", async function () {
      await expect(
        royaltyVault.connect(holder1).updateFees(1, 2)
      ).to.be.reverted;
    });
  });

  describe("Edge Cases", function () {
    it("Should handle zero royalty deposits", async function () {
      await expect(
        royaltyVault.depositRoyalty(await royaltyToken.getAddress(), {
          value: 0,
        })
      ).to.be.revertedWith("No royalty sent");
    });

    it("Should handle claims with no pending royalties", async function () {
      await expect(
        royaltyVault.connect(holder1).claimRoyalty(await royaltyToken.getAddress())
      ).to.be.revertedWith("No pending royalties");
    });

    it("Should handle claims from non-holders", async function () {
      const depositAmount = ethers.parseEther("1");
      
      await royaltyVault.depositRoyalty(await royaltyToken.getAddress(), {
        value: depositAmount,
      });

      await expect(
        royaltyVault.connect(owner).claimRoyalty(await royaltyToken.getAddress())
      ).to.be.revertedWith("No tokens held");
    });
  });
});
