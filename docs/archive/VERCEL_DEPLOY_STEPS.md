# 🚀 Vercel 部署 - 详细步骤

## ✅ 准备工作已完成

我已经为你创建了所有必要的配置文件：

- ✅ `vercel.json` - Vercel配置
- ✅ `frontend/vercel.json` - 前端特定配置
- ✅ `frontend/.env.production` - 生产环境变量模板
- ✅ `frontend/src/vite-env.d.ts` - TypeScript类型定义
- ✅ `QUICK_DEPLOY.sh` - 一键部署脚本

## 🚀 现在开始部署！

### 方法1: 使用一键部署脚本 (最简单)

```bash
./QUICK_DEPLOY.sh
```

### 方法2: 手动部署 (推荐，更可控)

#### 步骤1: 安装Vercel CLI
```bash
npm install -g vercel
```

#### 步骤2: 登录Vercel
```bash
vercel login
```
选择你的登录方式（GitHub/GitLab/Bitbucket/Email）

#### 步骤3: 部署
```bash
cd frontend
vercel --prod
```

按照提示操作：
- Set up and deploy? **Y**
- Which scope? 选择你的账号
- Link to existing project? **N**
- What's your project's name? **kiromusic** (或其他名称)
- In which directory is your code located? **./**
- Want to override the settings? **N**

等待几分钟，部署完成！

### 方法3: 通过GitHub自动部署

#### 步骤1: 推送代码到GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### 步骤2: 在Vercel中导入
1. 访问 https://vercel.com/new
2. 选择 "Import Git Repository"
3. 选择你的KiroMusic仓库
4. 配置如下：
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build**
   - Output Directory: **dist**
5. 点击 "Deploy"

## 🔧 配置环境变量

部署后，需要配置环境变量：

### 在Vercel Dashboard中：

1. 进入你的项目
2. 点击 "Settings"
3. 点击 "Environment Variables"
4. 添加以下变量：

```
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_CHAIN_ID=1
VITE_NETWORK_NAME=mainnet
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

5. 点击 "Save"
6. 重新部署：回到 "Deployments" 页面，点击最新部署旁的 "..." → "Redeploy"

## 🎯 部署后端

前端部署完成后，你需要部署后端：

### 使用Railway (推荐)

```bash
# 安装Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 部署后端
cd backend
railway init
railway up
```

Railway会给你一个URL，例如：`https://kiromusic-backend.railway.app`

### 更新前端环境变量

将后端URL添加到Vercel的环境变量中：
```
VITE_API_URL=https://kiromusic-backend.railway.app/api
```

然后重新部署前端。

## 📊 查看部署状态

### 使用CLI
```bash
# 查看所有部署
vercel ls

# 查看最新部署的日志
vercel logs

# 查看域名
vercel domains ls
```

### 使用Dashboard
访问 https://vercel.com/dashboard

## 🌐 自定义域名

### 添加域名

1. 在Vercel Dashboard中，进入你的项目
2. 点击 "Settings" → "Domains"
3. 输入你的域名（例如：kiromusic.io）
4. 点击 "Add"

### 配置DNS

在你的域名提供商处添加以下记录：

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

等待DNS传播（通常5-30分钟）

## ✅ 部署检查清单

部署完成后，检查以下项目：

- [ ] 网站可以访问
- [ ] 所有页面正常加载
- [ ] 图片和资源正常显示
- [ ] 钱包可以连接
- [ ] API调用正常（如果后端已部署）
- [ ] 没有控制台错误

## 🐛 常见问题

### 问题1: 构建失败
**解决方案**: 检查TypeScript错误
```bash
cd frontend
npm run build
```

### 问题2: 页面404
**解决方案**: 确保vercel.json中有正确的rewrites配置

### 问题3: 环境变量未生效
**解决方案**: 
- 确保变量名以 `VITE_` 开头
- 在Vercel Dashboard中配置后需要重新部署

### 问题4: API请求失败
**解决方案**:
- 检查VITE_API_URL是否正确
- 确保后端已部署并运行
- 检查CORS配置

## 📈 性能优化

部署后，Vercel会自动：
- ✅ 启用全球CDN
- ✅ 压缩资源
- ✅ 优化图片
- ✅ 启用HTTP/2
- ✅ 自动SSL证书

## 🎉 完成！

你的KiroMusic项目现在已经在线了！

**你的网站**: https://your-project.vercel.app

### 下一步：

1. ✅ 测试所有功能
2. ✅ 部署后端
3. ✅ 配置自定义域名
4. ✅ 设置监控
5. ✅ 开始推广

---

**需要帮助？**
- Vercel文档: https://vercel.com/docs
- 我的部署指南: VERCEL_DEPLOYMENT.md
- 快速部署: DEPLOY_NOW.md

**祝你成功！** 🚀
