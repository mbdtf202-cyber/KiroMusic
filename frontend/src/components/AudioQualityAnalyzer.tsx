import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import { LoadingSpinner } from './LoadingSpinner';

interface QualityResult {
  score: number;
  details: any;
}

interface Suggestion {
  type: string;
  severity: string;
  message: string;
  recommendation?: string;
}

export function AudioQualityAnalyzer() {
  const { scoreQuality, getMixingSuggestions, getMasteringSuggestions, isLoading } = useAI();
  const [file, setFile] = useState<File | null>(null);
  const [qualityResult, setQualityResult] = useState<QualityResult | null>(null);
  const [mixingSuggestions, setMixingSuggestions] = useState<Suggestion[]>([]);
  const [masteringSuggestions, setMasteringSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setQualityResult(null);
      setMixingSuggestions([]);
      setMasteringSuggestions([]);
      setError(null);
    }
  };

  const analyzeAudio = async () => {
    if (!file) return;

    try {
      setError(null);
      
      // 并行执行所有分析
      const [quality, mixing, mastering] = await Promise.all([
        scoreQuality(file),
        getMixingSuggestions(file),
        getMasteringSuggestions(file),
      ]);

      setQualityResult({ score: quality, details: {} });
      setMixingSuggestions(mixing);
      setMasteringSuggestions(mastering);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '中等';
    if (score >= 60) return '及格';
    return '需要改进';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          音频质量分析
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          上传音频文件，AI将分析音质并提供专业建议
        </p>
      </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {file ? file.name : '点击或拖拽上传音频文件'}
            </p>
            <p className="text-sm text-gray-500">
              支持 MP3, WAV, FLAC 格式，最大 100MB
            </p>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </label>

        {file && (
          <button
            onClick={analyzeAudio}
            disabled={isLoading}
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '分析中...' : '开始分析'}
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <LoadingSpinner text="AI正在分析音频质量..." />
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 dark:text-red-300">{error}</span>
        </div>
      )}

      {/* Quality Score */}
      {qualityResult && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">质量评分</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - qualityResult.score / 100)}`}
                  className={getScoreColor(qualityResult.score)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(qualityResult.score)}`}>
                  {qualityResult.score}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getScoreLabel(qualityResult.score)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mixing Suggestions */}
      {mixingSuggestions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            混音建议
          </h3>
          <div className="space-y-3">
            {mixingSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {suggestion.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(suggestion.severity)}`}>
                    {suggestion.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {suggestion.message}
                </p>
                {suggestion.recommendation && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 mt-2">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      💡 {suggestion.recommendation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mastering Suggestions */}
      {masteringSuggestions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            母带处理建议
          </h3>
          <div className="space-y-3">
            {masteringSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {suggestion.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {suggestion.message}
                </p>
                {suggestion.recommendation && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 mt-2">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      ✓ {suggestion.recommendation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
