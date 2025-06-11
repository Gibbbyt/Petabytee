'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Monitor, 
  Gamepad2, 
  Code2, 
  Printer, 
  Wrench, 
  Building2,
  Star,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Award,
  Sparkles,
  TrendingUp,
  Euro,
  Heart,
  Globe
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  titleAl: string;
  description: string;
  descriptionAl: string;
  icon: any;
  href: string;
  category: string;
  pricing: string;
  duration: string;
  featured: boolean;
  color: string;
  bgColor: string;
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const services: Service[] = [
    {
      id: 'pc-configurator',
      title: 'PC Configurator',
      titleAl: 'PC Konfigurator',
      description: 'Custom PC building with AI-powered recommendations for optimal performance',
      descriptionAl: 'Ndërtim PC-je të personalizuar me rekomandime AI për performancë optimale',
      icon: Monitor,
      href: '/services/pc-configurator',
      category: 'hardware',
      pricing: 'From €50',
      duration: '2-3 days',
      featured: true,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'ps5-configurator',
      title: 'PS5 Controller Customization',
      titleAl: 'Personalizim Kontrollerash PS5',
      description: 'Design and customize your PS5 controllers with premium materials',
      descriptionAl: 'Dizajno dhe personalizo kontrollerat e PS5 me materiale premium',
      icon: Gamepad2,
      href: '/services/ps5-configurator',
      category: 'gaming',
      pricing: 'From €35',
      duration: '1-2 days',
      featured: true,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'gaming-center',
      title: 'Gaming Center Setup',
      titleAl: 'Setup i Qendrës Gaming',
      description: 'Complete gaming center solutions for businesses and communities',
      descriptionAl: 'Zgjidhje të plota për qendra gaming për biznese dhe komunitete',
      icon: Building2,
      href: '/services/gaming-center',
      category: 'business',
      pricing: 'Custom Quote',
      duration: '2-4 weeks',
      featured: true,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'ai-development',
      title: 'AI Development',
      titleAl: 'Zhvillim AI',
      description: 'Custom AI solutions and machine learning implementations',
      descriptionAl: 'Zgjidhje AI të personalizuara dhe implementime machine learning',
      icon: Code2,
      href: '/services/ai-development',
      category: 'software',
      pricing: 'From €200/h',
      duration: '1-6 months',
      featured: false,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: '3d-printing',
      title: '3D Printing',
      titleAl: '3D Printing',
      description: 'Professional 3D printing services for prototypes and production',
      descriptionAl: 'Shërbime profesionale 3D printing për prototipe dhe prodhim',
      icon: Printer,
      href: '/services/3d-printing',
      category: 'manufacturing',
      pricing: 'From €5',
      duration: '1-5 days',
      featured: false,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      id: 'pc-optimization',
      title: 'PC Optimization',
      titleAl: 'Optimizim PC',
      description: 'Performance optimization and system upgrades for existing PCs',
      descriptionAl: 'Optimizim performancë dhe upgrade sistemi për PC ekzistuese',
      icon: Zap,
      href: '/services/pc-optimization',
      category: 'hardware',
      pricing: 'From €25',
      duration: '1 day',
      featured: false,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 'repair-services',
      title: 'Repair Services',
      titleAl: 'Shërbime Riparimi',
      description: 'Professional repair services for all tech devices with warranty',
      descriptionAl: 'Shërbime profesionale riparimi për të gjitha pajisjet teknologjike me garanci',
      icon: Wrench,
      href: '/repair-services',
      category: 'support',
      pricing: 'From €15',
      duration: '1-7 days',
      featured: true,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', nameAl: 'Të Gjitha' },
    { id: 'hardware', name: 'Hardware', nameAl: 'Hardware' },
    { id: 'gaming', name: 'Gaming', nameAl: 'Gaming' },
    { id: 'software', name: 'Software', nameAl: 'Software' },
    { id: 'business', name: 'Business', nameAl: 'Biznes' },
    { id: 'manufacturing', name: 'Manufacturing', nameAl: 'Prodhim' },
    { id: 'support', name: 'Support', nameAl: 'Mbështetje' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const featuredServices = services.filter(service => service.featured);

  const stats = [
    { value: '1000+', label: 'Completed Projects', labelAl: 'Projekte të Kompletuar', icon: CheckCircle },
    { value: '98%', label: 'Client Satisfaction', labelAl: 'Kënaqësi Klientësh', icon: Star },
    { value: '24/7', label: 'Support Available', labelAl: 'Mbështetje e Disponueshme', icon: Clock },
    { value: '50+', label: 'Expert Technicians', labelAl: 'Teknikë Ekspertë', icon: Users }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Quality Guarantee',
      titleAl: 'Garanci Cilësie',
      description: 'All our services come with comprehensive warranty and quality assurance',
      descriptionAl: 'Të gjitha shërbimet tona vijnë me garanci dhe siguri cilësie të plotë'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      titleAl: 'Dorëzim i Shpejtë',
      description: 'Quick turnaround times without compromising on quality',
      descriptionAl: 'Kohë të shpejta përfundimi pa kompromituar cilësinë'
    },
    {
      icon: Award,
      title: 'Expert Team',
      titleAl: 'Ekip Ekspertësh',
      description: 'Certified professionals with years of experience in tech',
      descriptionAl: 'Profesionistë të certifikuar me vite përvojë në teknologji'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      titleAl: 'Fokus në Klient',
      description: 'Your satisfaction is our priority, we go above and beyond',
      descriptionAl: 'Kënaqësia juaj është prioriteti ynë, bëjmë më shumë se pritni'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Arben Mustafa',
      company: 'Tech Startup',
      rating: 5,
      comment: 'Exceptional service! They built the perfect PC for my gaming setup. Professional, fast, and reliable.',
      commentAl: 'Shërbim i jashtëzakonshëm! Më ndërtuan PC-in perfekt për setup-in tim gaming. Profesionalë, të shpejtë dhe të besueshëm.',
      service: 'PC Configurator'
    },
    {
      id: 2,
      name: 'Valdete Krasniqi',
      company: 'Digital Agency',
      rating: 5,
      comment: 'Their AI development team created exactly what we needed. Innovative solutions and great communication.',
      commentAl: 'Ekipi i zhvillimit AI krijoi pikërisht atë që na duhej. Zgjidhje inovative dhe komunikim i shkëlqyer.',
      service: 'AI Development'
    },
    {
      id: 3,
      name: 'Driton Berisha',
      company: 'Gaming Center',
      rating: 5,
      comment: 'Complete gaming center setup was flawless. They handled everything from planning to execution.',
      commentAl: 'Setup-i i plotë i qendrës gaming ishte i përsosur. Menaxhuan gjithçka nga planifikimi në ekzekutim.',
      service: 'Gaming Center'
    }
  ];

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          {/* Animated background elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-12 h-12 text-blue-400" />
                <h1 className="text-5xl md:text-7xl font-bold">Our Services</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Comprehensive technology solutions designed to elevate your digital experience. 
                From custom PC builds to enterprise AI solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8">
                  <Globe className="w-5 h-5 mr-2" />
                  Get Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our most popular and highly-rated services that have helped thousands of customers achieve their goals
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                      <CardHeader className="text-center pb-4">
                        <div className="relative">
                          <div className={`w-20 h-20 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-10 h-10 ${service.color}`} />
                          </div>
                          <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Euro className="w-3 h-3" />
                            {service.pricing}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.duration}
                          </span>
                        </div>
                        
                        <Link href={service.href}>
                          <Button className="w-full group-hover:bg-blue-600">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">All Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Explore our complete range of technology services across different categories
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="min-w-24"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Services Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="loading-pulse mx-auto mb-4" />
                <p className="text-gray-600">Loading services...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow group">
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                            <Icon className={`w-6 h-6 ${service.color}`} />
                          </div>
                          
                          <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                            <span>{service.pricing}</span>
                            <span>{service.duration}</span>
                          </div>
                          
                          <Link href={service.href}>
                            <Button size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering exceptional value through our comprehensive approach to technology solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center h-full">
                      <CardContent className="p-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real feedback from satisfied customers who have experienced our services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                      
                      <Badge variant="outline" className="text-xs">
                        {testimonial.service}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us with their technology needs. 
                Let's build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Get Free Quote
                  </Button>
                </Link>
                <Link href="/support">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}