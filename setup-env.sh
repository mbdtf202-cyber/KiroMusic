#!/bin/bash

# 环境变量配置向导
# 帮助用户快速配置 .env 文件

set -e

echo "🔧 KiroMusic 环境变量配置向导"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 .env 文件
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env 文件已存在${NC}"
    read -p "是否要重新配置? (yes/no): " overwrite
    if [ "$overwrite" != "yes" ]; then
        echo "保持现有配置"
        exit 0
    fi
fi

echo -e "${BLUE}📝 开始配置...${NC}"
echo ""

# 1. 私钥配置
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  配置部署账户私钥"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "如何获取私钥:"
echo "  1. 打开MetaMask"
echo "  2. 点击账户详情"
echo "  3. 点击'导出私钥'"
echo "  4. 输入密码"
echo "  5. 复制私钥 (0x开头的64位字符串)"
echo ""
echo -e "${YELLOW}⚠️  警告: 私钥非常重要，不要分享给任何人！${NC}"
echo ""

read -p "是否已准备好私钥? (yes/skip): " has_key

if [ "$has_key" = "yes" ]; then
    read -sp "请粘贴私钥 (输入时不显示): " PRIVATE_KEY
    echo ""
    
    # 验证私钥格式
    if [[ ! $PRIVATE_KEY =~ ^0x[0-9a-fA-F]{64}$ ]]; then
        echo -e "${RED}❌ 私钥格式不正确${NC}"
        echo "私钥应该是 0x 开头的64位十六进制字符串"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 私钥格式正确${NC}"
else
    PRIVATE_KEY=""
    echo -e "${YELLOW}⏭️  跳过私钥配置（稍后手动编辑 .env 文件）${NC}"
fi

echo ""

# 2. 测试ETH
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  获取测试ETH"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Base Sepolia 水龙头:"
echo "  https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet"
echo ""
read -p "是否已获取测试ETH? (yes/later): " has_eth

if [ "$has_eth" != "yes" ]; then
    echo -e "${YELLOW}⏭️  请先获取测试ETH再继续部署${NC}"
fi

echo ""

# 3. API Keys (可选)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  配置API Keys (可选)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "是否配置Basescan API Key? (yes/skip): " config_basescan

if [ "$config_basescan" = "yes" ]; then
    echo "获取Basescan API Key:"
    echo "  1. 访问 https://basescan.org/"
    echo "  2. 注册账号"
    echo "  3. 进入 API Keys 页面"
    echo "  4. 创建新的API Key"
    echo ""
    read -p "请输入Basescan API Key: " BASESCAN_API_KEY
else
    BASESCAN_API_KEY=""
fi

echo ""

# 4. 创建 .env 文件
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  生成配置文件"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat > .env << EOF
# 智能合约部署配置
# 自动生成于: $(date)
# ⚠️ 重要: 不要将此文件提交到Git!

# 部署账户私钥
PRIVATE_KEY=${PRIVATE_KEY}

# RPC节点URL
SEPOLIA_RPC_URL=https://rpc.sepolia.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
BASE_RPC_URL=https://mainnet.base.org

# Alchemy API Key (可选)
ALCHEMY_API_KEY=

# 区块链浏览器API Key
ETHERSCAN_API_KEY=
BASESCAN_API_KEY=${BASESCAN_API_KEY}

# Gas报告
REPORT_GAS=false
COINMARKETCAP_API_KEY=
EOF

echo -e "${GREEN}✅ .env 文件已创建${NC}"
echo ""

# 5. 显示配置状态
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 配置状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -n "$PRIVATE_KEY" ]; then
    echo -e "私钥: ${GREEN}✅ 已配置${NC}"
else
    echo -e "私钥: ${RED}❌ 未配置${NC}"
fi

if [ "$has_eth" = "yes" ]; then
    echo -e "测试ETH: ${GREEN}✅ 已获取${NC}"
else
    echo -e "测试ETH: ${YELLOW}⏳ 待获取${NC}"
fi

if [ -n "$BASESCAN_API_KEY" ]; then
    echo -e "Basescan API: ${GREEN}✅ 已配置${NC}"
else
    echo -e "Basescan API: ${YELLOW}⏭️  跳过 (可选)${NC}"
fi

echo ""

# 6. 下一步提示
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 下一步"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -z "$PRIVATE_KEY" ]; then
    echo -e "${YELLOW}⚠️  请手动编辑 .env 文件，添加私钥:${NC}"
    echo "   nano .env"
    echo ""
fi

if [ "$has_eth" != "yes" ]; then
    echo -e "${YELLOW}⚠️  请获取测试ETH:${NC}"
    echo "   https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet"
    echo ""
fi

if [ -n "$PRIVATE_KEY" ] && [ "$has_eth" = "yes" ]; then
    echo -e "${GREEN}✅ 配置完成！可以开始部署了${NC}"
    echo ""
    echo "运行部署命令:"
    echo "  npx hardhat run scripts/deploy-contracts.js --network base-sepolia"
    echo ""
    echo "或使用一键部署:"
    echo "  ./deploy-all.sh"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
