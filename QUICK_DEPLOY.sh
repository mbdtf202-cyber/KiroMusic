#!/bin/bash

# KiroMusic 快速部署脚本

echo "🚀 KiroMusic 快速部署到Vercel"
echo "================================"
echo ""

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装Vercel CLI..."
    npm install -g vercel
fi

# 进入前端目录
cd frontend

echo "🔨 构建前端..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo ""
    echo "🚀 开始部署到Vercel..."
    echo ""
    
    # 部署到Vercel
    vercel --prod
    
    echo ""
    echo "🎉 部署完成！"
    echo ""
    echo "📋 下一步:"
    echo "1. 访问 https://vercel.com/dashboard 查看你的项目"
    echo "2. 配置环境变量"
    echo "3. 部署后端到Railway"
    echo "4. 更新前端的API_URL环境变量"
    echo ""
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi
