#!/bin/bash

echo "🚀 开始完整部署Lelink Solar网站..."

# 检查Git状态
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改，请先提交所有更改"
    git status
    read -p "是否继续部署？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 部署已取消"
        exit 1
    fi
fi

# 1. 部署前端
echo "📱 步骤1: 部署前端到GitHub Pages..."
./deploy-frontend.sh

if [ $? -ne 0 ]; then
    echo "❌ 前端部署失败"
    exit 1
fi

echo "✅ 前端部署成功！"

# 等待一下让GitHub Pages更新
echo "⏳ 等待GitHub Pages更新..."
sleep 30

# 2. 部署后端
echo "🔧 步骤2: 部署后端管理系统到Linode..."
./deploy-backend.sh

if [ $? -ne 0 ]; then
    echo "❌ 后端部署失败"
    exit 1
fi

echo "✅ 后端部署成功！"

# 3. 测试部署
echo "🧪 步骤3: 测试部署..."

# 测试前端
echo "测试前端网站..."
if curl -s -o /dev/null -w "%{http_code}" https://lelinksolar.com | grep -q "200"; then
    echo "✅ 前端网站正常"
else
    echo "⚠️  前端网站可能还在更新中，请稍后检查"
fi

# 测试后端
echo "测试后端管理系统..."
if curl -s -o /dev/null -w "%{http_code}" http://139.144.71.200:3000/admin | grep -q "200"; then
    echo "✅ 后端管理系统正常"
else
    echo "⚠️  后端管理系统可能还在启动中，请稍后检查"
fi

echo ""
echo "🎉 完整部署完成！"
echo ""
echo "📱 前端网站:"
echo "   - GitHub Pages: https://charlespty.github.io/lelink-solar-website"
echo "   - 自定义域名: https://lelinksolar.com"
echo ""
echo "🔧 后端管理:"
echo "   - 服务器地址: http://139.144.71.200:3000/admin"
echo "   - 登录账号: admin / admin123"
echo ""
echo "📋 下一步:"
echo "   1. 检查DNS设置是否正确"
echo "   2. 配置SSL证书"
echo "   3. 测试所有功能"
