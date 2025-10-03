#!/bin/bash

# 图片优化脚本
# 用于压缩图片文件，提高网站加载速度

echo "🖼️ 开始优化图片文件..."

# 检查是否安装了 ImageMagick
if ! command -v magick &> /dev/null; then
    echo "❌ ImageMagick 未安装，请先安装："
    echo "brew install imagemagick"
    exit 1
fi

# 创建优化后的图片目录
mkdir -p "public/images/Product image/optimized"

# 优化 LK Solar Generator 图片
echo "📦 优化 LK Solar Generator 图片..."
for file in "public/images/Product image"/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .png)
        echo "  优化: $filename.png"
        magick "$file" -quality 85 -resize 1200x1200 "public/images/Product image/optimized/${filename}.jpg"
    fi
done

# 优化 LT Fixed Solar Panel 图片
echo "📦 优化 LT Fixed Solar Panel 图片..."
for file in "public/images/Product image/LT-Fixed"/*.jpg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .jpg)
        echo "  优化: $filename.jpg"
        magick "$file" -quality 85 -resize 1200x1200 "public/images/Product image/LT-Fixed/optimized/${filename}.jpg"
    fi
done

# 优化 LP Foldable Solar Panel 图片
echo "📦 优化 LP Foldable Solar Panel 图片..."
for file in "public/images/Product image/LP-400W"/*.jpg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .jpg)
        echo "  优化: $filename.jpg"
        magick "$file" -quality 85 -resize 1200x1200 "public/images/Product image/LP-400W/optimized/${filename}.jpg"
    fi
done

echo ""
echo "📊 优化结果对比："
echo "原始图片大小："
du -sh "public/images/Product image"/*.png 2>/dev/null || echo "无 PNG 文件"
echo ""
echo "优化后图片大小："
du -sh "public/images/Product image/optimized"/*.jpg 2>/dev/null || echo "优化中..."

echo ""
echo "✅ 图片优化完成！"
echo "💡 建议："
echo "1. 检查优化后的图片质量"
echo "2. 更新产品数据配置使用优化后的图片"
echo "3. 提交更改到 GitHub"
