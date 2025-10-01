import Script from 'next/script'

interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  )
}

// 预定义的结构化数据组件
export function OrganizationStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lelink Solar Tech Co., Ltd.",
    "alternateName": "Lelink Solar",
    "url": "https://lelinksolar.com",
    "logo": "https://lelinksolar.com/images/logo.png",
    "description": "Professional solar generator solutions for homes, businesses, and outdoor adventures.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-138-0013-8000",
      "contactType": "customer service",
      "email": "chris@lelinksolar.com"
    }
  }

  return <StructuredData data={data} />
}

export function ProductStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LE Solar Generator Series",
    "description": "Advanced solar power solutions designed for reliability, efficiency, and versatility.",
    "brand": {
      "@type": "Brand",
      "name": "Lelink Solar"
    },
    "category": "Solar Generator",
    "image": [
      "https://lelinksolar.com/images/Product image/Front Side.png",
      "https://lelinksolar.com/images/Product image/Side.png"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    }
  }

  return <StructuredData data={data} />
}

export function WebsiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lelink Solar",
    "url": "https://lelinksolar.com",
    "description": "Professional solar generator solutions for homes, businesses, and outdoor adventures.",
    "publisher": {
      "@type": "Organization",
      "name": "Lelink Solar Tech Co., Ltd."
    }
  }

  return <StructuredData data={data} />
}
