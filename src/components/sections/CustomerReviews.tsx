'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Star, Quote } from 'lucide-react'
import Link from 'next/link'

interface Review {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  product: string
  date: string
  avatar?: string
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'John Smith',
    location: 'Lagos, Nigeria',
    rating: 5,
    comment: 'The LK Solar Generator has been a game-changer for our family. During power outages, we can keep our essential appliances running. The build quality is excellent and the battery life exceeds expectations.',
    product: 'LK Solar Generator',
    date: '2024-01-15',
    avatar: '/images/avatars/john-smith.jpg'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    location: 'Nairobi, Kenya',
    rating: 5,
    comment: 'Perfect for our camping trips! The LP Solar Panel charges quickly and the LK Generator powers all our devices. Very reliable and easy to use. Highly recommended for outdoor enthusiasts.',
    product: 'LP Solar Panel + LK Generator',
    date: '2024-01-10',
    avatar: '/images/avatars/maria-garcia.jpg'
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    location: 'Cairo, Egypt',
    rating: 5,
    comment: 'Excellent customer service and product quality. The solar generator works perfectly for our small business during power cuts. The multiple charging options are very convenient.',
    product: 'LK Solar Generator',
    date: '2024-01-08',
    avatar: '/images/avatars/ahmed-hassan.jpg'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    location: 'Cape Town, South Africa',
    rating: 5,
    comment: 'Great investment for home backup power. The system is quiet, efficient, and has saved us multiple times during load shedding. The installation was straightforward.',
    product: 'LK Solar Generator',
    date: '2024-01-05',
    avatar: '/images/avatars/sarah-johnson.jpg'
  },
  {
    id: '5',
    name: 'David Okafor',
    location: 'Abuja, Nigeria',
    rating: 5,
    comment: 'The LP Solar Panel is incredibly efficient. It charges our devices quickly even on cloudy days. The foldable design makes it perfect for travel and storage.',
    product: 'LP Solar Panel',
    date: '2024-01-03',
    avatar: '/images/avatars/david-okafor.jpg'
  },
  {
    id: '6',
    name: 'Fatima Al-Zahra',
    location: 'Casablanca, Morocco',
    rating: 5,
    comment: 'Outstanding product and service. The LK Solar Generator provides reliable power for our medical equipment during outages. The build quality is impressive and the warranty gives us peace of mind.',
    product: 'LK Solar Generator',
    date: '2024-01-01',
    avatar: '/images/avatars/fatima-alzahra.jpg'
  }
]

export default function CustomerReviews() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here are real reviews from satisfied customers across Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1 mr-3">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-primary-400 mb-2" />
                    <p className="text-gray-700 italic">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary-600">{review.product}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-primary-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join Thousands of Satisfied Customers
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Experience the reliability and quality that our customers love. 
              Get your solar power solution today and join the clean energy revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
