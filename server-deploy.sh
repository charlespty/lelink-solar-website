#!/bin/bash

echo "🚀 在Linode服务器上部署Lelink Solar管理系统..."

# 1. 更新系统
echo "📦 更新系统包..."
apt update && apt upgrade -y

# 2. 安装Node.js (如果还没有)
if ! command -v node &> /dev/null; then
    echo "📥 安装Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
fi

# 3. 安装PM2 (如果还没有)
if ! command -v pm2 &> /dev/null; then
    echo "📥 安装PM2..."
    npm install -g pm2
fi

# 4. 创建项目目录
echo "📁 创建项目目录..."
mkdir -p /root/lelink-solar-admin
cd /root/lelink-solar-admin

# 5. 克隆项目
echo "📥 克隆项目..."
if [ ! -d ".git" ]; then
    git clone https://github.com/charlespty/lelink-solar-website.git .
else
    git pull origin main
fi

# 6. 安装依赖
echo "📦 安装依赖..."
npm install

# 7. 使用后端配置
echo "⚙️ 配置后端设置..."
cp next.config.backend.js next.config.js

# 8. 构建项目
echo "🔨 构建项目..."
npm run build

# 9. 停止现有服务
echo "🛑 停止现有服务..."
pm2 stop lelink-solar-admin || true
pm2 delete lelink-solar-admin || true

# 10. 启动服务
echo "🚀 启动服务..."
pm2 start npm --name "lelink-solar-admin" -- start
pm2 save
pm2 startup

echo "✅ 部署完成！"
echo "🌐 管理后台: http://localhost:3000/admin"
echo "🔑 登录账号: admin / admin123"
echo ""
echo "📋 下一步:"
echo "1. 配置Nginx反向代理"
echo "2. 配置SSL证书"
echo "3. 配置防火墙"
