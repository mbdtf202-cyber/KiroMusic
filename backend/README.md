# 🤖 KiroMusic AI Backend

先进的AI驱动音乐版权投资平台后端服务

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑.env文件，填入你的API密钥
```

### 3. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 📦 核心功能

### 🎵 音频指纹识别
- 多维度特征提取
- 高精度匹配 (>95%)
- 版权保护

### 🧠 AI投资推荐
- 深度学习模型
- 多维度数据分析
- ROI预测

### 🎨 AI创作助手
- 歌词生成 (GPT-4)
- 封面生成 (DALL-E 3)
- 情感分析

### 📊 市场数据
- 实时数据集成
- 趋势分析
- 预测分析

## 🌐 API端点

### AI功能
- `POST /api/ai/fingerprint` - 生成音频指纹
- `GET /api/ai/investment-recommendation/:id` - 投资推荐
- `POST /api/ai/generate-lyrics` - 生成歌词
- `POST /api/ai/generate-cover` - 生成封面

### 分析
- `GET /api/analytics/platform` - 平台统计
- `GET /api/analytics/token/:address` - 代币分析

### 市场
- `GET /api/market/data` - 市场数据
- `GET /api/market/trending` - 热门内容

## 🔧 技术栈

- Node.js + Express
- TensorFlow.js
- OpenAI API
- Redis
- MongoDB

## 📝 许可证

MIT
