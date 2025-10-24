# KiroMusic Frontend

Beautiful Web3 music copyright platform built with React + TypeScript.

## Features

- 🎨 Stunning cyber/Web3 aesthetic with glassmorphism
- ⚡ Lightning-fast with Vite
- 🔐 Secure wallet connection with RainbowKit
- 📱 Fully responsive design
- 🎭 Smooth animations with Framer Motion
- 🎯 Type-safe with strict TypeScript

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Wagmi** - Ethereum interactions
- **RainbowKit** - Wallet connection
- **Framer Motion** - Animations
- **React Router** - Navigation

## Getting Started

### Install Dependencies

```bash
npm install
```

### Configure Environment

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Get a WalletConnect Project ID from https://cloud.walletconnect.com

### Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   └── Layout.tsx  # Main layout with nav
│   ├── pages/          # Route pages
│   │   ├── HomePage.tsx
│   │   ├── ArtistPage.tsx
│   │   ├── InvestorPage.tsx
│   │   ├── ExplorePage.tsx
│   │   └── DAOPage.tsx
│   ├── config/         # Configuration
│   │   ├── wagmi.ts    # Web3 config
│   │   └── contracts.ts # Contract ABIs
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Pages

### Home Page
- Hero section with gradient text
- Feature showcase
- Stats overview
- How it works section

### Artist Page
- Multi-step upload flow
- Track metadata input
- NFT minting interface
- Fractionalization options

### Investor Page
- Portfolio dashboard
- Available assets grid
- Investment modal
- APY tracking

### Explore Page
- Search and filter
- Music discovery
- Genre categories
- Trending tracks

### DAO Page
- Governance proposals
- Voting interface
- Treasury stats
- Member dashboard

## Styling

### Color Palette

```css
--cyber-blue: #3a86ff
--cyber-purple: #8338ec
--cyber-pink: #ff006e
--cyber-green: #06ffa5
```

### Custom Classes

- `.text-gradient` - Gradient text effect
- `.glass-effect` - Glassmorphism background
- `.cyber-border` - Glowing border
- `.hover-glow` - Hover glow effect

## Web3 Integration

### Wallet Connection

Uses RainbowKit for seamless wallet connection supporting:
- MetaMask
- WalletConnect
- Coinbase Wallet
- And more...

### Contract Interactions

```typescript
import { useContractWrite } from 'wagmi';
import { MUSIC_NFT_ABI, CONTRACTS } from '@/config/contracts';

const { write } = useContractWrite({
  address: CONTRACTS.MusicNFT,
  abi: MUSIC_NFT_ABI,
  functionName: 'mintMusicNFT',
});
```

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### IPFS

```bash
npm run build
ipfs add -r dist
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

MIT
