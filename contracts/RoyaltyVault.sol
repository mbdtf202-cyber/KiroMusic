// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RoyaltyToken.sol";

/**
 * @title RoyaltyVault
 * @dev Collects and distributes royalty payments to rMUSIC holders
 */
contract RoyaltyVault is ReentrancyGuard, Ownable {
    struct RoyaltyPool {
        address rMusicToken;
        uint256 totalCollected;
        uint256 totalDistributed;
        uint256 pendingDistribution;
    }

    mapping(address => RoyaltyPool) public royaltyPools;
    mapping(address => mapping(address => uint256)) public claimedRoyalties;
    
    uint256 public platformFeePercent = 2; // 2%
    uint256 public reservePercent = 3;     // 3%
    address public treasury;

    event RoyaltyDeposited(address indexed rMusicToken, uint256 amount);
    event RoyaltyClai med(address indexed rMusicToken, address indexed holder, uint256 amount);
    event RoyaltyDistributed(address indexed rMusicToken, uint256 amount);

    constructor(address _treasury) Ownable(msg.sender) {
        treasury = _treasury;
    }

    /**
     * @dev Deposit royalties for a specific rMUSIC token
     */
    function depositRoyalty(address rMusicToken) external payable nonReentrant {
        require(msg.value > 0, "No royalty sent");
        
        uint256 platformFee = (msg.value * platformFeePercent) / 100;
        uint256 reserve = (msg.value * reservePercent) / 100;
        uint256 holderAmount = msg.value - platformFee - reserve;
        
        // Transfer fees
        payable(treasury).transfer(platformFee + reserve);
        
        // Update pool
        RoyaltyPool storage pool = royaltyPools[rMusicToken];
        pool.rMusicToken = rMusicToken;
        pool.totalCollected += msg.value;
        pool.pendingDistribution += holderAmount;
        
        emit RoyaltyDeposited(rMusicToken, msg.value);
        
        // Notify token contract
        RoyaltyToken(rMusicToken).notifyRoyaltyDistribution(holderAmount);
    }

    /**
     * @dev Claim royalties for rMUSIC token holders
     */
    function claimRoyalty(address rMusicToken) external nonReentrant {
        RoyaltyPool storage pool = royaltyPools[rMusicToken];
        require(pool.pendingDistribution > 0, "No pending royalties");
        
        IERC20 token = IERC20(rMusicToken);
        uint256 holderBalance = token.balanceOf(msg.sender);
        require(holderBalance > 0, "No tokens held");
        
        uint256 totalSupply = token.totalSupply();
        uint256 holderShare = (pool.pendingDistribution * holderBalance) / totalSupply;
        
        require(holderShare > 0, "No royalties to claim");
        
        claimedRoyalties[rMusicToken][msg.sender] += holderShare;
        pool.totalDistributed += holderShare;
        pool.pendingDistribution -= holderShare;
        
        payable(msg.sender).transfer(holderShare);
        
        emit RoyaltyClaimed(rMusicToken, msg.sender, holderShare);
    }

    /**
     * @dev Get claimable royalty amount for a holder
     */
    function getClaimableRoyalty(address rMusicToken, address holder) 
        external 
        view 
        returns (uint256) 
    {
        RoyaltyPool storage pool = royaltyPools[rMusicToken];
        if (pool.pendingDistribution == 0) return 0;
        
        IERC20 token = IERC20(rMusicToken);
        uint256 holderBalance = token.balanceOf(holder);
        if (holderBalance == 0) return 0;
        
        uint256 totalSupply = token.totalSupply();
        return (pool.pendingDistribution * holderBalance) / totalSupply;
    }

    function updateFees(uint256 _platformFee, uint256 _reserve) external onlyOwner {
        require(_platformFee + _reserve < 10, "Fees too high");
        platformFeePercent = _platformFee;
        reservePercent = _reserve;
    }
}
