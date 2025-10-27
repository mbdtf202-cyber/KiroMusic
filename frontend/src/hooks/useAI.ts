/**
 * AI功能Hook
 * 提供便捷的AI功能访问接口
 */

import { useState, useCallback } from 'react';
import { aiService, InvestmentRecommendation, HitPrediction } from '../services/aiService';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 生成音频指纹
   */
  const generateFingerprint = useCallback(async (audioFile: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fingerprint = await aiService.generateFingerprint(audioFile);
      return fingerprint;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 获取投资推荐
   */
  const getInvestmentRecommendation = useCallback(async (trackId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const recommendation = await aiService.getInvestmentRecommendation(trackId);
      return recommendation;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 批量获取投资推荐
   */
  const getBatchRecommendations = useCallback(async (trackIds: string[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const recommendations = await aiService.getBatchRecommendations(trackIds);
      return recommendations;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 生成歌词
   */
  const generateLyrics = useCallback(async (prompt: string, style: string, language = 'en') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const lyrics = await aiService.generateLyrics(prompt, style, language);
      return lyrics;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 生成封面
   */
  const generateCover = useCallback(async (prompt: string, style: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const imageUrl = await aiService.generateCover(prompt, style);
      return imageUrl;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 预测爆款
   */
  const predictNextHits = useCallback(async (limit = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const predictions = await aiService.predictNextHits(limit);
      return predictions;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 获取相似音乐
   */
  const getSimilarTracks = useCallback(async (trackId: string, limit = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const tracks = await aiService.getSimilarTracks(trackId, limit);
      return tracks;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 获取个性化推荐
   */
  const getPersonalizedRecommendations = useCallback(async (userAddress: string, limit = 20) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const recommendations = await aiService.getPersonalizedRecommendations(userAddress, limit);
      return recommendations;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 市场趋势分析
   */
  const analyzeMarketTrend = useCallback(async (genre: string, period = '7d') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const trend = await aiService.analyzeMarketTrend(genre, period);
      return trend;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 价格预测
   */
  const predictPrice = useCallback(async (tokenAddress: string, days = 30) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const prediction = await aiService.predictPrice(tokenAddress, days);
      return prediction;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 风险评估
   */
  const assessRisk = useCallback(async (trackId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const assessment = await aiService.assessRisk(trackId);
      return assessment;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 投资组合优化
   */
  const optimizePortfolio = useCallback(async (holdings: any[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const optimization = await aiService.optimizePortfolio(holdings);
      return optimization;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 音乐质量评分
   */
  const scoreQuality = useCallback(async (audioFile: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const score = await aiService.scoreQuality(audioFile);
      return score;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 混音建议
   */
  const getMixingSuggestions = useCallback(async (audioFile: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const suggestions = await aiService.getMixingSuggestions(audioFile);
      return suggestions;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 母带处理建议
   */
  const getMasteringSuggestions = useCallback(async (audioFile: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const suggestions = await aiService.getMasteringSuggestions(audioFile);
      return suggestions;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 检测版权侵权
   */
  const detectInfringement = useCallback(async (trackId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await aiService.detectInfringement(trackId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 音乐情感分析
   */
  const analyzeMusicEmotion = useCallback(async (trackId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const emotion = await aiService.analyzeMusicEmotion(trackId);
      return emotion;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 自动标签生成
   */
  const generateTags = useCallback(async (trackId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const tags = await aiService.generateTags(trackId);
      return tags;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    generateFingerprint,
    getInvestmentRecommendation,
    getBatchRecommendations,
    generateLyrics,
    generateCover,
    predictNextHits,
    getSimilarTracks,
    getPersonalizedRecommendations,
    analyzeMarketTrend,
    predictPrice,
    assessRisk,
    optimizePortfolio,
    scoreQuality,
    getMixingSuggestions,
    getMasteringSuggestions,
    detectInfringement,
    analyzeMusicEmotion,
    generateTags,
  };
}
