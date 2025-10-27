/**
 * AI功能测试脚本
 * 测试所有AI功能是否正常工作
 */

require('dotenv').config();
const aiInitializer = require('./src/ai/initialize');
const investmentEngine = require('./src/ai/investmentEngine');
const audioFingerprint = require('./src/ai/audioFingerprint');
const recommendationEngine = require('./src/ai/recommendationEngine');
const mlModels = require('./src/ai/mlModels');

async function testAIFeatures() {
  console.log('🧪 Starting AI Features Test\n');

  try {
    // 1. 初始化AI服务
    console.log('1️⃣  Testing AI Initialization...');
    await aiInitializer.initialize();
    console.log('✅ AI services initialized\n');

    // 2. 测试投资推荐
    console.log('2️⃣  Testing Investment Recommendation...');
    const recommendation = await investmentEngine.generateRecommendation({
      id: 'test-track-001',
      artist: 'Test Artist',
      genre: 'Electronic',
    });
    console.log('Investment Score:', recommendation.score);
    console.log('Risk Level:', recommendation.riskLevel);
    console.log('Predicted ROI:', recommendation.predictedROI);
    console.log('✅ Investment recommendation working\n');

    // 3. 测试音频指纹
    console.log('3️⃣  Testing Audio Fingerprint...');
    const mockAudioBuffer = Buffer.alloc(1024);
    const fingerprint = await audioFingerprint.generateFingerprint(mockAudioBuffer);
    console.log('Fingerprint ID:', fingerprint.id);
    console.log('Hash:', fingerprint.hash.substring(0, 16) + '...');
    console.log('✅ Audio fingerprint working\n');

    // 4. 测试推荐系统
    console.log('4️⃣  Testing Recommendation Engine...');
    const recommendations = await recommendationEngine.getPersonalizedRecommendations(
      '0x1234567890123456789012345678901234567890',
      { limit: 5 }
    );
    console.log('Recommendations count:', recommendations.length);
    console.log('✅ Recommendation engine working\n');

    // 5. 测试ML模型
    console.log('5️⃣  Testing ML Models...');
    
    // 测试爆款预测
    const hitFeatures = Array(20).fill(0).map(() => Math.random());
    const hitProbability = await mlModels.predictHit(hitFeatures);
    console.log('Hit Probability:', (hitProbability * 100).toFixed(2) + '%');
    
    // 测试类型分类
    const audioFeatures = Array(128).fill(0).map(() => Math.random());
    const genreResult = await mlModels.classifyGenre(audioFeatures);
    console.log('Predicted Genre:', genreResult.genre);
    console.log('Confidence:', (genreResult.confidence * 100).toFixed(2) + '%');
    
    // 测试情感分析
    const textFeatures = Array(50).fill(0).map(() => Math.random());
    const sentimentResult = await mlModels.analyzeSentiment(textFeatures);
    console.log('Sentiment:', sentimentResult.sentiment);
    console.log('Confidence:', (sentimentResult.confidence * 100).toFixed(2) + '%');
    
    console.log('✅ ML models working\n');

    // 6. 健康检查
    console.log('6️⃣  Testing Health Check...');
    const health = await aiInitializer.healthCheck();
    console.log('Overall Status:', health.status);
    console.log('Services:', Object.keys(health.services).length);
    console.log('✅ Health check working\n');

    // 7. 统计信息
    console.log('7️⃣  Testing Stats...');
    const stats = await aiInitializer.getStats();
    console.log('Initialized:', stats.initialized);
    console.log('Cache Size:', stats.cache.recommendations);
    console.log('✅ Stats working\n');

    // 8. 测试相似音乐
    console.log('8️⃣  Testing Similar Tracks...');
    const similarTracks = await recommendationEngine.getSimilarTracks('test-track-001', 5);
    console.log('Similar tracks count:', similarTracks.length);
    console.log('✅ Similar tracks working\n');

    // 测试完成
    console.log('🎉 All AI Features Tests Passed!\n');

    // 打印最终状态
    aiInitializer.printStatus();

    // 保存模型
    console.log('💾 Saving models...');
    await aiInitializer.saveModels();
    console.log('✅ Models saved\n');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// 运行测试
if (require.main === module) {
  testAIFeatures()
    .then(() => {
      console.log('✅ Test completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test failed:', error);
      process.exit(1);
    });
}

module.exports = testAIFeatures;
