/**
 * 获取正确的图片路径，考虑 GitHub Pages 的 basePath
 */
export function getImagePath(path: string): string {
  // 在生产环境中，为 GitHub Pages 添加 basePath
  if (process.env.NODE_ENV === 'production') {
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
