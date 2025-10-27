#!/bin/bash

# 强制重新部署前端（清除Vercel缓存）

echo "🔄 强制重新部署前端到Vercel"
echo "================================"
echo ""

cd frontend

echo "1️⃣ 清理本地构建..."
rm -rf dist node_modules/.vite

echo "2️⃣ 重新安装依赖..."
npm install

echo "3️⃣ 本地测试构建..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 本地构建成功！"
    echo ""
    echo "4️⃣ 部署到Vercel（强制清除缓存）..."
    vercel --prod --force
    
    echo ""
    echo "🎉 部署完成！"
    echo ""
    echo "访问: https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app"
else
    echo ""
    echo "❌ 本地构建失败，请检查错误信息"
    exit 1
fi

cd ..
