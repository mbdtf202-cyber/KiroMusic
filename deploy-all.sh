#!/bin/bash

# KiroMusic 一键部署脚本
# 自动部署前端、后端和智能合约

set -e  # 遇到错误立即退出

echo "🚀 KiroMusic 一键部署脚本"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查必要的工具
check_requirements() {
    echo "📋 检查部署环境..."
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js 未安装${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm 未安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 环境检查通过${NC}\n"
}

# 部署智能合约
deploy_contracts() {
    echo "1️⃣ 部署智能合约..."
    echo "================================"
    
    if [ ! -f ".env" ]; then
        echo -e "${YELLOW}⚠️  .env 文件不存在${NC}"
        echo ""
        read -p "是否运行配置向导? (yes/no): " run_wizard
        
        if [ "$run_wizard" = "yes" ]; then
            ./setup-env.sh
            
            # 检查配置是否完成
            if [ ! -f ".env" ]; then
                echo -e "${RED}❌ 配置未完成${NC}"
                exit 1
            fi
        else
            echo -e "${RED}❌ 请先配置 .env 文件${NC}"
            echo "运行: ./setup-env.sh"
            exit 1
        fi
    fi
    
    # 选择网络
    echo "请选择部署网络:"
    echo "1) Base Sepolia (测试网)"
    echo "2) Base (主网)"
    echo "3) Sepolia (以太坊测试网)"
    echo "4) 跳过合约部署"
    read -p "请输入选项 (1-4): " network_choice
    
    case $network_choice in
        1)
            NETWORK="base-sepolia"
            ;;
        2)
            NETWORK="base"
            echo -e "${YELLOW}⚠️  警告: 你正在部署到主网！${NC}"
            read -p "确认继续? (yes/no): " confirm
            if [ "$confirm" != "yes" ]; then
                echo "已取消部署"
                exit 0
            fi
            ;;
        3)
            NETWORK="sepolia"
            ;;
        4)
            echo "跳过合约部署"
            return
            ;;
        *)
            echo -e "${RED}无效选项${NC}"
            exit 1
            ;;
    esac
    
    echo "正在部署到 $NETWORK..."
    npx hardhat compile
    npx hardhat run scripts/deploy-contracts.js --network $NETWORK
    
    echo -e "${GREEN}✅ 智能合约部署完成${NC}\n"
}

# 部署后端
deploy_backend() {
    echo "2️⃣ 部署后端..."
    echo "================================"
    
    echo "请选择后端部署平台:"
    echo "1) Railway"
    echo "2) Render"
    echo "3) Vercel"
    echo "4) 跳过后端部署"
    read -p "请输入选项 (1-4): " backend_choice
    
    case $backend_choice in
        1)
            echo "部署到 Railway..."
            cd backend
            
            if ! command -v railway &> /dev/null; then
                echo "安装 Railway CLI..."
                npm install -g @railway/cli
            fi
            
            railway up
            echo "获取后端URL..."
            railway domain
            cd ..
            ;;
        2)
            echo "请手动在 Render Dashboard 中部署"
            echo "访问: https://dashboard.render.com/"
            read -p "按回车继续..."
            ;;
        3)
            echo "部署到 Vercel..."
            cd backend
            vercel --prod
            cd ..
            ;;
        4)
            echo "跳过后端部署"
            return
            ;;
        *)
            echo -e "${RED}无效选项${NC}"
            exit 1
            ;;
    esac
    
    echo -e "${GREEN}✅ 后端部署完成${NC}\n"
}

# 更新前端配置
update_frontend_config() {
    echo "3️⃣ 更新前端配置..."
    echo "================================"
    
    read -p "请输入后端API URL (例: https://your-backend.railway.app/api): " api_url
    
    if [ -n "$api_url" ]; then
        # 这里可以自动更新前端的.env文件
        echo "VITE_API_URL=$api_url" > frontend/.env.production
        echo -e "${GREEN}✅ 前端配置已更新${NC}\n"
    else
        echo -e "${YELLOW}⚠️  跳过前端配置更新${NC}\n"
    fi
}

# 部署前端
deploy_frontend() {
    echo "4️⃣ 部署前端..."
    echo "================================"
    
    cd frontend
    
    # 构建
    echo "构建前端..."
    npm run build
    
    # 部署到Vercel
    echo "部署到 Vercel..."
    vercel --prod
    
    cd ..
    
    echo -e "${GREEN}✅ 前端部署完成${NC}\n"
}

# 显示部署总结
show_summary() {
    echo ""
    echo "================================"
    echo "🎉 部署完成！"
    echo "================================"
    echo ""
    echo "📋 部署信息:"
    
    if [ -f "deployments/$NETWORK.json" ]; then
        echo ""
        echo "智能合约地址:"
        cat deployments/$NETWORK.json | grep -A 4 "contracts"
    fi
    
    echo ""
    echo "🔗 访问链接:"
    echo "  前端: https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app"
    echo ""
    echo "📝 下一步:"
    echo "  1. 在 Vercel Dashboard 配置环境变量"
    echo "  2. 测试所有功能"
    echo "  3. 验证智能合约"
    echo ""
    echo "📖 详细文档: COMPLETE_DEPLOYMENT_GUIDE.md"
    echo ""
}

# 主流程
main() {
    check_requirements
    
    echo "开始部署流程..."
    echo ""
    
    # 询问要部署的组件
    echo "请选择要部署的组件:"
    echo "1) 全部部署 (智能合约 + 后端 + 前端)"
    echo "2) 仅智能合约"
    echo "3) 仅后端"
    echo "4) 仅前端"
    echo "5) 智能合约 + 前端"
    read -p "请输入选项 (1-5): " deploy_choice
    
    case $deploy_choice in
        1)
            deploy_contracts
            deploy_backend
            update_frontend_config
            deploy_frontend
            ;;
        2)
            deploy_contracts
            ;;
        3)
            deploy_backend
            ;;
        4)
            update_frontend_config
            deploy_frontend
            ;;
        5)
            deploy_contracts
            update_frontend_config
            deploy_frontend
            ;;
        *)
            echo -e "${RED}无效选项${NC}"
            exit 1
            ;;
    esac
    
    show_summary
}

# 运行主流程
main
