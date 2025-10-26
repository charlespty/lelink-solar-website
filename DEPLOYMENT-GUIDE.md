# 🚀 Lelink Solar 完整部署指南

## ✅ 已完成
- ✅ 前端已成功部署到GitHub Pages
- ✅ 后端代码已准备就绪

## 🔧 需要手动完成的步骤

### 1. 配置SSH连接
```bash
# 生成SSH密钥（如果还没有）
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 将公钥添加到Linode服务器
ssh-copy-id root@139.144.71.200
```

### 2. 在Linode服务器上设置项目
```bash
# 连接到服务器
ssh root@139.144.71.200

# 创建项目目录
mkdir -p /root/lelink-solar-admin
cd /root/lelink-solar-admin

# 克隆项目
git clone https://github.com/charlespty/lelink-solar-website.git .

# 安装依赖
npm install

# 使用后端配置
cp next.config.backend.js next.config.js

# 构建项目
npm run build

# 使用PM2启动
pm2 start npm --name "lelink-solar-admin" -- start
pm2 save
pm2 startup
```

### 3. 配置Nginx反向代理
```bash
# 在服务器上创建Nginx配置
sudo tee /etc/nginx/sites-available/lelink-solar-admin > /dev/null << 'EOF'
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
EOF

# 启用配置
sudo ln -sf /etc/nginx/sites-available/lelink-solar-admin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. 配置SSL证书
```bash
# 安装Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d admin.lelinksolar.com
```

## 🌐 部署结果

### 前端网站
- **GitHub Pages**: https://charlespty.github.io/lelink-solar-website
- **自定义域名**: https://lelinksolar.com
- **状态**: ✅ 已部署成功

### 后端管理系统
- **服务器地址**: http://139.144.71.200:3000/admin
- **自定义域名**: https://admin.lelinksolar.com (需要配置SSL)
- **登录账号**: admin / admin123
- **状态**: 🔧 需要手动完成服务器配置

## 📋 下一步操作

1. **配置SSH密钥** - 允许自动部署
2. **在服务器上运行部署命令** - 手动完成服务器设置
3. **配置DNS记录** - 指向正确的服务器
4. **测试完整功能** - 确保前后端正常工作

## 🔗 重要链接

- **GitHub仓库**: https://github.com/charlespty/lelink-solar-website
- **Linode服务器**: 139.144.71.200
- **前端网站**: https://lelinksolar.com
- **管理后台**: http://139.144.71.200:3000/admin
