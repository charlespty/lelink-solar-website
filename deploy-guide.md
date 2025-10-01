# 🚀 Lelink Solar 网站部署指南

## 📋 部署前准备

### 1. 环境变量配置

#### 前端环境变量 (website/.env.local)
```bash
# 生产环境配置
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://lelinksolar.com
```

#### 后端环境变量 (server/.env)
```bash
# 数据库配置
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lelink-solar

# 服务器配置
PORT=5000
NODE_ENV=production

# JWT配置
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRES_IN=7d

# 邮件配置
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@lelinksolar.com
FROM_NAME=Lelink Solar

# 文件上传配置
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS配置
FRONTEND_URL=https://lelinksolar.com
```

## 🌐 部署选项

### 选项 1: Vercel (推荐 - 前端)

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署前端**
   ```bash
   cd website
   vercel --prod
   ```

3. **配置自定义域名**
   - 在 Vercel Dashboard 中添加域名
   - 配置 DNS 记录

### 选项 2: Netlify

1. **构建项目**
   ```bash
   cd website
   npm run build
   npm run export
   ```

2. **部署到 Netlify**
   - 拖拽 `out` 文件夹到 Netlify
   - 或连接 GitHub 仓库自动部署

### 选项 3: 传统服务器

1. **构建项目**
   ```bash
   cd website
   npm run build
   ```

2. **上传文件**
   - 上传 `.next` 文件夹到服务器
   - 配置 Nginx 或 Apache

## 🗄️ 数据库部署

### MongoDB Atlas (推荐)

1. **创建集群**
   - 访问 [MongoDB Atlas](https://cloud.mongodb.com)
   - 创建免费集群

2. **配置网络访问**
   - 添加 IP 白名单
   - 或允许所有 IP (0.0.0.0/0)

3. **创建用户**
   - 创建数据库用户
   - 获取连接字符串

### 自托管 MongoDB

1. **安装 MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb

   # CentOS/RHEL
   sudo yum install mongodb-server
   ```

2. **启动服务**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## 🔧 后端部署

### Railway (推荐)

1. **连接 GitHub**
   - 访问 [Railway](https://railway.app)
   - 连接 GitHub 仓库

2. **配置环境变量**
   - 在 Railway Dashboard 中添加环境变量

3. **自动部署**
   - Railway 会自动检测并部署

### Heroku

1. **安装 Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **创建应用**
   ```bash
   cd server
   heroku create lelink-solar-api
   ```

3. **配置环境变量**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   ```

4. **部署**
   ```bash
   git push heroku main
   ```

### 传统服务器

1. **安装 PM2**
   ```bash
   npm install -g pm2
   ```

2. **构建并启动**
   ```bash
   cd server
   npm run build
   pm2 start dist/index.js --name lelink-api
   ```

## 📊 监控和分析

### Google Analytics

1. **创建 GA4 属性**
   - 访问 [Google Analytics](https://analytics.google.com)
   - 创建新属性

2. **获取跟踪 ID**
   - 复制 GA4 测量 ID
   - 添加到环境变量

### 错误监控

1. **Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **配置 Sentry**
   - 创建 Sentry 项目
   - 添加 DSN 到环境变量

## 🔒 安全配置

### SSL 证书

1. **Let's Encrypt (免费)**
   ```bash
   sudo apt install certbot
   sudo certbot --nginx -d lelinksolar.com
   ```

2. **自动续期**
   ```bash
   sudo crontab -e
   # 添加: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### 安全头

已在 `vercel.json` 中配置基本安全头。

## 📈 性能优化

### CDN 配置

1. **Cloudflare**
   - 添加域名到 Cloudflare
   - 启用缓存和压缩

2. **图片优化**
   - 使用 Next.js Image 组件
   - 配置 Cloudinary 自动优化

### 缓存策略

1. **静态资源**
   - 设置长期缓存 (1年)
   - 使用版本化文件名

2. **API 响应**
   - 实现 Redis 缓存
   - 设置适当的缓存头

## 🚨 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本
   - 清理 node_modules 重新安装

2. **数据库连接失败**
   - 检查连接字符串
   - 验证网络访问权限

3. **邮件发送失败**
   - 检查 SendGrid API 密钥
   - 验证发件人邮箱

### 日志查看

1. **Vercel**
   ```bash
   vercel logs
   ```

2. **Railway**
   - 在 Dashboard 中查看日志

3. **PM2**
   ```bash
   pm2 logs lelink-api
   ```

## 📞 支持

如有问题，请联系：
- 技术支持: tech@lelinksolar.com
- 项目文档: [GitHub Wiki](https://github.com/your-repo/wiki)
