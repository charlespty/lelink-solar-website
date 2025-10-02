/**
 * 获取正确的图片路径
 * 使用自定义域名时，直接返回路径
 */
export function getImagePath(path: string): string {
  return path
}

/**
 * 获取正确的静态资源路径
 */
export function getAssetPath(path: string): string {
  return getImagePath(path)
}
