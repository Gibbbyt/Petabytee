'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ShoppingCart, 
  CreditCard, 
  Gift, 
  Mail,
  Star,
  Users,
  Clock,
  Shield,
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
  Euro,
  Percent,
  Zap,
  Award,
  Heart,
  Package,
  Truck,
  Gamepad2,
  Monitor,
  Headphones,
  Keyboard,
  Mouse,
  Smartphone,
  Tablet,
  Camera,
  Watch,
  Sparkles
} from 'lucide-react';

interface StoreCategory {
  id: string;
  title: string;
  titleAl: string;
  description: string;
  descriptionAl: string;
  icon: any;
  href: string;
  itemCount: number;
  featured: boolean;
  color: string;
  bgColor: string;
}

interface FeaturedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  inStock: boolean;
  badge?: string;
}

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const storeCategories: StoreCategory[] = [
    {
      id: 'accounts',
      title: 'Gaming Accounts',
      titleAl: 'Llogaritë Gaming',
      description: 'Premium gaming accounts for various platforms and games',
      descriptionAl: 'Llogaritë premium gaming për platforma dhe lojra të ndryshme',
      icon: Gamepad2,
      href: '/store/accounts',
      itemCount: 150,
      featured: true,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      titleAl: 'Kartat Dhuratë',
      description: 'Gift cards for popular gaming platforms and services',
      descriptionAl: 'Kartat dhuratë për platformat dhe shërbimet popullore gaming',
      icon: Gift,
      href: '/store/gift-cards',
      itemCount: 50,
      featured: true,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'easy-mail-in',
      title: 'EasyMail-In Service',
      titleAl: 'Shërbimi EasyMail-In',
      description: 'Convenient mail-in repair and service solutions',
      descriptionAl: 'Zgjidhje të përshtatshme riparimi dhe shërbimi me postë',
      icon: Mail,
      href: '/store/easy-mail-in',
      itemCount: 25,
      featured: true,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'hardware',
      title: 'Hardware',
      titleAl: 'Hardware',
      description: 'PC components, peripherals, and gaming hardware',
      descriptionAl: 'Komponentë PC-je, periferikë dhe hardware gaming',
      icon: Monitor,
      href: '/store/hardware',
      itemCount: 300,
      featured: false,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'accessories',
      title: 'Accessories',
      titleAl: 'Aksesorë',
      description: 'Gaming accessories, peripherals, and add-ons',
      descriptionAl: 'Aksesorë gaming, periferikë dhe shtesa',
      icon: Headphones,
      href: '/store/accessories',
      itemCount: 200,
      featured: false,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      id: 'software',
      title: 'Software',
      titleAl: 'Software',
      description: 'Gaming software, licenses, and digital products',
      descriptionAl: 'Software gaming, licenca dhe produkte dixhitale',
      icon: Package,
      href: '/store/software',
      itemCount: 100,
      featured: false,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const featuredProducts: FeaturedProduct[] = [
    {
      id: '1',
      title: 'Fortnite Premium Account',
      price: 25.99,
      originalPrice: 39.99,
      image: '/products/fortnite-account.jpg',
      rating: 4.8,
      reviewCount: 124,
      category: 'Gaming Accounts',
      inStock: true,
      badge: 'Sale'
    },
    {
      id: '2',
      title: 'Steam Gift Card €50',
      price: 50.00,
      image: '/products/steam-card.jpg',
      rating: 5.0,
      reviewCount: 89,
      category: 'Gift Cards',
      inStock: true,
      badge: 'Popular'
    },
    {
      id: '3',
      title: 'Gaming PC - RTX 4070',
      price: 1299.99,
      originalPrice: 1499.99,
      image: '/products/gaming-pc.jpg',
      rating: 4.9,
      reviewCount: 56,
      category: 'Hardware',
      inStock: true,
      badge: 'Featured'
    },
    {
      id: '4',
      title: 'PS5 Controller Custom',
      price: 89.99,
      image: '/products/ps5-controller.jpg',
      rating: 4.7,
      reviewCount: 78,
      category: 'Accessories',
      inStock: true
    },
    {
      id: '5',
      title: 'EasyMail Repair Kit',
      price: 15.99,
      image: '/products/repair-kit.jpg',
      rating: 4.6,
      reviewCount: 34,
      category: 'Services',
      inStock: true,
      badge: 'New'
    },
    {
      id: '6',
      title: 'Razer Gaming Headset',
      price: 159.99,
      originalPrice: 199.99,
      image: '/products/headset.jpg',
      rating: 4.8,
      reviewCount: 92,
      category: 'Accessories',
      inStock: true,
      badge: 'Sale'
    }
  ];

  const stats = [
    { value: '5000+', label: 'Products Available', labelAl: 'Produkte të Disponueshme', icon: Package },
    { value: '98%', label: 'Customer Satisfaction', labelAl: 'Kënaqësi Klientësh', icon: Star },
    { value: '24h', label: 'Fast Delivery', labelAl: 'Dorëzim i Shpejtë', icon: Truck },
    { value: '2000+', label: 'Happy Customers', labelAl: 'Klientë të Kënaqur', icon: Users }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure Payments',
      titleAl: 'Pagesa të Sigurta',
      description: 'All transactions are protected with advanced encryption',
      descriptionAl: 'Të gjitha transaksionet janë të mbrojtura me enkriptim të avancuar'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      titleAl: 'Dorëzim i Shpejtë',
      description: 'Quick delivery for digital products and fast shipping for physical items',
      descriptionAl: 'Dorëzim i shpejtë për produkte dixhitale dhe transport të shpejtë për artikuj fizikë'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      titleAl: 'Garanci Cilësie',
      description: 'All products come with quality assurance and warranty',
      descriptionAl: 'Të gjitha produktet vijnë me siguri cilësie dhe garanci'
    },
    {
      icon: Heart,
      title: '24/7 Support',
      titleAl: 'Mbështetje 24/7',
      description: 'Round-the-clock customer support for all your needs',
      descriptionAl: 'Mbështetje e klientëve 24 orë për të gjitha nevojat tuaja'
    }
  ];

  const deals = [
    {
      title: 'Weekend Flash Sale',
      titleAl: 'Shitje Flash Fundjavë',
      description: 'Up to 50% off selected gaming accounts',
      descriptionAl: 'Deri në 50% zbritje për llogaritë gaming të zgjedhura',
      discount: '50%',
      validUntil: '2024-03-15',
      bgColor: 'bg-red-500'
    },
    {
      title: 'Gift Card Bonus',
      titleAl: 'Bonus Kartë Dhuratë',
      description: 'Buy €100 gift card, get €20 bonus',
      descriptionAl: 'Blini kartë dhuratë €100, merrni bonus €20',
      discount: '+20%',
      validUntil: '2024-03-20',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Free Shipping',
      titleAl: 'Transport Falas',
      description: 'Free shipping on orders over €75',
      descriptionAl: 'Transport falas për porositë mbi €75',
      discount: 'FREE',
      validUntil: '2024-03-31',
      bgColor: 'bg-blue-500'
    }
  ];

  const filteredCategories = searchTerm 
    ? storeCategories.filter(category => 
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : storeCategories;

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          {/* Animated background elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <ShoppingCart className="w-12 h-12 text-purple-400" />
                <h1 className="text-5xl md:text-7xl font-bold">Game Store</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Your one-stop destination for gaming accounts, gift cards, hardware, and digital services. 
                Premium quality at unbeatable prices.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search products, categories, or services..."
                    className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur border-white/20 text-white placeholder-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Browse Store
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 text-lg px-8">
                  <Percent className="w-5 h-5 mr-2" />
                  View Deals
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Current Deals */}
        <section className="py-16 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 text-white">
              <h2 className="text-4xl font-bold mb-4">🔥 Hot Deals & Offers</h2>
              <p className="text-xl text-white/80">Limited time offers you can't miss!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {deals.map((deal, index) => (
                <motion.div
                  key={deal.title}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="relative overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur text-white">
                    <div className={`absolute top-0 right-0 ${deal.bgColor} text-white px-4 py-2 rounded-bl-lg font-bold text-lg`}>
                      {deal.discount}
                    </div>
                    <CardContent className="p-6 pt-12">
                      <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                      <p className="text-white/80 mb-4">{deal.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">
                          Valid until: {new Date(deal.validUntil).toLocaleDateString()}
                        </span>
                        <Button size="sm" variant="secondary">
                          Shop Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-purple-600" />
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

        {/* Store Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our diverse range of products across different categories
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="loading-pulse mx-auto mb-4" />
                <p className="text-gray-600">Loading categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={category.href}>
                        <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                          <CardHeader className="text-center pb-4">
                            <div className="relative">
                              <div className={`w-20 h-20 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-10 h-10 ${category.color}`} />
                              </div>
                              {category.featured && (
                                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl">{category.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="text-center">
                            <p className="text-gray-600 mb-4">{category.description}</p>
                            
                            <div className="flex justify-center items-center text-sm text-gray-500 mb-4">
                              <Package className="w-4 h-4 mr-1" />
                              <span>{category.itemCount} items</span>
                            </div>
                            
                            <Button className="w-full group-hover:bg-purple-600">
                              Browse Category
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hand-picked products with the best value and highest customer satisfaction
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 rounded-t-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <Package className="w-12 h-12 text-gray-500" />
                        </div>
                        {product.badge && (
                          <Badge className={`absolute top-2 left-2 ${
                            product.badge === 'Sale' ? 'bg-red-500' :
                            product.badge === 'Popular' ? 'bg-blue-500' :
                            product.badge === 'New' ? 'bg-green-500' :
                            'bg-purple-500'
                          }`}>
                            {product.badge}
                          </Badge>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs mb-2">
                          {product.category}
                        </Badge>
                        <h3 className="font-bold text-lg">{product.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviewCount})</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-purple-600">
                          €{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            €{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        disabled={!product.inStock}
                        variant={product.inStock ? "default" : "secondary"}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" variant="outline">
                  View All Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to providing the best shopping experience with premium products and exceptional service
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
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-purple-600" />
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

        {/* Newsletter Signup */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, exclusive deals, and gaming news.
              </p>
              
              <div className="max-w-md mx-auto flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60"
                />
                <Button variant="secondary" size="lg">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-purple-200 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}