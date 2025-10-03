# 🔄 LT Fixed Solar Panel 图片替换指南

## 📋 概述
本指南将帮助您将 LT Fixed Solar Panel 产品的图片替换为您提供的新照片。

## 📁 目标文件夹
```
/Users/shiweizhang/Desktop/Lelink Solar/lelink-solar-website/public/images/Product image/LT-Fixed/
```

## 🖼️ 需要替换的图片文件

### 1. LT-fixed-panel-1.jpg (主产品图片)
- **用途**: 产品详情页面的主要展示图片
- **建议**: 使用您提供的第一张图片（垂直展示的太阳能面板）
- **描述**: 深色表面，带有网格线和金属锁扣的大型矩形太阳能面板

### 2. LT-fixed-panel-2.jpg (侧面展示图片)
- **用途**: 产品轮播图的第二张图片
- **建议**: 使用您提供的第二张图片（深色纹理表面的面板）
- **描述**: 深色、几乎黑色的太阳能面板，带有水平条纹纹理

### 3. LT-fixed-panel-3.jpg (包装展示图片)
- **用途**: 产品轮播图的第三张图片
- **建议**: 使用您提供的第三张图片（包装展示）
- **描述**: 水平展示的太阳能面板，带有浅色框架，放在纸板包装上

### 4. LT-fixed-panel-4.jpg (第四张展示图片)
- **用途**: 产品轮播图的第四张图片
- **建议**: 使用您提供的第四张图片
- **描述**: 额外的产品展示角度或应用场景

## 🔧 替换方法

### 方法一：手动替换（推荐）
1. 打开 Finder
2. 导航到目标文件夹：
   ```
   /Users/shiweizhang/Desktop/Lelink Solar/lelink-solar-website/public/images/Product image/LT-Fixed/
   ```
3. 将您的新图片重命名为对应的文件名
4. 直接拖拽替换现有文件

### 方法二：使用脚本替换
1. 将新图片重命名为：
   - `LT-fixed-panel-1-new.jpg`
   - `LT-fixed-panel-2-new.jpg`
   - `LT-fixed-panel-3-new.jpg`
   - `LT-fixed-panel-4-new.jpg`
2. 将这些文件放在项目根目录
3. 运行替换脚本：
   ```bash
   cd "/Users/shiweizhang/Desktop/Lelink Solar/lelink-solar-website"
   ./replace-lt-images.sh
   ```

## ✅ 验证步骤

### 1. 检查文件替换
```bash
cd "/Users/shiweizhang/Desktop/Lelink Solar/lelink-solar-website/public/images/Product image/LT-Fixed/"
ls -la *.jpg
```

### 2. 访问产品页面
打开浏览器访问：
```
http://localhost:3000/products/lt-fixed-solar-panel/
```

### 3. 清除缓存
如果图片没有更新，请：
- 按 `Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新
- 或者重启开发服务器

## 🔄 重启开发服务器
```bash
cd "/Users/shiweizhang/Desktop/Lelink Solar/lelink-solar-website"
npm run dev
```

## 📝 注意事项
1. 确保图片格式为 `.jpg`
2. 建议图片尺寸不超过 2MB
3. 图片会自动被 Next.js 优化
4. 旧图片已备份到 `backup/` 文件夹

## 🆘 故障排除
如果遇到问题：
1. 检查文件路径是否正确
2. 确认图片文件格式为 `.jpg`
3. 清除浏览器缓存
4. 重启开发服务器
5. 检查控制台是否有错误信息

## 📞 技术支持
如有问题，请联系技术支持团队。
