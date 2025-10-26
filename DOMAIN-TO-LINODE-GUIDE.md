# 🌐 域名指向Linode服务器配置指南

## 问题描述
- ✅ IP地址可以访问：http://172.233.148.191
- ❌ 域名无法访问：http://lelinksolar.com

## 原因分析
域名 `lelinksolar.com` 当前指向 GitHub Pages，需要改为指向 Linode VPS (172.233.148.191)

---

## 📋 解决步骤

### 第一步：修改GoDaddy DNS配置

#### 1. 登录GoDaddy
- 访问：https://www.godaddy.com
- 登录您的账户
- 进入 "My Products" → 找到 `lelinksolar.com` → 点击 "DNS"

#### 2. 删除旧的A记录
删除所有指向GitHub Pages的A记录：
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

#### 3. 添加新的A记录
| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| A | @ | **172.233.148.191** | 600 |

#### 4. 修改CNAME记录（如果有www记录）
| 类型 | 名称 | 原值 | 新值 | TTL |
|------|------|------|------|-----|
| CNAME | www | charlespty.github.io | **lelinksolar.com** | 600 |

#### 5. 保存配置
- 点击 "Save" 保存所有更改
- DNS传播时间：5-30分钟

---

### 第二步：配置Linode服务器Nginx

#### 1. SSH连接到Linode服务器
```bash
ssh lelink@172.233.148.191
```

#### 2. 创建Nginx配置文件
```bash
sudo nano /etc/nginx/sites-available/lelink-solar
```

#### 3. 粘贴以下配置
```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name lelinksolar.com www.lelinksolar.com;
    
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

#### 4. 启用配置
```bash
# 创建软链接
sudo ln -sf /etc/nginx/sites-available/lelink-solar /etc/nginx/sites-enabled/

# 删除默认配置（如果存在）
sudo rm -f /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重新加载Nginx
sudo systemctl reload nginx
```

#### 5. 验证Nginx状态
```bash
sudo systemctl status nginx
```

---

### 第三步：配置防火墙（确保端口80开放）

```bash
# 检查防火墙状态
sudo ufw status

# 确保80端口开放
sudo ufw allow 80/tcp

# 如果需要HTTPS（后续配置SSL）
sudo ufw allow 443/tcp

# 重新加载防火墙
sudo ufw reload
```

---

### 第四步：验证配置

#### 1. 检查DNS解析（本地电脑执行）
```bash
# 检查域名是否指向正确IP
nslookup lelinksolar.com

# 或使用dig命令
dig lelinksolar.com +short
```

应该返回：`172.233.148.191`

#### 2. 测试HTTP访问
```bash
# 测试主域名
curl -I http://lelinksolar.com

# 测试www子域名
curl -I http://www.lelinksolar.com
```

#### 3. 浏览器访问
- http://lelinksolar.com
- http://www.lelinksolar.com

---

## 🔒 第五步：配置HTTPS（可选但推荐）

### 安装Certbot
```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

### 获取SSL证书
```bash
sudo certbot --nginx -d lelinksolar.com -d www.lelinksolar.com
```

### 按照提示操作
1. 输入邮箱地址
2. 同意服务条款
3. 选择是否重定向HTTP到HTTPS（推荐选择2）

### 自动续期
```bash
# 测试自动续期
sudo certbot renew --dry-run

# Certbot会自动设置cron任务
```

---

## 📊 故障排除

### 问题1：域名仍然无法访问
**原因**：DNS未传播完成
**解决**：
```bash
# 清除本地DNS缓存（Mac）
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# 清除本地DNS缓存（Windows）
ipconfig /flushdns

# 等待5-30分钟
```

### 问题2：502 Bad Gateway
**原因**：PM2应用未运行
**解决**：
```bash
pm2 status
pm2 restart lelink-solar
```

### 问题3：Nginx配置错误
**检查**：
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### 问题4：防火墙阻止
**检查**：
```bash
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## ✅ 验证清单

- [ ] GoDaddy DNS A记录已修改为 172.233.148.191
- [ ] Nginx配置文件已创建
- [ ] Nginx配置已启用并重新加载
- [ ] 防火墙端口80已开放
- [ ] DNS解析返回正确IP
- [ ] 浏览器可以访问 http://lelinksolar.com
- [ ] PM2应用状态为 online
- [ ] （可选）SSL证书已配置

---

## 📞 需要帮助？

如果遇到问题，请提供以下信息：
1. DNS解析结果：`nslookup lelinksolar.com`
2. Nginx状态：`sudo systemctl status nginx`
3. PM2状态：`pm2 status`
4. Nginx错误日志：`sudo tail -20 /var/log/nginx/error.log`

---

## 🎯 预期结果

配置完成后：
- ✅ http://lelinksolar.com → 显示网站
- ✅ http://www.lelinksolar.com → 显示网站
- ✅ http://172.233.148.191 → 显示网站
- ✅ （配置SSL后）https://lelinksolar.com → 显示网站

---

## 📝 重要提醒

1. **DNS传播时间**：通常5-30分钟，最长可能24小时
2. **备份配置**：修改前备份原有DNS配置
3. **测试访问**：可以先用手机4G网络测试（避免本地DNS缓存）
4. **SSL证书**：建议配置HTTPS，提升安全性和SEO
5. **监控**：定期检查PM2应用状态和服务器资源使用

---

**配置完成后，您的网站将通过域名 lelinksolar.com 访问Linode服务器！** 🎉

