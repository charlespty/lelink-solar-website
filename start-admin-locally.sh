#!/bin/bash

echo "🏠 启动Lelink Solar后台管理系统（本地版）"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查是否在正确目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

echo "📍 当前目录: $(pwd)"
echo ""

# 备份原配置
echo "💾 备份配置文件..."
cp next.config.js next.config.js.backup 2>/dev/null || echo "（无原配置）"

# 修改配置
echo "🔧 修改配置（启用API支持）..."
sed -i.bak "s/output: 'export',/\/\/ output: 'export', \/\/ 后台需要API/" next.config.js
sed -i.bak "s/trailingSlash: true,/\/\/ trailingSlash: true,/" next.config.js

echo "✅ 配置已修改"
echo ""

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    echo "✅ 依赖安装完成"
    echo ""
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 启动完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 访问地址："
echo "   http://localhost:3000/admin/login"
echo ""
echo "🔐 登录信息："
echo "   用户名: admin"
echo "   密码: admin123"
echo ""
echo "💡 提示："
echo "   • 按 Ctrl+C 停止服务器"
echo "   • 修改代码会自动重新加载"
echo "   • 如需外网访问，可使用 ngrok"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 启动Next.js开发服务器
npm run dev
