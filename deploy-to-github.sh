#!/bin/bash

# GitHub Pages 部署脚本
# 用于将本地更改推送到 GitHub 并触发自动部署

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查 Git 状态
echo "📋 检查 Git 状态..."
git status

# 添加所有更改
echo "📦 添加所有更改的文件..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "feat: 更新 LT Fixed Solar Panel 产品图片

- 添加第四张产品图片 LT-fixed-panel-4.jpg
- 更新产品数据配置支持 4 张图片轮播
- 创建图片替换脚本和详细指南
- 备份原有图片文件
- 优化产品展示效果

部署时间: $(date)"

# 显示提交信息
echo "📝 提交信息："
git log --oneline -1

# 尝试推送到 GitHub
echo "🚀 推送到 GitHub..."
echo "请手动执行以下命令之一："
echo ""
echo "方法 1 - 使用 HTTPS (需要输入用户名和密码):"
echo "git push origin main"
echo ""
echo "方法 2 - 使用 Personal Access Token:"
echo "git push https://ghp_EtC5C3bUoC8zqTQBI09eXLpZMLph573Yjhhz@github.com/charlespty/lelink-solar-website.git main"
echo ""
echo "方法 3 - 使用 GitHub CLI:"
echo "gh auth login"
echo "git push origin main"
echo ""
echo "方法 4 - 手动上传到 GitHub:"
echo "1. 访问 https://github.com/charlespty/lelink-solar-website"
echo "2. 点击 'Upload files' 按钮"
echo "3. 拖拽更改的文件到页面"
echo "4. 输入提交信息并提交"
echo ""
echo "✅ 本地更改已准备就绪，等待推送到 GitHub"
echo "🌐 推送成功后，GitHub Actions 将自动构建并部署到 GitHub Pages"
echo "📱 部署完成后，访问: https://lelinksolar.com"

