/**
 * 智能推荐引擎
 * 基于协同过滤和内容过滤的混合推荐系统
 */

const mlModels = require('./mlModels');

class RecommendationEngine {
  constructor() {
    this.userPreferences = new Map();
    this.trackSimilarities = new Map();
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5分钟缓存
  }

  /**
   * 获取个性化推荐
   */
  async getPersonalizedRecommendations(userAddress, options = {}) {
    const {
      limit = 20,
      includeGenres = [],
      excludeGenres = [],
      minScore = 0.5,
    } = options;

    try {
      // 检查缓存
      const cacheKey = `${userAddress}-${limit}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      // 获取用户历史
      const userHistory = await this.getUserHistory(userAddress);
      
      // 获取用户偏好
      const preferences = await this.analyzeUserPreferences(userHistory);
      
      // 获取候选音轨
      const candidates = await this.getCandidateTracks(preferences, {
        includeGenres,
        excludeGenres,
      });
      
      // 计算推荐分数
      const scoredTracks = await this.scoreTracksForUser(
        candidates,
        preferences,
        userHistory
      );
      
      // 过滤和排序
      const recommendations = scoredTracks
        .filter(t => t.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(t => ({
          trackId: t.id,
          score: t.score,
          reasons: t.reasons,
          confidence: t.confidence,
        }));

      // 缓存结果
      this.setCache(cacheKey, recommendations);

      return recommendations;
    } catch (error) {
      console.error('Personalized recommendations error:', error);
      throw error;
    }
  }

  /**
   * 获取相似音轨
   */
  async getSimilarTracks(trackId, limit = 10) {
    try {
      // 检查缓存
      const cacheKey = `similar-${trackId}-${limit}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      // 获取音轨特征
      const trackFeatures = await this.getTrackFeatures(trackId);
      
      // 获取所有音轨
      const allTracks = await this.getAllTracks();
      
      // 计算相似度
      const similarities = await Promise.all(
        allTracks
          .filter(t => t.id !== trackId)
          .map(async track => {
            const similarity = await this.calculateSimilarity(
              trackFeatures,
              track.features
            );
            return {
              trackId: track.id,
              similarity,
              reasons: this.explainSimilarity(trackFeatures, track.features),
            };
          })
      );
      
      // 排序并返回
      const similar = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);

      this.setCache(cacheKey, similar);
      return similar;
    } catch (error) {
      console.error('Similar tracks error:', error);
      throw error;
    }
  }

  /**
   * 分析用户偏好
   */
  async analyzeUserPreferences(userHistory) {
    const preferences = {
      genres: {},
      artists: {},
      audioFeatures: {
        tempo: [],
        energy: [],
        danceability: [],
        valence: [],
      },
      investmentStyle: 'balanced', // conservative, balanced, aggressive
      riskTolerance: 0.5,
    };

    for (const item of userHistory) {
      // 统计类型偏好
      if (item.genre) {
        preferences.genres[item.genre] = (preferences.genres[item.genre] || 0) + 1;
      }

      // 统计艺术家偏好
      if (item.artist) {
        preferences.artists[item.artist] = (preferences.artists[item.artist] || 0) + 1;
      }

      // 收集音频特征
      if (item.audioFeatures) {
        preferences.audioFeatures.tempo.push(item.audioFeatures.tempo);
        preferences.audioFeatures.energy.push(item.audioFeatures.energy);
        preferences.audioFeatures.danceability.push(item.audioFeatures.danceability);
        preferences.audioFeatures.valence.push(item.audioFeatures.valence);
      }

      // 分析投资风格
      if (item.investmentAmount) {
        // 根据投资金额和频率判断风格
      }
    }

    // 计算平均音频特征
    for (const feature in preferences.audioFeatures) {
      const values = preferences.audioFeatures[feature];
      if (values.length > 0) {
        preferences.audioFeatures[feature] = {
          mean: values.reduce((a, b) => a + b, 0) / values.length,
          std: this.calculateStdDev(values),
        };
      }
    }

    return preferences;
  }

  /**
   * 为用户评分音轨
   */
  async scoreTracksForUser(tracks, preferences, userHistory) {
    const scoredTracks = [];

    for (const track of tracks) {
      const scores = {
        genreMatch: this.scoreGenreMatch(track, preferences),
        artistMatch: this.scoreArtistMatch(track, preferences),
        audioMatch: this.scoreAudioMatch(track, preferences),
        trendScore: await this.scoreTrend(track),
        noveltyScore: this.scoreNovelty(track, userHistory),
        investmentPotential: await this.scoreInvestmentPotential(track),
      };

      // 加权计算总分
      const weights = {
        genreMatch: 0.2,
        artistMatch: 0.15,
        audioMatch: 0.2,
        trendScore: 0.15,
        noveltyScore: 0.1,
        investmentPotential: 0.2,
      };

      let totalScore = 0;
      for (const [key, value] of Object.entries(scores)) {
        totalScore += value * weights[key];
      }

      scoredTracks.push({
        ...track,
        score: totalScore,
        scores,
        reasons: this.generateReasons(scores),
        confidence: this.calculateConfidence(scores),
      });
    }

    return scoredTracks;
  }

  /**
   * 计算相似度
   */
  async calculateSimilarity(features1, features2) {
    // 音频特征相似度
    const audioSim = this.cosineSimilarity(
      features1.audioFeatures,
      features2.audioFeatures
    );

    // 类型相似度
    const genreSim = features1.genre === features2.genre ? 1 : 0;

    // 情感相似度
    const emotionSim = this.cosineSimilarity(
      features1.emotion || [0, 0, 0],
      features2.emotion || [0, 0, 0]
    );

    // 加权平均
    return audioSim * 0.5 + genreSim * 0.3 + emotionSim * 0.2;
  }

  /**
   * 余弦相似度
   */
  cosineSimilarity(vec1, vec2) {
    if (!vec1 || !vec2) return 0;

    const arr1 = Array.isArray(vec1) ? vec1 : Object.values(vec1);
    const arr2 = Array.isArray(vec2) ? vec2 : Object.values(vec2);

    if (arr1.length !== arr2.length) return 0;

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < arr1.length; i++) {
      dotProduct += arr1[i] * arr2[i];
      norm1 += arr1[i] ** 2;
      norm2 += arr2[i] ** 2;
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2) + 1e-10);
  }

  /**
   * 类型匹配评分
   */
  scoreGenreMatch(track, preferences) {
    if (!track.genre || !preferences.genres) return 0.5;

    const genreCount = preferences.genres[track.genre] || 0;
    const totalCount = Object.values(preferences.genres).reduce((a, b) => a + b, 0);

    return totalCount > 0 ? genreCount / totalCount : 0.5;
  }

  /**
   * 艺术家匹配评分
   */
  scoreArtistMatch(track, preferences) {
    if (!track.artist || !preferences.artists) return 0.5;

    const artistCount = preferences.artists[track.artist] || 0;
    const totalCount = Object.values(preferences.artists).reduce((a, b) => a + b, 0);

    return totalCount > 0 ? artistCount / totalCount : 0.5;
  }

  /**
   * 音频特征匹配评分
   */
  scoreAudioMatch(track, preferences) {
    if (!track.audioFeatures || !preferences.audioFeatures) return 0.5;

    let totalScore = 0;
    let count = 0;

    for (const feature in preferences.audioFeatures) {
      if (track.audioFeatures[feature] !== undefined) {
        const pref = preferences.audioFeatures[feature];
        const value = track.audioFeatures[feature];
        
        // 计算与偏好的距离
        const distance = Math.abs(value - pref.mean);
        const normalizedDistance = distance / (pref.std + 0.1);
        const score = Math.exp(-normalizedDistance);
        
        totalScore += score;
        count++;
      }
    }

    return count > 0 ? totalScore / count : 0.5;
  }

  /**
   * 趋势评分
   */
  async scoreTrend(track) {
    // 基于最近的播放量、社交媒体热度等
    return 0.5 + Math.random() * 0.5;
  }

  /**
   * 新颖度评分
   */
  scoreNovelty(track, userHistory) {
    // 检查用户是否已经接触过类似内容
    const similarCount = userHistory.filter(
      h => h.genre === track.genre || h.artist === track.artist
    ).length;

    return Math.exp(-similarCount / 10);
  }

  /**
   * 投资潜力评分
   */
  async scoreInvestmentPotential(track) {
    // 使用投资引擎评估
    try {
      const investmentEngine = require('./investmentEngine');
      const recommendation = await investmentEngine.generateRecommendation(track);
      return recommendation.score / 100;
    } catch (error) {
      return 0.5;
    }
  }

  /**
   * 生成推荐理由
   */
  generateReasons(scores) {
    const reasons = [];

    if (scores.genreMatch > 0.7) {
      reasons.push('Matches your favorite genres');
    }

    if (scores.artistMatch > 0.7) {
      reasons.push('From artists you love');
    }

    if (scores.audioMatch > 0.7) {
      reasons.push('Similar sound to your preferences');
    }

    if (scores.trendScore > 0.7) {
      reasons.push('Trending now');
    }

    if (scores.investmentPotential > 0.7) {
      reasons.push('High investment potential');
    }

    if (scores.noveltyScore > 0.7) {
      reasons.push('Discover something new');
    }

    return reasons;
  }

  /**
   * 计算置信度
   */
  calculateConfidence(scores) {
    const values = Object.values(scores);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + (val - mean) ** 2, 0) / values.length;
    const consistency = 1 - Math.sqrt(variance);

    return Math.max(0.5, Math.min(0.95, consistency));
  }

  /**
   * 解释相似度
   */
  explainSimilarity(features1, features2) {
    const reasons = [];

    if (features1.genre === features2.genre) {
      reasons.push('Same genre');
    }

    if (Math.abs(features1.audioFeatures?.tempo - features2.audioFeatures?.tempo) < 10) {
      reasons.push('Similar tempo');
    }

    if (Math.abs(features1.audioFeatures?.energy - features2.audioFeatures?.energy) < 0.2) {
      reasons.push('Similar energy');
    }

    return reasons;
  }

  /**
   * 计算标准差
   */
  calculateStdDev(values) {
    if (values.length === 0) return 0;
    
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + (val - mean) ** 2, 0) / values.length;
    
    return Math.sqrt(variance);
  }

  /**
   * 获取用户历史
   */
  async getUserHistory(userAddress) {
    // 从数据库获取用户历史
    // 这里返回模拟数据
    return [];
  }

  /**
   * 获取候选音轨
   */
  async getCandidateTracks(preferences, options) {
    // 从数据库获取候选音轨
    // 这里返回模拟数据
    return [];
  }

  /**
   * 获取音轨特征
   */
  async getTrackFeatures(trackId) {
    // 从数据库获取音轨特征
    return {
      id: trackId,
      genre: 'Electronic',
      audioFeatures: {
        tempo: 120,
        energy: 0.8,
        danceability: 0.7,
        valence: 0.6,
      },
    };
  }

  /**
   * 获取所有音轨
   */
  async getAllTracks() {
    // 从数据库获取所有音轨
    return [];
  }

  /**
   * 缓存操作
   */
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = new RecommendationEngine();
