# 🌐 自定义域名设置指南

## 概述
本指南将帮助您将 GoDaddy 域名解析到 GitHub Pages，使您的网站可以通过自定义域名访问。

## 步骤 1: GitHub Pages 配置

1. 访问 GitHub 仓库：https://github.com/charlespty/lelink-solar-website
2. 点击 "Settings" 标签
3. 滚动到 "Pages" 部分
4. 在 "Custom domain" 输入框中输入您的域名（例如：lelinksolar.com）
5. 点击 "Save" 保存
6. 等待 GitHub 验证域名

## 步骤 2: GoDaddy DNS 配置

### 登录 GoDaddy
1. 登录您的 GoDaddy 账户
2. 进入 "My Products" 页面
3. 找到您的域名，点击 "DNS" 或 "Manage DNS"

### 添加 A 记录
添加以下 4 个 A 记录：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

### 添加 CNAME 记录（可选）
如果您希望 www 子域名也能访问：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| CNAME | www | charlespty.github.io | 600 |

### 添加 AAAA 记录（可选）
如果您需要 IPv6 支持：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| AAAA | @ | 2606:50c0:8000::153 | 600 |
| AAAA | @ | 2606:50c0:8001::153 | 600 |

## 步骤 3: 启用自定义域名构建

### 方法 1: 通过 GitHub Actions（推荐）
在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：
- 名称：`USE_CUSTOM_DOMAIN`
- 值：`true`

### 方法 2: 手动构建
在本地构建时设置环境变量：
```bash
USE_CUSTOM_DOMAIN=true npm run build
```

## 步骤 4: 验证配置

1. 等待 DNS 传播（通常需要 5-30 分钟）
2. 访问您的自定义域名
3. 检查所有图片和资源是否正常加载
4. 验证 HTTPS 证书是否自动配置

## 故障排除

### 域名无法访问
- 检查 DNS 记录是否正确添加
- 等待 DNS 传播完成
- 使用 `nslookup` 或 `dig` 命令检查 DNS 解析

### 图片无法显示
- 确保已设置 `USE_CUSTOM_DOMAIN=true` 环境变量
- 重新构建并部署网站

### HTTPS 证书问题
- GitHub Pages 会自动为自定义域名配置 SSL 证书
- 如果证书未生效，等待 24 小时或联系 GitHub 支持

## 重要说明

1. **DNS 传播时间**：DNS 更改可能需要 5-30 分钟才能生效
2. **SSL 证书**：GitHub Pages 会自动为自定义域名配置 SSL 证书
3. **CNAME 文件**：已自动创建 `public/CNAME` 文件
4. **环境变量**：使用 `USE_CUSTOM_DOMAIN=true` 来启用自定义域名模式

## 联系支持

如果遇到问题，请检查：
- GitHub Pages 状态页面
- GoDaddy DNS 管理面板
- 浏览器开发者工具的网络标签
