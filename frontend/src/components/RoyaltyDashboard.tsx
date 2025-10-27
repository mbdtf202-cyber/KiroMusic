import { useAccount } from 'wagmi';
import { useClaimableRoyalty, useClaimRoyalty } from '../hooks/useRoyalty';
import { formatEther } from '../utils/format';
import { Loader2, DollarSign, TrendingUp } from 'lucide-react';

interface RoyaltyDashboardProps {
  rMusicToken: string;
  tokenSymbol: string;
}

export function RoyaltyDashboard({ rMusicToken, tokenSymbol }: RoyaltyDashboardProps) {
  const { address } = useAccount();
  const { claimableAmount, isLoading } = useClaimableRoyalty(
    rMusicToken,
    address || ''
  );
  const { claim, isLoading: isClaiming, isSuccess } = useClaimRoyalty();

  const handleClaim = () => {
    claim(rMusicToken);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const claimableEth = claimableAmount ? formatEther(claimableAmount) : '0.0000';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-green-600" />
        Royalty Dashboard
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Claimable Royalties</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {claimableEth} ETH
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            From {tokenSymbol} holdings
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Total Claimed</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            0.0000 ETH
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Lifetime earnings
          </div>
        </div>
      </div>

      <button
        onClick={handleClaim}
        disabled={isClaiming || !claimableAmount || claimableAmount === 0n}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isClaiming && <Loader2 className="w-5 h-5 animate-spin" />}
        {isClaiming ? 'Claiming...' : 'Claim Royalties'}
      </button>

      {isSuccess && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Royalties claimed successfully! Refreshing...
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold mb-3">Recent Distributions</h4>
        <div className="text-sm text-gray-500 text-center py-4">
          No recent distributions
        </div>
      </div>
    </div>
  );
}
