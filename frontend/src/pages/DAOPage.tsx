import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Vote, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'passed' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  endTime: string;
}

export default function DAOPage() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const proposals: Proposal[] = [
    {
      id: 1,
      title: 'Reduce Platform Fee to 1.5%',
      description: 'Proposal to reduce the platform fee from 2% to 1.5% to attract more artists.',
      proposer: '0x1234...5678',
      status: 'active',
      votesFor: 125000,
      votesAgainst: 45000,
      endTime: '2 days',
    },
    {
      id: 2,
      title: 'Add Support for Polygon Network',
      description: 'Enable cross-chain functionality to reduce gas fees for smaller transactions.',
      proposer: '0xabcd...efgh',
      status: 'active',
      votesFor: 98000,
      votesAgainst: 67000,
      endTime: '5 days',
    },
    {
      id: 3,
      title: 'Treasury Allocation for Marketing',
      description: 'Allocate 50 ETH from treasury for Q1 2026 marketing campaign.',
      proposer: '0x9876...5432',
      status: 'passed',
      votesFor: 156000,
      votesAgainst: 23000,
      endTime: 'Ended',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-cyber-blue';
      case 'passed':
        return 'text-cyber-green';
      case 'rejected':
        return 'text-cyber-pink';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return Clock;
      case 'passed':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">KiroDAO</span>
          </h1>
          <p className="text-xl text-gray-400">
            Community governance for the future of music
          </p>
        </div>

        {/* DAO Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Members', value: '5,678', icon: Users, color: 'cyber-blue' },
            { label: 'Active Proposals', value: '12', icon: Vote, color: 'cyber-purple' },
            { label: 'Treasury Value', value: '$450K', icon: TrendingUp, color: 'cyber-green' },
            { label: 'Voting Power', value: '2,340', icon: Vote, color: 'cyber-pink' },
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

        {/* Create Proposal Button */}
        <div className="mb-8">
          <button className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold hover-glow">
            Create New Proposal
          </button>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Active Proposals</h2>
          {proposals.map((proposal, index) => {
            const StatusIcon = getStatusIcon(proposal.status);
            const totalVotes = proposal.votesFor + proposal.votesAgainst;
            const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover-glow cursor-pointer"
                onClick={() => setSelectedProposal(proposal)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                      <span className={`flex items-center space-x-1 text-sm ${getStatusColor(proposal.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="capitalize">{proposal.status}</span>
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{proposal.description}</p>
                    <p className="text-xs text-gray-500">
                      Proposed by {proposal.proposer} • Ends in {proposal.endTime}
                    </p>
                  </div>
                </div>

                {/* Vote Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">For: {proposal.votesFor.toLocaleString()}</span>
                    <span className="text-gray-400">Against: {proposal.votesAgainst.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${forPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyber-green to-cyber-blue"
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    {forPercentage.toFixed(1)}% in favor
                  </div>
                </div>

                {proposal.status === 'active' && (
                  <div className="flex space-x-4 mt-4">
                    <button className="flex-1 py-2 bg-cyber-green/20 text-cyber-green rounded-lg font-semibold hover:bg-cyber-green/30 transition-colors">
                      Vote For
                    </button>
                    <button className="flex-1 py-2 bg-cyber-pink/20 text-cyber-pink rounded-lg font-semibold hover:bg-cyber-pink/30 transition-colors">
                      Vote Against
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
