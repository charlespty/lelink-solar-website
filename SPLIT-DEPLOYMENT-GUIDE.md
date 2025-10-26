# 🎯 分离部署完整指南

## 📋 部署架构

```
┌─────────────────────────────────────────────────────────────┐
│                    前台网站 (静态)                             │
│  ─────────────────────────────────────────────────────────  │
│  平台: GitHub Pages                                          │
│  域名: https://lelinksolar.com                               │
│  内容: 首页、产品页、FAQ、联系我们等展示页面                    │
│  配置: output: 'export' (静态导出)                           │
│  特点: 快速、免费、CDN加速                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    后台系统 (动态)                             │
│  ─────────────────────────────────────────────────────────  │
│  平台: Linode VPS                                            │
│  域名: http://172.233.148.191:3000                          │
│       或 https://admin.lelinksolar.com (配置后)              │
│  内容: 管理系统、API接口                                       │
│  配置: 标准 Next.js (支持 API Routes)                        │
│  特点: 动态、可扩展、完整功能                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 快速部署（3步完成）

### 准备工作

确保您有：
- ✅ Linode服务器访问权限（IP: 172.233.148.191）
- ✅ SSH密钥已配置
- ✅ Git仓库已更新

### 方法1: 使用自动部署脚本 ⭐

```bash
# 在本地项目目录运行
./deploy-admin-to-linode.sh
```

脚本会自动：
1. 连接到Linode服务器
2. 克隆项目代码
3. 配置后台系统
4. 安装依赖并构建
5. 启动PM2进程

**完成后访问**: http://172.233.148.191:3000/admin/login

### 方法2: 手动部署

如果自动脚本失败，可以手动执行：

```bash
# 1. 连接到服务器
ssh root@172.233.148.191

# 2. 创建项目目录
cd /var/www
git clone https://github.com/charlespty/lelink-solar-website.git admin-lelink-solar
cd admin-lelink-solar

# 3. 配置系统（使用后台专用配置）
cp next.config.admin.js next.config.js

# 4. 安装依赖
npm install

# 5. 构建项目
npm run build

# 6. 启动服务
pm2 start npm --name "lelink-admin" -- start
pm2 save
pm2 startup
```

---

## 📝 配置文件说明

### 前台配置 (next.config.js) - GitHub Pages

```javascript
const nextConfig = {
  output: 'export',        // ✅ 保留：生成静态文件
  trailingSlash: true,
  basePath: '',
  // ... 其他配置
}
```

### 后台配置 (next.config.admin.js) - Linode VPS

```javascript
const nextConfig = {
  // output: 'export',     // ❌ 移除：需要API Routes
  // ... 其他配置保持一致
}
```

---

## 🔧 配置子域名（可选但推荐）

### Step 1: 在GoDaddy添加DNS记录

登录 GoDaddy → DNS管理 → 添加记录：

```
类型: A
名称: admin
值: 172.233.148.191
TTL: 600秒
```

**结果**: `admin.lelinksolar.com` → `172.233.148.191`

### Step 2: 在Linode配置Nginx

```bash
ssh root@172.233.148.191

# 创建Nginx配置
sudo nano /etc/nginx/sites-available/admin-lelink-solar
```

添加配置：

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
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # 静态文件直接服务
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/admin-lelink-solar /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl reload nginx
```

### Step 3: 配置SSL证书

```bash
# 安装Certbot（如果未安装）
sudo apt install certbot python3-certbot-nginx -y

# 获取SSL证书
sudo certbot --nginx -d admin.lelinksolar.com

# 测试自动续期
sudo certbot renew --dry-run
```

**完成后访问**: https://admin.lelinksolar.com/admin/login 🔒

---

## 🔒 安全配置（重要）

### 1. 修改默认密码

首次登录后立即修改：
1. 登录后台
2. 进入"系统设置"
3. 修改密码

### 2. 配置环境变量

```bash
ssh root@172.233.148.191
cd /var/www/admin-lelink-solar

# 创建环境变量文件
nano .env.local
```

添加内容：

```env
# JWT密钥（必须修改）
JWT_SECRET=your-super-secret-key-at-least-32-characters-long

# API基础URL
NEXT_PUBLIC_API_URL=https://admin.lelinksolar.com

# 环境
NODE_ENV=production
```

生成强密钥：
```bash
openssl rand -hex 32
```

### 3. 配置防火墙

```bash
# 如果使用子域名，可以关闭3000端口的外部访问
sudo ufw deny 3000/tcp

# 只允许Nginx访问3000端口（本地）
# 端口3000只监听 localhost
```

修改PM2配置：
```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'lelink-admin',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '127.0.0.1'  // 只监听本地
    }
  }]
}
```

---

## 📊 管理和监控

### PM2 常用命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs lelink-admin

# 实时日志
pm2 logs lelink-admin --lines 100

# 重启应用
pm2 restart lelink-admin

# 停止应用
pm2 stop lelink-admin

# 删除应用
pm2 delete lelink-admin

# 监控
pm2 monit
```

### Nginx 常用命令

```bash
# 测试配置
sudo nginx -t

# 重启
sudo systemctl restart nginx

# 重载配置
sudo systemctl reload nginx

# 查看状态
sudo systemctl status nginx

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 查看访问日志
sudo tail -f /var/log/nginx/access.log
```

---

## 🔄 更新部署

### 更新后台代码

```bash
# 方法1: 使用部署脚本
./deploy-admin-to-linode.sh

# 方法2: 手动更新
ssh root@172.233.148.191
cd /var/www/admin-lelink-solar
git pull
npm install
npm run build
pm2 restart lelink-admin
```

### 更新前台代码（GitHub Pages）

```bash
# 在本地
git add .
git commit -m "Update frontend"
git push

# GitHub Actions 会自动部署
```

---

## ✅ 验证清单

部署完成后，请验证：

### 前台网站
- [ ] 可以访问 https://lelinksolar.com
- [ ] 首页正常显示
- [ ] 产品页面正常
- [ ] 图片正常加载
- [ ] 所有链接有效
- [ ] 移动端显示正常

### 后台系统
- [ ] 可以访问登录页面
  - http://172.233.148.191:3000/admin/login
  - 或 https://admin.lelinksolar.com/admin/login
- [ ] 可以成功登录
- [ ] 仪表板正常显示
- [ ] 产品管理功能正常
- [ ] 内容管理功能正常
- [ ] 询价管理功能正常
- [ ] 图片上传功能正常
- [ ] API接口响应正常

### 性能和安全
- [ ] 页面加载速度 < 3秒
- [ ] SSL证书有效（如配置）
- [ ] 防火墙规则正确
- [ ] 默认密码已修改
- [ ] 环境变量已配置

---

## 🐛 故障排查

### 问题1: 无法访问后台

**检查项**:
```bash
# 1. PM2状态
pm2 status
pm2 logs lelink-admin

# 2. 端口占用
netstat -tulpn | grep 3000

# 3. 防火墙
sudo ufw status

# 4. Nginx状态（如使用子域名）
sudo systemctl status nginx
sudo nginx -t
```

### 问题2: 502 Bad Gateway

**原因**: Nginx无法连接到Node.js应用

**解决**:
```bash
# 重启PM2应用
pm2 restart lelink-admin

# 检查端口
netstat -tulpn | grep 3000

# 重启Nginx
sudo systemctl restart nginx
```

### 问题3: API请求失败

**检查**:
```bash
# 查看应用日志
pm2 logs lelink-admin --lines 50

# 检查环境变量
cat /var/www/admin-lelink-solar/.env.local

# 重启应用
pm2 restart lelink-admin
```

### 问题4: 构建失败

**原因**: 依赖问题或配置错误

**解决**:
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm install

# 清理构建缓存
rm -rf .next

# 重新构建
npm run build
```

---

## 📈 性能优化建议

### 1. 启用 Gzip 压缩（Nginx）

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### 2. 配置缓存

```nginx
location /_next/static {
    proxy_pass http://localhost:3000;
    expires 365d;
    add_header Cache-Control "public, immutable";
}

location /images {
    proxy_pass http://localhost:3000;
    expires 30d;
    add_header Cache-Control "public";
}
```

### 3. 数据库连接池

当连接真实数据库时，配置连接池：

```javascript
// MongoDB示例
const mongoose = require('mongoose');
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5,
});
```

---

## 📞 技术支持

### 日志位置

```
PM2日志: ~/.pm2/logs/
Nginx日志: /var/log/nginx/
系统日志: /var/log/syslog
```

### 联系方式

- 📧 邮箱: tech@lelinksolar.com
- 💬 微信: LelinkSolar
- 📱 电话: +86 138 0013 8000

---

## 🎉 完成！

您的Lelink Solar网站现在采用了分离部署架构：

✅ **前台**: 快速、可靠的静态网站  
✅ **后台**: 功能完整的管理系统  
✅ **分工明确**: 各司其职，性能最优  

祝您的业务蒸蒸日上！🚀☀️

---

*最后更新: 2024年10月26日*  
*部署架构版本: v2.0 (分离部署)*

