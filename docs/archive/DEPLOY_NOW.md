# 🚀 立即部署到Vercel

## 最快速的部署方式 (3分钟)

### 步骤1: 安装Vercel CLI
```bash
npm install -g vercel
```

### 步骤2: 登录Vercel
```bash
vercel login
```
按照提示完成登录

### 步骤3: 部署前端
```bash
# 进入前端目录
cd frontend

# 部署到生产环境
vercel --prod
```

就这样！你的网站将在几分钟内上线！🎉

---

## 部署后你会得到

✅ **免费的HTTPS域名**: `your-project.vercel.app`
✅ **全球CDN加速**: 自动优化
✅ **自动SSL证书**: 安全连接
✅ **持续部署**: 推送代码自动更新

---

## 配置环境变量

部署后，在Vercel Dashboard中添加环境变量：

1. 访问 https://vercel.com/dashboard
2. 选择你的项目
3. 进入 Settings → Environment Variables
4. 添加以下变量：

```
VITE_API_URL=https://your-backend.railway.app/api
VITE_CHAIN_ID=1
VITE_NETWORK_NAME=mainnet
```

---

## 后端部署 (推荐使用Railway)

### 快速部署后端到Railway

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

Railway会给你一个URL，将其添加到Vercel的环境变量中。

---

## 完整部署命令

```bash
# 1. 部署前端到Vercel
cd frontend
vercel --prod

# 2. 部署后端到Railway
cd ../backend
railway up

# 3. 更新前端环境变量
# 在Vercel Dashboard中添加后端URL

# 4. 重新部署前端
cd ../frontend
vercel --prod
```

---

## 查看部署状态

```bash
# 查看所有部署
vercel ls

# 查看日志
vercel logs

# 查看域名
vercel domains ls
```

---

## 🎉 完成！

你的KiroMusic项目现在已经在线了！

**前端**: https://your-project.vercel.app
**后端**: https://your-backend.railway.app

开始使用吧！🚀
