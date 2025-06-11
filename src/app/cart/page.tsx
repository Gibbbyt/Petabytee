'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Truck, 
  Shield, 
  Gift,
  Tag,
  Euro,
  Package,
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  CreditCard,
  Percent,
  Info,
  MapPin,
  Calendar,
  Zap
} from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  quantity: number;
  inStock: boolean;
  stockCount: number;
  isDigital: boolean;
  badge?: string;
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: any;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading cart data
    const timer = setTimeout(() => {
      setCartItems([
        {
          id: '1',
          title: 'Gaming PC RTX 4070 Super',
          description: 'High-performance gaming PC with RTX 4070 Super',
          price: 1599.99,
          originalPrice: 1799.99,
          image: '/products/gaming-pc-rtx4070.jpg',
          category: 'Hardware',
          brand: 'GameTech',
          quantity: 1,
          inStock: true,
          stockCount: 12,
          isDigital: false,
          badge: 'Sale'
        },
        {
          id: '2',
          title: 'Fortnite Premium Account',
          description: 'Premium Fortnite account with exclusive skins',
          price: 35.99,
          originalPrice: 49.99,
          image: '/products/fortnite-account.jpg',
          category: 'Gaming Accounts',
          brand: 'Epic Games',
          quantity: 1,
          inStock: true,
          stockCount: 25,
          isDigital: true,
          badge: 'Popular'
        },
        {
          id: '3',
          title: 'Razer DeathAdder V3 Gaming Mouse',
          description: 'Professional gaming mouse with 30,000 DPI sensor',
          price: 79.99,
          originalPrice: 99.99,
          image: '/products/razer-mouse.jpg',
          category: 'Accessories',
          brand: 'Razer',
          quantity: 2,
          inStock: true,
          stockCount: 31,
          isDigital: false,
          badge: 'Sale'
        }
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Free shipping for orders over €75',
      price: 0,
      estimatedDays: '5-7',
      icon: Truck
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Faster delivery with tracking',
      price: 9.99,
      estimatedDays: '2-3',
      icon: Zap
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      description: 'Next business day delivery',
      price: 24.99,
      estimatedDays: '1',
      icon: Clock
    }
  ];

  const availablePromoCodes: PromoCode[] = [
    {
      code: 'GAMING20',
      discount: 20,
      type: 'percentage',
      description: '20% off gaming products'
    },
    {
      code: 'FREESHIP',
      discount: 9.99,
      type: 'fixed',
      description: 'Free express shipping'
    },
    {
      code: 'NEWUSER15',
      discount: 15,
      type: 'percentage',
      description: '15% off for new users'
    }
  ];

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.min(newQuantity, item.stockCount) }
        : item
    ));
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const moveToWishlist = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      setWishlistItems(prev => [...prev, itemId]);
      removeItem(itemId);
    }
  };

  const applyPromoCode = () => {
    const promo = availablePromoCodes.find(p => 
      p.code.toLowerCase() === promoCode.toLowerCase()
    );
    
    if (promo) {
      setAppliedPromo(promo);
      setPromoCode('');
    } else {
      // Handle invalid promo code
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalSubtotal = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) * item.quantity), 0);
  
  const savings = originalSubtotal - subtotal;
  
  const promoDiscount = appliedPromo 
    ? appliedPromo.type === 'percentage' 
      ? subtotal * (appliedPromo.discount / 100)
      : appliedPromo.discount
    : 0;

  const shippingCost = cartItems.some(item => !item.isDigital) 
    ? (subtotal >= 75 && selectedShipping === 'standard' ? 0 : 
       shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0)
    : 0;

  const total = subtotal - promoDiscount + shippingCost;

  const physicalItems = cartItems.filter(item => !item.isDigital);
  const digitalItems = cartItems.filter(item => item.isDigital);

  return (
    <>
      <Navigation />
      
      <main className="flex-grow bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              {cartItems.length > 0 && (
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                </Badge>
              )}
            </div>
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-blue-600">Products</Link>
              <span>/</span>
              <span className="text-gray-900">Cart</span>
            </nav>
          </div>
        </section>

        {loading ? (
          <div className="container mx-auto px-4 py-12 text-center">
            <div className="loading-pulse mx-auto mb-4" />
            <p className="text-gray-600">Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="container mx-auto px-4 py-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. 
                Start shopping to find amazing products!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="px-8">
                    <Package className="w-5 h-5 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/store">
                  <Button size="lg" variant="outline" className="px-8">
                    <Gift className="w-5 h-5 mr-2" />
                    Browse Store
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Cart Content */
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Special Offers Banner */}
                <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Gift className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">Free shipping on orders over €75!</p>
                        <p className="text-sm text-blue-100">
                          Add €{Math.max(0, 75 - subtotal).toFixed(2)} more to qualify
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Physical Items */}
                {physicalItems.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Physical Items ({physicalItems.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {physicalItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-8 h-8 text-gray-400" />
                            {item.badge && (
                              <Badge className={`absolute -top-1 -left-1 text-xs ${
                                item.badge === 'Sale' ? 'bg-red-500' : 'bg-blue-500'
                              }`}>
                                {item.badge}
                              </Badge>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {item.category}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Price and Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-blue-600">
                                  €{item.price.toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    €{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Quantity Controls */}
                                <div className="flex items-center border rounded-lg">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-12 text-center font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.stockCount}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>

                                {/* Actions */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => moveToWishlist(item.id)}
                                >
                                  <Heart className="w-4 h-4 mr-2" />
                                  Save
                                </Button>
                              </div>
                            </div>

                            {/* Stock Info */}
                            <div className="flex items-center gap-2 mt-2 text-sm">
                              {item.inStock ? (
                                <span className="text-green-600 flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4" />
                                  In stock ({item.stockCount} available)
                                </span>
                              ) : (
                                <span className="text-red-600 flex items-center gap-1">
                                  <AlertTriangle className="w-4 h-4" />
                                  Out of stock
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Digital Items */}
                {digitalItems.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Digital Items ({digitalItems.length})
                        <Badge className="bg-green-500">Instant Delivery</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {digitalItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-green-50"
                        >
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Zap className="w-8 h-8 text-green-600" />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {item.category}
                                  </Badge>
                                  <Badge className="bg-green-500 text-xs">
                                    Digital
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Price and Quantity */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-blue-600">
                                  €{item.price.toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    €{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <div className="text-sm text-green-600 font-medium">
                                Qty: {item.quantity} • Instant Delivery
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Continue Shopping */}
                <div className="flex justify-between items-center">
                  <Link href="/products">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                  
                  <div className="text-sm text-gray-600">
                    Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                {/* Promo Code */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Promo Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appliedPromo ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-green-800">
                            {appliedPromo.code}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removePromoCode}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-green-600">{appliedPromo.description}</p>
                        <p className="text-sm font-medium text-green-800">
                          Discount: -€{promoDiscount.toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                          <Button 
                            onClick={applyPromoCode}
                            disabled={!promoCode.trim()}
                          >
                            Apply
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500">
                          Available codes: GAMING20, FREESHIP, NEWUSER15
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Shipping Options */}
                {physicalItems.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Shipping Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {shippingOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <div
                            key={option.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedShipping === option.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedShipping(option.id)}
                          >
                            <div className="flex items-center flex-1">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <Icon className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{option.name}</h4>
                                <p className="text-sm text-gray-600">{option.description}</p>
                                <p className="text-xs text-gray-500">{option.estimatedDays} business days</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {option.price === 0 ? 'Free' : `€${option.price.toFixed(2)}`}
                              </p>
                              {selectedShipping === option.id && (
                                <CheckCircle className="w-4 h-4 text-blue-600 ml-auto mt-1" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>You save</span>
                        <span>-€{savings.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo discount</span>
                        <span>-€{promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {physicalItems.length > 0 && (
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shippingCost === 0 ? 'Free' : `€${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                    )}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-blue-600">
                          €{total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Security Features */}
                    <div className="bg-gray-50 rounded-lg p-3 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4" />
                        <span>Secure checkout with SSL encryption</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Link href="/checkout">
                      <Button size="lg" className="w-full mt-4">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>

                    {/* Payment Methods */}
                    <div className="text-center text-xs text-gray-500 mt-3">
                      We accept: Visa, Mastercard, PayPal, Bank Transfer
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>30-day money back guarantee</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <span>Free shipping on orders over €75</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span>4.8/5 customer satisfaction rating</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}