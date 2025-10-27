# AI功能快速开始指南

## 安装依赖

### 后端依赖

```bash
cd backend
npm install
```

主要AI相关依赖：
- `@tensorflow/tfjs-node` - TensorFlow.js for Node.js
- `music-metadata` - 音频元数据提取
- `openai` - OpenAI API客户端
- `axios` - HTTP客户端

### 前端依赖

```bash
cd frontend
npm install
```

## 配置环境变量

创建 `backend/.env` 文件：

```bash
# 服务器配置
PORT=3001
NODE_ENV=development

# OpenAI API (可选 - 用于歌词和封面生成)
OPENAI_API_KEY=your_openai_api_key_here

# Hugging Face API (可选)
HUGGINGFACE_API_KEY=your_huggingface_key_here

# 音乐数据API (可选)
SPOTIFY_API_TOKEN=your_spotify_token
YOUTUBE_API_KEY=your_youtube_key
TWITTER_API_KEY=your_twitter_key
```

## 启动服务

### 1. 启动后端服务器

```bash
cd backend
npm run dev
```

服务器将在 `http://localhost:3001` 启动，并自动初始化AI服务。

### 2. 启动前端开发服务器

```bash
cd frontend
npm run dev
```

前端将在 `http://localhost:5173` 启动。

## 测试AI功能

### 运行AI测试脚本

```bash
cd backend
node test-ai.js
```

这将测试所有AI功能并输出结果。

### 使用API测试

#### 1. 健康检查

```bash
curl http://localhost:3001/api/ai/health
```

#### 2. 获取投资推荐

```bash
curl http://localhost:3001/api/ai/investment-recommendation/track-123
```

#### 3. 预测爆款

```bash
curl http://localhost:3001/api/ai/predict-hits?limit=10
```

#### 4. 获取个性化推荐

```bash
curl http://localhost:3001/api/ai/personalized-recommendations/0x1234...?limit=20
```

## 前端使用

### 1. 访问AI助手页面

打开浏览器访问：
```
http://localhost:5173/ai-assistant
```

### 2. 在组件中使用AI Hook

```typescript
import { useAI } from '../hooks/useAI';

function MyComponent() {
  const { 
    getInvestmentRecommendation, 
    isLoading, 
    error 
  } = useAI();

  const handleAnalyze = async () => {
    const result = await getInvestmentRecommendation('track-123');
    console.log(result);
  };

  return (
    <button onClick={handleAnalyze} disabled={isLoading}>
      {isLoading ? '分析中...' : '分析投资'}
    </button>
  );
}
```

### 3. 使用AI组件

```typescript
import { AIRecommendations } from '../components/AIRecommendations';
import { HitPredictions } from '../components/HitPredictions';
import { AudioQualityAnalyzer } from '../components/AudioQualityAnalyzer';

function MyPage() {
  return (
    <div>
      <HitPredictions />
      <AIRecommendations trackId="track-123" />
      <AudioQualityAnalyzer />
    </div>
  );
}
```

## 常见功能示例

### 1. 音频质量分析

```typescript
const { scoreQuality, getMixingSuggestions } = useAI();

const analyzeAudio = async (file: File) => {
  // 获取质量评分
  const score = await scoreQuality(file);
  console.log('Quality Score:', score);

  // 获取混音建议
  const suggestions = await getMixingSuggestions(file);
  console.log('Mixing Suggestions:', suggestions);
};
```

### 2. 生成歌词

```typescript
const { generateLyrics } = useAI();

const createLyrics = async () => {
  const lyrics = await generateLyrics(
    'A song about summer love',
    'pop',
    'en'
  );
  console.log(lyrics);
};
```

### 3. 市场趋势分析

```typescript
const { analyzeMarketTrend } = useAI();

const analyzeTrend = async () => {
  const trend = await analyzeMarketTrend('electronic', '7d');
  console.log('Trend:', trend);
};
```

### 4. 投资组合优化

```typescript
const { optimizePortfolio } = useAI();

const optimize = async () => {
  const holdings = [
    { trackId: 'track-1', value: 1000, risk: 0.5 },
    { trackId: 'track-2', value: 2000, risk: 0.3 },
  ];
  
  const optimization = await optimizePortfolio(holdings);
  console.log('Optimized Portfolio:', optimization);
};
```

## 管理AI服务

### 查看服务状态

```bash
curl http://localhost:3001/api/admin/ai/health
```

### 查看统计信息

```bash
curl http://localhost:3001/api/admin/ai/stats
```

### 重新加载模型

```bash
curl -X POST http://localhost:3001/api/admin/ai/reload-models
```

### 清理缓存

```bash
curl -X POST http://localhost:3001/api/admin/ai/clear-cache
```

### 保存模型

```bash
curl -X POST http://localhost:3001/api/admin/ai/save-models
```

## 性能优化建议

### 1. 使用缓存

推荐结果会自动缓存5分钟，减少重复计算。

### 2. 批量处理

使用批量API减少请求次数：

```typescript
const { getBatchRecommendations } = useAI();

const trackIds = ['track-1', 'track-2', 'track-3'];
const recommendations = await getBatchRecommendations(trackIds);
```

### 3. 异步处理

对于耗时操作，使用异步处理：

```typescript
// 不要等待结果
generateLyrics(prompt, style).then(lyrics => {
  // 处理结果
});

// 继续其他操作
```

## 故障排除

### 问题1: AI服务初始化失败

**解决方案：**
1. 检查Node.js版本 (需要 >= 14.x)
2. 确保安装了所有依赖
3. 检查内存是否足够 (建议 >= 4GB)

### 问题2: 模型加载失败

**解决方案：**
1. 首次运行会自动创建模型
2. 检查 `backend/models/` 目录权限
3. 手动运行初始化：`node backend/src/ai/initialize.js`

### 问题3: API请求超时

**解决方案：**
1. 增加请求超时时间
2. 使用批量API减少请求
3. 启用缓存

### 问题4: OpenAI API错误

**解决方案：**
1. 检查API密钥是否正确
2. 确认账户有足够额度
3. 检查网络连接

## 下一步

- 阅读 [AI功能文档](./AI_FEATURES.md) 了解详细功能
- 查看 [API文档](./API.md) 了解所有API端点
- 探索 [示例代码](../examples/) 学习更多用法

## 获取帮助

- GitHub Issues: https://github.com/kiromusic/kiromusic/issues
- 技术支持: support@kiromusic.io
- AI团队: ai@kiromusic.io

## 贡献

欢迎贡献代码和改进建议！请查看 [贡献指南](../CONTRIBUTING.md)。
