/** @type {import('next').NextConfig} */
const nextConfig = {
  // 跳过类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  // 跳过 ESLint 检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 优化配置
  swcMinify: true,
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
