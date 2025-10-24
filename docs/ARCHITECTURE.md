# KiroMusic Architecture

## System Overview

KiroMusic is a decentralized music copyright protocol that transforms music rights into tradeable, yield-bearing RWA tokens.

## Architecture Layers

### 1. Smart Contract Layer (Ethereum L1)

#### MusicNFT.sol
- ERC-721 implementation
- Stores encrypted metadata URI (IPFS/Arweave)
- Legal hash for copyright proof
- Artist attribution and timestamp

#### Fractionalizer.sol
- Converts MusicNFT into ERC-20 rMUSIC tokens
- Manages fractionalization state
- Links NFT to royalty tokens

#### RoyaltyToken.sol (rMUSIC)
- ERC-20 implementation
- Represents fractional ownership
- Receives royalty distributions

#### RoyaltyVault.sol
- Collects off-chain royalty payments
- Distributes to rMUSIC holders pro-rata
- Platform fee management (2% + 3% reserve)
- Claim mechanism for holders

#### KiroDAO.sol
- OpenZeppelin Governor implementation
- Timelock for security
- Community proposals and voting
- Treasury management

### 2. Frontend Layer (React + TypeScript)

#### Tech Stack
- React 18 with TypeScript (strict mode)
- Vite for build tooling
- TailwindCSS for styling
- Framer Motion for animations
- Wagmi + Viem for Web3 interactions
- RainbowKit for wallet connection

#### Key Features
- Artist portal: Upload, mint, fractionalize
- Investor dashboard: Browse, invest, track yields
- DAO governance: Propose, vote, execute
- Explore page: Discover music assets

### 3. Storage & Privacy Layer

#### IPFS/Arweave
- Decentralized file storage
- Encrypted metadata
- Content addressing

#### Lit Protocol (Planned)
- Access control for encrypted content
- NFT-gated decryption
- Key management

#### ZK Proofs (Planned)
- Privacy-preserving royalty verification
- Anonymous voting
- Noir framework integration

### 4. Oracle & Indexing Layer

#### Chainlink (Planned)
- Off-chain royalty data feeds
- Signed attestations from rights managers
- Automated distribution triggers

#### The Graph (Planned)
- Event indexing
- Historical data queries
- Analytics dashboard

## Data Flow

### Artist Minting Flow
1. Artist uploads track → Frontend
2. File encrypted → IPFS
3. Metadata URI + legal hash → MusicNFT.mint()
4. NFT minted → Artist receives ERC-721
5. Artist fractionalizes → Fractionalizer.fractionalize()
6. rMUSIC tokens created → Artist receives ERC-20

### Royalty Distribution Flow
1. Off-chain royalties collected
2. Oracle/Admin deposits → RoyaltyVault.depositRoyalty()
3. Platform fees deducted (2% + 3%)
4. Remaining distributed to rMUSIC holders
5. Holders claim → RoyaltyVault.claimRoyalty()

### Investment Flow
1. Investor browses assets → Frontend
2. Selects rMUSIC token → DEX or direct purchase
3. Receives tokens → Wallet
4. Earns yield → Automatic distribution
5. Claims royalties → RoyaltyVault

## Security Considerations

### Smart Contracts
- OpenZeppelin battle-tested libraries
- ReentrancyGuard on all payable functions
- Access control with Ownable
- Timelock for governance actions

### Frontend
- Strict TypeScript for type safety
- Input validation and sanitization
- Secure wallet connection (RainbowKit)
- No private key handling

### Privacy
- Encrypted metadata storage
- ZK proofs for sensitive data
- Lit Protocol for access control

## Scalability

### Current (L1)
- Ethereum mainnet deployment
- Gas-optimized contracts
- Batch operations where possible

### Future (L2)
- Polygon/Arbitrum/Optimism support
- Cross-chain bridges
- Reduced transaction costs

## Monitoring & Analytics

### On-Chain
- Contract events for all actions
- Subgraph for historical data
- Real-time transaction tracking

### Off-Chain
- Frontend analytics
- User behavior tracking
- Performance monitoring

## Upgrade Path

### Contracts
- Proxy pattern for upgradeability (future)
- Timelock for governance changes
- Multi-sig for critical operations

### Frontend
- Continuous deployment
- Feature flags
- A/B testing capability
