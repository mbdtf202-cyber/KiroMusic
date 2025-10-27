import express from 'express';
const router = express.Router();

// Mock data for development
const mockNFTs = [
  {
    tokenId: 1,
    name: 'Midnight Dreams',
    artist: '0x1234567890123456789012345678901234567890',
    genre: 'Electronic',
    coverImage: 'https://via.placeholder.com/400',
    mintTimestamp: Math.floor(Date.now() / 1000) - 86400,
    fractionalized: false,
  },
  {
    tokenId: 2,
    name: 'Electric Pulse',
    artist: '0x2345678901234567890123456789012345678901',
    genre: 'EDM',
    coverImage: 'https://via.placeholder.com/400',
    mintTimestamp: Math.floor(Date.now() / 1000) - 172800,
    fractionalized: true,
  },
];

// Get all NFTs
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 12;
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = mockNFTs.slice(start, end);
  
  res.json({
    items,
    total: mockNFTs.length,
    page,
    pageSize,
    hasMore: end < mockNFTs.length,
  });
});

// Get single NFT
router.get('/:tokenId', (req, res) => {
  const nft = mockNFTs.find(n => n.tokenId === parseInt(req.params.tokenId));
  if (!nft) {
    return res.status(404).json({ error: 'NFT not found' });
  }
  res.json(nft);
});

// Search NFTs
router.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const results = mockNFTs.filter(nft => 
    nft.name.toLowerCase().includes(query) ||
    nft.genre.toLowerCase().includes(query)
  );
  res.json(results);
});

export default router;
