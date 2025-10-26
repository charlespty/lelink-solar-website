#!/bin/bash

# 🔧 后台管理系统 404 修复脚本
# 此脚本将修复后台管理系统的404错误

echo "🔧 开始修复后台管理系统..."
echo ""

# 1. 备份当前配置
echo "📦 备份当前配置..."
cp next.config.js next.config.js.backup
echo "✅ 配置已备份到 next.config.js.backup"
echo ""

# 2. 创建新的配置文件（移除 output: 'export'）
echo "🛠️  创建新配置..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 后台管理系统需要服务端运行，不能使用 output: 'export'
  // output: 'export',  // ❌ 已禁用
  
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
    domains: ['localhost', 'lelinksolar.com', 'admin.lelinksolar.com'],
    unoptimized: false, // 启用图片优化
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
EOF
echo "✅ 新配置已创建"
echo ""

# 3. 清理旧构建
echo "🧹 清理旧构建..."
rm -rf .next out
echo "✅ 清理完成"
echo ""

# 4. 重新构建
echo "🏗️  重新构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
    echo ""
    
    # 5. 显示下一步操作
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 修复完成！"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📝 下一步操作："
    echo ""
    echo "1️⃣  本地测试（推荐）："
    echo "   npm run dev"
    echo "   然后访问: http://localhost:3000/admin/login"
    echo ""
    echo "2️⃣  生产环境启动："
    echo "   npm start"
    echo "   或使用 PM2: pm2 start npm --name lelink-admin -- start"
    echo ""
    echo "3️⃣  部署到Linode服务器："
    echo "   scp -r .next root@172.233.148.191:/var/www/lelink-solar-website/"
    echo "   ssh root@172.233.148.191"
    echo "   cd /var/www/lelink-solar-website"
    echo "   pm2 restart lelink-admin"
    echo ""
    echo "4️⃣  访问后台："
    echo "   http://172.233.168.191:3000/admin/login"
    echo "   用户名: admin"
    echo "   密码: admin123"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "⚠️  重要提示："
    echo "• 现在前台网站将无法部署到GitHub Pages（需要服务端）"
    echo "• 建议使用分离部署：前台(GitHub) + 后台(Linode)"
    echo "• 详细说明请查看: ADMIN-DEPLOYMENT-FIX.md"
    echo ""
    
else
    echo "❌ 构建失败，请检查错误信息"
    echo ""
    echo "恢复备份配置:"
    echo "  mv next.config.js.backup next.config.js"
    exit 1
fi
EOF

chmod +x fix-admin-404.sh
echo "✅ 脚本创建完成: fix-admin-404.sh"

