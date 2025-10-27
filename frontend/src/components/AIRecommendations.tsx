import { useState, useEffect } from 'react';
import { TrendingUp, Sparkles, Target, AlertCircle } from 'lucide-react';
import { aiService, InvestmentRecommendation } from '../services/aiService';
import { formatPercentage } from '../utils/format';
import { LoadingSpinner } from './LoadingSpinner';

interface AIRecommendationsProps {
  trackId: string;
}

export function AIRecommendations({ trackId }: AIRecommendationsProps) {
  const [recommendation, setRecommendation] = useState<InvestmentRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecommendation();
  }, [trackId]);

  const loadRecommendation = async () => {
    try {
      setIsLoading(true);
      const data = await aiService.getInvestmentRecommendation(trackId);
      setRecommendation(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="AI正在分析..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <span className="text-red-800">{error}</span>
      </div>
    );
  }

  if (!recommendation) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'text-green-600 bg-green-100';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-100';
      case 'HIGH':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI评分 */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-xl font-semibold">AI投资评分</h3>
        </div>
        <div className="text-5xl font-bold mb-2">{recommendation.score}/100</div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(recommendation.riskLevel)}`}>
            {recommendation.riskLevel} 风险
          </span>
          <span className="text-sm opacity-90">
            置信度: {formatPercentage(recommendation.confidence * 100)}
          </span>
        </div>
      </div>

      {/* 分析维度 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          分析维度
        </h4>
        <div className="space-y-3">
          {Object.entries(recommendation.reasoning).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="font-semibold">{value}/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI预测 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          ROI预测 ({recommendation.timeHorizon})
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">保守</div>
            <div className="text-2xl font-bold text-gray-700">
              {recommendation.predictedROI.conservative}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">适中</div>
            <div className="text-2xl font-bold text-blue-600">
              {recommendation.predictedROI.moderate}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">乐观</div>
            <div className="text-2xl font-bold text-green-600">
              {recommendation.predictedROI.optimistic}%
            </div>
          </div>
        </div>
      </div>

      {/* AI建议 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">AI建议</h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          {recommendation.score >= 80
            ? '强烈推荐投资。该资产具有优秀的市场表现和增长潜力。'
            : recommendation.score >= 60
            ? '建议适度投资。该资产具有一定的投资价值，但需要密切关注市场变化。'
            : '建议谨慎投资。该资产风险较高，建议进行更深入的研究后再做决定。'}
        </p>
      </div>
    </div>
  );
}
