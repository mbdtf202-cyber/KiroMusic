/**
 * 高级音频指纹识别系统
 * 使用多种算法组合实现精确的音频识别
 */

const crypto = require('crypto');
const tf = require('@tensorflow/tfjs-node');
const mm = require('music-metadata');

class AudioFingerprintEngine {
  constructor() {
    this.sampleRate = 22050;
    this.fftSize = 2048;
    this.hopSize = 512;
  }

  /**
   * 生成完整的音频指纹
   */
  async generateFingerprint(audioBuffer) {
    try {
      // 1. 提取基础音频特征
      const basicFeatures = await this.extractBasicFeatures(audioBuffer);
      
      // 2. 提取频谱特征
      const spectralFeatures = await this.extractSpectralFeatures(audioBuffer);
      
      // 3. 提取节奏特征
      const rhythmFeatures = await this.extractRhythmFeatures(audioBuffer);
      
      // 4. 提取和声特征
      const harmonicFeatures = await this.extractHarmonicFeatures(audioBuffer);
      
      // 5. 生成哈希指纹
      const hash = this.generateHash({
        ...basicFeatures,
        ...spectralFeatures,
        ...rhythmFeatures,
        ...harmonicFeatures,
      });

      return {
        id: hash.substring(0, 16),
        hash,
        timestamp: Date.now(),
        features: {
          basic: basicFeatures,
          spectral: spectralFeatures,
          rhythm: rhythmFeatures,
          harmonic: harmonicFeatures,
        },
        metadata: {
          duration: basicFeatures.duration,
          sampleRate: this.sampleRate,
          algorithm: 'KiroMusic-v1.0',
        },
      };
    } catch (error) {
      console.error('Fingerprint generation error:', error);
      throw error;
    }
  }

  /**
   * 提取基础音频特征
   */
  async extractBasicFeatures(audioBuffer) {
    // 使用music-metadata提取基础信息
    const metadata = await mm.parseBuffer(audioBuffer);
    
    return {
      duration: metadata.format.duration || 0,
      bitrate: metadata.format.bitrate || 0,
      sampleRate: metadata.format.sampleRate || this.sampleRate,
      channels: metadata.format.numberOfChannels || 2,
      codec: metadata.format.codec || 'unknown',
    };
  }

  /**
   * 提取频谱特征 (MFCC, Spectral Centroid, etc.)
   */
  async extractSpectralFeatures(audioBuffer) {
    // 将音频转换为张量
    const audioTensor = await this.bufferToTensor(audioBuffer);
    
    // 计算MFCC (Mel-frequency cepstral coefficients)
    const mfcc = await this.computeMFCC(audioTensor);
    
    // 计算频谱质心
    const spectralCentroid = await this.computeSpectralCentroid(audioTensor);
    
    // 计算频谱带宽
    const spectralBandwidth = await this.computeSpectralBandwidth(audioTensor);
    
    // 计算频谱对比度
    const spectralContrast = await this.computeSpectralContrast(audioTensor);
    
    // 计算频谱滚降
    const spectralRolloff = await this.computeSpectralRolloff(audioTensor);

    return {
      mfcc: mfcc.slice(0, 13), // 前13个系数
      spectralCentroid: this.normalizeArray(spectralCentroid),
      spectralBandwidth: this.normalizeArray(spectralBandwidth),
      spectralContrast: this.normalizeArray(spectralContrast),
      spectralRolloff: this.normalizeArray(spectralRolloff),
      zcr: await this.computeZeroCrossingRate(audioTensor),
    };
  }

  /**
   * 提取节奏特征 (Tempo, Beat, Rhythm)
   */
  async extractRhythmFeatures(audioBuffer) {
    const audioTensor = await this.bufferToTensor(audioBuffer);
    
    // 计算节奏
    const tempo = await this.estimateTempo(audioTensor);
    
    // 检测节拍
    const beats = await this.detectBeats(audioTensor);
    
    // 计算节奏强度
    const rhythmStrength = await this.computeRhythmStrength(audioTensor);
    
    // 计算节奏规律性
    const rhythmRegularity = await this.computeRhythmRegularity(beats);

    return {
      tempo,
      beatCount: beats.length,
      rhythmStrength,
      rhythmRegularity,
      timeSignature: this.estimateTimeSignature(beats),
    };
  }

  /**
   * 提取和声特征 (Chroma, Key, Harmony)
   */
  async extractHarmonicFeatures(audioBuffer) {
    const audioTensor = await this.bufferToTensor(audioBuffer);
    
    // 计算色度特征
    const chroma = await this.computeChroma(audioTensor);
    
    // 估计调性
    const key = await this.estimateKey(chroma);
    
    // 计算和声复杂度
    const harmonicComplexity = await this.computeHarmonicComplexity(chroma);
    
    // 计算音调稳定性
    const tonalStability = await this.computeTonalStability(chroma);

    return {
      chroma: this.normalizeArray(chroma),
      key,
      harmonicComplexity,
      tonalStability,
      mode: this.estimateMode(chroma),
    };
  }

  /**
   * 计算MFCC
   */
  async computeMFCC(audioTensor) {
    // 简化实现 - 实际应使用专业音频库
    const fft = await this.computeFFT(audioTensor);
    const melFilterbank = this.createMelFilterbank();
    const melSpectrum = this.applyMelFilterbank(fft, melFilterbank);
    const mfcc = this.dct(melSpectrum);
    return Array.from(mfcc.slice(0, 13));
  }

  /**
   * 计算频谱质心
   */
  async computeSpectralCentroid(audioTensor) {
    const fft = await this.computeFFT(audioTensor);
    const magnitude = fft.map(c => Math.sqrt(c.real ** 2 + c.imag ** 2));
    
    let weightedSum = 0;
    let sum = 0;
    
    for (let i = 0; i < magnitude.length; i++) {
      weightedSum += i * magnitude[i];
      sum += magnitude[i];
    }
    
    return sum > 0 ? weightedSum / sum : 0;
  }

  /**
   * 计算频谱带宽
   */
  async computeSpectralBandwidth(audioTensor) {
    const centroid = await this.computeSpectralCentroid(audioTensor);
    const fft = await this.computeFFT(audioTensor);
    const magnitude = fft.map(c => Math.sqrt(c.real ** 2 + c.imag ** 2));
    
    let variance = 0;
    let sum = 0;
    
    for (let i = 0; i < magnitude.length; i++) {
      variance += ((i - centroid) ** 2) * magnitude[i];
      sum += magnitude[i];
    }
    
    return sum > 0 ? Math.sqrt(variance / sum) : 0;
  }

  /**
   * 计算频谱对比度
   */
  async computeSpectralContrast(audioTensor) {
    const fft = await this.computeFFT(audioTensor);
    const magnitude = fft.map(c => Math.sqrt(c.real ** 2 + c.imag ** 2));
    
    // 分成多个频带
    const numBands = 6;
    const bandSize = Math.floor(magnitude.length / numBands);
    const contrast = [];
    
    for (let i = 0; i < numBands; i++) {
      const band = magnitude.slice(i * bandSize, (i + 1) * bandSize);
      const peak = Math.max(...band);
      const valley = Math.min(...band);
      contrast.push(peak - valley);
    }
    
    return contrast;
  }

  /**
   * 计算频谱滚降
   */
  async computeSpectralRolloff(audioTensor) {
    const fft = await this.computeFFT(audioTensor);
    const magnitude = fft.map(c => Math.sqrt(c.real ** 2 + c.imag ** 2));
    
    const totalEnergy = magnitude.reduce((sum, val) => sum + val, 0);
    const threshold = totalEnergy * 0.85; // 85%能量阈值
    
    let cumulativeEnergy = 0;
    for (let i = 0; i < magnitude.length; i++) {
      cumulativeEnergy += magnitude[i];
      if (cumulativeEnergy >= threshold) {
        return i / magnitude.length;
      }
    }
    
    return 1.0;
  }

  /**
   * 计算过零率
   */
  async computeZeroCrossingRate(audioTensor) {
    const samples = await audioTensor.array();
    let crossings = 0;
    
    for (let i = 1; i < samples.length; i++) {
      if ((samples[i] >= 0 && samples[i - 1] < 0) || 
          (samples[i] < 0 && samples[i - 1] >= 0)) {
        crossings++;
      }
    }
    
    return crossings / samples.length;
  }

  /**
   * 估计节奏
   */
  async estimateTempo(audioTensor) {
    // 使用自相关方法估计节奏
    const onset = await this.detectOnsets(audioTensor);
    const intervals = [];
    
    for (let i = 1; i < onset.length; i++) {
      intervals.push(onset[i] - onset[i - 1]);
    }
    
    if (intervals.length === 0) return 120; // 默认值
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const tempo = 60 / (avgInterval / this.sampleRate);
    
    return Math.round(tempo);
  }

  /**
   * 检测节拍
   */
  async detectBeats(audioTensor) {
    const onset = await this.detectOnsets(audioTensor);
    const tempo = await this.estimateTempo(audioTensor);
    const beatInterval = (60 / tempo) * this.sampleRate;
    
    const beats = [];
    let lastBeat = 0;
    
    for (const o of onset) {
      if (o - lastBeat >= beatInterval * 0.8) {
        beats.push(o);
        lastBeat = o;
      }
    }
    
    return beats;
  }

  /**
   * 检测起始点
   */
  async detectOnsets(audioTensor) {
    const samples = await audioTensor.array();
    const envelope = this.computeEnvelope(samples);
    const onsets = [];
    const threshold = this.computeAdaptiveThreshold(envelope);
    
    for (let i = 1; i < envelope.length - 1; i++) {
      if (envelope[i] > envelope[i - 1] && 
          envelope[i] > envelope[i + 1] && 
          envelope[i] > threshold) {
        onsets.push(i);
      }
    }
    
    return onsets;
  }

  /**
   * 计算包络
   */
  computeEnvelope(samples) {
    const windowSize = 512;
    const envelope = [];
    
    for (let i = 0; i < samples.length; i += windowSize) {
      const window = samples.slice(i, i + windowSize);
      const energy = window.reduce((sum, val) => sum + val ** 2, 0);
      envelope.push(Math.sqrt(energy / window.length));
    }
    
    return envelope;
  }

  /**
   * 计算自适应阈值
   */
  computeAdaptiveThreshold(envelope) {
    const mean = envelope.reduce((a, b) => a + b, 0) / envelope.length;
    const variance = envelope.reduce((sum, val) => sum + (val - mean) ** 2, 0) / envelope.length;
    const stdDev = Math.sqrt(variance);
    return mean + 1.5 * stdDev;
  }

  /**
   * 计算节奏强度
   */
  async computeRhythmStrength(audioTensor) {
    const beats = await this.detectBeats(audioTensor);
    const samples = await audioTensor.array();
    
    if (beats.length === 0) return 0;
    
    let totalStrength = 0;
    for (const beat of beats) {
      if (beat < samples.length) {
        totalStrength += Math.abs(samples[beat]);
      }
    }
    
    return totalStrength / beats.length;
  }

  /**
   * 计算节奏规律性
   */
  computeRhythmRegularity(beats) {
    if (beats.length < 3) return 0;
    
    const intervals = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }
    
    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, val) => sum + (val - mean) ** 2, 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    
    return 1 - Math.min(stdDev / mean, 1);
  }

  /**
   * 估计拍号
   */
  estimateTimeSignature(beats) {
    if (beats.length < 4) return '4/4';
    
    const intervals = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }
    
    // 简化实现 - 实际需要更复杂的分析
    return '4/4';
  }

  /**
   * 计算色度特征
   */
  async computeChroma(audioTensor) {
    const fft = await this.computeFFT(audioTensor);
    const chroma = new Array(12).fill(0);
    
    // 将频率映射到12个半音
    for (let i = 0; i < fft.length; i++) {
      const freq = (i * this.sampleRate) / this.fftSize;
      const note = Math.round(12 * Math.log2(freq / 440) + 69) % 12;
      if (note >= 0 && note < 12) {
        const magnitude = Math.sqrt(fft[i].real ** 2 + fft[i].imag ** 2);
        chroma[note] += magnitude;
      }
    }
    
    return chroma;
  }

  /**
   * 估计调性
   */
  async estimateKey(chroma) {
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const maxIndex = chroma.indexOf(Math.max(...chroma));
    return keys[maxIndex];
  }

  /**
   * 计算和声复杂度
   */
  async computeHarmonicComplexity(chroma) {
    const entropy = this.computeEntropy(chroma);
    return entropy / Math.log2(12); // 归一化
  }

  /**
   * 计算音调稳定性
   */
  async computeTonalStability(chroma) {
    const max = Math.max(...chroma);
    const sum = chroma.reduce((a, b) => a + b, 0);
    return max / sum;
  }

  /**
   * 估计调式
   */
  estimateMode(chroma) {
    // 简化实现 - 比较大调和小调模式
    const majorPattern = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];
    const minorPattern = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0];
    
    const majorScore = this.patternMatch(chroma, majorPattern);
    const minorScore = this.patternMatch(chroma, minorPattern);
    
    return majorScore > minorScore ? 'major' : 'minor';
  }

  /**
   * 模式匹配
   */
  patternMatch(chroma, pattern) {
    let score = 0;
    for (let i = 0; i < 12; i++) {
      score += chroma[i] * pattern[i];
    }
    return score;
  }

  /**
   * 计算熵
   */
  computeEntropy(array) {
    const sum = array.reduce((a, b) => a + b, 0);
    if (sum === 0) return 0;
    
    const probabilities = array.map(val => val / sum);
    let entropy = 0;
    
    for (const p of probabilities) {
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }
    
    return entropy;
  }

  /**
   * 计算FFT
   */
  async computeFFT(audioTensor) {
    // 简化实现 - 实际应使用FFT库
    const samples = await audioTensor.array();
    const fft = [];
    
    for (let k = 0; k < this.fftSize / 2; k++) {
      let real = 0;
      let imag = 0;
      
      for (let n = 0; n < Math.min(samples.length, this.fftSize); n++) {
        const angle = (2 * Math.PI * k * n) / this.fftSize;
        real += samples[n] * Math.cos(angle);
        imag -= samples[n] * Math.sin(angle);
      }
      
      fft.push({ real, imag });
    }
    
    return fft;
  }

  /**
   * 创建Mel滤波器组
   */
  createMelFilterbank() {
    // 简化实现
    const numFilters = 40;
    const filterbank = [];
    
    for (let i = 0; i < numFilters; i++) {
      filterbank.push(new Array(this.fftSize / 2).fill(0).map((_, j) => {
        return Math.exp(-((j - i * 10) ** 2) / 100);
      }));
    }
    
    return filterbank;
  }

  /**
   * 应用Mel滤波器
   */
  applyMelFilterbank(fft, filterbank) {
    const melSpectrum = [];
    
    for (const filter of filterbank) {
      let energy = 0;
      for (let i = 0; i < fft.length; i++) {
        const magnitude = Math.sqrt(fft[i].real ** 2 + fft[i].imag ** 2);
        energy += magnitude * filter[i];
      }
      melSpectrum.push(Math.log(energy + 1e-10));
    }
    
    return melSpectrum;
  }

  /**
   * 离散余弦变换
   */
  dct(input) {
    const output = [];
    const N = input.length;
    
    for (let k = 0; k < N; k++) {
      let sum = 0;
      for (let n = 0; n < N; n++) {
        sum += input[n] * Math.cos((Math.PI * k * (2 * n + 1)) / (2 * N));
      }
      output.push(sum);
    }
    
    return output;
  }

  /**
   * 音频缓冲区转张量
   */
  async bufferToTensor(audioBuffer) {
    // 简化实现 - 假设audioBuffer是Float32Array
    return tf.tensor1d(Array.from(audioBuffer.slice(0, this.sampleRate * 30))); // 最多30秒
  }

  /**
   * 归一化数组
   */
  normalizeArray(array) {
    const max = Math.max(...array.map(Math.abs));
    return max > 0 ? array.map(val => val / max) : array;
  }

  /**
   * 生成哈希
   */
  generateHash(features) {
    const featureString = JSON.stringify(features);
    return crypto.createHash('sha256').update(featureString).digest('hex');
  }

  /**
   * 比较两个指纹的相似度
   */
  compareFingerprintsAdvanced(fp1, fp2) {
    const weights = {
      spectral: 0.3,
      rhythm: 0.25,
      harmonic: 0.25,
      basic: 0.2,
    };

    let totalSimilarity = 0;

    // 比较频谱特征
    totalSimilarity += this.compareSpectralFeatures(fp1.features.spectral, fp2.features.spectral) * weights.spectral;

    // 比较节奏特征
    totalSimilarity += this.compareRhythmFeatures(fp1.features.rhythm, fp2.features.rhythm) * weights.rhythm;

    // 比较和声特征
    totalSimilarity += this.compareHarmonicFeatures(fp1.features.harmonic, fp2.features.harmonic) * weights.harmonic;

    // 比较基础特征
    totalSimilarity += this.compareBasicFeatures(fp1.features.basic, fp2.features.basic) * weights.basic;

    return totalSimilarity;
  }

  compareSpectralFeatures(s1, s2) {
    return this.cosineSimilarity(s1.mfcc, s2.mfcc);
  }

  compareRhythmFeatures(r1, r2) {
    const tempoDiff = Math.abs(r1.tempo - r2.tempo) / Math.max(r1.tempo, r2.tempo);
    return 1 - tempoDiff;
  }

  compareHarmonicFeatures(h1, h2) {
    return this.cosineSimilarity(h1.chroma, h2.chroma);
  }

  compareBasicFeatures(b1, b2) {
    const durationDiff = Math.abs(b1.duration - b2.duration) / Math.max(b1.duration, b2.duration);
    return 1 - durationDiff;
  }

  cosineSimilarity(a, b) {
    if (!a || !b || a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] ** 2;
      normB += b[i] ** 2;
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
  }
}

module.exports = new AudioFingerprintEngine();
