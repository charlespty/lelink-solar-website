#!/bin/bash

# 🚀 后台管理系统部署到 Linode 脚本
# 此脚本将后台系统部署到 Linode VPS

SERVER_IP="172.233.148.191"
SERVER_USER="root"
SERVER_PATH="/var/www/admin-lelink-solar"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 部署后台管理系统到 Linode VPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. 检查 SSH 连接
echo "1️⃣  检查服务器连接..."
ssh -o ConnectTimeout=5 $SERVER_USER@$SERVER_IP "echo '✅ SSH连接成功'" || {
    echo "❌ 无法连接到服务器，请检查："
    echo "   • 服务器IP是否正确：$SERVER_IP"
    echo "   • SSH密钥是否配置"
    echo "   • 服务器是否在运行"
    exit 1
}
echo ""

# 2. 在服务器上创建项目目录
echo "2️⃣  在服务器上设置项目目录..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
# 停止旧的PM2进程（如果存在）
pm2 delete lelink-admin 2>/dev/null || true

# 创建或清理项目目录
if [ -d "/var/www/admin-lelink-solar" ]; then
    echo "📁 项目目录已存在，备份旧版本..."
    mv /var/www/admin-lelink-solar /var/www/admin-lelink-solar.backup.$(date +%Y%m%d_%H%M%S)
fi

mkdir -p /var/www/admin-lelink-solar
cd /var/www

# 克隆项目
echo "📥 克隆项目代码..."
git clone https://github.com/charlespty/lelink-solar-website.git admin-lelink-solar
cd admin-lelink-solar

# 使用后台专用配置
echo "🔧 配置后台系统..."
if [ -f "next.config.admin.js" ]; then
    cp next.config.admin.js next.config.js
    echo "✅ 使用后台专用配置"
else
    echo "⚠️  未找到 next.config.admin.js，手动修改配置..."
    sed -i "s/output: 'export',/\/\/ output: 'export', \/\/ 后台需要API Routes/" next.config.js
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🏗️  构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败"
    exit 1
fi

# 启动PM2
echo "🚀 启动应用..."
pm2 start npm --name "lelink-admin" -- start
pm2 save

echo "✅ 服务器端配置完成"
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 部署成功！"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📱 访问地址："
    echo "   http://$SERVER_IP:3000/admin/login"
    echo ""
    echo "🔐 登录信息："
    echo "   用户名: admin"
    echo "   密码: admin123"
    echo ""
    echo "📊 查看应用状态："
    echo "   ssh $SERVER_USER@$SERVER_IP"
    echo "   pm2 status"
    echo "   pm2 logs lelink-admin"
    echo ""
    echo "🌐 下一步："
    echo "   1. 访问后台测试功能"
    echo "   2. 配置子域名（可选）"
    echo "   3. 配置SSL证书（可选）"
    echo ""
else
    echo ""
    echo "❌ 部署失败，请检查错误信息"
    echo ""
    echo "💡 手动部署步骤："
    echo "   ssh $SERVER_USER@$SERVER_IP"
    echo "   cd /var/www/admin-lelink-solar"
    echo "   npm install && npm run build"
    echo "   pm2 start npm --name lelink-admin -- start"
fi

