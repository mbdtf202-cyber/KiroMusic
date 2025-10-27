#!/bin/bash

# 启用演示模式
# 创建完整可用的演示环境

echo "🎮 启用KiroMusic演示模式"
echo "================================"
echo ""

# 创建演示数据
cat > frontend/src/data/mockData.ts << 'EOF'
// 模拟数据用于演示

export const mockNFTs = [
  {
    id: 1,
    name: "Summer Vibes",
    artist: "0x1234...5678",
    image: "https://via.placeholder.com/400x400?text=Summer+Vibes",
    price: "0.5 ETH",
    fractionalized: false,
  },
  {
    id: 2,
    name: "Night Dreams",
    artist: "0x8765...4321",
    image: "https://via.placeholder.com/400x400?text=Night+Dreams",
    price: "0.8 ETH",
    fractionalized: true,
  },
  {
    id: 3,
    name: "Electric Soul",
    artist: "0xabcd...efgh",
    image: "https://via.placeholder.com/400x400?text=Electric+Soul",
    price: "1.2 ETH",
    fractionalized: false,
  },
];

export const mockProposals = [
  {
    id: 1,
    title: "Add new music genre category",
    description: "Proposal to add Electronic Dance Music as a new category",
    status: "Active",
    votes: { for: 1250, against: 340, abstain: 120 },
  },
  {
    id: 2,
    title: "Reduce platform fees",
    description: "Reduce platform fees from 2.5% to 2%",
    status: "Passed",
    votes: { for: 2100, against: 450, abstain: 200 },
  },
];

export const mockRoyalties = [
  {
    token: "Summer Vibes Token",
    amount: "0.05 ETH",
    date: "2024-10-20",
  },
  {
    token: "Night Dreams Token",
    amount: "0.12 ETH",
    date: "2024-10-15",
  },
];
EOF

echo "✅ 创建了模拟数据"

# 启动前端
echo ""
echo "🚀 启动演示模式..."
echo ""

cd frontend
npm run dev &

echo ""
echo "================================"
echo "✅ 演示模式已启动！"
echo "================================"
echo ""
echo "📱 访问地址:"
echo "  http://localhost:3000"
echo ""
echo "🎯 可用功能:"
echo "  - 浏览NFT"
echo "  - 查看市场数据"
echo "  - 测试UI交互"
echo "  - 查看DAO提案"
echo "  - 查看版税分配"
echo ""
echo "⚠️  注意:"
echo "  这是演示模式，交易不会真正上链"
echo "  如需真实部署，请提供私钥"
echo ""
echo "📖 详细说明: DEMO_MODE.md"
echo ""
