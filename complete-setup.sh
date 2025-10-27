#!/bin/bash

# 完整实现和部署脚本
# 自动完成合约部署和功能实现

set -e

echo "🚀 KiroMusic 完整实现和部署"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 检查.env文件
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env 文件不存在${NC}"
    echo ""
    echo "请先运行配置向导："
    echo "  ./setup-env.sh"
    exit 1
fi

# 检查私钥
if ! grep -q "PRIVATE_KEY=0x" .env; then
    echo -e "${RED}❌ 私钥未配置${NC}"
    echo ""
    echo "请先运行配置向导："
    echo "  ./setup-env.sh"
    exit 1
fi

echo -e "${GREEN}✅ 环境配置检查通过${NC}"
echo ""

# 步骤1: 安装依赖
echo "1️⃣ 安装依赖..."
echo "================================"

if [ ! -d "node_modules" ]; then
    npm install
fi

echo -e "${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 步骤2: 编译合约
echo "2️⃣ 编译智能合约..."
echo "================================"

npx hardhat compile

echo -e "${GREEN}✅ 合约编译完成${NC}"
echo ""

# 步骤3: 检查余额
echo "3️⃣ 检查账户余额..."
echo "================================"

# 这里可以添加余额检查逻辑

echo -e "${YELLOW}⚠️  请确保你的账户有足够的测试ETH${NC}"
echo "获取测试ETH: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet"
echo ""

read -p "确认账户有测试ETH? (yes/no): " has_eth

if [ "$has_eth" != "yes" ]; then
    echo -e "${YELLOW}请先获取测试ETH，然后重新运行此脚本${NC}"
    exit 0
fi

# 步骤4: 部署合约
echo "4️⃣ 部署智能合约到Base Sepolia..."
echo "================================"

npx hardhat run scripts/deploy-contracts.js --network base-sepolia

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 合约部署成功${NC}"
else
    echo -e "${RED}❌ 合约部署失败${NC}"
    exit 1
fi

echo ""

# 步骤5: 更新前端
echo "5️⃣ 重新部署前端..."
echo "================================"

cd frontend
npm run build
vercel --prod

cd ..

echo -e "${GREEN}✅ 前端部署完成${NC}"
echo ""

# 步骤6: 运行测试
echo "6️⃣ 运行测试..."
echo "================================"

npx hardhat test --network base-sepolia

echo ""

# 完成
echo "================================"
echo -e "${GREEN}🎉 完整实现和部署完成！${NC}"
echo "================================"
echo ""

echo "📋 部署信息："
echo ""

if [ -f "deployments/base-sepolia.json" ]; then
    echo "合约地址："
    cat deployments/base-sepolia.json | grep -A 5 "contracts"
    echo ""
fi

echo "🌐 前端URL:"
echo "  https://kiromusic-9x788p0gb-mbdtf202-cybers-projects.vercel.app"
echo ""

echo "🔗 区块链浏览器:"
echo "  https://sepolia.basescan.org"
echo ""

echo "📝 下一步："
echo "  1. 在Vercel Dashboard关闭Deployment Protection"
echo "  2. 访问网站测试功能"
echo "  3. 连接钱包并测试交易"
echo ""

echo "🎯 测试功能："
echo "  - 钱包连接"
echo "  - NFT铸造"
echo "  - NFT碎片化"
echo "  - 版税分配"
echo "  - DAO治理"
echo ""

echo "📚 文档："
echo "  - 使用指南: USAGE_GUIDE.md"
echo "  - 开发指南: DEVELOPER_GUIDE.md"
echo "  - 文档索引: DOCS_INDEX.md"
echo ""

echo -e "${GREEN}部署完成！开始使用吧！${NC} 🚀"
echo ""
