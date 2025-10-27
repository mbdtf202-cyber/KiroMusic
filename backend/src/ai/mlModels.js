/**
 * 机器学习模型管理
 * 管理和加载各种ML模型
 */

const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs').promises;

class MLModels {
  constructor() {
    this.models = {
      hitPrediction: null,
      genreClassification: null,
      sentimentAnalysis: null,
      priceForecasting: null,
    };
    this.modelsPath = path.join(__dirname, '../../models');
  }

  /**
   * 初始化所有模型
   */
  async initialize() {
    try {
      await this.ensureModelsDirectory();
      await Promise.all([
        this.loadHitPredictionModel(),
        this.loadGenreClassificationModel(),
        this.loadSentimentAnalysisModel(),
        this.loadPriceForecastingModel(),
      ]);
      console.log('✅ All ML models initialized');
    } catch (error) {
      console.error('ML models initialization error:', error);
      // 如果加载失败，创建新模型
      await this.createDefaultModels();
    }
  }

  /**
   * 确保模型目录存在
   */
  async ensureModelsDirectory() {
    try {
      await fs.access(this.modelsPath);
    } catch {
      await fs.mkdir(this.modelsPath, { recursive: true });
    }
  }

  /**
   * 加载爆款预测模型
   */
  async loadHitPredictionModel() {
    try {
      const modelPath = `file://${this.modelsPath}/hit-prediction`;
      this.models.hitPrediction = await tf.loadLayersModel(`${modelPath}/model.json`);
    } catch (error) {
      console.log('Creating new hit prediction model...');
      this.models.hitPrediction = this.createHitPredictionModel();
    }
  }

  /**
   * 创建爆款预测模型
   */
  createHitPredictionModel() {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: 128,
      activation: 'relu',
      inputShape: [20], // 20个特征
    }));
    
    model.add(tf.layers.dropout({ rate: 0.3 }));
    
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
    }));
    
    model.add(tf.layers.dropout({ rate: 0.2 }));
    
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
    }));
    
    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid', // 输出0-1的概率
    }));
    
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });
    
    return model;
  }

  /**
   * 加载类型分类模型
   */
  async loadGenreClassificationModel() {
    try {
      const modelPath = `file://${this.modelsPath}/genre-classification`;
      this.models.genreClassification = await tf.loadLayersModel(`${modelPath}/model.json`);
    } catch (error) {
      console.log('Creating new genre classification model...');
      this.models.genreClassification = this.createGenreClassificationModel();
    }
  }

  /**
   * 创建类型分类模型
   */
  createGenreClassificationModel() {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: 256,
      activation: 'relu',
      inputShape: [128], // MFCC特征
    }));
    
    model.add(tf.layers.dropout({ rate: 0.4 }));
    
    model.add(tf.layers.dense({
      units: 128,
      activation: 'relu',
    }));
    
    model.add(tf.layers.dropout({ rate: 0.3 }));
    
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
    }));
    
    model.add(tf.layers.dense({
      units: 10, // 10个音乐类型
      activation: 'softmax',
    }));
    
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
    
    return model;
  }

  /**
   * 加载情感分析模型
   */
  async loadSentimentAnalysisModel() {
    try {
      const modelPath = `file://${this.modelsPath}/sentiment-analysis`;
      this.models.sentimentAnalysis = await tf.loadLayersModel(`${modelPath}/model.json`);
    } catch (error) {
      console.log('Creating new sentiment analysis model...');
      this.models.sentimentAnalysis = this.createSentimentAnalysisModel();
    }
  }

  /**
   * 创建情感分析模型
   */
  createSentimentAnalysisModel() {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [50], // 文本特征向量
    }));
    
    model.add(tf.layers.dropout({ rate: 0.2 }));
    
    model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
    }));
    
    model.add(tf.layers.dense({
      units: 3, // 正面、中性、负面
      activation: 'softmax',
    }));
    
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
    
    return model;
  }

  /**
   * 加载价格预测模型
   */
  async loadPriceForecastingModel() {
    try {
      const modelPath = `file://${this.modelsPath}/price-forecasting`;
      this.models.priceForecasting = await tf.loadLayersModel(`${modelPath}/model.json`);
    } catch (error) {
      console.log('Creating new price forecasting model...');
      this.models.priceForecasting = this.createPriceForecastingModel();
    }
  }

  /**
   * 创建价格预测模型 (LSTM)
   */
  createPriceForecastingModel() {
    const model = tf.sequential();
    
    model.add(tf.layers.lstm({
      units: 50,
      returnSequences: true,
      inputShape: [30, 5], // 30天历史，5个特征
    }));
    
    model.add(tf.layers.dropout({ rate: 0.2 }));
    
    model.add(tf.layers.lstm({
      units: 50,
      returnSequences: false,
    }));
    
    model.add(tf.layers.dropout({ rate: 0.2 }));
    
    model.add(tf.layers.dense({
      units: 25,
      activation: 'relu',
    }));
    
    model.add(tf.layers.dense({
      units: 1, // 预测未来价格
    }));
    
    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mae'],
    });
    
    return model;
  }

  /**
   * 创建默认模型
   */
  async createDefaultModels() {
    this.models.hitPrediction = this.createHitPredictionModel();
    this.models.genreClassification = this.createGenreClassificationModel();
    this.models.sentimentAnalysis = this.createSentimentAnalysisModel();
    this.models.priceForecasting = this.createPriceForecastingModel();
  }

  /**
   * 预测爆款概率
   */
  async predictHit(features) {
    if (!this.models.hitPrediction) {
      await this.loadHitPredictionModel();
    }

    const inputTensor = tf.tensor2d([features]);
    const prediction = this.models.hitPrediction.predict(inputTensor);
    const probability = await prediction.data();

    inputTensor.dispose();
    prediction.dispose();

    return probability[0];
  }

  /**
   * 分类音乐类型
   */
  async classifyGenre(audioFeatures) {
    if (!this.models.genreClassification) {
      await this.loadGenreClassificationModel();
    }

    const inputTensor = tf.tensor2d([audioFeatures]);
    const prediction = this.models.genreClassification.predict(inputTensor);
    const probabilities = await prediction.data();

    inputTensor.dispose();
    prediction.dispose();

    const genres = [
      'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz',
      'Classical', 'Country', 'R&B', 'Reggae', 'Metal'
    ];

    const maxIndex = probabilities.indexOf(Math.max(...probabilities));
    return {
      genre: genres[maxIndex],
      confidence: probabilities[maxIndex],
      probabilities: genres.map((genre, i) => ({
        genre,
        probability: probabilities[i],
      })),
    };
  }

  /**
   * 分析情感
   */
  async analyzeSentiment(textFeatures) {
    if (!this.models.sentimentAnalysis) {
      await this.loadSentimentAnalysisModel();
    }

    const inputTensor = tf.tensor2d([textFeatures]);
    const prediction = this.models.sentimentAnalysis.predict(inputTensor);
    const probabilities = await prediction.data();

    inputTensor.dispose();
    prediction.dispose();

    const sentiments = ['negative', 'neutral', 'positive'];
    const maxIndex = probabilities.indexOf(Math.max(...probabilities));

    return {
      sentiment: sentiments[maxIndex],
      confidence: probabilities[maxIndex],
      scores: {
        negative: probabilities[0],
        neutral: probabilities[1],
        positive: probabilities[2],
      },
    };
  }

  /**
   * 预测价格
   */
  async forecastPrice(historicalData) {
    if (!this.models.priceForecasting) {
      await this.loadPriceForecastingModel();
    }

    const inputTensor = tf.tensor3d([historicalData]);
    const prediction = this.models.priceForecasting.predict(inputTensor);
    const forecastedPrice = await prediction.data();

    inputTensor.dispose();
    prediction.dispose();

    return forecastedPrice[0];
  }

  /**
   * 保存所有模型
   */
  async saveAllModels() {
    try {
      await this.ensureModelsDirectory();

      const savePromises = [];

      if (this.models.hitPrediction) {
        savePromises.push(
          this.models.hitPrediction.save(`file://${this.modelsPath}/hit-prediction`)
        );
      }

      if (this.models.genreClassification) {
        savePromises.push(
          this.models.genreClassification.save(`file://${this.modelsPath}/genre-classification`)
        );
      }

      if (this.models.sentimentAnalysis) {
        savePromises.push(
          this.models.sentimentAnalysis.save(`file://${this.modelsPath}/sentiment-analysis`)
        );
      }

      if (this.models.priceForecasting) {
        savePromises.push(
          this.models.priceForecasting.save(`file://${this.modelsPath}/price-forecasting`)
        );
      }

      await Promise.all(savePromises);
      console.log('✅ All models saved successfully');
    } catch (error) {
      console.error('Model saving error:', error);
    }
  }

  /**
   * 训练爆款预测模型
   */
  async trainHitPredictionModel(trainingData) {
    if (!this.models.hitPrediction) {
      this.models.hitPrediction = this.createHitPredictionModel();
    }

    const features = trainingData.map(d => d.features);
    const labels = trainingData.map(d => d.isHit ? 1 : 0);

    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    await this.models.hitPrediction.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
        },
      },
    });

    xs.dispose();
    ys.dispose();

    await this.models.hitPrediction.save(`file://${this.modelsPath}/hit-prediction`);
  }
}

module.exports = new MLModels();
