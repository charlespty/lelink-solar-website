// 结构化数据配置
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lelink Solar Tech Co., Ltd.",
  "alternateName": "Lelink Solar",
  "url": "https://lelinksolar.com",
  "logo": "https://lelinksolar.com/images/logo.png",
  "description": "Professional solar generator solutions for homes, businesses, and outdoor adventures. Clean, reliable, and sustainable power wherever you need it.",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 123 Solar Street",
    "addressLocality": "Wuxi",
    "addressRegion": "Jiangsu",
    "postalCode": "214000",
    "addressCountry": "CN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-138-0013-8000",
    "contactType": "customer service",
    "email": "chris@lelinksolar.com",
    "availableLanguage": ["English", "Chinese"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/lelink-solar",
    "https://twitter.com/lelinksolar",
    "https://www.facebook.com/lelinksolar"
  ]
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "LE Solar Generator Series",
  "description": "Advanced solar power solutions designed for reliability, efficiency, and versatility across all applications.",
  "brand": {
    "@type": "Brand",
    "name": "Lelink Solar"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Lelink Solar Tech Co., Ltd."
  },
  "category": "Solar Generator",
  "image": [
    "https://lelinksolar.com/images/Product image/Front Side.png",
    "https://lelinksolar.com/images/Product image/Side.png",
    "https://lelinksolar.com/images/Product image/Back.png"
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "url": "https://lelinksolar.com/products/le-solar-generator",
    "seller": {
      "@type": "Organization",
      "name": "Lelink Solar Tech Co., Ltd."
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Power Output",
      "value": "1000W - 5000W"
    },
    {
      "@type": "PropertyValue",
      "name": "Battery Type",
      "value": "LiFePO4"
    },
    {
      "@type": "PropertyValue",
      "name": "Warranty",
      "value": "5 years"
    }
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lelink Solar",
  "url": "https://lelinksolar.com",
  "description": "Professional solar generator solutions for homes, businesses, and outdoor adventures.",
  "publisher": {
    "@type": "Organization",
    "name": "Lelink Solar Tech Co., Ltd."
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lelinksolar.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Lelink Solar Tech Co., Ltd.",
  "image": "https://lelinksolar.com/images/logo.png",
  "telephone": "+86-138-0013-8000",
  "email": "chris@lelinksolar.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 123 Solar Street",
    "addressLocality": "Wuxi",
    "addressRegion": "Jiangsu",
    "postalCode": "214000",
    "addressCountry": "CN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.4911",
    "longitude": "120.3124"
  },
  "url": "https://lelinksolar.com",
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$"
}
