#!/bin/bash

# 推送项目到GitHub

echo "🚀 准备推送到GitHub"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 检查Git状态
echo "📊 检查Git状态..."
git status --short

echo ""
echo "================================"
echo ""

# 确认推送
read -p "确认要推送这些更改到GitHub? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "已取消推送"
    exit 0
fi

echo ""
echo "1️⃣ 添加所有更改..."

# 添加所有文件
git add .

echo -e "${GREEN}✅ 文件已添加${NC}"
echo ""

# 显示将要提交的文件
echo "📝 将要提交的文件:"
git status --short
echo ""

# 输入提交信息
echo "2️⃣ 输入提交信息..."
echo ""
echo "建议的提交信息:"
echo "  1. feat: 完整实现和部署准备"
echo "  2. docs: 整理文档结构"
echo "  3. chore: 清理和优化项目"
echo ""

read -p "输入提交信息 (或按回车使用默认): " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="feat: 完整实现和部署准备

- 修复前端路由和部署问题
- 整理文档结构（从53个减少到8个核心文档）
- 创建完整的部署脚本和工具
- 准备智能合约部署
- 优化用户体验和文档导航

部署状态:
- ✅ 前端已部署到Vercel
- ✅ 文档已整理
- ✅ 部署工具已创建
- ⏳ 等待合约部署

查看: README.md, DOCS_INDEX.md, START_DEPLOYMENT.md"
fi

echo ""
echo "3️⃣ 提交更改..."

git commit -m "$commit_msg"

echo -e "${GREEN}✅ 更改已提交${NC}"
echo ""

# 推送到GitHub
echo "4️⃣ 推送到GitHub..."

git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================"
    echo -e "${GREEN}🎉 成功推送到GitHub！${NC}"
    echo "================================"
    echo ""
    
    # 获取远程URL
    remote_url=$(git config --get remote.origin.url)
    
    if [[ $remote_url == *"github.com"* ]]; then
        # 转换SSH URL到HTTPS
        repo_url=$(echo $remote_url | sed 's/git@github.com:/https:\/\/github.com\//' | sed 's/\.git$//')
        echo "🔗 GitHub仓库: $repo_url"
        echo ""
    fi
    
    echo "📊 推送统计:"
    git log -1 --stat
    echo ""
    
    echo "✅ 下一步:"
    echo "  1. 访问GitHub仓库查看更改"
    echo "  2. 配置GitHub Actions (如果需要)"
    echo "  3. 设置仓库描述和标签"
    echo "  4. 添加LICENSE文件"
    echo ""
else
    echo ""
    echo "================================"
    echo -e "${RED}❌ 推送失败${NC}"
    echo "================================"
    echo ""
    echo "可能的原因:"
    echo "  1. 网络连接问题"
    echo "  2. 没有推送权限"
    echo "  3. 远程仓库不存在"
    echo ""
    echo "解决方案:"
    echo "  1. 检查网络连接"
    echo "  2. 确认GitHub认证"
    echo "  3. 检查远程仓库URL"
    echo ""
    exit 1
fi
