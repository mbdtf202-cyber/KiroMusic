/**
 * 市场数据API路由
 */

const express = require('express');
const router = express.Router();
const marketData = require('../services/marketData');

/**
 * 获取市场数据
 * GET /api/market/data
 */
router.get('/data', async (req, res) => {
  try {
    const data = await marketData.getMarketData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 获取热门内容
 * GET /api/market/trending
 */
router.get('/trending', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const trending = await marketData.getTrending(parseInt(limit));
    res.json({ success: true, data: trending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 分析趋势
 * GET /api/market/trend/:genre
 */
router.get('/trend/:genre', async (req, res) => {
  try {
    const { genre } = req.params;
    const { period = '7d' } = req.query;
    const trend = await marketData.analyzeTrends(genre, period);
    res.json({ success: true, data: trend });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
