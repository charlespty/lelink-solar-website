# 🚀 网站速度优化指南

## 📊 当前问题分析

### 🔍 发现的问题：
- **图片文件过大**: LK Solar Generator 图片 1.0M-1.6M
- **总图片文件夹**: 36M (过大)
- **缺少图片优化**: 未使用 WebP 格式
- **缺少懒加载**: 所有图片同时加载
- **缺少 CDN**: 依赖 GitHub Pages 默认 CDN

## 🛠️ 优化方案

### 1. 图片优化
```bash
# 运行图片压缩脚本
./optimize-images.sh
```

**优化目标：**
- 将图片大小减少 60-80%
- 使用 WebP 格式
- 添加响应式图片尺寸

### 2. 代码优化
- ✅ 启用 Next.js 图片优化
- ✅ 添加懒加载组件
- ✅ 启用压缩
- ✅ 优化包导入

### 3. 缓存策略
- ✅ 设置 1 年图片缓存
- ✅ 启用浏览器缓存
- ✅ 使用 Service Worker

### 4. CDN 优化
- 考虑使用 Cloudflare CDN
- 启用 Gzip 压缩
- 使用 HTTP/2

## 📈 性能指标目标

### Core Web Vitals 目标：
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 其他指标：
- **页面加载时间**: < 3s
- **首屏渲染时间**: < 1.5s
- **图片加载时间**: < 2s

## 🔧 实施步骤

### 步骤 1: 压缩图片
```bash
# 安装 ImageMagick
brew install imagemagick

# 运行优化脚本
chmod +x optimize-images.sh
./optimize-images.sh
```

### 步骤 2: 更新产品数据
更新 `src/lib/productsData.ts` 使用优化后的图片路径

### 步骤 3: 启用优化组件
在关键页面使用 `OptimizedImage` 组件

### 步骤 4: 部署更新
```bash
git add .
git commit -m "perf: 优化网站加载速度"
git push origin main
```

## 📊 性能监控

### 开发环境监控
- 使用 `PerformanceMonitor` 组件
- 查看浏览器 DevTools
- 使用 Lighthouse 测试

### 生产环境监控
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🌐 CDN 配置建议

### Cloudflare 配置：
1. 添加域名到 Cloudflare
2. 启用以下功能：
   - Auto Minify (CSS, JS, HTML)
   - Brotli 压缩
   - HTTP/2
   - HTTP/3
   - 图片优化
   - 缓存级别: 标准

### 缓存规则：
```
# 图片文件
*.jpg, *.jpeg, *.png, *.webp, *.avif
Cache TTL: 1 year

# 静态资源
*.css, *.js
Cache TTL: 1 month

# HTML 文件
*.html
Cache TTL: 1 hour
```

## 📱 移动端优化

### 响应式图片：
```jsx
<OptimizedImage
  src="/images/product.jpg"
  alt="Product"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
/>
```

### 移动端特定优化：
- 减少动画复杂度
- 优化触摸目标大小
- 使用移动端友好的字体大小

## 🔍 测试工具

### 在线测试工具：
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 浏览器工具：
- Chrome DevTools Lighthouse
- Network 面板
- Performance 面板

## 📈 预期效果

### 优化前：
- 页面加载时间: 8-12s
- 图片加载时间: 5-8s
- 总文件大小: 36M+

### 优化后：
- 页面加载时间: 2-3s
- 图片加载时间: 1-2s
- 总文件大小: 8-12M

## 🆘 故障排除

### 如果图片质量下降：
1. 调整压缩质量参数
2. 使用渐进式 JPEG
3. 考虑使用 AVIF 格式

### 如果加载仍然很慢：
1. 检查网络连接
2. 验证 CDN 配置
3. 检查服务器响应时间

### 如果移动端体验差：
1. 启用移动端优化
2. 减少图片尺寸
3. 使用触摸友好的交互

## 📞 技术支持
如有问题，请联系技术支持团队。

