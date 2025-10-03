'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  Plus, 
  Trash2, 
  Calculator, 
  Zap, 
  Sun, 
  Lightbulb,
  Tv,
  Smartphone,
  Laptop,
  Refrigerator,
  Wind,
  WashingMachine,
  Microwave,
  Coffee,
  Router,
  Camera,
  Speaker,
  Gamepad2,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { getAllProducts } from '@/lib/productsData'

interface Appliance {
  id: string
  name: string
  power: number
  hours: number
  quantity: number
  category: string
  icon: React.ComponentType<{ className?: string }>
}

const applianceCategories = [
  {
    id: 'lighting',
    name: 'Lighting',
    icon: Lightbulb,
    appliances: [
      { name: 'LED Bulb', power: 10, icon: Lightbulb },
      { name: 'CFL Bulb', power: 15, icon: Lightbulb },
      { name: 'Incandescent Bulb', power: 60, icon: Lightbulb },
      { name: 'LED Strip', power: 20, icon: Lightbulb },
      { name: 'Outdoor Light', power: 50, icon: Lightbulb }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Tv,
    appliances: [
      { name: 'TV (LED)', power: 100, icon: Tv },
      { name: 'TV (OLED)', power: 150, icon: Tv },
      { name: 'Gaming Console', power: 200, icon: Gamepad2 },
      { name: 'Sound System', power: 50, icon: Speaker },
      { name: 'Projector', power: 300, icon: Tv }
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: Smartphone,
    appliances: [
      { name: 'Smartphone', power: 5, icon: Smartphone },
      { name: 'Laptop', power: 50, icon: Laptop },
      { name: 'Desktop Computer', power: 200, icon: Laptop },
      { name: 'Router', power: 10, icon: Router },
      { name: 'Camera', power: 15, icon: Camera }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: Coffee,
    appliances: [
      { name: 'Refrigerator', power: 150, icon: Refrigerator },
      { name: 'Microwave', power: 1000, icon: Microwave },
      { name: 'Coffee Maker', power: 800, icon: Coffee },
      { name: 'Blender', power: 300, icon: Coffee },
      { name: 'Toaster', power: 800, icon: Coffee }
    ]
  },
  {
    id: 'cooling',
    name: 'Cooling & Heating',
    icon: Wind,
    appliances: [
      { name: 'Air Conditioner', power: 1500, icon: Wind },
      { name: 'Fan', power: 50, icon: Wind },
      { name: 'Heater', power: 1000, icon: Wind },
      { name: 'Heat Pump', power: 2000, icon: Wind }
    ]
  },
  {
    id: 'other',
    name: 'Other',
    icon: Zap,
    appliances: [
      { name: 'Washing Machine', power: 500, icon: WashingMachine },
      { name: 'Dryer', power: 1500, icon: WashingMachine },
      { name: 'Vacuum Cleaner', power: 800, icon: Zap },
      { name: 'Iron', power: 1000, icon: Zap },
      { name: 'Hair Dryer', power: 1200, icon: Zap }
    ]
  }
]

export default function CalculatorPage() {
  const [appliances, setAppliances] = useState<Appliance[]>([])
  const [selectedCategory, setSelectedCategory] = useState('lighting')
  const [selectedAppliance, setSelectedAppliance] = useState('')
  const [customAppliance, setCustomAppliance] = useState('')
  const [customPower, setCustomPower] = useState('')
  const [hours, setHours] = useState('')
  const [quantity, setQuantity] = useState('1')

  const addAppliance = () => {
    const category = applianceCategories.find(cat => cat.id === selectedCategory)
    const appliance = category?.appliances.find(app => app.name === selectedAppliance)
    
    if (appliance) {
      const newAppliance: Appliance = {
        id: Date.now().toString(),
        name: appliance.name,
        power: appliance.power,
        hours: parseFloat(hours) || 0,
        quantity: parseInt(quantity) || 1,
        category: selectedCategory,
        icon: appliance.icon
      }
      setAppliances([...appliances, newAppliance])
    } else if (customAppliance && customPower) {
      const newAppliance: Appliance = {
        id: Date.now().toString(),
        name: customAppliance,
        power: parseFloat(customPower) || 0,
        hours: parseFloat(hours) || 0,
        quantity: parseInt(quantity) || 1,
        category: 'custom',
        icon: Zap
      }
      setAppliances([...appliances, newAppliance])
    }
    
    // Reset form
    setSelectedAppliance('')
    setCustomAppliance('')
    setCustomPower('')
    setHours('')
    setQuantity('1')
  }

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(app => app.id !== id))
  }

  const updateAppliance = (id: string, field: keyof Appliance, value: string | number) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ))
  }

  const calculateTotalPower = () => {
    return appliances.reduce((total, appliance) => {
      return total + (appliance.power * appliance.hours * appliance.quantity)
    }, 0)
  }

  const getRecommendedProducts = () => {
    const totalWh = calculateTotalPower()
    const products = getAllProducts()
    
    // 根据总功率需求推荐产品
    if (totalWh <= 2300) {
      // 推荐LK Solar Generator (2300WH容量)
      return products.filter(product => product.id === 'lk-solar-generator-lk-2000').map(product => ({
        id: product.id,
        name: product.name,
        capacity: '2300WH',
        suitability: 'Perfect Match',
        description: 'Ideal for your power needs',
        image: product.images[0],
        link: `/products/${product.id}`
      }))
    } else if (totalWh <= 3070) {
      // 推荐LK Solar Generator (3070WH容量)
      return products.filter(product => product.id === 'lk-solar-generator-lk-2000').map(product => ({
        id: product.id,
        name: product.name,
        capacity: '3070WH',
        suitability: 'Perfect Match',
        description: 'Ideal for your power needs',
        image: product.images[0],
        link: `/products/${product.id}`
      }))
    } else {
      // 推荐多个LK Solar Generator或太阳能面板组合
      return [
        {
          id: 'lk-solar-generator-lk-2000',
          name: 'LK Solar Generator (Multiple Units)',
          capacity: 'Multiple 2300WH/3070WH',
          suitability: 'Recommended',
          description: 'Consider multiple units for higher power needs',
          image: products.find(p => p.id === 'lk-solar-generator-lk-2000')?.images[0] || '',
          link: '/products/lk-solar-generator-lk-2000'
        },
        {
          id: 'lt-fixed-solar-panel',
          name: 'LT Fixed Solar Panel',
          capacity: '550W Solar Input',
          suitability: 'Complementary',
          description: 'Add fixed solar panels for renewable charging',
          image: products.find(p => p.id === 'lt-fixed-solar-panel')?.images[0] || '',
          link: '/products/lt-fixed-solar-panel'
        },
        {
          id: 'lp-400w-solar-panel',
          name: 'LP Foldable Solar Panel',
          capacity: '400W Solar Input',
          suitability: 'Portable Option',
          description: 'Portable solar panels for flexible charging',
          image: products.find(p => p.id === 'lp-400w-solar-panel')?.images[0] || '',
          link: '/products/lp-400w-solar-panel'
        }
      ]
    }
  }

  const totalPower = calculateTotalPower()
  const recommendedProducts = getRecommendedProducts()

  return (
    <>
      <Head>
        <title>Power Calculator - Lelink Solar</title>
        <meta name="description" content="Calculate your power needs and find the perfect solar solution for your home or outdoor adventures." />
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
                  Power Calculator
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  Calculate your power needs and find the perfect solar solution for your home or outdoor adventures.
                </p>
              </motion.div>
            </div>
          </section>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5" />
                      <span>Add Appliances</span>
                    </CardTitle>
                    <CardDescription>
                      Select appliances and specify their usage to calculate your power needs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Category Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {applianceCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Appliance Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Appliance
                      </label>
                      <select
                        value={selectedAppliance}
                        onChange={(e) => setSelectedAppliance(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select an appliance</option>
                        {applianceCategories
                          .find(cat => cat.id === selectedCategory)
                          ?.appliances.map((appliance) => (
                            <option key={appliance.name} value={appliance.name}>
                              {appliance.name} ({appliance.power}W)
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Custom Appliance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Appliance Name
                        </label>
                        <Input
                          value={customAppliance}
                          onChange={(e) => setCustomAppliance(e.target.value)}
                          placeholder="e.g., Custom Device"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Power (Watts)
                        </label>
                        <Input
                          type="number"
                          value={customPower}
                          onChange={(e) => setCustomPower(e.target.value)}
                          placeholder="e.g., 100"
                        />
                      </div>
                    </div>

                    {/* Usage Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hours per Day
                        </label>
                        <Input
                          type="number"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          placeholder="e.g., 8"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity
                        </label>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="e.g., 2"
                        />
                      </div>
                    </div>

                    <Button onClick={addAppliance} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Appliance
                    </Button>
                  </CardContent>
                </Card>

                {/* Added Appliances */}
                {appliances.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Appliances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {appliances.map((appliance) => {
                          const Icon = appliance.icon
                          return (
                            <div key={appliance.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Icon className="h-5 w-5 text-primary-600" />
                                <div>
                                  <h4 className="font-medium">{appliance.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    {appliance.power}W × {appliance.hours}h × {appliance.quantity} = {appliance.power * appliance.hours * appliance.quantity}Wh
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={appliance.hours}
                                  onChange={(e) => updateAppliance(appliance.id, 'hours', parseFloat(e.target.value) || 0)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                  placeholder="Hours"
                                />
                                <input
                                  type="number"
                                  value={appliance.quantity}
                                  onChange={(e) => updateAppliance(appliance.id, 'quantity', parseInt(e.target.value) || 1)}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                                  placeholder="Qty"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeAppliance(appliance.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                {/* Total Power */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Total Power Required</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        {totalPower.toLocaleString()} Wh
                      </div>
                      <div className="text-sm text-gray-500">
                        Per Day
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Products */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sun className="h-5 w-5" />
                      <span>Recommended Products</span>
                    </CardTitle>
                    <CardDescription>
                      Based on your power requirements: {totalPower.toLocaleString()} Wh/day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedProducts.map((product, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">{product.name}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  product.suitability === 'Perfect Match' 
                                    ? 'bg-green-100 text-green-800' 
                                    : product.suitability === 'Recommended'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {product.suitability}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{product.capacity}</p>
                              <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-sm text-gray-600">Compatible</span>
                                </div>
                                <a href={product.link}>
                                  <Button size="sm">
                                    View Details
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Our solar experts can help you find the perfect solution for your needs.
                    </p>
                    <Button className="w-full">
                      Get Free Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
