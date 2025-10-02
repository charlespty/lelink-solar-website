import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: process.env.USE_CUSTOM_DOMAIN === 'true' ? 'https://lelinksolar.com/sitemap.xml' : 'https://charlespty.github.io/lelink-solar-website/sitemap.xml',
  }
}
