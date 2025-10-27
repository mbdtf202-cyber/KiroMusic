import { useState, useEffect } from 'react';
import { TrendingUp, Sparkles, Star, ArrowUp } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import { LoadingSpinner } from './LoadingSpinner';
import { formatPercentage } from '../utils/format';

export function HitPredictions() {
  const { predictNextHits, isLoading } = useAI();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    try {
      const data = await predictNextHits(10);
      setPredictions(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="AI正在预测爆款..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI爆款预测
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            基于机器学习算法预测的潜力音乐
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {predictions.map((prediction, index) => (
          <div
            key={prediction.trackId}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Rank */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                      ${
                        index === 0
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                          : index === 1
                          ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                          : index === 2
                          ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <Star className="w-4 h-4 text-yellow-500 mt-1" fill="currentColor" />
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Track #{prediction.trackId}
                  </h3>

                  {/* Score */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        {prediction.score}%
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">爆款概率</span>
                  </div>

                  {/* Reasoning */}
                  {prediction.reasoning && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {prediction.reasoning.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {prediction.reasoning.factors?.map((factor: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                          >
                            <ArrowUp className="w-3 h-3" />
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>

      {predictions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            暂无预测数据
          </p>
        </div>
      )}
    </div>
  );
}
