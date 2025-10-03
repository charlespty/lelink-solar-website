# 🌐 GitHub 网页上传指南

## 📋 当前状态
- ✅ 本地更改已提交
- ❌ Personal Access Token 已失效
- ⏳ 需要使用网页界面上传

## 🚀 使用 GitHub 网页界面上传

### 步骤 1: 访问 GitHub 仓库
1. 打开浏览器
2. 访问：https://github.com/charlespty/lelink-solar-website
3. 确保已登录 GitHub 账户

### 步骤 2: 上传更改的文件
1. 点击 "Upload files" 按钮（绿色按钮）
2. 拖拽以下文件到上传区域：

#### 📁 需要上传的文件：
```
src/lib/productsData.ts
public/images/Product image/LT-Fixed/LT-fixed-panel-4.jpg
LT-IMAGE-REPLACEMENT-GUIDE.md
replace-lt-images.sh
deploy-to-github.sh
MANUAL-DEPLOYMENT-GUIDE.md
GITHUB-WEB-UPLOAD-GUIDE.md
```

### 步骤 3: 提交更改
1. 在 "Commit changes" 区域输入：
   - **提交信息**：
     ```
     feat: 更新 LT Fixed Solar Panel 产品图片
     
     - 添加第四张产品图片 LT-fixed-panel-4.jpg
     - 更新产品数据配置支持 4 张图片轮播
     - 创建图片替换脚本和详细指南
     - 备份原有图片文件
     - 优化产品展示效果
     ```

2. 选择 "Commit directly to the main branch"
3. 点击 "Commit changes" 按钮

### 步骤 4: 验证上传
1. 检查文件是否成功上传
2. 确认提交信息正确
3. 查看提交历史

## 🔍 验证部署

### 1. 检查 GitHub Actions
- 访问：https://github.com/charlespty/lelink-solar-website/actions
- 查看最新的构建状态
- 等待构建完成（通常需要 2-5 分钟）

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

### 如果上传失败
1. 检查网络连接
2. 确保 GitHub 账户已登录
3. 尝试分批上传文件

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
