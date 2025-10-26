/** @type {import('next').NextConfig} */
const nextConfig = {
  // 后端配置 - 支持API路由
  // 不使用 basePath，因为使用自定义域名
  basePath: '',
  assetPrefix: '',
  
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
    unoptimized: true,
    // 移动端优化
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    // 性能优化
    minimumCacheTTL: 31536000, // 1年缓存
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
