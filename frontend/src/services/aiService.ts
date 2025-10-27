/**
 * AI服务前端接口
 */

import { apiService } from './api';

export interface AudioFingerprint {
  id: string;
  hash: string;
  features: {
    tempo: number;
    key: string;
    energy: number;
    danceability: number;
    acousticness: number;
    instrumentalness: number;
    valence: number;
  };
}

export interface InvestmentRecommendation {
  trackId: string;
  score: number;
  reasoning: {
    marketTrend: number;
    artistPopularity: number;
    genrePerformance: number;
    historicalROI: number;
    socialBuzz: number;
  };
  predictedROI: {
    conservative: number;
    moderate: number;
    optimistic: number;
  };
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeHorizon: string;
  confidence: number;
}

export interface HitPrediction {
  trackId: string;
  score: number;
  reasoning: {
    summary: string;
    factors: string[];
  };
}

class AIService {
  /**
   * 生成音频指纹
   */
  async generateFingerprint(audioFile: File): Promise<AudioFingerprint> {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch('/api/ai/fingerprint', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }

  /**
   * 检测版权侵权
   */
  async detectInfringement(trackId: string) {
    const response = await apiService.post('/ai/copyright-detect', { trackId });
    return response.data;
  }

  /**
   * 获取投资推荐
   */
  async getInvestmentRecommendation(trackId: string): Promise<InvestmentRecommendation> {
    const response = await apiService.get(`/ai/investment-recommendation/${trackId}`);
    return response.data as InvestmentRecommendation;
  }

  /**
   * 批量获取投资推荐
   */
  async getBatchRecommendations(trackIds: string[]): Promise<InvestmentRecommendation[]> {
    const response = await apiService.post('/ai/batch-recommendations', { trackIds });
    return response.data as InvestmentRecommendation[];
  }

  /**
   * 生成歌词
   */
  async generateLyrics(prompt: string, style: string, language = 'en'): Promise<string> {
    const response = await apiService.post('/ai/generate-lyrics', {
      prompt,
      style,
      language,
    });
    return (response.data as any).lyrics;
  }

  /**
   * 生成封面
   */
  async generateCover(prompt: string, style: string): Promise<string> {
    const response = await apiService.post('/ai/generate-cover', {
      prompt,
      style,
    });
    return (response.data as any).imageUrl;
  }

  /**
   * 音乐情感分析
   */
  async analyzeMusicEmotion(trackId: string) {
    const response = await apiService.get(`/ai/emotion-analysis/${trackId}`);
    return response.data;
  }

  /**
   * 预测爆款
   */
  async predictNextHits(limit = 10): Promise<HitPrediction[]> {
    const response = await apiService.get(`/ai/predict-hits?limit=${limit}`);
    return response.data as HitPrediction[];
  }

  /**
   * 相似音乐推荐
   */
  async getSimilarTracks(trackId: string, limit = 10) {
    const response = await apiService.get(`/ai/similar-tracks/${trackId}?limit=${limit}`);
    return response.data;
  }

  /**
   * 个性化推荐
   */
  async getPersonalizedRecommendations(userAddress: string, limit = 20) {
    const response = await apiService.get(
      `/ai/personalized-recommendations/${userAddress}?limit=${limit}`
    );
    return response.data;
  }

  /**
   * 市场趋势分析
   */
  async analyzeMarketTrend(genre: string, period = '7d') {
    const response = await apiService.get(`/ai/market-trend/${genre}?period=${period}`);
    return response.data;
  }

  /**
   * 价格预测
   */
  async predictPrice(tokenAddress: string, days = 30) {
    const response = await apiService.get(`/ai/price-prediction/${tokenAddress}?days=${days}`);
    return response.data;
  }

  /**
   * 风险评估
   */
  async assessRisk(trackId: string) {
    const response = await apiService.get(`/ai/risk-assessment/${trackId}`);
    return response.data;
  }

  /**
   * 投资组合优化
   */
  async optimizePortfolio(holdings: any[]) {
    const response = await apiService.post('/ai/optimize-portfolio', { holdings });
    return response.data;
  }

  /**
   * 自动标签生成
   */
  async generateTags(trackId: string) {
    const response = await apiService.get(`/ai/generate-tags/${trackId}`);
    return (response.data as any).tags;
  }

  /**
   * 音乐质量评分
   */
  async scoreQuality(audioFile: File): Promise<number> {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch('/api/ai/quality-score', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.score;
  }

  /**
   * 混音建议
   */
  async getMixingSuggestions(audioFile: File) {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch('/api/ai/mixing-suggestions', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }

  /**
   * 母带处理建议
   */
  async getMasteringSuggestions(audioFile: File) {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch('/api/ai/mastering-suggestions', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  }
}

export const aiService = new AIService();
