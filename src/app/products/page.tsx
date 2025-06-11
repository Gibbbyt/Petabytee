'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingCart,
  Heart,
  Eye,
  Package,
  Truck,
  Shield,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Euro,
  Tag,
  Gamepad2,
  Monitor,
  Headphones,
  Keyboard,
  Mouse,
  Smartphone,
  Tablet,
  Camera,
  Watch,
  Gift,
  Mail,
  Zap,
  Award,
  TrendingUp,
  Percent,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  badge?: string;
  tags: string[];
  specifications: { [key: string]: string };
}

interface FilterState {
  category: string;
  priceRange: [number, number];
  brand: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: [0, 2000],
    brand: [],
    inStock: true,
    featured: false,
    rating: 0
  });
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const products: Product[] = [
    {
      id: '1',
      title: 'Gaming PC RTX 4070 Super',
      description: 'High-performance gaming PC with RTX 4070 Super, Intel i7-13700F, 32GB DDR5 RAM',
      price: 1599.99,
      originalPrice: 1799.99,
      image: '/products/gaming-pc-rtx4070.jpg',
      category: 'Hardware',
      subcategory: 'Desktop PCs',
      brand: 'GameTech',
      rating: 4.9,
      reviewCount: 45,
      inStock: true,
      stockCount: 12,
      featured: true,
      badge: 'Sale',
      tags: ['Gaming', 'High-End', 'RTX', 'Intel'],
      specifications: {
        'CPU': 'Intel i7-13700F',
        'GPU': 'RTX 4070 Super',
        'RAM': '32GB DDR5',
        'Storage': '1TB NVMe SSD',
        'Case': 'RGB Tempered Glass'
      }
    },
    {
      id: '2',
      title: 'Fortnite Premium Account',
      description: 'Premium Fortnite account with exclusive skins, V-Bucks, and rare items',
      price: 35.99,
      originalPrice: 49.99,
      image: '/products/fortnite-account.jpg',
      category: 'Gaming Accounts',
      subcategory: 'Battle Royale',
      brand: 'Epic Games',
      rating: 4.7,
      reviewCount: 128,
      inStock: true,
      stockCount: 25,
      featured: true,
      badge: 'Popular',
      tags: ['Fortnite', 'Skins', 'V-Bucks', 'Premium'],
      specifications: {
        'Level': '100+',
        'V-Bucks': '5000+',
        'Skins': '50+ Exclusive',
        'Emotes': '25+ Rare',
        'Platform': 'All Platforms'
      }
    },
    {
      id: '3',
      title: 'Steam Gift Card €50',
      description: 'Digital Steam gift card for purchasing games and content',
      price: 50.00,
      image: '/products/steam-card.jpg',
      category: 'Gift Cards',
      subcategory: 'Gaming',
      brand: 'Steam',
      rating: 5.0,
      reviewCount: 89,
      inStock: true,
      stockCount: 100,
      featured: false,
      tags: ['Steam', 'Digital', 'Gift Card'],
      specifications: {
        'Value': '€50',
        'Type': 'Digital Code',
        'Delivery': 'Instant',
        'Region': 'Global',
        'Expiry': 'No Expiry'
      }
    },
    {
      id: '4',
      title: 'PS5 Controller Cosmic Red',
      description: 'Official Sony PS5 DualSense controller in Cosmic Red color',
      price: 69.99,
      image: '/products/ps5-controller-red.jpg',
      category: 'Accessories',
      subcategory: 'Controllers',
      brand: 'Sony',
      rating: 4.8,
      reviewCount: 67,
      inStock: true,
      stockCount: 18,
      featured: false,
      tags: ['PS5', 'Controller', 'Sony', 'Cosmic Red'],
      specifications: {
        'Compatibility': 'PS5, PC',
        'Color': 'Cosmic Red',
        'Features': 'Haptic Feedback',
        'Connectivity': 'Bluetooth, USB-C',
        'Battery': '12-15 hours'
      }
    },
    {
      id: '5',
      title: 'Razer DeathAdder V3 Gaming Mouse',
      description: 'Professional gaming mouse with 30,000 DPI sensor and ergonomic design',
      price: 79.99,
      originalPrice: 99.99,
      image: '/products/razer-mouse.jpg',
      category: 'Accessories',
      subcategory: 'Gaming Mice',
      brand: 'Razer',
      rating: 4.6,
      reviewCount: 234,
      inStock: true,
      stockCount: 31,
      featured: false,
      badge: 'Sale',
      tags: ['Gaming Mouse', 'Razer', 'RGB', '30K DPI'],
      specifications: {
        'DPI': '30,000',
        'Sensor': 'Focus Pro',
        'Buttons': '8 Programmable',
        'Lighting': 'Chroma RGB',
        'Weight': '59g'
      }
    },
    {
      id: '6',
      title: 'Corsair K95 RGB Platinum',
      description: 'Mechanical gaming keyboard with Cherry MX switches and RGB lighting',
      price: 199.99,
      image: '/products/corsair-keyboard.jpg',
      category: 'Accessories',
      subcategory: 'Gaming Keyboards',
      brand: 'Corsair',
      rating: 4.7,
      reviewCount: 156,
      inStock: true,
      stockCount: 8,
      featured: true,
      badge: 'Featured',
      tags: ['Gaming Keyboard', 'Mechanical', 'RGB', 'Cherry MX'],
      specifications: {
        'Switch Type': 'Cherry MX Speed',
        'Backlighting': 'Per-key RGB',
        'Layout': 'Full Size',
        'Features': 'Media Controls',
        'Connection': 'USB-A'
      }
    },
    {
      id: '7',
      title: 'EasyMail-In Repair Service',
      description: 'Convenient mail-in repair service for gaming devices and PCs',
      price: 29.99,
      image: '/products/mail-repair.jpg',
      category: 'Services',
      subcategory: 'Repair',
      brand: 'GameTech',
      rating: 4.5,
      reviewCount: 78,
      inStock: true,
      stockCount: 50,
      featured: false,
      tags: ['Repair', 'Mail-In', 'Convenient', 'Professional'],
      specifications: {
        'Service Type': 'Mail-In Repair',
        'Turnaround': '3-7 days',
        'Coverage': 'All Devices',
        'Shipping': 'Free Both Ways',
        'Warranty': '30 days'
      }
    },
    {
      id: '8',
      title: 'HyperX Cloud II Gaming Headset',
      description: '7.1 surround sound gaming headset with noise-cancelling microphone',
      price: 99.99,
      originalPrice: 129.99,
      image: '/products/hyperx-headset.jpg',
      category: 'Accessories',
      subcategory: 'Gaming Headsets',
      brand: 'HyperX',
      rating: 4.8,
      reviewCount: 312,
      inStock: true,
      stockCount: 22,
      featured: true,
      badge: 'Sale',
      tags: ['Gaming Headset', '7.1 Surround', 'HyperX', 'Comfort'],
      specifications: {
        'Driver': '53mm Neodymium',
        'Frequency': '15Hz-25KHz',
        'Microphone': 'Noise-Cancelling',
        'Connection': '3.5mm, USB',
        'Weight': '320g'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: products.length },
    { id: 'Hardware', name: 'Hardware', count: products.filter(p => p.category === 'Hardware').length },
    { id: 'Gaming Accounts', name: 'Gaming Accounts', count: products.filter(p => p.category === 'Gaming Accounts').length },
    { id: 'Gift Cards', name: 'Gift Cards', count: products.filter(p => p.category === 'Gift Cards').length },
    { id: 'Accessories', name: 'Accessories', count: products.filter(p => p.category === 'Accessories').length },
    { id: 'Services', name: 'Services', count: products.filter(p => p.category === 'Services').length }
  ];

  const brands = Array.from(new Set(products.map(p => p.brand)));

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rating' },
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filters.category === '' || filters.category === 'all' || product.category === filters.category;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const matchesStock = !filters.inStock || product.inStock;
    const matchesFeatured = !filters.featured || product.featured;
    const matchesRating = product.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesStock && matchesFeatured && matchesRating;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id.localeCompare(a.id);
      case 'popular': return b.reviewCount - a.reviewCount;
      default: return b.featured ? 1 : -1;
    }
  });

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 2000],
      brand: [],
      inStock: true,
      featured: false,
      rating: 0
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value !== '';
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 2000;
    return false;
  }).length;

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Package className="w-10 h-10 text-blue-400" />
                <h1 className="text-4xl md:text-6xl font-bold">Our Products</h1>
              </div>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Discover our complete catalog of gaming products, services, and digital goods
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-12 pr-4 py-3 text-lg bg-white/10 backdrop-blur border-white/20 text-white placeholder-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Results Count */}
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Showing {sortedProducts.length} of {products.length} products
                </span>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters ({activeFiltersCount})
                  </Button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex rounded-lg border">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Sidebar Filters */}
              {showFilters && (
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="w-80 flex-shrink-0"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Filters</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFilters(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Categories */}
                      <div>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 ${
                                filters.category === category.id ? 'bg-blue-50 text-blue-600' : ''
                              }`}
                              onClick={() => setFilters(prev => ({ ...prev, category: category.id }))}
                            >
                              <span className="text-sm">{category.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {category.count}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div>
                        <h3 className="font-semibold mb-3">Price Range</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Min"
                              value={filters.priceRange[0]}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                priceRange: [Number(e.target.value), prev.priceRange[1]]
                              }))}
                              className="w-20"
                            />
                            <span>-</span>
                            <Input
                              type="number"
                              placeholder="Max"
                              value={filters.priceRange[1]}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                priceRange: [prev.priceRange[0], Number(e.target.value)]
                              }))}
                              className="w-20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Brands */}
                      <div>
                        <h3 className="font-semibold mb-3">Brands</h3>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                              <Checkbox
                                id={brand}
                                checked={filters.brand.includes(brand)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFilters(prev => ({
                                      ...prev,
                                      brand: [...prev.brand, brand]
                                    }));
                                  } else {
                                    setFilters(prev => ({
                                      ...prev,
                                      brand: prev.brand.filter(b => b !== brand)
                                    }));
                                  }
                                }}
                              />
                              <label htmlFor={brand} className="text-sm">
                                {brand}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Other Filters */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="inStock"
                            checked={filters.inStock}
                            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, inStock: !!checked }))}
                          />
                          <label htmlFor="inStock" className="text-sm">In Stock Only</label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="featured"
                            checked={filters.featured}
                            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, featured: !!checked }))}
                          />
                          <label htmlFor="featured" className="text-sm">Featured Products</label>
                        </div>
                      </div>

                      {/* Rating Filter */}
                      <div>
                        <h3 className="font-semibold mb-3">Minimum Rating</h3>
                        <div className="space-y-2">
                          {[4, 3, 2, 1].map((rating) => (
                            <div
                              key={rating}
                              className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-50 ${
                                filters.rating === rating ? 'bg-blue-50 text-blue-600' : ''
                              }`}
                              onClick={() => setFilters(prev => ({ ...prev, rating }))}
                            >
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                                <span className="ml-2 text-sm">& Up</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Products Grid/List */}
              <div className="flex-1">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="loading-pulse mx-auto mb-4" />
                    <p className="text-gray-600">Loading products...</p>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}>
                    {sortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={viewMode === 'list' ? 'w-full' : ''}
                      >
                        <Card className={`h-full hover:shadow-xl transition-all duration-300 group ${
                          viewMode === 'list' ? 'flex flex-row' : ''
                        }`}>
                          {/* Product Image */}
                          <div className={`relative ${
                            viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                          } bg-gray-100 rounded-t-lg overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <Package className="w-12 h-12 text-gray-400" />
                            </div>
                            
                            {/* Badges */}
                            <div className="absolute top-2 left-2 space-y-1">
                              {product.badge && (
                                <Badge className={`${
                                  product.badge === 'Sale' ? 'bg-red-500' :
                                  product.badge === 'Popular' ? 'bg-blue-500' :
                                  product.badge === 'New' ? 'bg-green-500' :
                                  'bg-purple-500'
                                }`}>
                                  {product.badge}
                                </Badge>
                              )}
                              {product.featured && (
                                <Badge className="bg-yellow-500 text-yellow-900">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>

                            {/* Quick Actions */}
                            <div className="absolute top-2 right-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-8 h-8 p-0"
                                onClick={() => toggleWishlist(product.id)}
                              >
                                <Heart className={`w-4 h-4 ${
                                  wishlist.includes(product.id) ? 'fill-current text-red-500' : ''
                                }`} />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-8 h-8 p-0"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Stock Indicator */}
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-semibold">Out of Stock</span>
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                            <div className="mb-2">
                              <Badge variant="outline" className="text-xs mb-2">
                                {product.category}
                              </Badge>
                              <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {product.description}
                              </p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating) 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                ({product.reviewCount})
                              </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-2xl font-bold text-blue-600">
                                €{product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                  €{product.originalPrice.toFixed(2)}
                                </span>
                              )}
                              {product.originalPrice && (
                                <Badge variant="outline" className="text-green-600">
                                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                </Badge>
                              )}
                            </div>

                            {/* Stock Info */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                              <Package className="w-4 h-4" />
                              {product.inStock ? (
                                <span className="text-green-600">
                                  {product.stockCount} in stock
                                </span>
                              ) : (
                                <span className="text-red-600">Out of stock</span>
                              )}
                            </div>

                            {/* Actions */}
                            <Button 
                              className="w-full mb-2" 
                              disabled={!product.inStock || cart.includes(product.id)}
                              onClick={() => addToCart(product.id)}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                            </Button>

                            {viewMode === 'list' && (
                              <div className="mt-4">
                                <h4 className="font-semibold text-sm mb-2">Key Specifications:</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="text-gray-600">{key}:</span>
                                      <span className="font-medium">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!loading && sortedProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Load More */}
                {!loading && sortedProducts.length > 0 && sortedProducts.length < products.length && (
                  <div className="text-center mt-12">
                    <Button size="lg" variant="outline">
                      Load More Products
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}