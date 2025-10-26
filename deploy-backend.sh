#!/bin/bash

# Linode服务器信息
SERVER_IP="139.144.71.200"
SERVER_USER="root"
SERVER_PATH="/root/lelink-solar-admin"

echo "🚀 开始部署后端管理系统到Linode服务器..."

# 1. 备份当前配置
echo "📋 备份当前配置..."
cp next.config.js next.config.backup.js

# 2. 使用后端配置
echo "⚙️ 切换到后端配置..."
cp next.config.backend.js next.config.js

# 3. 构建后端应用
echo "🔨 构建后端应用..."
npm run build

# 4. 检查构建结果
if [ ! -d ".next" ]; then
    echo "❌ 构建失败，.next目录不存在"
    exit 1
fi

echo "✅ 构建成功！"

# 5. 创建部署包
echo "📦 创建部署包..."
tar -czf lelink-solar-admin.tar.gz \
    .next \
    public \
    package.json \
    package-lock.json \
    next.config.js \
    src/app/api \
    src/app/admin \
    src/components/admin \
    src/lib \
    node_modules

# 6. 上传到服务器
echo "📤 上传到服务器..."
scp lelink-solar-admin.tar.gz ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

# 7. 在服务器上部署
echo "🔧 在服务器上部署..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
cd /root/lelink-solar-admin

# 停止现有服务
pm2 stop lelink-solar-admin || true
pm2 delete lelink-solar-admin || true

# 解压新版本
tar -xzf lelink-solar-admin.tar.gz

# 安装依赖
npm install --production

# 启动服务
pm2 start npm --name "lelink-solar-admin" -- start
pm2 save

echo "✅ 后端部署完成！"
EOF

# 8. 清理本地文件
echo "🧹 清理本地文件..."
rm lelink-solar-admin.tar.gz

# 9. 恢复配置
echo "🔄 恢复配置..."
cp next.config.backup.js next.config.js

echo "🎉 后端部署完成！"
echo "🌐 管理后台: http://${SERVER_IP}:3000/admin"
echo "🔗 自定义域名: https://admin.lelinksolar.com"
