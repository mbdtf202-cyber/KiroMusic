import express from 'express';
const router = express.Router();

// Mock user data
const mockUsers = new Map();

// Get user profile
router.get('/:address', (req, res) => {
  const address = req.params.address.toLowerCase();
  const user = mockUsers.get(address) || {
    address,
    username: null,
    avatar: null,
    bio: null,
    isArtist: false,
    isVerified: false,
    joinedAt: Math.floor(Date.now() / 1000),
  };
  res.json(user);
});

// Update user profile
router.put('/:address', (req, res) => {
  const address = req.params.address.toLowerCase();
  const existingUser = mockUsers.get(address) || {
    address,
    joinedAt: Math.floor(Date.now() / 1000),
  };
  
  const updatedUser = {
    ...existingUser,
    ...req.body,
    address, // Ensure address doesn't change
  };
  
  mockUsers.set(address, updatedUser);
  res.json(updatedUser);
});

export default router;
