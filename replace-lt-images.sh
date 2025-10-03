#!/bin/bash

# LT Fixed Solar Panel 图片替换脚本
# 使用方法：将新图片文件放在脚本同目录下，然后运行此脚本

echo "🔄 开始替换 LT Fixed Solar Panel 产品图片..."

# 目标目录
TARGET_DIR="/Users/shiweizhang/Desktop/Lelink Solar/lelink-solar-website/public/images/Product image/LT-Fixed"

# 检查目标目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ 目标目录不存在: $TARGET_DIR"
    exit 1
fi

# 进入目标目录
cd "$TARGET_DIR"

echo "📁 当前目录: $(pwd)"

# 检查新图片文件是否存在
if [ -f "LT-fixed-panel-1-new.jpg" ]; then
    echo "✅ 找到新图片 1，正在替换..."
    mv LT-fixed-panel-1.jpg backup/LT-fixed-panel-1-old.jpg
    mv LT-fixed-panel-1-new.jpg LT-fixed-panel-1.jpg
    echo "✅ LT-fixed-panel-1.jpg 替换完成"
else
    echo "⚠️  未找到 LT-fixed-panel-1-new.jpg"
fi

if [ -f "LT-fixed-panel-2-new.jpg" ]; then
    echo "✅ 找到新图片 2，正在替换..."
    mv LT-fixed-panel-2.jpg backup/LT-fixed-panel-2-old.jpg
    mv LT-fixed-panel-2-new.jpg LT-fixed-panel-2.jpg
    echo "✅ LT-fixed-panel-2.jpg 替换完成"
else
    echo "⚠️  未找到 LT-fixed-panel-2-new.jpg"
fi

if [ -f "LT-fixed-panel-3-new.jpg" ]; then
    echo "✅ 找到新图片 3，正在替换..."
    mv LT-fixed-panel-3.jpg backup/LT-fixed-panel-3-old.jpg
    mv LT-fixed-panel-3-new.jpg LT-fixed-panel-3.jpg
    echo "✅ LT-fixed-panel-3.jpg 替换完成"
else
    echo "⚠️  未找到 LT-fixed-panel-3-new.jpg"
fi

if [ -f "LT-fixed-panel-4-new.jpg" ]; then
    echo "✅ 找到新图片 4，正在替换..."
    mv LT-fixed-panel-4.jpg backup/LT-fixed-panel-4-old.jpg
    mv LT-fixed-panel-4-new.jpg LT-fixed-panel-4.jpg
    echo "✅ LT-fixed-panel-4.jpg 替换完成"
else
    echo "⚠️  未找到 LT-fixed-panel-4-new.jpg"
fi

echo ""
echo "📋 替换完成！当前图片文件："
ls -la *.jpg

echo ""
echo "🌐 请访问以下链接查看更新后的产品页面："
echo "http://localhost:3000/products/lt-fixed-solar-panel/"
echo ""
echo "💡 如果图片没有更新，请："
echo "1. 清除浏览器缓存 (Ctrl+F5 或 Cmd+Shift+R)"
echo "2. 重启开发服务器"
