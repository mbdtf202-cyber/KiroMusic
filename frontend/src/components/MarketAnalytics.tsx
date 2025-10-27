import { useState, useEffect } from 'react';
import { TrendingUp, Activity, Users, DollarSign } from 'lucide-react';
import { formatCompactNumber, formatEther } from '../utils/format';

interface MarketData {
  platform: {
    totalTracks: number;
    totalVolume24h: string;
    totalUsers: number;
    activeTraders: number;
    totalValueLocked: string;
  };
  streaming: {
    spotify: { totalStreams: number; monthlyListeners: number };
    youtube: { totalViews: number };
  };
  social: {
    twitter: { mentions: number; sentiment: number };
    tiktok: { views: number };
  };
}

export function MarketAnalytics() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMarketData();
    const interval = setInterval(loadMarketData, 60000); // 每分钟更新
    return () => clearInterval(interval);
  }, []);

  const loadMarketData = async () => {
    try {
      const response = await fetch('/api/market/data');
      const data = await response.json();
      setMarketData(data);
    } catch (error) {
      console.error('Failed to load market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !marketData) {
    return <div>Loading market data...</div>;
  }

  const stats = [
    {
      label: '24h交易量',
      value: formatEther(marketData.platform.totalVolume24h) + ' ETH',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: '总用户数',
      value: formatCompactNumber(marketData.platform.totalUsers),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: '活跃交易者',
      value: formatCompactNumber(marketData.platform.activeTraders),
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: '总锁仓价值',
      value: formatEther(marketData.platform.totalValueLocked) + ' ETH',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* 流媒体数据 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">流媒体数据</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Spotify播放</div>
            <div className="text-2xl font-bold">
              {formatCompactNumber(marketData.streaming.spotify.totalStreams)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">月度听众</div>
            <div className="text-2xl font-bold">
              {formatCompactNumber(marketData.streaming.spotify.monthlyListeners)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">YouTube观看</div>
            <div className="text-2xl font-bold">
              {formatCompactNumber(marketData.streaming.youtube.totalViews)}
            </div>
          </div>
        </div>
      </div>

      {/* 社交媒体数据 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">社交媒体热度</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Twitter提及</div>
            <div className="text-2xl font-bold">
              {formatCompactNumber(marketData.social.twitter.mentions)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">情感指数</div>
            <div className="text-2xl font-bold text-green-600">
              {(marketData.social.twitter.sentiment * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">TikTok观看</div>
            <div className="text-2xl font-bold">
              {formatCompactNumber(marketData.social.tiktok.views)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
