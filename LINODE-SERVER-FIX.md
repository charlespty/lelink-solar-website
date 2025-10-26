# 🔧 Linode服务器直接修复指南

## 🎯 目标

直接在Linode服务器上修复后台管理系统404错误，使其可以正常访问。

---

## ⚡ 快速修复（5分钟完成）

### 步骤说明

您需要：
1. SSH连接到Linode服务器
2. 修改配置文件
3. 重新构建项目
4. 重启应用

---

## 📝 详细操作步骤

### Step 1: 连接到Linode服务器

打开终端，输入：

```bash
ssh root@172.233.148.191
```

输入服务器密码后回车。

---

### Step 2: 进入项目目录

```bash
cd /var/www/lelink-solar-website
```

---

### Step 3: 备份当前配置（安全起见）

```bash
cp next.config.js next.config.js.backup
echo "✅ 配置已备份"
```

---

### Step 4: 修改配置文件

#### 方法A: 使用 nano 编辑器（推荐）

```bash
nano next.config.js
```

找到这一行：
```javascript
output: 'export',
```

将它修改为（添加注释符号）：
```javascript
// output: 'export',  // 后台需要API，暂时禁用静态导出
```

同时找到：
```javascript
trailingSlash: true,
```

也注释掉：
```javascript
// trailingSlash: true,
```

**保存方法**：
- 按 `Ctrl + X`
- 按 `Y` (确认)
- 按 `Enter` (保存)

#### 方法B: 使用自动命令（快速）

```bash
# 自动注释掉 output: 'export'
sed -i "s/output: 'export',/\/\/ output: 'export', \/\/ 后台需要API/" next.config.js

# 自动注释掉 trailingSlash
sed -i "s/trailingSlash: true,/\/\/ trailingSlash: true,/" next.config.js

echo "✅ 配置已自动修改"
```

---

### Step 5: 验证修改

```bash
# 查看修改后的配置
head -20 next.config.js
```

应该看到：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 静态导出配置
  // output: 'export',  // 后台需要API
  // trailingSlash: true,
  // ...
```

---

### Step 6: 清理旧构建

```bash
rm -rf .next out
echo "✅ 旧构建已清理"
```

---

### Step 7: 重新安装依赖（确保完整）

```bash
npm install
```

---

### Step 8: 构建项目

```bash
npm run build
```

**等待构建完成**（约1-3分钟）

如果看到 `✓ Compiled successfully` 就说明成功了！

---

### Step 9: 停止旧的PM2进程

```bash
pm2 delete all
```

或指定删除：
```bash
pm2 delete lelink-solar lelink-admin
```

---

### Step 10: 启动新应用

```bash
pm2 start npm --name "lelink-admin" -- start
```

---

### Step 11: 保存PM2配置

```bash
pm2 save
pm2 startup
```

如果提示运行某个命令，复制粘贴执行即可。

---

### Step 12: 检查状态

```bash
pm2 status
pm2 logs lelink-admin --lines 20
```

应该看到应用正在运行，状态为 `online`。

---

## 🎉 完成！测试访问

在浏览器中打开：

```
http://172.233.148.191:3000/admin/login
```

**登录信息**：
- 用户名：`admin`
- 密码：`admin123`

---

## 📋 完整的命令清单（复制粘贴版）

如果您想一次性执行所有命令，可以复制这个：

```bash
# 1. 连接服务器
ssh root@172.233.148.191

# 2. 进入项目目录
cd /var/www/lelink-solar-website

# 3. 备份配置
cp next.config.js next.config.js.backup

# 4. 自动修改配置
sed -i "s/output: 'export',/\/\/ output: 'export', \/\/ 后台需要API/" next.config.js
sed -i "s/trailingSlash: true,/\/\/ trailingSlash: true,/" next.config.js

# 5. 清理旧构建
rm -rf .next out

# 6. 重新安装依赖
npm install

# 7. 构建项目
npm run build

# 8. 停止旧进程
pm2 delete all

# 9. 启动新应用
pm2 start npm --name "lelink-admin" -- start

# 10. 保存配置
pm2 save

# 11. 检查状态
pm2 status
pm2 logs lelink-admin --lines 20

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 访问地址："
echo "   http://172.233.148.191:3000/admin/login"
echo ""
echo "🔐 登录信息："
echo "   用户名: admin"
echo "   密码: admin123"
echo ""
```

---

## 🔍 故障排查

### 问题1: 构建失败

**错误信息**：`npm run build` 报错

**解决方法**：
```bash
# 清理所有缓存
rm -rf node_modules package-lock.json .next out

# 重新安装
npm install

# 重新构建
npm run build
```

### 问题2: PM2启动失败

**错误信息**：`pm2 start` 后状态显示 `errored`

**解决方法**：
```bash
# 查看详细日志
pm2 logs lelink-admin --lines 50

# 检查端口占用
netstat -tulpn | grep 3000

# 如果端口被占用，杀掉进程
lsof -ti:3000 | xargs kill -9

# 重新启动
pm2 start npm --name "lelink-admin" -- start
```

### 问题3: 无法访问3000端口

**原因**：防火墙阻止

**解决方法**：
```bash
# 检查防火墙状态
sudo ufw status

# 允许3000端口
sudo ufw allow 3000/tcp

# 重新加载
sudo ufw reload
```

### 问题4: 应用运行但显示404

**原因**：配置未正确修改

**解决方法**：
```bash
# 检查配置文件
cat next.config.js | head -20

# 确保 output: 'export' 已被注释
# 如果没有，重新执行Step 4

# 重新构建
npm run build
pm2 restart lelink-admin
```

---

## 🔄 如何恢复到静态导出模式

如果将来想恢复GitHub Pages部署，执行：

```bash
# 恢复备份
cp next.config.js.backup next.config.js

# 或手动取消注释
nano next.config.js
# 将 // output: 'export', 改回 output: 'export',
```

---

## 📊 常用管理命令

### PM2管理

```bash
# 查看所有应用状态
pm2 status

# 查看日志（实时）
pm2 logs lelink-admin

# 查看最近日志
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

### 系统资源监控

```bash
# 查看CPU和内存使用
top

# 或使用htop（更友好）
htop

# 查看磁盘使用
df -h

# 查看端口监听
netstat -tulpn | grep LISTEN
```

### 日志查看

```bash
# PM2日志
pm2 logs lelink-admin

# 系统日志
tail -f /var/log/syslog

# 查看特定错误
journalctl -u nginx -n 50
```

---

## 🌐 可选：配置域名访问

### 选项A: 使用IP+端口（当前）

```
http://172.233.148.191:3000/admin/login
```

**优点**：简单，无需额外配置  
**缺点**：需要记住端口号

### 选项B: 配置Nginx反向代理

让用户可以通过 `http://172.233.148.191/admin/login` 访问（不需要端口号）

```bash
# 创建Nginx配置
sudo nano /etc/nginx/sites-available/default
```

在 `server` 块中添加：

```nginx
location /admin {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

location /api/admin {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}

location /_next {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
}
```

```bash
# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl reload nginx
```

访问：`http://172.233.148.191/admin/login`

### 选项C: 使用子域名

配置 `admin.lelinksolar.com` 指向后台系统。

参考 `SPLIT-DEPLOYMENT-GUIDE.md` 中的详细步骤。

---

## 🔐 安全建议

### 1. 立即修改默认密码

登录后台后：
1. 进入"系统设置"
2. 修改密码
3. 使用强密码（包含大小写字母、数字、符号）

### 2. 配置环境变量

```bash
cd /var/www/lelink-solar-website
nano .env.local
```

添加：
```env
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=production
```

生成强密钥：
```bash
openssl rand -hex 32
```

### 3. 定期备份

```bash
# 创建备份脚本
nano /root/backup-admin.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /root/backups/admin-$DATE.tar.gz /var/www/lelink-solar-website
echo "Backup created: admin-$DATE.tar.gz"
```

```bash
chmod +x /root/backup-admin.sh

# 设置定时任务（每天凌晨2点备份）
crontab -e
# 添加：0 2 * * * /root/backup-admin.sh
```

---

## ✅ 验证清单

修复完成后，请验证：

- [ ] 可以访问 http://172.233.148.191:3000/admin/login
- [ ] 登录页面正常显示（有Logo和登录表单）
- [ ] 可以使用 admin/admin123 登录
- [ ] 登录后进入仪表板
- [ ] 仪表板显示统计数据
- [ ] 可以访问产品管理页面
- [ ] 可以访问内容管理页面
- [ ] 可以访问询价管理页面
- [ ] PM2状态显示 `online`
- [ ] 日志没有错误信息

---

## 📱 访问信息

**前台网站**（保持不变）：
```
https://lelinksolar.com
```

**后台管理系统**（修复后）：
```
http://172.233.148.191:3000/admin/login

用户名: admin
密码: admin123
```

---

## 💡 关键点说明

### 为什么要注释 `output: 'export'`？

- `output: 'export'` 会将整个应用编译成纯静态HTML
- 静态HTML无法运行服务端代码（API Routes）
- 后台管理系统需要API Routes来处理登录、数据管理等功能
- 因此必须移除这个配置，让Next.js以标准模式运行

### 这样做会影响前台网站吗？

**不会！** 因为：
- 前台网站已经部署在GitHub Pages（使用之前构建的静态文件）
- GitHub Pages上的文件不会自动更改
- 只有Linode服务器上的代码被修改了
- 两者互不影响

### 长期使用建议

**当前方案**（单服务器，前后台都在Linode）：
- ✅ 简单易管理
- ✅ 成本较低
- ✅ 适合中小型网站
- ⚠️ 前台和后台共用一个服务器

**未来升级方案**（分离部署）：
- 前台继续用GitHub Pages（静态，免费）
- 后台独立在Linode（动态，完整功能）
- 更好的性能和安全性
- 参考：`SPLIT-DEPLOYMENT-GUIDE.md`

---

## 📞 需要帮助？

如果遇到问题，请提供：
1. 错误截图
2. PM2日志：`pm2 logs lelink-admin --lines 50`
3. 构建日志：`npm run build` 的输出
4. 系统信息：`node --version` 和 `npm --version`

技术支持：
- 📧 邮箱: tech@lelinksolar.com
- 💬 微信: LelinkSolar

---

## 🎉 总结

通过这个方法，您：
1. ✅ 保持了前台网站的稳定性（GitHub Pages）
2. ✅ 修复了后台管理系统的404问题
3. ✅ 使用单一服务器运行后台（简单易管理）
4. ✅ 为未来升级预留了空间

**下一步**：
1. 完成修复并测试
2. 修改默认密码
3. 开始使用后台管理系统

祝您使用愉快！🚀

---

*最后更新: 2024年10月26日*  
*修复方法: 服务器端直接修复（推荐长期使用）*

