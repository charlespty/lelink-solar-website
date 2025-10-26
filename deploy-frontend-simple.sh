#!/bin/bash

echo "🚀 开始部署前端到GitHub Pages (简化版)..."

# 1. 备份当前配置
echo "📋 备份当前配置..."
cp next.config.js next.config.backup.js

# 2. 使用前端配置
echo "⚙️ 切换到前端配置..."
cp next.config.frontend.js next.config.js

# 3. 临时移除API路由
echo "🗑️ 临时移除API路由..."
mkdir -p temp-api-backup
mv src/app/api temp-api-backup/

# 4. 构建静态文件
echo "🔨 构建静态文件..."
npm run build

# 5. 检查构建结果
if [ ! -d "out" ]; then
    echo "❌ 构建失败，out目录不存在"
    # 恢复API路由
    mv temp-api-backup/api src/app/
    exit 1
fi

echo "✅ 构建成功！"

# 6. 恢复API路由
echo "🔄 恢复API路由..."
mv temp-api-backup/api src/app/
rmdir temp-api-backup

# 7. 提交到GitHub
echo "📤 提交到GitHub..."
git add .
git commit -m "Deploy frontend to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到GitHub
git push origin main

echo "✅ 前端部署完成！"
echo "🌐 网站地址: https://charlespty.github.io/lelink-solar-website"
echo "🔗 自定义域名: https://lelinksolar.com"

# 8. 恢复配置
echo "🔄 恢复配置..."
cp next.config.backup.js next.config.js

echo "🎉 部署完成！"
