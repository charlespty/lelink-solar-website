/**
 * 获取正确的图片路径，考虑 GitHub Pages 的 basePath
 */
export function getImagePath(path: string): string {
  // 在生产环境中，为 GitHub Pages 添加 basePath（除非使用自定义域名）
  if (process.env.NODE_ENV === 'production' && process.env.USE_CUSTOM_DOMAIN !== 'true') {
    return `/lelink-solar-website${path}`
  }
  return path
}

/**
 * 获取正确的静态资源路径
 */
export function getAssetPath(path: string): string {
  return getImagePath(path)
}
