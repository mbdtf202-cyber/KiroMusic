// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./RoyaltyToken.sol";
import "./MusicNFT.sol";

/**
 * @title Fractionalizer
 * @dev Fractionalize MusicNFT into ERC-20 rMUSIC tokens
 */
contract Fractionalizer is ReentrancyGuard {
    struct FractionalizedNFT {
        address nftContract;
        uint256 tokenId;
        address rMusicToken;
        address owner;
        uint256 totalSupply;
        uint256 createdAt;
    }

    mapping(uint256 => FractionalizedNFT) public fractionalizedNFTs;
    uint256 public fractionalizedCount;
    address public royaltyVault;

    event NFTFractionalized(
        uint256 indexed fractionalId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address rMusicToken,
        uint256 totalSupply
    );

    constructor(address _royaltyVault) {
        royaltyVault = _royaltyVault;
    }

    /**
     * @dev Fractionalize a MusicNFT into rMUSIC tokens
     */
    function fractionalize(
        address nftContract,
        uint256 tokenId,
        string memory tokenName,
        string memory tokenSymbol,
        uint256 totalSupply
    ) external nonReentrant returns (address) {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not NFT owner");
        
        // Transfer NFT to this contract
        nft.transferFrom(msg.sender, address(this), tokenId);
        
        // Create rMUSIC token
        RoyaltyToken rMusic = new RoyaltyToken(
            tokenName,
            tokenSymbol,
            tokenId,
            royaltyVault,
            totalSupply
        );
        
        // Transfer all rMUSIC tokens to original owner
        rMusic.transfer(msg.sender, totalSupply);
        
        // Mark NFT as fractionalized
        MusicNFT(nftContract).markAsFractionalized(tokenId);
        
        // Store fractionalization data
        fractionalizedCount++;
        fractionalizedNFTs[fractionalizedCount] = FractionalizedNFT({
            nftContract: nftContract,
            tokenId: tokenId,
            rMusicToken: address(rMusic),
            owner: msg.sender,
            totalSupply: totalSupply,
            createdAt: block.timestamp
        });

        emit NFTFractionalized(
            fractionalizedCount,
            nftContract,
            tokenId,
            address(rMusic),
            totalSupply
        );

        return address(rMusic);
    }
}
