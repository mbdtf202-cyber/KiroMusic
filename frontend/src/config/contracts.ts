// Contract addresses - Update after deployment
export const CONTRACTS = {
  MusicNFT: '0x0000000000000000000000000000000000000000',
  RoyaltyVault: '0x0000000000000000000000000000000000000000',
  Fractionalizer: '0x0000000000000000000000000000000000000000',
} as const;

// Contract ABIs - Simplified for demo
export const MUSIC_NFT_ABI = [
  'function mintMusicNFT(address artist, string memory encryptedMetadataURI, bytes32 legalHash) public returns (uint256)',
  'function musicMetadata(uint256 tokenId) public view returns (tuple(string encryptedMetadataURI, bytes32 legalHash, address artist, uint256 mintTimestamp, bool fractionalized))',
  'function ownerOf(uint256 tokenId) public view returns (address)',
] as const;

export const FRACTIONALIZER_ABI = [
  'function fractionalize(address nftContract, uint256 tokenId, string memory tokenName, string memory tokenSymbol, uint256 totalSupply) external returns (address)',
  'function fractionalizedNFTs(uint256 id) public view returns (tuple(address nftContract, uint256 tokenId, address rMusicToken, address owner, uint256 totalSupply, uint256 createdAt))',
] as const;

export const ROYALTY_VAULT_ABI = [
  'function depositRoyalty(address rMusicToken) external payable',
  'function claimRoyalty(address rMusicToken) external',
  'function getClaimableRoyalty(address rMusicToken, address holder) external view returns (uint256)',
] as const;
