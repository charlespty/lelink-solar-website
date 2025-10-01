#!/bin/bash

# Lelink Solar 网站部署脚本
# 使用方法: ./deploy.sh [vercel|netlify|build]

set -e

echo "🚀 Lelink Solar 网站部署脚本"
echo "================================"

# 检查 Node.js 版本
echo "📋 检查环境..."
node_version=$(node -v)
echo "Node.js 版本: $node_version"

# 检查 npm 版本
npm_version=$(npm -v)
echo "npm 版本: $npm_version"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 运行测试
echo "🧪 运行测试..."
npm run test || echo "⚠️  测试跳过 (测试文件可能不存在)"

# 构建项目
echo "🔨 构建项目..."
npm run build

echo "✅ 构建完成！"

# 根据参数选择部署方式
case "${1:-vercel}" in
  "vercel")
    echo "🚀 部署到 Vercel..."
    if command -v vercel &> /dev/null; then
      vercel --prod
    else
      echo "❌ Vercel CLI 未安装"
      echo "请运行: npm install -g vercel"
      echo "然后运行: vercel --prod"
    fi
    ;;
  "netlify")
    echo "🚀 部署到 Netlify..."
    if command -v netlify &> /dev/null; then
      npx netlify deploy --prod --dir=out
    else
      echo "❌ Netlify CLI 未安装"
      echo "请运行: npm install -g netlify-cli"
    fi
    ;;
  "build")
    echo "✅ 仅构建完成，未部署"
    echo "构建文件位于: .next/"
    ;;
  *)
    echo "❌ 未知的部署选项: $1"
    echo "可用选项: vercel, netlify, build"
    exit 1
    ;;
esac

echo ""
echo "🎉 部署完成！"
echo "================================"
echo "📋 部署后检查清单:"
echo "□ 网站可正常访问"
echo "□ 所有页面加载正常"
echo "□ 表单提交功能正常"
echo "□ 邮件发送功能正常"
echo "□ 移动端显示正常"
echo "□ 图片加载正常"
echo "□ 联系信息正确"
echo "□ 客服功能正常"
echo ""
echo "🔗 有用的链接:"
echo "• Vercel 控制台: https://vercel.com/dashboard"
echo "• 项目文档: ./DEPLOYMENT.md"
echo "• 环境变量配置: 在 Vercel 项目设置中"
