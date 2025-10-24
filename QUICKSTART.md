# KiroMusic Quick Start Guide

Get your KiroMusic project running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 2. Start Local Blockchain (Optional)

```bash
# Terminal 1: Start Hardhat node
npx hardhat node
```

### 3. Deploy Contracts

```bash
# Terminal 2: Deploy to local network
npm run deploy:local

# Or deploy to Sepolia testnet
npm run deploy:sepolia
```

**Important:** Save the deployed contract addresses!

### 4. Configure Frontend

Update `frontend/src/config/contracts.ts` with your deployed addresses:

```typescript
export const CONTRACTS = {
  MusicNFT: '0xYourMusicNFTAddress',
  RoyaltyVault: '0xYourRoyaltyVaultAddress',
  Fractionalizer: '0xYourFractionalizerAddress',
};
```

Update `frontend/src/config/wagmi.ts` with your WalletConnect Project ID:
- Get one free at https://cloud.walletconnect.com

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

Visit **http://localhost:3000** 🎉

## 📋 What You Get

### Smart Contracts
- ✅ MusicNFT (ERC-721) - Music copyright NFTs
- ✅ RoyaltyToken (ERC-20) - Fractional royalty shares
- ✅ Fractionalizer - NFT → Token conversion
- ✅ RoyaltyVault - Revenue distribution
- ✅ KiroDAO - Governance

### Frontend Pages
- 🏠 **Home** - Landing page with features
- 🎵 **Artist** - Upload and mint music NFTs
- 💰 **Investor** - Browse and invest in assets
- 🔍 **Explore** - Discover music
- 🗳️ **DAO** - Governance and voting

## 🎨 Features

### For Artists
1. Upload your track
2. Add metadata
3. Mint as NFT
4. Fractionalize into rMUSIC tokens
5. Earn royalties automatically

### For Investors
1. Browse available music assets
2. Check APY and stats
3. Invest in rMUSIC tokens
4. Earn passive income
5. Trade on secondary markets

### For Community
1. Create proposals
2. Vote on governance
3. Manage treasury
4. Shape platform future

## 🔧 Common Commands

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy contracts
npm run deploy:local
npm run deploy:sepolia

# Start frontend
cd frontend && npm run dev

# Build frontend
cd frontend && npm run build
```

## 🌐 Network Configuration

### Local Development
- Network: Hardhat
- Chain ID: 1337
- RPC: http://127.0.0.1:8545

### Sepolia Testnet
- Network: Sepolia
- Chain ID: 11155111
- RPC: https://sepolia.infura.io/v3/YOUR_KEY
- Faucet: https://sepoliafaucet.com

## 💡 Tips

1. **Get Testnet ETH**: Use Sepolia faucet for testing
2. **MetaMask**: Add Sepolia network in settings
3. **Contract Verification**: Verify on Etherscan for transparency
4. **Save Addresses**: Keep deployed addresses safe
5. **Environment Variables**: Never commit `.env` files

## 🐛 Troubleshooting

### "Insufficient funds"
- Get testnet ETH from faucet
- Check you're on correct network

### "Contract not deployed"
- Verify contract addresses in config
- Redeploy if needed

### "Transaction failed"
- Check gas limits
- Verify function parameters
- Review contract state

### "Wallet not connecting"
- Refresh page
- Check MetaMask is unlocked
- Try different wallet

## 📚 Next Steps

1. Read [ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design
2. Check [DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment
3. Review smart contracts in `/contracts`
4. Explore frontend code in `/frontend/src`
5. Join our Discord for support

## 🎯 Demo Flow

1. **Connect Wallet** - Click "Connect Wallet" button
2. **Mint NFT** - Go to Artist page, upload track
3. **Fractionalize** - Convert NFT to rMUSIC tokens
4. **Invest** - Browse assets on Investor page
5. **Vote** - Participate in DAO governance

## 🚀 Ready to Build!

You now have a fully functional Web3 music platform. Start customizing and building your vision!

Need help? Check the docs or reach out to the community.

Happy building! 🎵✨
