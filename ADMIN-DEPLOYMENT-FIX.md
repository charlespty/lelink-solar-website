# 🔧 后台管理系统部署修复指南

## ❌ 问题说明

**错误**: 访问 `/admin/login` 显示 404 Page Not Found

**原因**: 
- 当前配置使用 `output: 'export'`（静态导出模式）
- 静态导出不支持 API Routes 和动态路由
- 后台管理系统需要服务端运行（API + 动态路由）

## ✅ 解决方案

### 方案1：分离部署（推荐）⭐

将前台和后台分开部署：

#### 前台网站（静态）
- **平台**: GitHub Pages
- **地址**: https://lelinksolar.com
- **配置**: `output: 'export'`
- **功能**: 展示页面、产品信息、FAQ等

#### 后台系统（动态）
- **平台**: Linode VPS
- **地址**: https://admin.lelinksolar.com 或 https://lelinksolar.com:3000
- **配置**: 标准Next.js（移除 `output: 'export'`）
- **功能**: 管理系统、API接口

---

## 🚀 快速修复步骤

### Step 1: 创建后台专用配置

在Linode服务器上创建单独的后台项目：

```bash
# 连接到Linode服务器
ssh root@172.233.148.191

# 创建后台项目目录
cd /var/www
git clone https://github.com/charlespty/lelink-solar-website.git admin-lelink-solar
cd admin-lelink-solar

# 修改 next.config.js（移除 output: 'export'）
nano next.config.js
```

### Step 2: 修改 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ 移除这一行：output: 'export',
  // ❌ 移除这一行：trailingSlash: true,
  
  // 跳过类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  // 跳过 ESLint 检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 优化配置
  compress: true,
  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  // 图片优化
  images: {
    domains: ['localhost', 'lelinksolar.com'],
    unoptimized: false, // 改为 false，启用图片优化
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
```

### Step 3: 安装依赖并构建

```bash
npm install
npm run build
```

### Step 4: 使用PM2启动

```bash
# 停止旧进程
pm2 delete lelink-solar

# 启动新进程（使用 npm start）
pm2 start npm --name "lelink-admin" -- start

# 保存配置
pm2 save
```

### Step 5: 配置Nginx（子域名）

**选项A: 使用子域名** (推荐)

```bash
# 创建Nginx配置
sudo nano /etc/nginx/sites-available/admin-lelink-solar
```

```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name admin.lelinksolar.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# 启用配置
sudo ln -s /etc/nginx/sites-available/admin-lelink-solar /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl reload nginx
```

**选项B: 使用端口** (简单快速)

```bash
# 直接访问
http://172.233.148.191:3000/admin/login
```

### Step 6: 配置DNS（如使用子域名）

在GoDaddy添加A记录：

```
类型: A
名称: admin
值: 172.233.148.191
TTL: 600
```

### Step 7: 配置SSL证书

```bash
# 安装证书（如使用子域名）
sudo certbot --nginx -d admin.lelinksolar.com

# 测试自动续期
sudo certbot renew --dry-run
```

---

## 🔥 最快速的解决方法（5分钟）

如果您想立即测试后台系统，可以直接使用开发模式：

```bash
# 连接到服务器
ssh root@172.233.148.191

# 进入项目目录
cd /var/www/lelink-solar-website

# 停止PM2
pm2 delete all

# 临时修改配置（注释掉 output: 'export'）
sed -i "s/output: 'export',/\/\/ output: 'export',/" next.config.js

# 重新构建
npm run build

# 启动
pm2 start npm --name "lelink-admin" -- start
pm2 save

# 测试访问
# http://172.233.148.191:3000/admin/login
```

然后在浏览器访问：
```
http://172.233.148.191:3000/admin/login
```

---

## 📋 验证清单

部署完成后，请验证：

- [ ] 能访问后台登录页面
- [ ] 可以成功登录（admin/admin123）
- [ ] 仪表板正常显示
- [ ] API接口正常响应
- [ ] 图片上传功能正常
- [ ] 所有管理功能可用

---

## 🎯 推荐的最终架构

```
前台网站（静态）:
├── 平台: GitHub Pages
├── 域名: https://lelinksolar.com
├── 内容: 展示页面、产品、FAQ
└── 配置: output: 'export'

后台系统（动态）:
├── 平台: Linode VPS
├── 域名: https://admin.lelinksolar.com
│         或 http://172.233.148.191:3000
├── 内容: 管理系统、API
└── 配置: 标准Next.js（无 output: 'export'）
```

---

## ❓ 常见问题

### Q: 为什么GitHub Pages上后台404？
A: GitHub Pages只能托管静态文件，不支持服务端API Routes。

### Q: 必须使用子域名吗？
A: 不必须。您可以：
- 使用子域名（admin.lelinksolar.com）- 推荐
- 使用端口（lelinksolar.com:3000）
- 使用路径（需要Nginx配置）

### Q: 如何保护后台安全？
A: 
1. 立即修改默认密码
2. 配置HTTPS（Let's Encrypt）
3. 限制IP访问（Nginx配置）
4. 使用强JWT密钥

---

## 📞 需要帮助？

如果遇到问题，请提供：
1. 错误信息截图
2. PM2日志：`pm2 logs`
3. Nginx日志：`tail -f /var/log/nginx/error.log`

---

*最后更新: 2024年10月26日*

