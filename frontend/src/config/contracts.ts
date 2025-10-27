// Auto-generated contract addresses
export const CONTRACTS = {
  MusicNFT: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  Fractionalizer: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  RoyaltyVault: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  KiroDAO: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
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
