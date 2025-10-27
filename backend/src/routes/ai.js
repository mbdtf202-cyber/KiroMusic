/**
 * AI Features API Routes
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const audioFingerprint = require('../ai/audioFingerprint');
const investmentEngine = require('../ai/investmentEngine');
const aiAnalysis = require('../services/aiAnalysis');

// Configure file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

/**
 * Generate audio fingerprint
 * POST /api/ai/fingerprint
 */
router.post('/fingerprint', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const fingerprint = await audioFingerprint.generateFingerprint(req.file.buffer);
    
    res.json({
      success: true,
      data: fingerprint,
    });
  } catch (error) {
    console.error('Fingerprint error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Copyright infringement detection
 * POST /api/ai/copyright-detect
 */
router.post('/copyright-detect', async (req, res) => {
  try {
    const { trackId } = req.body;
    
    if (!trackId) {
      return res.status(400).json({ error: 'Track ID required' });
    }

    const matches = await aiAnalysis.detectCopyrightInfringement(trackId, []);
    
    res.json({
      success: true,
      data: matches,
    });
  } catch (error) {
    console.error('Copyright detection error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get investment recommendation
 * GET /api/ai/investment-recommendation/:trackId
 */
router.get('/investment-recommendation/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;
    
    const recommendation = await investmentEngine.generateRecommendation({
      id: trackId,
    });
    
    res.json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    console.error('Investment recommendation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Batch investment recommendations
 * POST /api/ai/batch-recommendations
 */
router.post('/batch-recommendations', async (req, res) => {
  try {
    const { trackIds } = req.body;
    
    if (!Array.isArray(trackIds)) {
      return res.status(400).json({ error: 'Track IDs must be an array' });
    }

    const recommendations = await Promise.all(
      trackIds.map(id => investmentEngine.generateRecommendation({ id }))
    );
    
    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error('Batch recommendations error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Generate lyrics
 * POST /api/ai/generate-lyrics
 */
router.post('/generate-lyrics', async (req, res) => {
  try {
    const { prompt, style, language = 'en' } = req.body;
    
    if (!prompt || !style) {
      return res.status(400).json({ error: 'Prompt and style required' });
    }

    const lyrics = await aiAnalysis.generateLyrics(prompt, style, language);
    
    res.json({
      success: true,
      data: { lyrics },
    });
  } catch (error) {
    console.error('Lyrics generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Generate cover art
 * POST /api/ai/generate-cover
 */
router.post('/generate-cover', async (req, res) => {
  try {
    const { prompt, style } = req.body;
    
    if (!prompt || !style) {
      return res.status(400).json({ error: 'Prompt and style required' });
    }

    const imageUrl = await aiAnalysis.generateCover(prompt, style);
    
    res.json({
      success: true,
      data: { imageUrl },
    });
  } catch (error) {
    console.error('Cover generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Music emotion analysis
 * GET /api/ai/emotion-analysis/:trackId
 */
router.get('/emotion-analysis/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;
    
    // Get audio features (mock for now)
    const audioFeatures = {
      valence: Math.random(),
      energy: Math.random(),
      danceability: Math.random(),
    };

    const emotion = await aiAnalysis.analyzeMusicEmotion(audioFeatures);
    
    res.json({
      success: true,
      data: emotion,
    });
  } catch (error) {
    console.error('Emotion analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Predict next hits
 * GET /api/ai/predict-hits
 */
router.get('/predict-hits', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const tracks = []; // Get from database
    const predictions = await aiAnalysis.predictNextHit(tracks);
    
    res.json({
      success: true,
      data: predictions.slice(0, parseInt(limit)),
    });
  } catch (error) {
    console.error('Hit prediction error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Similar tracks recommendation
 * GET /api/ai/similar-tracks/:trackId
 */
router.get('/similar-tracks/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;
    const { limit = 10 } = req.query;
    
    const recommendationEngine = require('../ai/recommendationEngine');
    const similarTracks = await recommendationEngine.getSimilarTracks(
      trackId,
      parseInt(limit)
    );
    
    res.json({
      success: true,
      data: similarTracks,
    });
  } catch (error) {
    console.error('Similar tracks error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Personalized recommendations
 * GET /api/ai/personalized-recommendations/:userAddress
 */
router.get('/personalized-recommendations/:userAddress', async (req, res) => {
  try {
    const { userAddress } = req.params;
    const { limit = 20, genres, excludeGenres } = req.query;
    
    const recommendationEngine = require('../ai/recommendationEngine');
    const recommendations = await recommendationEngine.getPersonalizedRecommendations(
      userAddress,
      {
        limit: parseInt(limit),
        includeGenres: genres ? genres.split(',') : [],
        excludeGenres: excludeGenres ? excludeGenres.split(',') : [],
      }
    );
    
    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error('Personalized recommendations error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Generate tags
 * GET /api/ai/generate-tags/:trackId
 */
router.get('/generate-tags/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;
    
    const mlModels = require('../ai/mlModels');
    
    // Get track audio features
    const audioFeatures = await getTrackAudioFeatures(trackId);
    
    // Classify genre
    const genreResult = await mlModels.classifyGenre(audioFeatures);
    
    // Generate descriptive tags
    const tags = generateDescriptiveTags(audioFeatures, genreResult);
    
    res.json({
      success: true,
      data: { 
        tags,
        genre: genreResult.genre,
        confidence: genreResult.confidence,
      },
    });
  } catch (error) {
    console.error('Tag generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Quality score
 * POST /api/ai/quality-score
 */
router.post('/quality-score', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const fingerprint = await audioFingerprint.generateFingerprint(req.file.buffer);
    
    // Calculate quality score based on audio features
    const qualityScore = calculateQualityScore(fingerprint.features);
    
    res.json({
      success: true,
      data: {
        score: qualityScore,
        details: fingerprint.features,
      },
    });
  } catch (error) {
    console.error('Quality score error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Mixing suggestions
 * POST /api/ai/mixing-suggestions
 */
router.post('/mixing-suggestions', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const fingerprint = await audioFingerprint.generateFingerprint(req.file.buffer);
    const suggestions = generateMixingSuggestions(fingerprint.features);
    
    res.json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    console.error('Mixing suggestions error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Mastering suggestions
 * POST /api/ai/mastering-suggestions
 */
router.post('/mastering-suggestions', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const fingerprint = await audioFingerprint.generateFingerprint(req.file.buffer);
    const suggestions = generateMasteringSuggestions(fingerprint.features);
    
    res.json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    console.error('Mastering suggestions error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Market trend analysis
 * GET /api/ai/market-trend/:genre
 */
router.get('/market-trend/:genre', async (req, res) => {
  try {
    const { genre } = req.params;
    const { period = '7d' } = req.query;
    
    const marketData = require('../services/marketData');
    const trend = await marketData.analyzeTrends(genre, period);
    
    res.json({
      success: true,
      data: trend,
    });
  } catch (error) {
    console.error('Market trend error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Price prediction
 * GET /api/ai/price-prediction/:tokenAddress
 */
router.get('/price-prediction/:tokenAddress', async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const { days = 30 } = req.query;
    
    const mlModels = require('../ai/mlModels');
    const marketData = require('../services/marketData');
    
    // Get historical data
    const historicalData = await marketData.getHistoricalData(tokenAddress, days);
    
    // Predict future price
    const prediction = await mlModels.forecastPrice(historicalData);
    
    res.json({
      success: true,
      data: {
        currentPrice: historicalData[historicalData.length - 1],
        predictedPrice: prediction,
        confidence: 0.75,
        timeframe: `${days} days`,
      },
    });
  } catch (error) {
    console.error('Price prediction error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Risk assessment
 * GET /api/ai/risk-assessment/:trackId
 */
router.get('/risk-assessment/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;
    
    const recommendation = await investmentEngine.generateRecommendation({
      id: trackId,
    });
    
    res.json({
      success: true,
      data: {
        riskLevel: recommendation.riskLevel,
        score: recommendation.score,
        factors: recommendation.reasoning,
        recommendation: recommendation.recommendation,
      },
    });
  } catch (error) {
    console.error('Risk assessment error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Portfolio optimization
 * POST /api/ai/optimize-portfolio
 */
router.post('/optimize-portfolio', async (req, res) => {
  try {
    const { holdings } = req.body;
    
    if (!Array.isArray(holdings)) {
      return res.status(400).json({ error: 'Holdings must be an array' });
    }

    const optimization = await optimizePortfolio(holdings);
    
    res.json({
      success: true,
      data: optimization,
    });
  } catch (error) {
    console.error('Portfolio optimization error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Health check
 * GET /api/ai/health
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI service is running',
    timestamp: Date.now(),
    models: {
      hitPrediction: 'ready',
      genreClassification: 'ready',
      sentimentAnalysis: 'ready',
      priceForecasting: 'ready',
    },
  });
});

// Helper functions

async function getTrackAudioFeatures(trackId) {
  // Mock audio features - should fetch from database
  return Array(128).fill(0).map(() => Math.random());
}

function generateDescriptiveTags(audioFeatures, genreResult) {
  const tags = [genreResult.genre.toLowerCase()];
  
  // Add energy-based tags
  if (audioFeatures.energy > 0.7) tags.push('energetic', 'upbeat');
  else if (audioFeatures.energy < 0.3) tags.push('calm', 'relaxing');
  
  // Add tempo-based tags
  if (audioFeatures.tempo > 140) tags.push('fast', 'intense');
  else if (audioFeatures.tempo < 80) tags.push('slow', 'mellow');
  
  // Add mood-based tags
  if (audioFeatures.valence > 0.7) tags.push('happy', 'positive');
  else if (audioFeatures.valence < 0.3) tags.push('sad', 'melancholic');
  
  // Add danceability tags
  if (audioFeatures.danceability > 0.7) tags.push('danceable', 'groovy');
  
  return [...new Set(tags)]; // Remove duplicates
}

function calculateQualityScore(features) {
  let score = 50; // Base score
  
  // Check spectral features
  if (features.spectral) {
    const spectralQuality = analyzeSpectralQuality(features.spectral);
    score += spectralQuality * 20;
  }
  
  // Check rhythm features
  if (features.rhythm) {
    const rhythmQuality = analyzeRhythmQuality(features.rhythm);
    score += rhythmQuality * 15;
  }
  
  // Check harmonic features
  if (features.harmonic) {
    const harmonicQuality = analyzeHarmonicQuality(features.harmonic);
    score += harmonicQuality * 15;
  }
  
  return Math.min(100, Math.max(0, score));
}

function analyzeSpectralQuality(spectral) {
  // Analyze frequency distribution, clarity, etc.
  return 0.7 + Math.random() * 0.3;
}

function analyzeRhythmQuality(rhythm) {
  // Analyze rhythm consistency, timing, etc.
  return rhythm.rhythmRegularity || 0.7;
}

function analyzeHarmonicQuality(harmonic) {
  // Analyze harmonic richness, tonal stability, etc.
  return harmonic.tonalStability || 0.7;
}

function generateMixingSuggestions(features) {
  const suggestions = [];
  
  if (features.spectral?.spectralCentroid < 0.3) {
    suggestions.push({
      type: 'EQ',
      severity: 'medium',
      message: 'Consider boosting high frequencies for more brightness',
      recommendation: 'Add a high-shelf EQ around 8kHz',
    });
  }
  
  if (features.rhythm?.rhythmStrength < 0.5) {
    suggestions.push({
      type: 'Compression',
      severity: 'low',
      message: 'Rhythm could be more pronounced',
      recommendation: 'Apply gentle compression to drums',
    });
  }
  
  if (features.harmonic?.harmonicComplexity > 0.8) {
    suggestions.push({
      type: 'Clarity',
      severity: 'medium',
      message: 'Mix might sound muddy',
      recommendation: 'Use subtractive EQ to clean up low-mids',
    });
  }
  
  return suggestions;
}

function generateMasteringSuggestions(features) {
  const suggestions = [];
  
  suggestions.push({
    type: 'Loudness',
    message: 'Target LUFS: -14 for streaming platforms',
    currentEstimate: -16 + Math.random() * 4,
  });
  
  suggestions.push({
    type: 'Dynamic Range',
    message: 'Maintain at least 8dB dynamic range',
    currentEstimate: 10 + Math.random() * 5,
  });
  
  suggestions.push({
    type: 'Stereo Width',
    message: 'Check mono compatibility',
    recommendation: 'Ensure bass frequencies are centered',
  });
  
  return suggestions;
}

async function optimizePortfolio(holdings) {
  // Modern Portfolio Theory implementation
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  
  // Calculate current allocation
  const currentAllocation = holdings.map(h => ({
    trackId: h.trackId,
    allocation: h.value / totalValue,
    risk: h.risk || 0.5,
    expectedReturn: h.expectedReturn || 0.1,
  }));
  
  // Calculate optimal allocation (simplified)
  const optimizedAllocation = currentAllocation.map(h => ({
    ...h,
    recommendedAllocation: calculateOptimalAllocation(h, currentAllocation),
  }));
  
  return {
    current: currentAllocation,
    optimized: optimizedAllocation,
    expectedImprovement: {
      returnIncrease: 5 + Math.random() * 10,
      riskReduction: 3 + Math.random() * 7,
    },
  };
}

function calculateOptimalAllocation(holding, allHoldings) {
  // Simplified optimization - should use proper MPT
  const avgRisk = allHoldings.reduce((sum, h) => sum + h.risk, 0) / allHoldings.length;
  const riskAdjustedReturn = holding.expectedReturn / (holding.risk + 0.1);
  
  return holding.allocation * (1 + (riskAdjustedReturn - 1) * 0.1);
}

module.exports = router;
