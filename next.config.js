/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 静态导出配置
  output: 'export',
  trailingSlash: true,
  // 根据环境变量决定是否使用 basePath
  basePath: process.env.NODE_ENV === 'production' && process.env.USE_CUSTOM_DOMAIN !== 'true' ? '/lelink-solar-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.USE_CUSTOM_DOMAIN !== 'true' ? '/lelink-solar-website/' : '',
  
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
    domains: ['localhost'],
    unoptimized: true,
  },
}

module.exports = nextConfig
