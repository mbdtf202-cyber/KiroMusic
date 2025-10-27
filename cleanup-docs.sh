#!/bin/bash

# 文档清理脚本
# 整理和归档不必要的MD文件

echo "📚 开始整理文档..."
echo ""

# 创建归档目录
mkdir -p docs/archive
mkdir -p docs/deployment
mkdir -p docs/troubleshooting

echo "1️⃣ 移动部署相关文档到 docs/deployment/..."

# 保留的核心部署文档
mv COMPLETE_DEPLOYMENT_GUIDE.md docs/deployment/ 2>/dev/null
mv QUICK_START.md docs/deployment/ 2>/dev/null
mv DEPLOYMENT_DASHBOARD.md docs/deployment/ 2>/dev/null

# 归档重复的部署文档
mv DEPLOYMENT_COMPLETE.md docs/archive/ 2>/dev/null
mv DEPLOYMENT_FLOWCHART.md docs/archive/ 2>/dev/null
mv DEPLOYMENT_GUIDE.md docs/archive/ 2>/dev/null
mv DEPLOYMENT_INDEX.md docs/archive/ 2>/dev/null
mv DEPLOYMENT_STATUS.md docs/archive/ 2>/dev/null
mv DEPLOYMENT_SUCCESS.md docs/archive/ 2>/dev/null
mv DEPLOYMENT_SUMMARY.md docs/archive/ 2>/dev/null
mv DEPLOY_NOW.md docs/archive/ 2>/dev/null
mv QUICK_DEPLOY.md docs/archive/ 2>/dev/null
mv QUICKSTART.md docs/archive/ 2>/dev/null
mv VERCEL_DEPLOYMENT.md docs/archive/ 2>/dev/null
mv VERCEL_DEPLOY_STEPS.md docs/archive/ 2>/dev/null

echo "2️⃣ 移动故障排查文档到 docs/troubleshooting/..."

# 保留的故障排查文档
mv FIX_ENV_ERROR.md docs/troubleshooting/ 2>/dev/null
mv FIX_BLANK_PAGE.md docs/troubleshooting/ 2>/dev/null
mv BLANK_PAGE_SOLUTION.md docs/troubleshooting/ 2>/dev/null

# 归档重复的修复文档
mv ENV_FIX_SUMMARY.md docs/archive/ 2>/dev/null
mv ENV_SETUP_GUIDE.md docs/archive/ 2>/dev/null
mv VERCEL_FIX_SUMMARY.md docs/archive/ 2>/dev/null
mv HOMEPAGE_FIX.md docs/archive/ 2>/dev/null

echo "3️⃣ 归档状态和总结文档..."

mv CURRENT_STATUS.md docs/archive/ 2>/dev/null
mv FINAL_STATUS.md docs/archive/ 2>/dev/null
mv PROJECT_STATUS.md docs/archive/ 2>/dev/null
mv WORK_COMPLETED.md docs/archive/ 2>/dev/null
mv PROJECT_COMPLETION_SUMMARY.md docs/archive/ 2>/dev/null
mv IMPLEMENTATION_COMPLETE.md docs/archive/ 2>/dev/null

echo "4️⃣ 归档重复的检查清单..."

mv CHECKLIST.md docs/archive/ 2>/dev/null
mv PROJECT_CHECKLIST.md docs/archive/ 2>/dev/null
mv LAUNCH_CHECKLIST.md docs/archive/ 2>/dev/null

echo "5️⃣ 归档AI和VC相关文档..."

mv AI_FEATURES_SUMMARY.md docs/archive/ 2>/dev/null
mv AI_IMPLEMENTATION_COMPLETE.md docs/archive/ 2>/dev/null
mv START_AI_BACKEND.md docs/archive/ 2>/dev/null
mv QUICK_START_AI.md docs/archive/ 2>/dev/null
mv VC_INVESTMENT_SUMMARY.md docs/archive/ 2>/dev/null
mv VC_PITCH_DECK.md docs/archive/ 2>/dev/null
mv VC_ROADMAP.md docs/archive/ 2>/dev/null
mv GO_TO_MARKET_PLAN.md docs/archive/ 2>/dev/null
mv FEATURE_ENHANCEMENT_PLAN.md docs/archive/ 2>/dev/null

echo "6️⃣ 归档其他重复文档..."

mv PROJECT_SUMMARY.md docs/archive/ 2>/dev/null
mv PROJECT_STRUCTURE.md docs/archive/ 2>/dev/null
mv START_HERE.md docs/archive/ 2>/dev/null
mv COMPONENT_INDEX.md docs/archive/ 2>/dev/null
mv GITHUB_PAGES_SETUP.md docs/archive/ 2>/dev/null
mv TEST_REPORT.md docs/archive/ 2>/dev/null
mv WEB3_SETUP.md docs/archive/ 2>/dev/null

echo ""
echo "✅ 文档整理完成！"
echo ""
echo "📊 文档结构："
echo ""
echo "根目录（核心文档）："
echo "  - README.md"
echo "  - FEATURES.md"
echo "  - INSTALL.md"
echo "  - USAGE_GUIDE.md"
echo "  - DEVELOPER_GUIDE.md"
echo "  - NEXT_STEPS.md"
echo ""
echo "docs/deployment/（部署文档）："
echo "  - COMPLETE_DEPLOYMENT_GUIDE.md"
echo "  - QUICK_START.md"
echo "  - DEPLOYMENT_DASHBOARD.md"
echo ""
echo "docs/troubleshooting/（故障排查）："
echo "  - FIX_ENV_ERROR.md"
echo "  - FIX_BLANK_PAGE.md"
echo "  - BLANK_PAGE_SOLUTION.md"
echo ""
echo "docs/archive/（归档文档）："
echo "  - 所有旧版本和重复文档"
echo ""
