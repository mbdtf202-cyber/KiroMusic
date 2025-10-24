import { motion } from 'framer-motion';
import { Music, Shield, TrendingUp, Users, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const features = [
    {
      icon: Music,
      title: 'Mint Music NFTs',
      description: 'Transform your music into on-chain copyright assets with encrypted metadata',
      color: 'from-cyber-blue to-blue-600',
    },
    {
      icon: TrendingUp,
      title: 'Fractionalize Royalties',
      description: 'Convert NFTs into tradeable rMUSIC tokens representing revenue shares',
      color: 'from-cyber-purple to-purple-600',
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'ZK proofs and encrypted storage protect sensitive artist data',
      color: 'from-cyber-pink to-pink-600',
    },
    {
      icon: Users,
      title: 'DAO Governance',
      description: 'Community-driven decisions on platform parameters and funding',
      color: 'from-cyber-green to-green-600',
    },
    {
      icon: Zap,
      title: 'DeFi Integration',
      description: 'Stake, trade, and borrow against future royalty streams',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Lock,
      title: 'Secure & Audited',
      description: 'Battle-tested smart contracts with multi-sig protection',
      color: 'from-red-500 to-pink-600',
    },
  ];

  const stats = [
    { value: '$2.5M+', label: 'Total Value Locked' },
    { value: '1,234', label: 'Music NFTs Minted' },
    { value: '5,678', label: 'Active Investors' },
    { value: '98%', label: 'Artist Satisfaction' },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 text-gradient"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Own the Music
          <br />
          <span className="text-white">You Love</span>
        </motion.h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
          The first decentralized protocol turning music copyrights into yield-bearing RWA tokens.
          Artists keep control. Fans co-own and earn.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/artist">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold text-lg hover-glow"
            >
              Launch as Artist
            </motion.button>
          </Link>
          <Link to="/investor">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-effect rounded-lg font-semibold text-lg border border-cyber-blue/30 hover:border-cyber-blue/60 transition-all"
            >
              Explore Investments
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="glass-effect rounded-xl p-6 text-center hover-glow"
          >
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-20"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Why <span className="text-gradient">KiroMusic</span>?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-xl p-6 hover-glow group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-effect rounded-2xl p-8 md:p-12"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          How It <span className="text-gradient">Works</span>
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Upload Track', desc: 'Artists upload music with AI fingerprinting' },
            { step: '02', title: 'Mint NFT', desc: 'Create on-chain copyright proof as ERC-721' },
            { step: '03', title: 'Fractionalize', desc: 'Convert to rMUSIC tokens for investors' },
            { step: '04', title: 'Earn Royalties', desc: 'Automated distribution to token holders' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-gradient mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
