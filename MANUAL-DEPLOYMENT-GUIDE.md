# 🚀 手动部署到 GitHub Pages 指南

## 📋 当前状态
- ✅ 本地更改已提交
- ✅ 所有文件已准备就绪
- ⏳ 需要推送到 GitHub
- ✅ GitHub Actions 已配置自动部署

## 🔧 推送方法选择

### 方法 1: 使用 GitHub 网页界面 (推荐)

1. **访问 GitHub 仓库**
   ```
   https://github.com/charlespty/lelink-solar-website
   ```

2. **上传更改的文件**
   - 点击 "Upload files" 按钮
   - 拖拽以下文件到页面：
     - `src/lib/productsData.ts`
     - `public/images/Product image/LT-Fixed/LT-fixed-panel-4.jpg`
     - `LT-IMAGE-REPLACEMENT-GUIDE.md`
     - `replace-lt-images.sh`
     - `deploy-to-github.sh`

3. **提交更改**
   - 提交信息：`feat: 更新 LT Fixed Solar Panel 产品图片`
   - 点击 "Commit changes"

### 方法 2: 使用 Git 命令行

1. **打开终端**
   ```bash
   cd "/Users/shiweizhang/Desktop/Lelink Solar/lelink-solar-website"
   ```

2. **推送到 GitHub**
   ```bash
   git push origin main
   ```
   - 输入用户名：`charlespty`
   - 输入密码：使用 Personal Access Token

### 方法 3: 使用 Personal Access Token

1. **设置远程仓库**
   ```bash
   git remote set-url origin https://ghp_EtC5C3bUoC8zqTQBI09eXLpZMLph573Yjhhz@github.com/charlespty/lelink-solar-website.git
   ```

2. **推送更改**
   ```bash
   git push origin main
   ```

### 方法 4: 使用 GitHub CLI

1. **安装 GitHub CLI** (如果未安装)
   ```bash
   brew install gh
   ```

2. **登录 GitHub**
   ```bash
   gh auth login
   ```

3. **推送更改**
   ```bash
   git push origin main
   ```

## 🔍 验证部署

### 1. 检查 GitHub Actions
- 访问：https://github.com/charlespty/lelink-solar-website/actions
- 查看最新的构建状态
- 确保构建成功

### 2. 检查网站更新
- 访问：https://lelinksolar.com/products/lt-fixed-solar-panel/
- 验证第四张图片是否显示
- 检查图片轮播功能

### 3. 清除缓存
如果网站没有更新：
- 按 `Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新
- 或者等待 5-10 分钟让 CDN 缓存更新

## 📱 部署后的功能

### ✅ 新增功能
- LT Fixed Solar Panel 支持 4 张产品图片轮播
- 图片替换脚本和详细指南
- 备份原有图片文件

### 🌐 访问链接
- **主页**: https://lelinksolar.com
- **产品列表**: https://lelinksolar.com/products/
- **LT Fixed Solar Panel**: https://lelinksolar.com/products/lt-fixed-solar-panel/
- **功率计算器**: https://lelinksolar.com/calculator/

## 🆘 故障排除

### 如果推送失败
1. 检查网络连接
2. 验证 GitHub 凭据
3. 使用网页界面上传文件

### 如果网站没有更新
1. 等待 5-10 分钟
2. 清除浏览器缓存
3. 检查 GitHub Actions 构建状态

### 如果图片不显示
1. 检查图片文件路径
2. 验证图片文件大小
3. 确保图片格式为 .jpg

## 📞 技术支持
如有问题，请联系技术支持团队。
