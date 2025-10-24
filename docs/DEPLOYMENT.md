# KiroMusic Deployment Guide

## Prerequisites

- Node.js v18+
- npm or yarn
- MetaMask or compatible Web3 wallet
- Ethereum testnet ETH (Sepolia)

## Smart Contract Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in:

```
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Deploy to Sepolia

```bash
npm run deploy:sepolia
```

Save the deployed contract addresses!

### 5. Verify on Etherscan

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

## Frontend Deployment

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Update Contract Addresses

Edit `frontend/src/config/contracts.ts` with your deployed addresses.

### 4. Update WalletConnect Project ID

Get a project ID from https://cloud.walletconnect.com and update `frontend/src/config/wagmi.ts`.

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 6. Build for Production

```bash
npm run build
```

Deploy the `dist` folder to:
- Vercel
- Netlify
- IPFS
- Your hosting provider

## Post-Deployment

1. Test all contract functions
2. Verify contract on Etherscan
3. Update README with contract addresses
4. Create subgraph for indexing (optional)
5. Set up monitoring and alerts

## Troubleshooting

### Gas Estimation Failed
- Ensure you have enough testnet ETH
- Check RPC endpoint is working
- Verify contract constructor parameters

### Frontend Connection Issues
- Check MetaMask is on correct network
- Verify contract addresses are correct
- Clear browser cache and reconnect wallet

### Transaction Reverted
- Check contract state and permissions
- Verify function parameters
- Review contract events and logs
