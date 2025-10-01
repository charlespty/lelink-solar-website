# Lelink Solar 网站部署指南

## 📋 部署概览

本网站使用 Next.js 14 构建，推荐使用 Vercel 进行部署，因为它与 Next.js 完美集成，提供最佳性能。

## 🎯 部署选项

### 选项 1: Vercel 部署 (推荐)

#### 1.1 准备工作
```bash
# 确保在项目根目录
cd /Users/shiweizhang/Desktop/Lelink\ Solar/website

# 检查项目状态
npm run build
```

#### 1.2 创建 Vercel 账户
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账户登录
3. 连接您的 GitHub 仓库

#### 1.3 部署步骤
1. 在 Vercel 控制台点击 "New Project"
2. 选择您的 GitHub 仓库
3. 配置项目设置：
   - **Framework Preset**: Next.js
   - **Root Directory**: `./website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### 1.4 环境变量配置
在 Vercel 项目设置中添加以下环境变量：

```env
# 生产环境配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 邮件地址
FROM_EMAIL=noreply@lelinksolar.com
CONTACT_EMAIL=chris@lelinksolar.com
QUOTE_EMAIL=sales@lelinksolar.com

# 可选：SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
```

### 选项 2: 其他平台部署

#### 2.1 Netlify 部署
```bash
# 构建项目
npm run build
npm run export

# 部署到 Netlify
npx netlify deploy --prod --dir=out
```

#### 2.2 自托管部署
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 🔧 生产环境优化

### 1. 性能优化
- ✅ 图片优化 (Next.js Image)
- ✅ 代码分割
- ✅ 静态生成
- ✅ CDN 加速

### 2. SEO 优化
- ✅ 元数据配置
- ✅ 结构化数据
- ✅ Sitemap 生成
- ✅ robots.txt

### 3. 安全配置
- ✅ HTTPS 强制
- ✅ 安全头设置
- ✅ 输入验证
- ✅ 速率限制

## 📊 监控和分析

### 1. Google Analytics
```javascript
// 在 .env.local 中配置
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. 错误监控
- Vercel 内置错误监控
- 可集成 Sentry 进行详细错误追踪

## 🌐 域名配置

### 1. 购买域名
推荐域名：
- `lelinksolar.com`
- `lelinksolar.africa`
- `lelinksolar.net`

### 2. DNS 配置
```
# A 记录
@ -> 76.76.19.61 (Vercel IP)

# CNAME 记录
www -> cname.vercel-dns.com
```

### 3. SSL 证书
Vercel 自动提供免费 SSL 证书

## 📱 移动端优化

- ✅ 响应式设计
- ✅ 触摸友好
- ✅ 快速加载
- ✅ PWA 支持

## 🔄 持续部署

### 1. 自动部署
- 推送到 main 分支自动部署
- 预览分支自动创建预览环境

### 2. 部署检查清单
- [ ] 环境变量配置
- [ ] 域名解析
- [ ] SSL 证书
- [ ] 邮件服务测试
- [ ] 表单提交测试
- [ ] 移动端测试
- [ ] 性能测试

## 🚨 故障排除

### 常见问题
1. **构建失败**: 检查依赖版本
2. **环境变量**: 确保所有必需变量已设置
3. **图片加载**: 检查图片路径和格式
4. **邮件发送**: 验证 SMTP 配置

### 联系支持
- Vercel 支持: [vercel.com/support](https://vercel.com/support)
- 项目文档: 查看 README.md

## 📈 部署后优化

1. **性能监控**: 使用 Vercel Analytics
2. **用户反馈**: 收集用户使用体验
3. **A/B 测试**: 优化转化率
4. **内容更新**: 定期更新产品信息

---

## 🎉 部署完成检查清单

- [ ] 网站可正常访问
- [ ] 所有页面加载正常
- [ ] 表单提交功能正常
- [ ] 邮件发送功能正常
- [ ] 移动端显示正常
- [ ] SEO 元数据正确
- [ ] 图片加载正常
- [ ] 联系信息正确
- [ ] 客服功能正常
- [ ] 性能指标良好

**恭喜！您的 Lelink Solar 网站已成功部署！** 🚀
