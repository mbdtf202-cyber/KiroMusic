import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Music } from 'lucide-react';

interface MusicAsset {
  id: number;
  name: string;
  artist: string;
  totalSupply: number;
  price: number;
  apy: number;
  volume24h: number;
  holders: number;
  image: string;
}

export default function InvestorPage() {
  const [selectedAsset, setSelectedAsset] = useState<MusicAsset | null>(null);

  const assets: MusicAsset[] = [
    {
      id: 1,
      name: 'Midnight Dreams',
      artist: 'Luna Wave',
      totalSupply: 1000000,
      price: 0.05,
      apy: 12.5,
      volume24h: 45000,
      holders: 234,
      image: '🎵',
    },
    {
      id: 2,
      name: 'Electric Pulse',
      artist: 'Neon Beats',
      totalSupply: 500000,
      price: 0.08,
      apy: 18.2,
      volume24h: 67000,
      holders: 456,
      image: '⚡',
    },
    {
      id: 3,
      name: 'Ocean Waves',
      artist: 'Aqua Sound',
      totalSupply: 750000,
      price: 0.03,
      apy: 9.8,
      volume24h: 23000,
      holders: 189,
      image: '🌊',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">Investor Dashboard</span>
          </h1>
          <p className="text-xl text-gray-400">
            Invest in music royalties and earn passive income
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Portfolio Value', value: '$12,450', icon: DollarSign, color: 'cyber-green' },
            { label: 'Total Invested', value: '$10,000', icon: TrendingUp, color: 'cyber-blue' },
            { label: 'Avg APY', value: '14.2%', icon: TrendingUp, color: 'cyber-purple' },
            { label: 'Assets Owned', value: '8', icon: Music, color: 'cyber-pink' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover-glow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Available Assets */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Available Assets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-xl p-6 hover-glow cursor-pointer"
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="text-6xl mb-4 text-center">{asset.image}</div>
                <h3 className="text-xl font-bold text-white mb-1">{asset.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{asset.artist}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-white font-semibold">{asset.price} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">APY:</span>
                    <span className="text-cyber-green font-semibold">{asset.apy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">24h Volume:</span>
                    <span className="text-white">${asset.volume24h.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Holders:</span>
                    <span className="text-white">{asset.holders}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold hover-glow">
                  Invest Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment Modal */}
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-effect rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4 text-center">{selectedAsset.image}</div>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">{selectedAsset.name}</h2>
              <p className="text-gray-400 text-center mb-6">{selectedAsset.artist}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount to Invest (ETH)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                  />
                </div>

                <div className="glass-effect rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">You'll receive:</span>
                    <span className="text-white font-semibold">~0 rMUSIC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Estimated APY:</span>
                    <span className="text-cyber-green font-semibold">{selectedAsset.apy}%</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="flex-1 py-3 glass-effect rounded-lg font-semibold border border-white/10 hover:border-white/30 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold hover-glow">
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
