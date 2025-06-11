'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Gamepad2,
  Video,
  Music,
  ShoppingCart,
  Zap
} from 'lucide-react';

export default function AccountsPage() {
  const { t, language } = useLanguage();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountType: '',
    region: 'europe',
    extras: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const accountTypes = [
    {
      id: 'steam',
      name: 'Steam',
      icon: Gamepad2,
      description: language === 'sq' 
        ? 'Llogari Steam me lojëra dhe përmbajtje ekskluzive'
        : 'Steam account with games and exclusive content',
      basePrice: 25,
      features: [
        language === 'sq' ? 'Llogari e verifikuar' : 'Verified account',
        language === 'sq' ? 'Email i personalizuar' : 'Custom email',
        language === 'sq' ? 'Mbështetje 24/7' : '24/7 support',
        language === 'sq' ? 'Garanci 30 ditë' : '30 days warranty'
      ],
      packages: [
        { name: 'Basic', price: 25, games: 0 },
        { name: 'Starter', price: 45, games: 5 },
        { name: 'Gamer', price: 85, games: 15 },
        { name: 'Pro', price: 150, games: 30 }
      ]
    },
    {
      id: 'psn',
      name: 'PlayStation Network',
      icon: Gamepad2,
      description: language === 'sq' 
        ? 'Llogari PSN për PlayStation me përmbajtje dhe lojëra'
        : 'PSN account for PlayStation with content and games',
      basePrice: 30,
      features: [
        language === 'sq' ? 'Llogari e verifikuar' : 'Verified account',
        language === 'sq' ? 'PlayStation Plus' : 'PlayStation Plus',
        language === 'sq' ? 'Mbështetje 24/7' : '24/7 support',
        language === 'sq' ? 'Garanci 30 ditë' : '30 days warranty'
      ],
      packages: [
        { name: 'Basic', price: 30, games: 0 },
        { name: 'Plus', price: 55, games: 3 },
        { name: 'Premium', price: 95, games: 10 },
        { name: 'Ultimate', price: 170, games: 25 }
      ]
    },
    {
      id: 'netflix',
      name: 'Netflix',
      icon: Video,
      description: language === 'sq' 
        ? 'Llogari Netflix me qasje në të gjithë katalogët'
        : 'Netflix account with access to all catalogs',
      basePrice: 15,
      features: [
        language === 'sq' ? '4K Ultra HD' : '4K Ultra HD',
        language === 'sq' ? 'Profil i personalizuar' : 'Custom profile',
        language === 'sq' ? 'Mbështetje 24/7' : '24/7 support',
        language === 'sq' ? 'Garanci 30 ditë' : '30 days warranty'
      ],
      packages: [
        { name: 'Basic', price: 15, games: 0 },
        { name: 'Standard', price: 25, games: 0 },
        { name: 'Premium', price: 35, games: 0 }
      ]
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: Music,
      description: language === 'sq' 
        ? 'Llogari Spotify Premium me qasje pa reklama'
        : 'Spotify Premium account with ad-free access',
      basePrice: 12,
      features: [
        language === 'sq' ? 'Premium pa reklama' : 'Premium ad-free',
        language === 'sq' ? 'Cilësi e lartë' : 'High quality',
        language === 'sq' ? 'Shkarkime offline' : 'Offline downloads',
        language === 'sq' ? 'Garanci 30 ditë' : '30 days warranty'
      ],
      packages: [
        { name: 'Individual', price: 12, games: 0 },
        { name: 'Family', price: 20, games: 0 }
      ]
    }
  ];

  const regions = [
    { value: 'europe', label: language === 'sq' ? 'Evropë' : 'Europe' },
    { value: 'us', label: language === 'sq' ? 'SHBA' : 'USA' },
    { value: 'asia', label: language === 'sq' ? 'Azi' : 'Asia' }
  ];

  const extras = [
    { id: 'express', name: language === 'sq' ? 'Krijim Express (24h)' : 'Express Creation (24h)', price: 10 },
    { id: 'custom-email', name: language === 'sq' ? 'Email i personalizuar' : 'Custom email', price: 5 },
    { id: 'setup-help', name: language === 'sq' ? 'Ndihmë me konfigurimin' : 'Setup help', price: 8 },
    { id: 'backup', name: language === 'sq' ? 'Backup i llogarisë' : 'Account backup', price: 12 }
  ];

  const selectedAccountData = accountTypes.find(acc => acc.id === selectedAccount);

  const handleExtraToggle = (extraId: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(e => e !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  const calculateTotal = () => {
    if (!selectedAccountData) return 0;
    
    const packagePrice = selectedAccountData.packages[0].price; // Default to first package
    const extrasPrice = formData.extras.reduce((total, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);
    
    return packagePrice + extrasPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/store/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          accountType: selectedAccount,
          total: calculateTotal()
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(language === 'sq' 
          ? 'Porosia juaj për hapjen e llogarisë u dërgua! Do t\'ju kontaktojmë brenda 24 orëve.'
          : 'Your account opening order was submitted! We will contact you within 24 hours.'
        );
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          accountType: '',
          region: 'europe',
          extras: []
        });
        setSelectedAccount('');
      } else {
        throw new Error(result.error || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'sq' 
        ? 'Gabim në dërgimin e porosisë. Ju lutem provoni përsëri.'
        : 'Error submitting order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-midnight mb-4">
            {language === 'sq' ? 'Hapje Llogarish' : 'Account Opening'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Blini llogari të gatshme për platforma të ndryshme si Steam, PSN, Netflix dhe më shumë direkt nga ne.'
              : 'Buy ready accounts for different platforms like Steam, PSN, Netflix and more directly from us.'
            }
          </p>
        </div>

        {/* Account Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Llojet e Llogarive' : 'Account Types'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accountTypes.map((account) => {
              const Icon = account.icon;
              const isSelected = selectedAccount === account.id;
              return (
                <Card 
                  key={account.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-brand-purple shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedAccount(account.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{account.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{account.description}</p>
                    <div className="text-lg font-bold text-brand-purple">
                      {language === 'sq' ? 'Nga' : 'From'} €{account.basePrice}
                    </div>
                    
                    <ul className="text-xs text-gray-600 mt-4 space-y-1">
                      {account.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-brand-lime mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Selected Account Details & Order Form */}
        {selectedAccount && selectedAccountData && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-brand-purple">
                  {language === 'sq' ? 'Porosit ' : 'Order '}{selectedAccountData.name}
                  {language === 'sq' ? ' Llogari' : ' Account'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Packages */}
                  <div>
                    <Label className="text-base font-semibold">
                      {language === 'sq' ? 'Zgjidhni Paketën' : 'Select Package'}
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                      {selectedAccountData.packages.map((pkg, idx) => (
                        <div key={idx} className="border rounded-lg p-4 text-center hover:border-brand-purple cursor-pointer">
                          <h4 className="font-semibold">{pkg.name}</h4>
                          <div className="text-2xl font-bold text-brand-purple">€{pkg.price}</div>
                          {pkg.games > 0 && (
                            <p className="text-sm text-gray-600">
                              {pkg.games} {language === 'sq' ? 'lojëra' : 'games'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">
                        {language === 'sq' ? 'Emri i Plotë' : 'Full Name'}
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">
                        {language === 'sq' ? 'Email' : 'Email'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        {language === 'sq' ? 'Telefoni' : 'Phone'}
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="region">
                        {language === 'sq' ? 'Rajoni' : 'Region'}
                      </Label>
                      <select
                        id="region"
                        value={formData.region}
                        onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      >
                        {regions.map(region => (
                          <option key={region.value} value={region.value}>
                            {region.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Extras */}
                  <div>
                    <Label className="text-base font-semibold">
                      {language === 'sq' ? 'Shërbime Shtesë' : 'Additional Services'}
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {extras.map((extra) => (
                        <div key={extra.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={extra.id}
                              checked={formData.extras.includes(extra.id)}
                              onChange={() => handleExtraToggle(extra.id)}
                              className="rounded border-gray-300 text-brand-purple focus:ring-brand-purple mr-3"
                            />
                            <label htmlFor={extra.id} className="text-sm font-medium">
                              {extra.name}
                            </label>
                          </div>
                          <span className="text-brand-purple font-bold">+€{extra.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-800">
                        {language === 'sq' ? 'Totali' : 'Total'}
                      </span>
                      <span className="text-3xl font-bold text-brand-purple">
                        €{calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-gradient hover:opacity-90"
                    disabled={loading}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {language === 'sq' ? 'Porosit Tani' : 'Order Now'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="w-12 h-12 text-brand-purple mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                {language === 'sq' ? 'Krijim i Shpejtë' : 'Fast Creation'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'sq' 
                  ? 'Llogaritë krijohen dhe dorëzohen brenda 24-48 orëve'
                  : 'Accounts created and delivered within 24-48 hours'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 text-brand-purple mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                {language === 'sq' ? 'Garanci e Plotë' : 'Full Warranty'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'sq' 
                  ? 'Garanci 30 ditë për të gjitha llogaritë tona'
                  : '30 days warranty for all our accounts'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <User className="w-12 h-12 text-brand-purple mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">
                {language === 'sq' ? 'Mbështetje 24/7' : '24/7 Support'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'sq' 
                  ? 'Mbështetje e vazhdueshme për të gjitha llogaritë'
                  : 'Continuous support for all accounts'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}