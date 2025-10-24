// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RoyaltyToken (rMUSIC)
 * @dev ERC-20 token representing fractional royalty shares
 */
contract RoyaltyToken is ERC20, Ownable {
    uint256 public immutable musicNFTId;
    address public immutable royaltyVault;
    
    event RoyaltyDistributed(uint256 amount, uint256 timestamp);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _musicNFTId,
        address _royaltyVault,
        uint256 totalSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        musicNFTId = _musicNFTId;
        royaltyVault = _royaltyVault;
        _mint(msg.sender, totalSupply);
    }

    /**
     * @dev Distribute royalties to token holders (called by RoyaltyVault)
     */
    function notifyRoyaltyDistribution(uint256 amount) external {
        require(msg.sender == royaltyVault, "Only vault can notify");
        emit RoyaltyDistributed(amount, block.timestamp);
    }
}
