// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MusicNFT
 * @dev ERC-721 NFT representing music copyright with encrypted metadata
 */
contract MusicNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    struct MusicMetadata {
        string encryptedMetadataURI;  // IPFS/Arweave URI with encrypted metadata
        bytes32 legalHash;             // Hash of legal agreement
        address artist;                // Original artist
        uint256 mintTimestamp;
        bool fractionalized;           // Whether this NFT has been fractionalized
    }

    mapping(uint256 => MusicMetadata) public musicMetadata;
    
    event MusicNFTMinted(
        uint256 indexed tokenId,
        address indexed artist,
        string metadataURI,
        bytes32 legalHash
    );
    
    event MusicNFTFractionalized(uint256 indexed tokenId);

    constructor() ERC721("KiroMusic NFT", "MNFT") Ownable(msg.sender) {}

    /**
     * @dev Mint a new music NFT
     */
    function mintMusicNFT(
        address artist,
        string memory encryptedMetadataURI,
        bytes32 legalHash
    ) public returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        _safeMint(artist, newTokenId);
        _setTokenURI(newTokenId, encryptedMetadataURI);

        musicMetadata[newTokenId] = MusicMetadata({
            encryptedMetadataURI: encryptedMetadataURI,
            legalHash: legalHash,
            artist: artist,
            mintTimestamp: block.timestamp,
            fractionalized: false
        });

        emit MusicNFTMinted(newTokenId, artist, encryptedMetadataURI, legalHash);
        return newTokenId;
    }

    /**
     * @dev Mark NFT as fractionalized (called by Fractionalizer contract)
     */
    function markAsFractionalized(uint256 tokenId) external {
        require(_ownerOf(tokenId) == msg.sender, "Not NFT owner");
        musicMetadata[tokenId].fractionalized = true;
        emit MusicNFTFractionalized(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
