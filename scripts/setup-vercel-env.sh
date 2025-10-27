#!/bin/bash

# Vercel 环境变量配置脚本
# 自动配置Vercel项目的环境变量

echo "🔧 配置 Vercel 环境变量"
echo "================================"
echo ""

# 检查vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "安装: npm install -g vercel"
    exit 1
fi

# 进入前端目录
cd frontend

# 读取用户输入
echo "请输入以下配置信息:"
echo ""

read -p "后端API URL (例: https://your-backend.railway.app/api): " API_URL
read -p "链ID (84532=Base Sepolia, 8453=Base): " CHAIN_ID
read -p "网络名称 (base-sepolia/base): " NETWORK_NAME
read -p "IPFS网关 (默认: https://gateway.pinata.cloud/ipfs/): " IPFS_GATEWAY
read -p "Pinata JWT Token (可选): " PINATA_JWT
read -p "WalletConnect Project ID (可选): " WALLETCONNECT_ID

# 设置默认值
IPFS_GATEWAY=${IPFS_GATEWAY:-"https://gateway.pinata.cloud/ipfs/"}

echo ""
echo "正在配置环境变量..."

# 设置环境变量
vercel env add VITE_API_URL production <<< "$API_URL"
vercel env add VITE_CHAIN_ID production <<< "$CHAIN_ID"
vercel env add VITE_NETWORK_NAME production <<< "$NETWORK_NAME"
vercel env add VITE_IPFS_GATEWAY production <<< "$IPFS_GATEWAY"

if [ -n "$PINATA_JWT" ]; then
    vercel env add VITE_PINATA_JWT production <<< "$PINATA_JWT"
fi

if [ -n "$WALLETCONNECT_ID" ]; then
    vercel env add VITE_WALLETCONNECT_PROJECT_ID production <<< "$WALLETCONNECT_ID"
fi

echo ""
echo "✅ 环境变量配置完成！"
echo ""
echo "📝 已配置的变量:"
echo "  VITE_API_URL: $API_URL"
echo "  VITE_CHAIN_ID: $CHAIN_ID"
echo "  VITE_NETWORK_NAME: $NETWORK_NAME"
echo "  VITE_IPFS_GATEWAY: $IPFS_GATEWAY"

if [ -n "$PINATA_JWT" ]; then
    echo "  VITE_PINATA_JWT: ****"
fi

if [ -n "$WALLETCONNECT_ID" ]; then
    echo "  VITE_WALLETCONNECT_PROJECT_ID: $WALLETCONNECT_ID"
fi

echo ""
echo "🚀 重新部署以应用更改:"
echo "  vercel --prod"
echo ""

cd ..
