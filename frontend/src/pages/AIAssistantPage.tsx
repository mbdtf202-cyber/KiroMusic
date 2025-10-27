import { useState } from 'react';
import { Layout } from '../components/Layout';
import { HitPredictions } from '../components/HitPredictions';
import { AudioQualityAnalyzer } from '../components/AudioQualityAnalyzer';
import { AIRecommendations } from '../components/AIRecommendations';
import { MarketAnalytics } from '../components/MarketAnalytics';
import {
  Sparkles,
  TrendingUp,
  Music,
  BarChart3,
  Lightbulb,
  Image as ImageIcon,
  FileText,
  Shield,
} from 'lucide-react';

type TabType = 'predictions' | 'quality' | 'recommendations' | 'analytics' | 'creative' | 'copyright';

export function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState<TabType>('predictions');

  const tabs = [
    {
      id: 'predictions' as TabType,
      label: '爆款预测',
      icon: Sparkles,
      description: 'AI预测潜力音乐',
    },
    {
      id: 'quality' as TabType,
      label: '质量分析',
      icon: Music,
      description: '音频质量评估',
    },
    {
      id: 'recommendations' as TabType,
      label: '投资建议',
      icon: TrendingUp,
      description: 'AI投资推荐',
    },
    {
      id: 'analytics' as TabType,
      label: '市场分析',
      icon: BarChart3,
      description: '市场趋势洞察',
    },
    {
      id: 'creative' as TabType,
      label: '创作助手',
      icon: Lightbulb,
      description: 'AI创作工具',
    },
    {
      id: 'copyright' as TabType,
      label: '版权保护',
      icon: Shield,
      description: '版权检测',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI智能助手
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                利用人工智能技术，为您的音乐投资和创作提供专业建议
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${
                      isActive
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <Icon
                    className={`w-6 h-6 mx-auto mb-2 ${
                      isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {tab.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {tab.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          {activeTab === 'predictions' && <HitPredictions />}
          {activeTab === 'quality' && <AudioQualityAnalyzer />}
          {activeTab === 'recommendations' && <InvestmentRecommendationsTab />}
          {activeTab === 'analytics' && <MarketAnalytics />}
          {activeTab === 'creative' && <CreativeAssistantTab />}
          {activeTab === 'copyright' && <CopyrightProtectionTab />}
        </div>
      </div>
    </Layout>
  );
}

function InvestmentRecommendationsTab() {
  const [trackId, setTrackId] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI投资建议
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          输入音乐ID获取AI投资分析和建议
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            音乐ID
          </span>
          <input
            type="text"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="输入音乐ID..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </label>
      </div>

      {trackId && <AIRecommendations trackId={trackId} />}
    </div>
  );
}

function CreativeAssistantTab() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('pop');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLyrics = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedContent(`[Verse 1]\n${prompt}\n...\n\n[Chorus]\n...`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI创作助手
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          使用AI生成歌词、封面和创意灵感
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Lyrics Generator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">歌词生成</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                主题/灵感
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="描述你想要的歌词主题..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                风格
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="pop">流行</option>
                <option value="rock">摇滚</option>
                <option value="hiphop">嘻哈</option>
                <option value="electronic">电子</option>
                <option value="ballad">抒情</option>
              </select>
            </div>

            <button
              onClick={generateLyrics}
              disabled={!prompt || isGenerating}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? '生成中...' : '生成歌词'}
            </button>

            {generatedContent && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                  {generatedContent}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Cover Generator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">封面生成</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                描述
              </label>
              <textarea
                placeholder="描述你想要的封面风格..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                艺术风格
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                <option value="modern">现代</option>
                <option value="vintage">复古</option>
                <option value="abstract">抽象</option>
                <option value="minimalist">极简</option>
                <option value="psychedelic">迷幻</option>
              </select>
            </div>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors">
              生成封面
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyrightProtectionTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          版权保护
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          使用AI技术检测版权侵权和保护原创作品
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">音频指纹识别</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            为您的音乐生成唯一的数字指纹，用于版权保护和侵权检测
          </p>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors">
            生成指纹
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">侵权检测</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            检测您的音乐是否被未经授权使用，保护您的版权权益
          </p>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-colors">
            开始检测
          </button>
        </div>
      </div>
    </div>
  );
}
