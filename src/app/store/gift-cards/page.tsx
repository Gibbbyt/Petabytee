'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard,
  Gift,
  ShoppingCart,
  Star,
  Check,
  Zap,
  Mail,
  Download,
  Euro
} from 'lucide-react';

interface GiftCard {
  id: string;
  type: 'STEAM' | 'PSN';
  value: number;
  price: number;
  discount?: number;
  popular?: boolean;
  description: string;
  descriptionEn: string;
}

export default function GiftCardsPage() {
  const { t, language } = useLanguage();
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<{[key: string]: number}>({});
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    // For now, using static data - in production this would come from API
    const cards: GiftCard[] = [
      // Steam Cards
      {
        id: 'steam-10',
        type: 'STEAM',
        value: 10,
        price: 11.99,
        description: 'Kartelë dhuratë Steam 10€',
        descriptionEn: 'Steam Gift Card 10€'
      },
      {
        id: 'steam-20',
        type: 'STEAM',
        value: 20,
        price: 22.99,
        popular: true,
        description: 'Kartelë dhuratë Steam 20€',
        descriptionEn: 'Steam Gift Card 20€'
      },
      {
        id: 'steam-50',
        type: 'STEAM',
        value: 50,
        price: 54.99,
        description: 'Kartelë dhuratë Steam 50€',
        descriptionEn: 'Steam Gift Card 50€'
      },
      {
        id: 'steam-100',
        type: 'STEAM',
        value: 100,
        price: 109.99,
        description: 'Kartelë dhuratë Steam 100€',
        descriptionEn: 'Steam Gift Card 100€'
      },
      // PSN Cards
      {
        id: 'psn-10',
        type: 'PSN',
        value: 10,
        price: 11.99,
        description: 'PlayStation Network 10€',
        descriptionEn: 'PlayStation Network 10€'
      },
      {
        id: 'psn-20',
        type: 'PSN',
        value: 20,
        price: 22.99,
        popular: true,
        description: 'PlayStation Network 20€',
        descriptionEn: 'PlayStation Network 20€'
      },
      {
        id: 'psn-50',
        type: 'PSN',
        value: 50,
        price: 54.99,
        description: 'PlayStation Network 50€',
        descriptionEn: 'PlayStation Network 50€'
      },
      {
        id: 'psn-100',
        type: 'PSN',
        value: 100,
        price: 109.99,
        description: 'PlayStation Network 100€',
        descriptionEn: 'PlayStation Network 100€'
      }
    ];

    setGiftCards(cards);
    setLoading(false);
  }, []);

  const addToCart = (cardId: string) => {
    setSelectedCards(prev => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + 1
    }));
  };

  const removeFromCart = (cardId: string) => {
    setSelectedCards(prev => {
      const newCart = { ...prev };
      if (newCart[cardId] > 1) {
        newCart[cardId] -= 1;
      } else {
        delete newCart[cardId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(selectedCards).reduce((total, [cardId, quantity]) => {
      const card = giftCards.find(c => c.id === cardId);
      return total + (card ? card.price * quantity : 0);
    }, 0);
  };

  const handlePurchase = async () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert(language === 'sq' 
        ? 'Ju lutem plotësoni të gjitha fushat e detyrueshme'
        : 'Please fill in all required fields'
      );
      return;
    }

    setPurchasing(true);
    try {
      const orderItems = Object.entries(selectedCards).map(([cardId, quantity]) => {
        const card = giftCards.find(c => c.id === cardId);
        return {
          productId: cardId,
          quantity,
          price: card?.price || 0,
          customizations: {
            type: 'GIFT_CARD',
            cardType: card?.type,
            value: card?.value
          }
        };
      });

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'GIFT_CARD',
          items: orderItems,
          shippingAddress: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: 'Digital Delivery',
            city: 'Online',
            postalCode: '00000',
            country: 'Kosovo'
          },
          notes: 'Gift card purchase - digital delivery',
          language: language
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(language === 'sq' 
          ? `Blerja u krye me sukses! Numri i porosisë: ${data.order.orderNumber}. Kartelat do të dërgohen në email-in tuaj brenda 24 orëve.`
          : `Purchase successful! Order number: ${data.order.orderNumber}. Cards will be sent to your email within 24 hours.`
        );
        
        // Reset form
        setSelectedCards({});
        setCustomerInfo({ email: '', name: '', phone: '' });
      } else {
        throw new Error('Failed to process order');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      alert(language === 'sq' 
        ? 'Gabim në procesimin e porosisë'
        : 'Error processing order'
      );
    } finally {
      setPurchasing(false);
    }
  };

  const steamCards = giftCards.filter(card => card.type === 'STEAM');
  const psnCards = giftCards.filter(card => card.type === 'PSN');

  const features = [
    {
      icon: Zap,
      title: language === 'sq' ? 'Aktivizim i Menjëhershëm' : 'Instant Activation',
      description: language === 'sq' 
        ? 'Kodi dërgohet brenda 5 minutave pas pagesës'
        : 'Code sent within 5 minutes after payment'
    },
    {
      icon: Mail,
      title: language === 'sq' ? 'Dërgim Digital' : 'Digital Delivery',
      description: language === 'sq' 
        ? 'Merr kartelën direkt në email-in tuaj'
        : 'Receive card directly in your email'
    },
    {
      icon: Check,
      title: language === 'sq' ? 'Garanci 100%' : '100% Guarantee',
      description: language === 'sq' 
        ? 'Të gjitha kartelat janë origjinale dhe të vlefshme'
        : 'All cards are original and valid'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mb-4" />
          <p className="text-gray-600">
            {language === 'sq' ? 'Duke ngarkuar kartelat...' : 'Loading gift cards...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-midnight mb-4">
            {language === 'sq' ? 'Kartela Dhuratë Gaming' : 'Gaming Gift Cards'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Bleni kartela dhuratë Steam dhe PlayStation Network me dorëzim të menjëhershëm digital'
              : 'Buy Steam and PlayStation Network gift cards with instant digital delivery'
            }
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Gift Cards */}
          <div className="lg:col-span-3">
            {/* Steam Cards */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {language === 'sq' ? 'Kartela Steam' : 'Steam Cards'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steamCards.map((card) => (
                  <Card key={card.id} className={`relative ${card.popular ? 'ring-2 ring-brand-purple' : ''}`}>
                    {card.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-xs font-medium">
                          {language === 'sq' ? 'Më Popullarti' : 'Most Popular'}
                        </span>
                      </div>
                    )}
                    
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        €{card.value}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        {language === 'sq' ? card.description : card.descriptionEn}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          {language === 'sq' ? 'Çmimi:' : 'Price:'}
                        </span>
                        <span className="font-bold text-brand-purple">
                          €{card.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-center space-x-2">
                        {selectedCards[card.id] ? (
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(card.id)}
                            >
                              -
                            </Button>
                            <span className="font-medium">{selectedCards[card.id]}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(card.id)}
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => addToCart(card.id)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {language === 'sq' ? 'Shto' : 'Add'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* PSN Cards */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {language === 'sq' ? 'Kartela PlayStation' : 'PlayStation Cards'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {psnCards.map((card) => (
                  <Card key={card.id} className={`relative ${card.popular ? 'ring-2 ring-brand-purple' : ''}`}>
                    {card.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-xs font-medium">
                          {language === 'sq' ? 'Më Popullarti' : 'Most Popular'}
                        </span>
                      </div>
                    )}
                    
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        €{card.value}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        {language === 'sq' ? card.description : card.descriptionEn}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          {language === 'sq' ? 'Çmimi:' : 'Price:'}
                        </span>
                        <span className="font-bold text-brand-purple">
                          €{card.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-center space-x-2">
                        {selectedCards[card.id] ? (
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(card.id)}
                            >
                              -
                            </Button>
                            <span className="font-medium">{selectedCards[card.id]}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(card.id)}
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => addToCart(card.id)}
                            className="w-full bg-gradient-to-r from-blue-800 to-blue-600 hover:opacity-90"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {language === 'sq' ? 'Shto' : 'Add'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-brand-purple">
                    {language === 'sq' ? 'Shporta' : 'Cart'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(selectedCards).length === 0 ? (
                    <p className="text-gray-600 text-center py-8">
                      {language === 'sq' ? 'Shporta është bosh' : 'Cart is empty'}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(selectedCards).map(([cardId, quantity]) => {
                        const card = giftCards.find(c => c.id === cardId);
                        if (!card) return null;
                        
                        return (
                          <div key={cardId} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-sm">
                                {card.type} €{card.value}
                              </p>
                              <p className="text-xs text-gray-600">
                                {quantity}x €{card.price.toFixed(2)}
                              </p>
                            </div>
                            <span className="font-semibold">
                              €{(card.price * quantity).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                      
                      <hr />
                      
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>{language === 'sq' ? 'Totali:' : 'Total:'}</span>
                        <span className="text-brand-purple">€{getTotalPrice().toFixed(2)}</span>
                      </div>

                      {/* Customer Information */}
                      <div className="space-y-3 pt-4">
                        <h4 className="font-semibold text-gray-800">
                          {language === 'sq' ? 'Informacioni' : 'Information'}
                        </h4>
                        
                        <div>
                          <Label htmlFor="customerName">
                            {language === 'sq' ? 'Emri i Plotë *' : 'Full Name *'}
                          </Label>
                          <Input
                            id="customerName"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="customerEmail">
                            {language === 'sq' ? 'Email *' : 'Email *'}
                          </Label>
                          <Input
                            id="customerEmail"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="customerPhone">
                            {language === 'sq' ? 'Telefoni' : 'Phone'}
                          </Label>
                          <Input
                            id="customerPhone"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>

                        <Button 
                          onClick={handlePurchase}
                          disabled={purchasing || getTotalPrice() === 0}
                          className="w-full bg-brand-gradient hover:opacity-90"
                        >
                          {purchasing ? (
                            <div className="flex items-center">
                              <div className="loading-spinner mr-2" />
                              {language === 'sq' ? 'Duke procesuar...' : 'Processing...'}
                            </div>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              {language === 'sq' ? 'Krijo Porosinë' : 'Place Order'}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}