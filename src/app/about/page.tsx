'use client'

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Factory, 
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Zap,
  Shield,
  Settings,
  Star
} from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Lelink Solar</title>
        <meta name="description" content="Learn about Wuxi Lelink Solar Tech Co., Ltd. - Leading manufacturer of solar power solutions" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 text-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  About Us
                </h1>
                <p className="text-xl text-primary-200 max-w-3xl mx-auto">
                  Wuxi Lelink Solar Tech Co., Ltd. - Your trusted partner in clean energy solutions
                </p>
              </motion.div>
            </div>
          </section>

          {/* Company Introduction */}
          <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-6">
                  Company Introduction
                </h2>
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-gray-600 mb-6">
                    <strong>Wuxi Lelink Solar Tech Co., Ltd.</strong>
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    As an emerging enterprise focused on <strong>solar generator R&D and manufacturing</strong>, 
                    we are based in Wuxi's manufacturing hub, committed to providing global users with 
                    <strong> reliable, eco-friendly, and portable clean energy solutions</strong>.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">
                  Our Mission
                </h2>
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="flex items-start space-x-4 p-6 bg-primary-50 rounded-lg">
                    <Target className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700">
                      Promote green energy to replace traditional diesel and fuel power generation
                    </p>
                  </div>
                  <div className="flex items-start space-x-4 p-6 bg-primary-50 rounded-lg">
                    <Zap className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700">
                      Enable outdoor, home, and emergency scenarios to have clean power available anytime
                    </p>
                  </div>
                  <div className="flex items-start space-x-4 p-6 bg-primary-50 rounded-lg">
                    <Award className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700">
                      With innovation and quality, help customers achieve sustainable development goals
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Our Advantages */}
          <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">
                  Our Advantages
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm">
                      <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-dark-900 mb-2">
                          Professional Team
                        </h3>
                        <p className="text-gray-600">
                          Engineers and R&D personnel with accumulated experience in energy storage and new energy fields
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm">
                      <Factory className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-dark-900 mb-2">
                          Flexible Production
                        </h3>
                        <p className="text-gray-600">
                          Factory capable of small-batch trial production and large-scale mass production, quickly responding to customer needs
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm">
                      <Settings className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-dark-900 mb-2">
                          Customized Service
                        </h3>
                        <p className="text-gray-600">
                          Provide OEM/ODM solutions, supporting flexible configuration of product appearance, capacity, and functions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm">
                      <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-dark-900 mb-2">
                          Quality Commitment
                        </h3>
                        <p className="text-gray-600">
                          Strict quality testing and process control, products meet international safety and performance standards
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">
                  Why Choose Us?
                </h2>
                <div className="max-w-4xl mx-auto">
                  <Card className="bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
                    <CardContent className="p-8">
                      <p className="text-lg text-gray-700 mb-6">
                        Although we are a newly established factory, we have won customer trust with our 
                        <strong> transparent cooperation attitude, rapid response capability, and stable product quality</strong>. 
                        We believe:
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-xl font-semibold text-primary-600">
                        <span>Professional</span>
                        <span className="text-gray-400">+</span>
                        <span>Flexible</span>
                        <span className="text-gray-400">+</span>
                        <span>Customized</span>
                        <span className="text-gray-400">=</span>
                        <span>Your Ideal Energy Partner</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-dark-900 mb-8">
                  Get in Touch
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="p-4 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      Wuxi, Jiangsu, China
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="p-4 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Phone className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2">
                      Phone
                    </h3>
                    <p className="text-gray-600">
                      +86 13961616296
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="p-4 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Mail className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      chris@lelinksolar.com
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-primary-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your solar energy goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="accent">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                    View Products
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}