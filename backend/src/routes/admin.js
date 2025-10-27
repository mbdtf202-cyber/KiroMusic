/**
 * 管理员API路由
 * 用于管理AI服务和系统配置
 */

const express = require('express');
const router = express.Router();
const aiInitializer = require('../ai/initialize');

/**
 * AI服务健康检查
 * GET /api/admin/ai/health
 */
router.get('/ai/health', async (req, res) => {
  try {
    const health = await aiInitializer.healthCheck();
    res.json({
      success: true,
      data: health,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * 获取AI服务统计
 * GET /api/admin/ai/stats
 */
router.get('/ai/stats', async (req, res) => {
  try {
    const stats = await aiInitializer.getStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * 重新加载模型
 * POST /api/admin/ai/reload-models
 */
router.post('/ai/reload-models', async (req, res) => {
  try {
    await aiInitializer.reloadModels();
    res.json({
      success: true,
      message: 'Models reloaded successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * 清理缓存
 * POST /api/admin/ai/clear-cache
 */
router.post('/ai/clear-cache', (req, res) => {
  try {
    aiInitializer.clearCaches();
    res.json({
      success: true,
      message: 'Caches cleared successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * 保存模型
 * POST /api/admin/ai/save-models
 */
router.post('/ai/save-models', async (req, res) => {
  try {
    await aiInitializer.saveModels();
    res.json({
      success: true,
      message: 'Models saved successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * 训练模型
 * POST /api/admin/ai/train
 */
router.post('/ai/train', async (req, res) => {
  try {
    const { trainingData } = req.body;
    
    if (!trainingData) {
      return res.status(400).json({
        success: false,
        error: 'Training data required',
      });
    }

    await aiInitializer.trainModels(trainingData);
    
    res.json({
      success: true,
      message: 'Models trained successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * 系统信息
 * GET /api/admin/system/info
 */
router.get('/system/info', (req, res) => {
  const info = {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    memory: {
      total: process.memoryUsage().heapTotal,
      used: process.memoryUsage().heapUsed,
      external: process.memoryUsage().external,
    },
    cpu: process.cpuUsage(),
    env: process.env.NODE_ENV || 'development',
  };

  res.json({
    success: true,
    data: info,
  });
});

module.exports = router;
