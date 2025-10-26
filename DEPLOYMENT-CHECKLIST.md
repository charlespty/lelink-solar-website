# 🚀 生产环境部署检查清单

## 📅 部署前准备

### ✅ 基础检查

- [x] 代码已提交到GitHub
- [x] 构建测试通过 (`npm run build`)
- [x] 本地测试完成
- [ ] 环境变量已配置
- [ ] 数据库已准备
- [ ] 域名已配置

---

## 🗄️ 数据库设置

### MongoDB (推荐)

#### 选项1: MongoDB Atlas (云服务)

1. **创建账户**
   - [ ] 访问 https://www.mongodb.com/cloud/atlas
   - [ ] 创建免费账户
   - [ ] 选择Free Tier

2. **创建集群**
   - [ ] 选择云服务商（AWS/GCP/Azure）
   - [ ] 选择最近的地区
   - [ ] 创建集群（5-7分钟）

3. **配置安全**
   - [ ] 创建数据库用户
   - [ ] 设置强密码
   - [ ] 添加IP白名单（0.0.0.0/0 用于开发）

4. **获取连接字符串**
   - [ ] 点击 "Connect"
   - [ ] 选择 "Connect your application"
   - [ ] 复制连接字符串
   - [ ] 替换密码和数据库名

#### 选项2: 本地MongoDB

```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt-get install mongodb
sudo systemctl start mongodb

# 连接字符串
mongodb://localhost:27017/lelink_solar
```

---

## 🔐 环境变量配置

### 创建 `.env.local` 文件

```env
# 数据库连接
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lelink_solar?retryWrites=true&w=majority

# JWT密钥（生成强密钥）
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long

# API基础URL
NEXT_PUBLIC_API_URL=https://yourdomain.com

# 文件上传（可选）
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# 邮件服务（可选）
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Google Analytics（可选）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 环境
NODE_ENV=production
```

### 生成强密钥

```bash
# 使用Node.js生成随机密钥
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 或使用OpenSSL
openssl rand -hex 32
```

---

## 📦 安装生产依赖

### 数据库相关

```bash
# MongoDB + Mongoose
npm install mongodb mongoose

# 或 PostgreSQL + Prisma
npm install @prisma/client
npm install -D prisma
```

### 安全相关

```bash
# 密码加密
npm install bcrypt
npm install -D @types/bcrypt

# JWT
npm install jose

# 数据验证
npm install zod
```

### 邮件服务（可选）

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

---

## 🔨 代码更新

### 1. 创建数据库连接

参考 `DATABASE-INTEGRATION-GUIDE.md` 创建：
- [ ] `src/lib/mongodb.ts` - 数据库连接
- [ ] `src/models/Product.ts` - 产品模型
- [ ] `src/models/Inquiry.ts` - 询价模型
- [ ] `src/models/User.ts` - 用户模型

### 2. 更新API路由

将所有API路由从模拟数据改为真实数据库操作：
- [ ] `src/app/api/admin/products/route.ts`
- [ ] `src/app/api/admin/content/route.ts`
- [ ] `src/app/api/admin/inquiries/route.ts`
- [ ] `src/app/api/admin/auth/login/route.ts`

### 3. 实现密码加密

```typescript
// src/lib/auth.ts
import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}
```

### 4. 创建初始化脚本

```bash
# 创建管理员账户
node scripts/create-admin.js

# 初始化数据
node scripts/seed.js
```

---

## 🌐 部署到Vercel

### 1. 准备工作

- [ ] 注册Vercel账户 (https://vercel.com)
- [ ] 安装Vercel CLI: `npm i -g vercel`

### 2. 配置项目

```bash
# 登录Vercel
vercel login

# 初始化项目
vercel
```

### 3. 配置环境变量

在Vercel控制台中添加：
- [ ] `MONGODB_URI`
- [ ] `JWT_SECRET`
- [ ] 其他环境变量

### 4. 部署

```bash
# 部署到生产环境
vercel --prod
```

### 5. 配置域名

- [ ] 在Vercel中添加自定义域名
- [ ] 更新DNS记录（CNAME或A记录）
- [ ] 等待SSL证书自动配置

---

## 🖥️ 部署到Linode VPS

### 1. 服务器准备

```bash
# 连接服务器
ssh root@your-server-ip

# 更新系统
apt update && apt upgrade -y

# 安装Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 安装PM2
npm install -g pm2

# 安装Nginx
apt install -y nginx

# 安装MongoDB（可选，本地数据库）
# 或使用MongoDB Atlas
```

### 2. 部署项目

```bash
# 克隆项目
cd /var/www
git clone https://github.com/charlespty/lelink-solar-website.git
cd lelink-solar-website

# 安装依赖
npm install

# 创建环境变量文件
nano .env.local
# 粘贴环境变量

# 构建项目
npm run build

# 启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. 配置Nginx

```bash
# 创建Nginx配置
nano /etc/nginx/sites-available/lelink-solar

# 添加配置（参考 nginx-domain-config.sh）

# 启用站点
ln -s /etc/nginx/sites-available/lelink-solar /etc/nginx/sites-enabled/

# 测试配置
nginx -t

# 重启Nginx
systemctl restart nginx
```

### 4. 配置SSL证书

```bash
# 安装Certbot
apt install -y certbot python3-certbot-nginx

# 获取SSL证书
certbot --nginx -d lelinksolar.com -d www.lelinksolar.com

# 自动续期
certbot renew --dry-run
```

---

## 🔥 配置防火墙

```bash
# 启用UFW
ufw enable

# 允许SSH
ufw allow 22/tcp

# 允许HTTP和HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# 查看状态
ufw status
```

---

## 📊 监控和日志

### 设置日志

```bash
# PM2日志
pm2 logs

# 实时监控
pm2 monit

# Nginx日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 性能监控（可选）

- [ ] 配置Google Analytics
- [ ] 设置Sentry错误监控
- [ ] 配置Uptime监控

---

## 🧪 测试清单

### 功能测试

- [ ] 登录功能正常
- [ ] 产品管理CRUD正常
- [ ] 内容管理保存正常
- [ ] 询价管理正常
- [ ] 图片上传正常
- [ ] API响应正常

### 性能测试

- [ ] 页面加载速度 < 3秒
- [ ] 图片正常显示
- [ ] 移动端响应正常

### 安全测试

- [ ] JWT认证正常
- [ ] 未授权访问被拦截
- [ ] 文件上传验证正常
- [ ] XSS防护正常

---

## 📱 SEO和元数据

### 检查项

- [ ] sitemap.xml 可访问
- [ ] robots.txt 配置正确
- [ ] 所有页面有meta标签
- [ ] Open Graph标签完整
- [ ] Google Analytics配置

### 提交到搜索引擎

- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] 提交sitemap

---

## 💾 备份策略

### 数据库备份

```bash
# MongoDB备份
mongodump --uri="your-connection-string" --out=/backup/$(date +%Y%m%d)

# 自动化备份（cron）
0 2 * * * /usr/bin/mongodump --uri="connection-string" --out=/backup/$(date +\%Y\%m\%d)
```

### 代码备份

- [ ] 定期推送到GitHub
- [ ] 创建release标签
- [ ] 备份环境变量

---

## 🚨 故障恢复

### 应急预案

1. **数据库故障**
   - 检查连接字符串
   - 验证网络连接
   - 恢复备份数据

2. **应用崩溃**
   - 查看PM2日志
   - 重启应用: `pm2 restart all`
   - 检查错误日志

3. **SSL证书过期**
   - 手动续期: `certbot renew`
   - 重启Nginx

---

## ✅ 部署后验证

### 检查清单

- [ ] 网站可以正常访问
- [ ] HTTPS配置正常（绿锁）
- [ ] 后台登录正常
- [ ] 所有功能测试通过
- [ ] 移动端显示正常
- [ ] 邮件发送正常
- [ ] 图片上传正常
- [ ] API响应正常
- [ ] 日志记录正常
- [ ] 备份策略就绪

---

## 📞 技术支持

### 常见问题

**Q: 数据库连接失败？**
A: 检查连接字符串、IP白名单、用户权限

**Q: 构建失败？**
A: 检查依赖版本、Node.js版本、环境变量

**Q: 502 Bad Gateway？**
A: 检查PM2状态、Nginx配置、端口占用

**Q: 图片上传失败？**
A: 检查uploads目录权限、文件大小限制

### 联系方式

- 📧 邮箱: tech@lelinksolar.com
- 💬 微信: LelinkSolar
- 📱 电话: +86 138 0013 8000

---

## 🎉 部署完成

恭喜！您的Lelink Solar网站已成功部署到生产环境！

### 访问地址

- **前台**: https://lelinksolar.com
- **后台**: https://lelinksolar.com/admin/login

### 下一步

1. 修改默认管理员密码
2. 添加真实的产品数据
3. 配置邮件通知
4. 设置监控告警
5. 定期备份数据

---

*检查清单版本: v1.0*  
*最后更新: 2024年10月26日*  
*部署状态: 等待执行*

