/**
 * Application Constants
 */

// ============= Network Constants =============
export const SUPPORTED_CHAINS = {
  SEPOLIA: 11155111,
  HARDHAT: 31337,
  LOCALHOST: 1337,
} as const;

export const CHAIN_NAMES: Record<number, string> = {
  [SUPPORTED_CHAINS.SEPOLIA]: 'Sepolia',
  [SUPPORTED_CHAINS.HARDHAT]: 'Hardhat',
  [SUPPORTED_CHAINS.LOCALHOST]: 'Localhost',
};

export const BLOCK_EXPLORERS: Record<number, string> = {
  [SUPPORTED_CHAINS.SEPOLIA]: 'https://sepolia.etherscan.io',
  [SUPPORTED_CHAINS.HARDHAT]: '',
  [SUPPORTED_CHAINS.LOCALHOST]: '',
};

// ============= File Upload Constants =============
export const MAX_AUDIO_SIZE_MB = 100;
export const MAX_IMAGE_SIZE_MB = 10;

export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/flac',
  'audio/mp3',
] as const;

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

// ============= Music Genres =============
export const MUSIC_GENRES = [
  'Pop',
  'Rock',
  'Hip Hop',
  'R&B',
  'Electronic',
  'Jazz',
  'Classical',
  'Country',
  'Reggae',
  'Blues',
  'Metal',
  'Folk',
  'Latin',
  'K-Pop',
  'Indie',
  'Alternative',
  'Soul',
  'Funk',
  'Disco',
  'House',
  'Techno',
  'Dubstep',
  'Ambient',
  'World',
  'Other',
] as const;

// ============= Token Constants =============
export const MIN_TOKEN_SUPPLY = 1000;
export const MAX_TOKEN_SUPPLY = 1000000000;
export const DEFAULT_TOKEN_SUPPLY = 1000000;

export const TOKEN_DECIMALS = 18;

// ============= Pagination Constants =============
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// ============= Time Constants =============
export const SECONDS_PER_DAY = 86400;
export const SECONDS_PER_HOUR = 3600;
export const SECONDS_PER_MINUTE = 60;

// ============= Gas Limits =============
export const GAS_LIMITS = {
  MINT_NFT: 500000n,
  FRACTIONALIZE: 800000n,
  DEPOSIT_ROYALTY: 200000n,
  CLAIM_ROYALTY: 150000n,
  CREATE_PROPOSAL: 300000n,
  VOTE: 100000n,
} as const;

// ============= Error Messages =============
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet',
  INSUFFICIENT_FUNDS: 'Insufficient funds for this transaction',
  TRANSACTION_REJECTED: 'Transaction was rejected',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_ADDRESS: 'Invalid Ethereum address',
  INVALID_AMOUNT: 'Invalid amount',
  FILE_TOO_LARGE: 'File size exceeds maximum limit',
  INVALID_FILE_TYPE: 'Invalid file type',
  UPLOAD_FAILED: 'File upload failed',
  CONTRACT_ERROR: 'Smart contract error',
  IPFS_ERROR: 'IPFS error occurred',
  VALIDATION_ERROR: 'Validation error',
  NOT_AUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'Resource not found',
  ALREADY_EXISTS: 'Resource already exists',
  EXPIRED: 'This resource has expired',
} as const;

// ============= Success Messages =============
export const SUCCESS_MESSAGES = {
  NFT_MINTED: 'Music NFT minted successfully!',
  NFT_FRACTIONALIZED: 'NFT fractionalized successfully!',
  ROYALTY_DEPOSITED: 'Royalty deposited successfully!',
  ROYALTY_CLAIMED: 'Royalty claimed successfully!',
  PROPOSAL_CREATED: 'Proposal created successfully!',
  VOTE_CAST: 'Vote cast successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  TRANSACTION_CONFIRMED: 'Transaction confirmed!',
} as const;

// ============= Local Storage Keys =============
export const STORAGE_KEYS = {
  THEME: 'kiromusic_theme',
  LANGUAGE: 'kiromusic_language',
  USER_PREFERENCES: 'kiromusic_preferences',
  RECENT_SEARCHES: 'kiromusic_recent_searches',
  FAVORITES: 'kiromusic_favorites',
  DRAFT_PROPOSALS: 'kiromusic_draft_proposals',
} as const;

// ============= API Endpoints =============
export const API_ENDPOINTS = {
  METADATA: '/api/metadata',
  ANALYTICS: '/api/analytics',
  USER_PROFILE: '/api/user',
  SEARCH: '/api/search',
  TRENDING: '/api/trending',
  RECOMMENDATIONS: '/api/recommendations',
} as const;

// ============= Social Links =============
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/kiromusic',
  DISCORD: 'https://discord.gg/kiromusic',
  GITHUB: 'https://github.com/kiromusic',
  DOCS: 'https://docs.kiromusic.io',
} as const;

// ============= Feature Flags =============
export const FEATURES = {
  DAO_ENABLED: true,
  MARKETPLACE_ENABLED: true,
  ANALYTICS_ENABLED: true,
  SOCIAL_FEATURES_ENABLED: false,
  NOTIFICATIONS_ENABLED: false,
} as const;

// ============= Royalty Constants =============
export const MIN_ROYALTY_DEPOSIT = 0.001; // ETH
export const ROYALTY_CLAIM_COOLDOWN = 86400; // 1 day in seconds

// ============= DAO Constants =============
export const VOTING_PERIOD_BLOCKS = 50400; // ~7 days
export const VOTING_DELAY_BLOCKS = 1;
export const PROPOSAL_THRESHOLD = 1000000; // Minimum tokens to create proposal
export const QUORUM_PERCENTAGE = 4; // 4% quorum

// ============= UI Constants =============
export const ANIMATION_DURATION = 300; // ms
export const TOAST_DURATION = 5000; // ms
export const DEBOUNCE_DELAY = 500; // ms

// ============= Chart Colors =============
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#6366f1',
  GRADIENT_START: '#3b82f6',
  GRADIENT_END: '#8b5cf6',
} as const;

// ============= Regex Patterns =============
export const PATTERNS = {
  ETH_ADDRESS: /^0x[a-fA-F0-9]{40}$/,
  TX_HASH: /^0x[a-fA-F0-9]{64}$/,
  IPFS_CID: /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[A-Za-z2-7]{58})$/,
  TOKEN_SYMBOL: /^[A-Z]{3,5}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  ISRC: /^[A-Z]{2}-?\w{3}-?\d{2}-?\d{5}$/,
  ISWC: /^T-?\d{3}\.?\d{3}\.?\d{3}-?\d$/,
} as const;
