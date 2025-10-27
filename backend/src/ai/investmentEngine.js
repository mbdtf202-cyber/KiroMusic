/**
 * AI投资推荐引擎
 * 使用机器学习模型预测投资回报
 */

const tf = require('@tensorflow/tfjs-node');

class InvestmentEngine {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
    this.featureScaler = {
      mean: {},
      std: {},
    };
  }

  /**
   * 初始化模型
   */
  async initialize() {
    if (this.isModelLoaded) return;

    try {
      // 尝试加载已训练的模型
      this.model = await this.loadModel();
    } catch (error) {
      // 如果没有模型，创建新模型
      this.model = this.createModel();
    }

    this.isModelLoaded = true;
  }

  /**
   * 创建神经网络模型
   */
  createModel() {
    const model = tf.sequential();

    // 输入层
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [15], // 15个特征
    }));

    // 隐藏层
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
    }));

    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({
      units: 16,
      activation: 'relu',
    }));

    // 输出层 - 预测ROI
    model.add(tf.layers.dense({
      units: 1,
      activation: 'linear',
    }));

    // 编译模型
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mae'],
    });

    return model;
  }

  /**
   * 生成投资推荐
   */
  async generateRecommendation(trackData) {
    await this.initialize();

    try {
      // 1. 收集所有数据
      const [
        marketData,
        artistData,
        genreData,
        socialData,
        audioFeatures,
      ] = await Promise.all([
        this.getMarketData(trackData),
        this.getArtistData(trackData),
        this.getGenreData(trackData),
        this.getSocialData(trackData),
        this.getAudioFeatures(trackData),
      ]);

      // 2. 提取特征
      const features = this.extractFeatures({
        market: marketData,
        artist: artistData,
        genre: genreData,
        social: socialData,
        audio: audioFeatures,
      });

      // 3. 计算各维度评分
      const scores = {
        marketTrend: this.calculateMarketTrendScore(marketData),
        artistPopularity: this.calculateArtistPopularityScore(artistData),
        genrePerformance: this.calculateGenrePerformanceScore(genreData),
        socialBuzz: this.calculateSocialBuzzScore(socialData),
        audioQuality: this.calculateAudioQualityScore(audioFeatures),
        viralPotential: this.calculateViralPotentialScore(socialData, audioFeatures),
        trendAlignment: this.calculateTrendAlignmentScore(genreData, marketData),
        artistMomentum: this.calculateArtistMomentumScore(artistData),
      };

      // 4. 使用ML模型预测ROI
      const predictedROI = await this.predictROI(features);

      // 5. 计算综合评分
      const overallScore = this.calculateOverallScore(scores);

      // 6. 评估风险
      const riskLevel = this.assessRisk(scores, predictedROI);

      // 7. 推荐投资期限
      const timeHorizon = this.recommendTimeHorizon(scores, predictedROI);

      // 8. 计算置信度
      const confidence = this.calculateConfidence(scores, predictedROI);

      // 9. 生成推荐理由
      const reasoning = this.generateReasoning(scores, predictedROI);

      return {
        trackId: trackData.id,
        score: Math.round(overallScore),
        reasoning: scores,
        predictedROI: {
          conservative: Math.round(predictedROI * 0.7),
          moderate: Math.round(predictedROI),
          optimistic: Math.round(predictedROI * 1.5),
        },
        riskLevel,
        timeHorizon,
        confidence,
        recommendation: this.generateRecommendationText(overallScore, riskLevel),
        insights: reasoning,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Investment recommendation error:', error);
      throw error;
    }
  }

  /**
   * 提取特征向量
   */
  extractFeatures(data) {
    return [
      // 市场特征 (5)
      data.market.volume24h,
      data.market.priceChange24h,
      data.market.holders,
      data.market.liquidity,
      data.market.marketCap,

      // 艺术家特征 (3)
      data.artist.followers,
      data.artist.monthlyListeners,
      data.artist.trackCount,

      // 类型特征 (2)
      data.genre.popularity,
      data.genre.growth,

      // 社交特征 (3)
      data.social.twitterMentions,
      data.social.tiktokViews,
      data.social.sentiment,

      // 音频特征 (2)
      data.audio.quality,
      data.audio.uniqueness,
    ];
  }

  /**
   * 使用ML模型预测ROI
   */
  async predictROI(features) {
    // 归一化特征
    const normalizedFeatures = this.normalizeFeatures(features);

    // 转换为张量
    const inputTensor = tf.tensor2d([normalizedFeatures]);

    // 预测
    const prediction = this.model.predict(inputTensor);
    const roi = await prediction.data();

    // 清理张量
    inputTensor.dispose();
    prediction.dispose();

    return Math.max(0, roi[0] * 100); // 转换为百分比
  }

  /**
   * 归一化特征
   */
  normalizeFeatures(features) {
    return features.map((value, index) => {
      const mean = this.featureScaler.mean[index] || 0;
      const std = this.featureScaler.std[index] || 1;
      return (value - mean) / std;
    });
  }

  /**
   * 计算市场趋势评分
   */
  calculateMarketTrendScore(marketData) {
    const volumeScore = this.normalizeScore(marketData.volume24h, 0, 1000000);
    const priceScore = this.normalizeScore(marketData.priceChange24h, -50, 50);
    const liquidityScore = this.normalizeScore(marketData.liquidity, 0, 10000000);

    return (volumeScore * 0.4 + priceScore * 0.3 + liquidityScore * 0.3) * 100;
  }

  /**
   * 计算艺术家人气评分
   */
  calculateArtistPopularityScore(artistData) {
    const followersScore = this.normalizeScore(artistData.followers, 0, 1000000);
    const listenersScore = this.normalizeScore(artistData.monthlyListeners, 0, 10000000);
    const tracksScore = this.normalizeScore(artistData.trackCount, 0, 100);

    return (followersScore * 0.4 + listenersScore * 0.4 + tracksScore * 0.2) * 100;
  }

  /**
   * 计算类型表现评分
   */
  calculateGenrePerformanceScore(genreData) {
    const popularityScore = this.normalizeScore(genreData.popularity, 0, 100);
    const growthScore = this.normalizeScore(genreData.growth, -20, 50);

    return (popularityScore * 0.6 + growthScore * 0.4) * 100;
  }

  /**
   * 计算社交热度评分
   */
  calculateSocialBuzzScore(socialData) {
    const twitterScore = this.normalizeScore(socialData.twitterMentions, 0, 100000);
    const tiktokScore = this.normalizeScore(socialData.tiktokViews, 0, 10000000);
    const sentimentScore = (socialData.sentiment + 1) / 2; // -1到1转换为0到1

    return (twitterScore * 0.3 + tiktokScore * 0.4 + sentimentScore * 0.3) * 100;
  }

  /**
   * 计算音频质量评分
   */
  calculateAudioQualityScore(audioFeatures) {
    const qualityScore = this.normalizeScore(audioFeatures.quality, 0, 100);
    const uniquenessScore = this.normalizeScore(audioFeatures.uniqueness, 0, 100);

    return (qualityScore * 0.6 + uniquenessScore * 0.4) * 100;
  }

  /**
   * 计算病毒传播潜力
   */
  calculateViralPotentialScore(socialData, audioFeatures) {
    const socialVelocity = socialData.growthRate || 0;
    const catchiness = audioFeatures.catchiness || 50;
    const shareability = socialData.shareRate || 0;

    const velocityScore = this.normalizeScore(socialVelocity, 0, 100);
    const catchinessScore = this.normalizeScore(catchiness, 0, 100);
    const shareabilityScore = this.normalizeScore(shareability, 0, 100);

    return (velocityScore * 0.4 + catchinessScore * 0.3 + shareabilityScore * 0.3) * 100;
  }

  /**
   * 计算趋势对齐度
   */
  calculateTrendAlignmentScore(genreData, marketData) {
    const genreTrend = genreData.trendScore || 50;
    const marketTrend = marketData.trendScore || 50;
    const seasonality = this.getSeasonalityScore();

    return (genreTrend * 0.4 + marketTrend * 0.4 + seasonality * 0.2);
  }

  /**
   * 计算艺术家势头
   */
  calculateArtistMomentumScore(artistData) {
    const followerGrowth = artistData.followerGrowthRate || 0;
    const listenerGrowth = artistData.listenerGrowthRate || 0;
    const releaseFrequency = artistData.releaseFrequency || 0;

    const followerScore = this.normalizeScore(followerGrowth, -10, 50);
    const listenerScore = this.normalizeScore(listenerGrowth, -10, 50);
    const frequencyScore = this.normalizeScore(releaseFrequency, 0, 10);

    return (followerScore * 0.4 + listenerScore * 0.4 + frequencyScore * 0.2) * 100;
  }

  /**
   * 计算综合评分
   */
  calculateOverallScore(scores) {
    const weights = {
      marketTrend: 0.15,
      artistPopularity: 0.15,
      genrePerformance: 0.10,
      socialBuzz: 0.15,
      audioQuality: 0.10,
      viralPotential: 0.15,
      trendAlignment: 0.10,
      artistMomentum: 0.10,
    };

    let totalScore = 0;
    for (const [key, value] of Object.entries(scores)) {
      totalScore += value * (weights[key] || 0);
    }

    return Math.min(100, Math.max(0, totalScore));
  }

  /**
   * 评估风险等级
   */
  assessRisk(scores, predictedROI) {
    const volatility = this.calculateVolatility(scores);
    const uncertainty = this.calculateUncertainty(scores);

    if (predictedROI > 50 && volatility < 0.3 && uncertainty < 0.3) {
      return 'LOW';
    } else if (predictedROI > 30 && volatility < 0.5 && uncertainty < 0.5) {
      return 'MEDIUM';
    } else {
      return 'HIGH';
    }
  }

  /**
   * 计算波动性
   */
  calculateVolatility(scores) {
    const values = Object.values(scores);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + (val - mean) ** 2, 0) / values.length;
    return Math.sqrt(variance) / 100;
  }

  /**
   * 计算不确定性
   */
  calculateUncertainty(scores) {
    const minScore = Math.min(...Object.values(scores));
    const maxScore = Math.max(...Object.values(scores));
    return (maxScore - minScore) / 100;
  }

  /**
   * 推荐投资期限
   */
  recommendTimeHorizon(scores, predictedROI) {
    if (predictedROI > 50 && scores.viralPotential > 70) {
      return '3M'; // 短期爆发
    } else if (predictedROI > 30 && scores.artistMomentum > 60) {
      return '6M'; // 中期增长
    } else if (predictedROI > 20) {
      return '1Y'; // 长期稳定
    } else {
      return '2Y'; // 超长期
    }
  }

  /**
   * 计算置信度
   */
  calculateConfidence(scores, predictedROI) {
    const scoreConsistency = 1 - this.calculateVolatility(scores);
    const dataQuality = this.assessDataQuality(scores);
    const modelConfidence = Math.min(predictedROI / 100, 1);

    return (scoreConsistency * 0.4 + dataQuality * 0.3 + modelConfidence * 0.3);
  }

  /**
   * 评估数据质量
   */
  assessDataQuality(scores) {
    const nonZeroScores = Object.values(scores).filter(s => s > 0).length;
    return nonZeroScores / Object.keys(scores).length;
  }

  /**
   * 生成推荐理由
   */
  generateReasoning(scores, predictedROI) {
    const insights = [];

    if (scores.viralPotential > 70) {
      insights.push('High viral potential on social media');
    }
    if (scores.artistMomentum > 70) {
      insights.push('Artist showing strong growth momentum');
    }
    if (scores.trendAlignment > 70) {
      insights.push('Perfectly aligned with current market trends');
    }
    if (scores.socialBuzz > 70) {
      insights.push('Strong social media engagement');
    }
    if (scores.audioQuality > 80) {
      insights.push('Exceptional production quality');
    }
    if (predictedROI > 50) {
      insights.push('High predicted return on investment');
    }

    return insights;
  }

  /**
   * 生成推荐文本
   */
  generateRecommendationText(score, riskLevel) {
    if (score >= 80) {
      return `Strongly recommended. This asset shows exceptional potential with ${riskLevel.toLowerCase()} risk.`;
    } else if (score >= 60) {
      return `Recommended for investment. Good potential with ${riskLevel.toLowerCase()} risk profile.`;
    } else if (score >= 40) {
      return `Consider with caution. Moderate potential with ${riskLevel.toLowerCase()} risk.`;
    } else {
      return `High risk investment. Requires careful consideration and risk management.`;
    }
  }

  /**
   * 归一化评分
   */
  normalizeScore(value, min, max) {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  }

  /**
   * 获取季节性评分
   */
  getSeasonalityScore() {
    const month = new Date().getMonth();
    // 夏季和年末通常是音乐发行的高峰期
    const seasonalFactors = [60, 55, 60, 65, 70, 80, 85, 80, 70, 65, 70, 85];
    return seasonalFactors[month];
  }

  /**
   * 获取市场数据
   */
  async getMarketData(trackData) {
    // 实际应该从数据库或API获取
    return {
      volume24h: Math.random() * 1000000,
      priceChange24h: (Math.random() - 0.5) * 100,
      holders: Math.floor(Math.random() * 10000),
      liquidity: Math.random() * 10000000,
      marketCap: Math.random() * 50000000,
      trendScore: 50 + Math.random() * 50,
    };
  }

  /**
   * 获取艺术家数据
   */
  async getArtistData(trackData) {
    return {
      followers: Math.floor(Math.random() * 1000000),
      monthlyListeners: Math.floor(Math.random() * 10000000),
      trackCount: Math.floor(Math.random() * 100),
      followerGrowthRate: (Math.random() - 0.3) * 50,
      listenerGrowthRate: (Math.random() - 0.3) * 50,
      releaseFrequency: Math.random() * 10,
    };
  }

  /**
   * 获取类型数据
   */
  async getGenreData(trackData) {
    return {
      popularity: 50 + Math.random() * 50,
      growth: (Math.random() - 0.4) * 50,
      trendScore: 50 + Math.random() * 50,
    };
  }

  /**
   * 获取社交数据
   */
  async getSocialData(trackData) {
    return {
      twitterMentions: Math.floor(Math.random() * 100000),
      tiktokViews: Math.floor(Math.random() * 10000000),
      sentiment: (Math.random() - 0.5) * 2,
      growthRate: Math.random() * 100,
      shareRate: Math.random() * 100,
    };
  }

  /**
   * 获取音频特征
   */
  async getAudioFeatures(trackData) {
    return {
      quality: 70 + Math.random() * 30,
      uniqueness: 50 + Math.random() * 50,
      catchiness: 50 + Math.random() * 50,
    };
  }

  /**
   * 加载模型
   */
  async loadModel() {
    // 实际应该从文件系统加载
    throw new Error('Model not found');
  }

  /**
   * 保存模型
   */
  async saveModel() {
    if (this.model) {
      await this.model.save('file://./models/investment-model');
    }
  }

  /**
   * 训练模型
   */
  async trainModel(trainingData) {
    await this.initialize();

    const features = trainingData.map(d => this.extractFeatures(d.features));
    const labels = trainingData.map(d => d.actualROI / 100);

    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    await this.model.fit(xs, ys, {
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
        },
      },
    });

    xs.dispose();
    ys.dispose();

    await this.saveModel();
  }
}

module.exports = new InvestmentEngine();
