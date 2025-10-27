/**
 * AI系统初始化脚本
 * 初始化所有AI模型和服务
 */

const mlModels = require('./mlModels');
const investmentEngine = require('./investmentEngine');
const audioFingerprint = require('./audioFingerprint');
const recommendationEngine = require('./recommendationEngine');

class AIInitializer {
  constructor() {
    this.initialized = false;
    this.services = {
      mlModels: false,
      investmentEngine: false,
      audioFingerprint: false,
      recommendationEngine: false,
    };
  }

  /**
   * 初始化所有AI服务
   */
  async initialize() {
    if (this.initialized) {
      console.log('✅ AI services already initialized');
      return;
    }

    console.log('🚀 Initializing AI services...');

    try {
      // 1. 初始化ML模型
      console.log('📦 Loading ML models...');
      await mlModels.initialize();
      this.services.mlModels = true;
      console.log('✅ ML models loaded');

      // 2. 初始化投资引擎
      console.log('💰 Initializing investment engine...');
      await investmentEngine.initialize();
      this.services.investmentEngine = true;
      console.log('✅ Investment engine ready');

      // 3. 音频指纹引擎已经是单例，无需初始化
      this.services.audioFingerprint = true;
      console.log('✅ Audio fingerprint engine ready');

      // 4. 推荐引擎已经是单例，无需初始化
      this.services.recommendationEngine = true;
      console.log('✅ Recommendation engine ready');

      this.initialized = true;
      console.log('🎉 All AI services initialized successfully!');

      // 打印服务状态
      this.printStatus();
    } catch (error) {
      console.error('❌ AI initialization error:', error);
      throw error;
    }
  }

  /**
   * 打印服务状态
   */
  printStatus() {
    console.log('\n📊 AI Services Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    for (const [service, status] of Object.entries(this.services)) {
      const icon = status ? '✅' : '❌';
      const statusText = status ? 'Ready' : 'Not Ready';
      console.log(`${icon} ${service.padEnd(25)} ${statusText}`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * 健康检查
   */
  async healthCheck() {
    const health = {
      status: 'ok',
      services: {},
      timestamp: Date.now(),
    };

    try {
      // 检查ML模型
      health.services.mlModels = {
        status: this.services.mlModels ? 'ready' : 'not_ready',
        models: {
          hitPrediction: mlModels.models.hitPrediction ? 'loaded' : 'not_loaded',
          genreClassification: mlModels.models.genreClassification ? 'loaded' : 'not_loaded',
          sentimentAnalysis: mlModels.models.sentimentAnalysis ? 'loaded' : 'not_loaded',
          priceForecasting: mlModels.models.priceForecasting ? 'loaded' : 'not_loaded',
        },
      };

      // 检查投资引擎
      health.services.investmentEngine = {
        status: this.services.investmentEngine ? 'ready' : 'not_ready',
        modelLoaded: investmentEngine.isModelLoaded,
      };

      // 检查音频指纹
      health.services.audioFingerprint = {
        status: this.services.audioFingerprint ? 'ready' : 'not_ready',
      };

      // 检查推荐引擎
      health.services.recommendationEngine = {
        status: this.services.recommendationEngine ? 'ready' : 'not_ready',
        cacheSize: recommendationEngine.cache.size,
      };

      // 检查是否所有服务都正常
      const allReady = Object.values(this.services).every(s => s === true);
      health.status = allReady ? 'ok' : 'degraded';

      return health;
    } catch (error) {
      health.status = 'error';
      health.error = error.message;
      return health;
    }
  }

  /**
   * 重新加载模型
   */
  async reloadModels() {
    console.log('🔄 Reloading ML models...');
    
    try {
      await mlModels.initialize();
      console.log('✅ Models reloaded successfully');
    } catch (error) {
      console.error('❌ Model reload error:', error);
      throw error;
    }
  }

  /**
   * 清理缓存
   */
  clearCaches() {
    console.log('🧹 Clearing caches...');
    
    try {
      recommendationEngine.clearCache();
      console.log('✅ Caches cleared');
    } catch (error) {
      console.error('❌ Cache clear error:', error);
    }
  }

  /**
   * 训练模型
   */
  async trainModels(trainingData) {
    console.log('🎓 Training models...');
    
    try {
      // 训练爆款预测模型
      if (trainingData.hitPrediction) {
        console.log('Training hit prediction model...');
        await mlModels.trainHitPredictionModel(trainingData.hitPrediction);
      }

      // 训练投资推荐模型
      if (trainingData.investment) {
        console.log('Training investment model...');
        await investmentEngine.trainModel(trainingData.investment);
      }

      console.log('✅ Models trained successfully');
    } catch (error) {
      console.error('❌ Training error:', error);
      throw error;
    }
  }

  /**
   * 保存所有模型
   */
  async saveModels() {
    console.log('💾 Saving models...');
    
    try {
      await mlModels.saveAllModels();
      await investmentEngine.saveModel();
      console.log('✅ Models saved successfully');
    } catch (error) {
      console.error('❌ Save error:', error);
      throw error;
    }
  }

  /**
   * 获取统计信息
   */
  async getStats() {
    return {
      initialized: this.initialized,
      services: this.services,
      cache: {
        recommendations: recommendationEngine.cache.size,
      },
      models: {
        hitPrediction: mlModels.models.hitPrediction ? 'loaded' : 'not_loaded',
        genreClassification: mlModels.models.genreClassification ? 'loaded' : 'not_loaded',
        sentimentAnalysis: mlModels.models.sentimentAnalysis ? 'loaded' : 'not_loaded',
        priceForecasting: mlModels.models.priceForecasting ? 'loaded' : 'not_loaded',
      },
      timestamp: Date.now(),
    };
  }

  /**
   * 关闭AI服务
   */
  async shutdown() {
    console.log('🛑 Shutting down AI services...');
    
    try {
      // 保存模型
      await this.saveModels();
      
      // 清理缓存
      this.clearCaches();
      
      // 重置状态
      this.initialized = false;
      for (const key in this.services) {
        this.services[key] = false;
      }
      
      console.log('✅ AI services shut down successfully');
    } catch (error) {
      console.error('❌ Shutdown error:', error);
      throw error;
    }
  }
}

// 创建单例
const aiInitializer = new AIInitializer();

// 导出初始化函数
module.exports = aiInitializer;

// 如果直接运行此脚本，执行初始化
if (require.main === module) {
  aiInitializer.initialize()
    .then(() => {
      console.log('AI services initialized successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to initialize AI services:', error);
      process.exit(1);
    });
}
