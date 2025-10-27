/**
 * Core Type Definitions for KiroMusic Platform
 */

// ============= NFT Types =============
export interface MusicNFT {
  tokenId: number;
  artist: string;
  encryptedMetadataURI: string;
  legalHash: string;
  mintTimestamp: number;
  fractionalized: boolean;
  owner: string;
}

export interface MusicMetadata {
  name: string;
  artist: string;
  description: string;
  genre?: string;
  duration?: number;
  releaseDate?: string;
  coverImage?: string;
  audioFingerprint?: string;
  audioUrl?: string;
  lyrics?: string;
  credits?: string[];
  isrc?: string; // International Standard Recording Code
  iswc?: string; // International Standard Musical Work Code
}

// ============= Fractionalization Types =============
export interface FractionalizedNFT {
  id: number;
  nftContract: string;
  tokenId: number;
  rMusicToken: string;
  owner: string;
  totalSupply: bigint;
  createdAt: number;
  tokenName: string;
  tokenSymbol: string;
  currentPrice?: bigint;
  marketCap?: bigint;
}

export interface RMusicToken {
  address: string;
  name: string;
  symbol: string;
  totalSupply: bigint;
  holders: number;
  price: bigint;
  volume24h: bigint;
  priceChange24h: number;
}

// ============= Royalty Types =============
export interface RoyaltyInfo {
  rMusicToken: string;
  totalDeposited: bigint;
  totalClaimed: bigint;
  claimableAmount: bigint;
  lastDepositTime: number;
  depositCount: number;
}

export interface RoyaltyDistribution {
  tokenId: number;
  amount: bigint;
  timestamp: number;
  txHash: string;
  source: string;
}

// ============= DAO Types =============
export interface Proposal {
  id: number;
  proposer: string;
  description: string;
  targets: string[];
  values: bigint[];
  calldatas: string[];
  startBlock: number;
  endBlock: number;
  forVotes: bigint;
  againstVotes: bigint;
  abstainVotes: bigint;
  executed: boolean;
  canceled: boolean;
  state: ProposalState;
}

export enum ProposalState {
  Pending = 0,
  Active = 1,
  Canceled = 2,
  Defeated = 3,
  Succeeded = 4,
  Queued = 5,
  Expired = 6,
  Executed = 7,
}

export interface Vote {
  proposalId: number;
  voter: string;
  support: number; // 0 = against, 1 = for, 2 = abstain
  weight: bigint;
  reason?: string;
  timestamp: number;
}

// ============= User Types =============
export interface UserProfile {
  address: string;
  username?: string;
  avatar?: string;
  bio?: string;
  isArtist: boolean;
  isVerified: boolean;
  joinedAt: number;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    spotify?: string;
    website?: string;
  };
}

export interface ArtistStats {
  address: string;
  totalNFTs: number;
  totalRoyalties: bigint;
  totalFractionalized: number;
  followers: number;
  monthlyListeners?: number;
}

export interface InvestorStats {
  address: string;
  totalInvested: bigint;
  portfolioValue: bigint;
  totalRoyaltiesClaimed: bigint;
  ownedTokens: RMusicToken[];
  roi: number; // Return on Investment percentage
}

// ============= Transaction Types =============
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  type: TransactionType;
  metadata?: Record<string, any>;
}

export enum TransactionType {
  Mint = 'mint',
  Transfer = 'transfer',
  Fractionalize = 'fractionalize',
  Buy = 'buy',
  Sell = 'sell',
  DepositRoyalty = 'deposit_royalty',
  ClaimRoyalty = 'claim_royalty',
  Vote = 'vote',
  CreateProposal = 'create_proposal',
}

// ============= Market Types =============
export interface MarketListing {
  id: string;
  seller: string;
  tokenAddress: string;
  tokenId?: number;
  amount: bigint;
  price: bigint;
  currency: string;
  listingTime: number;
  expirationTime: number;
  status: ListingStatus;
}

export enum ListingStatus {
  Active = 'active',
  Sold = 'sold',
  Canceled = 'canceled',
  Expired = 'expired',
}

export interface TradeHistory {
  id: string;
  buyer: string;
  seller: string;
  tokenAddress: string;
  amount: bigint;
  price: bigint;
  timestamp: number;
  txHash: string;
}

// ============= Analytics Types =============
export interface PlatformStats {
  totalNFTs: number;
  totalFractionalized: number;
  totalRoyaltiesDistributed: bigint;
  totalUsers: number;
  totalArtists: number;
  totalVolume24h: bigint;
  totalValueLocked: bigint;
}

export interface TokenAnalytics {
  address: string;
  price: bigint;
  priceHistory: PricePoint[];
  volume24h: bigint;
  volumeHistory: VolumePoint[];
  holders: number;
  transactions24h: number;
}

export interface PricePoint {
  timestamp: number;
  price: bigint;
}

export interface VolumePoint {
  timestamp: number;
  volume: bigint;
}

// ============= API Response Types =============
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============= Form Types =============
export interface MintNFTForm {
  name: string;
  description: string;
  genre: string;
  audioFile: File | null;
  coverImage: File | null;
  releaseDate: string;
  lyrics?: string;
  credits?: string;
  isrc?: string;
  iswc?: string;
}

export interface FractionalizeForm {
  tokenId: number;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: string;
  initialPrice?: string;
}

export interface CreateProposalForm {
  title: string;
  description: string;
  targets: string[];
  values: string[];
  calldatas: string[];
}

// ============= Error Types =============
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  CONTRACT_ERROR = 'CONTRACT_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  IPFS_ERROR = 'IPFS_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
}
