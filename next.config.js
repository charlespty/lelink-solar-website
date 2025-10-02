/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 静态导出配置
  output: 'export',
  trailingSlash: true,
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
    domains: ['localhost'],
    unoptimized: true,
  },
}

module.exports = nextConfig
