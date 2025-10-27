#!/bin/bash

# 修复Vercel空白页面问题

echo "🔧 修复Vercel空白页面问题"
echo "================================"
echo ""

cd frontend

echo "📝 更新 vercel.json 配置..."

# 备份现有配置
if [ -f "vercel.json" ]; then
    cp vercel.json vercel.json.backup
    echo "✅ 已备份现有配置"
fi

# 创建新配置
cat > vercel.json << 'EOF'
{
  "public": true,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
EOF

echo "✅ 已更新 vercel.json"
echo ""

echo "🚀 重新部署到Vercel..."
vercel --prod --force

echo ""
echo "================================"
echo "✅ 修复完成！"
echo "================================"
echo ""
echo "📋 下一步："
echo "1. 访问Vercel Dashboard关闭Deployment Protection"
echo "   https://vercel.com/mbdtf202-cybers-projects/kiromusic/settings/deployment-protection"
echo ""
echo "2. 选择 'Standard Protection' 或 'Disabled'"
echo ""
echo "3. 点击 'Save'"
echo ""
echo "4. 访问网站验证："
echo "   https://kiromusic-l6246o47b-mbdtf202-cybers-projects.vercel.app"
echo ""

cd ..
