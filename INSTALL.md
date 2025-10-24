# 🚀 KiroMusic Installation Guide

## Prerequisites

Before you begin, ensure you have:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MetaMask** browser extension ([Install](https://metamask.io/))

## Step-by-Step Installation

### 1️⃣ Install Backend Dependencies

```bash
# In the root directory
npm install
```

This installs:
- Hardhat (Ethereum development environment)
- OpenZeppelin contracts
- TypeScript and testing tools

### 2️⃣ Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Return to root
cd ..
```

This installs:
- React, TypeScript, Vite
- Wagmi, RainbowKit (Web3 libraries)
- TailwindCSS, Framer Motion
- All UI dependencies

### 3️⃣ Set Up Environment Variables

#### Backend (.env)
```bash
# Copy example file
cp .env.example .env

# Edit .env and add your keys
# You can use nano, vim, or any text editor
nano .env
```

Add:
```
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**How to get these:**
- **Private Key**: MetaMask → Account Details → Export Private Key (⚠️ Never share!)
- **Infura Key**: Sign up at [infura.io](https://infura.io/) → Create project
- **Etherscan Key**: Sign up at [etherscan.io](https://etherscan.io/) → API Keys

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
nano .env
```

Add:
```
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

**Get WalletConnect ID**: Sign up at [cloud.walletconnect.com](https://cloud.walletconnect.com/)

### 4️⃣ Compile Smart Contracts

```bash
# In root directory
npm run compile
```

You should see:
```
✓ Compiled 5 Solidity files successfully
```

### 5️⃣ Start Local Blockchain (Optional)

For local testing:

```bash
# Terminal 1
npx hardhat node
```

Keep this running. You'll see 20 test accounts with ETH.

### 6️⃣ Deploy Contracts

#### Option A: Local Network
```bash
# Terminal 2
npm run deploy:local
```

#### Option B: Sepolia Testnet
```bash
npm run deploy:sepolia
```

**Save the contract addresses!** You'll need them for the frontend.

Example output:
```
✅ MusicNFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ RoyaltyVault deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
✅ Fractionalizer deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

### 7️⃣ Configure Frontend with Contract Addresses

Edit `frontend/src/config/contracts.ts`:

```typescript
export const CONTRACTS = {
  MusicNFT: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  RoyaltyVault: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  Fractionalizer: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
};
```

### 8️⃣ Start Frontend

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 9️⃣ Open in Browser

Visit **http://localhost:3000** 🎉

### 🔟 Connect Your Wallet

1. Click "Connect Wallet" button
2. Select MetaMask
3. Approve connection
4. Switch to correct network (Hardhat/Sepolia)

## ✅ Verification

Test that everything works:

1. **Home Page** - Should load with animations
2. **Artist Page** - Try uploading a track (mock)
3. **Investor Page** - View available assets
4. **Explore Page** - Search functionality
5. **DAO Page** - View proposals

## 🐛 Troubleshooting

### "Module not found"
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Cannot connect to network"
- Check MetaMask is unlocked
- Verify you're on correct network
- For local: Ensure `npx hardhat node` is running

### "Transaction failed"
- Check you have testnet ETH
- Get free Sepolia ETH: [sepoliafaucet.com](https://sepoliafaucet.com/)
- Verify contract addresses are correct

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### Frontend build errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📚 Next Steps

1. Read [QUICKSTART.md](QUICKSTART.md) for usage guide
2. Check [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design
3. Review [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment
4. Explore smart contracts in `/contracts`
5. Customize frontend in `/frontend/src`

## 🎯 Quick Commands Reference

```bash
# Backend
npm install              # Install dependencies
npm run compile          # Compile contracts
npm run test            # Run tests
npm run deploy:local    # Deploy locally
npm run deploy:sepolia  # Deploy to Sepolia

# Frontend
cd frontend
npm install             # Install dependencies
npm run dev            # Start dev server
npm run build          # Build for production
npm run preview        # Preview production build
```

## 🆘 Need Help?

- Check [QUICKSTART.md](QUICKSTART.md)
- Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- Read error messages carefully
- Check console logs in browser (F12)
- Verify all environment variables are set

## 🎉 Success!

If you see the KiroMusic homepage with:
- Animated gradient text
- Glowing effects
- Connect Wallet button working
- All pages loading

**You're all set!** Start building your music empire! 🎵✨
