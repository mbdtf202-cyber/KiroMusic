import { Coins, TrendingUp, Users } from 'lucide-react';
import { formatTokenAmount, formatEther, formatPercentage } from '../utils/format';

interface TokenCardProps {
  address: string;
  name: string;
  symbol: string;
  totalSupply: bigint;
  price?: bigint;
  priceChange24h?: number;
  holders?: number;
  onClick?: () => void;
}

export function TokenCard({
  name,
  symbol,
  totalSupply,
  price,
  priceChange24h,
  holders,
  onClick,
}: TokenCardProps) {
  const isPriceUp = (priceChange24h || 0) >= 0;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{symbol}</h3>
            <p className="text-sm text-gray-500 truncate max-w-[200px]">{name}</p>
          </div>
        </div>
      </div>

      {price && (
        <div className="mb-4">
          <div className="text-2xl font-bold">{formatEther(price)} ETH</div>
          {priceChange24h !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 ${!isPriceUp && 'rotate-180'}`} />
              {formatPercentage(Math.abs(priceChange24h))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-xs text-gray-500 mb-1">Total Supply</div>
          <div className="font-semibold">{formatTokenAmount(totalSupply, 18, 0)}</div>
        </div>
        {holders !== undefined && holders > 0 && (
          <div>
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Holders
            </div>
            <div className="font-semibold">{holders}</div>
          </div>
        )}
      </div>
    </div>
  );
}
