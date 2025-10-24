import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, Music } from 'lucide-react';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const tracks = [
    { id: 1, name: 'Midnight Dreams', artist: 'Luna Wave', genre: 'Electronic', plays: 125000, emoji: '🎵' },
    { id: 2, name: 'Electric Pulse', artist: 'Neon Beats', genre: 'EDM', plays: 98000, emoji: '⚡' },
    { id: 3, name: 'Ocean Waves', artist: 'Aqua Sound', genre: 'Ambient', plays: 67000, emoji: '🌊' },
    { id: 4, name: 'City Lights', artist: 'Urban Echo', genre: 'Hip Hop', plays: 156000, emoji: '🌃' },
    { id: 5, name: 'Starlight', artist: 'Cosmic Vibes', genre: 'Synthwave', plays: 89000, emoji: '✨' },
    { id: 6, name: 'Thunder Storm', artist: 'Storm Chasers', genre: 'Rock', plays: 112000, emoji: '⛈️' },
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
            <span className="text-gradient">Explore Music</span>
          </h1>
          <p className="text-xl text-gray-400">
            Discover and invest in the next big hit
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tracks, artists, genres..."
              className="w-full pl-12 pr-4 py-4 glass-effect rounded-lg border border-white/10 focus:border-cyber-blue focus:outline-none text-white"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'trending', 'new', 'top'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple'
                    : 'glass-effect border border-white/10 hover:border-white/30'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { icon: Music, label: 'Total Tracks', value: '1,234' },
            { icon: TrendingUp, label: 'Trending Now', value: '89' },
            { icon: Clock, label: 'New This Week', value: '45' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-cyber-blue" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Tracks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-xl p-6 hover-glow cursor-pointer group"
            >
              <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                {track.emoji}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{track.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-3 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full">
                  {track.genre}
                </span>
                <span className="text-xs text-gray-400">
                  {track.plays.toLocaleString()} plays
                </span>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
