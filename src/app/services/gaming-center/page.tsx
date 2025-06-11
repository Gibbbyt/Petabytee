'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2,
  Monitor,
  Gamepad2,
  Users,
  Wifi,
  Shield,
  Zap,
  Settings,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Calculator,
  Calendar
} from 'lucide-react';

export default function GamingCenterPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    gamingStations: 10,
    services: [] as string[],
    budget: '',
    timeline: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const services = [
    {
      id: 'gaming-pcs',
      icon: Monitor,
      name: language === 'sq' ? 'Gaming PC Setup' : 'Gaming PC Setup',
      description: language === 'sq' 
        ? 'PC gaming me performancë të lartë për lojëra konkurruese'
        : 'High-performance gaming PCs for competitive gaming'
    },
    {
      id: 'console-gaming',
      icon: Gamepad2,
      name: language === 'sq' ? 'Konsol Gaming' : 'Console Gaming',
      description: language === 'sq' 
        ? 'PS5, Xbox dhe Nintendo Switch për gaming kasual'
        : 'PS5, Xbox and Nintendo Switch for casual gaming'
    },
    {
      id: 'network-setup',
      icon: Wifi,
      name: language === 'sq' ? 'Rrjeti i Shpejtë' : 'High-Speed Network',
      description: language === 'sq' 
        ? 'Rrjet me latencë të ulët për gaming online'
        : 'Low-latency network for online gaming'
    },
    {
      id: 'security-systems',
      icon: Shield,
      name: language === 'sq' ? 'Sisteme Sigurie' : 'Security Systems',
      description: language === 'sq' 
        ? 'Kamera sigurie dhe sisteme kontrolli'
        : 'Security cameras and control systems'
    },
    {
      id: 'power-backup',
      icon: Zap,
      name: language === 'sq' ? 'Furnizim me Energji' : 'Power Solutions',
      description: language === 'sq' 
        ? 'UPS dhe sisteme backup për kontinuitet'
        : 'UPS and backup systems for continuity'
    },
    {
      id: 'maintenance',
      icon: Settings,
      name: language === 'sq' ? 'Mirëmbajtje' : 'Maintenance',
      description: language === 'sq' 
        ? 'Mirëmbajtje e rregullt dhe mbështetje teknike'
        : 'Regular maintenance and technical support'
    }
  ];

  const features = [
    {
      icon: Users,
      title: language === 'sq' ? 'Ekspertë të Certifikuar' : 'Certified Experts',
      description: language === 'sq' 
        ? 'Ekip i specializuar për gaming centers'
        : 'Specialized team for gaming centers'
    },
    {
      icon: CheckCircle,
      title: language === 'sq' ? 'Garanci e Plotë' : 'Full Warranty',
      description: language === 'sq' 
        ? '2 vjet garanci për të gjithë harduerin'
        : '2 year warranty on all hardware'
    },
    {
      icon: Star,
      title: language === 'sq' ? 'Cilësi Premium' : 'Premium Quality',
      description: language === 'sq' 
        ? 'Vetëm hardue i nivelit më të lartë'
        : 'Only the highest level hardware'
    }
  ];

  const packages = [
    {
      name: language === 'sq' ? 'Starter Pack' : 'Starter Pack',
      stations: 5,
      price: 12500,
      features: [
        language === 'sq' ? '5 Gaming PC' : '5 Gaming PCs',
        language === 'sq' ? 'Rrjet i konfiguruar' : 'Configured network',
        language === 'sq' ? 'Software gaming' : 'Gaming software',
        language === 'sq' ? 'Setup komplet' : 'Complete setup'
      ]
    },
    {
      name: language === 'sq' ? 'Professional' : 'Professional',
      stations: 10,
      price: 22000,
      popular: true,
      features: [
        language === 'sq' ? '10 Gaming PC' : '10 Gaming PCs',
        language === 'sq' ? 'Rrjet i avancuar' : 'Advanced network',
        language === 'sq' ? 'Sisteme sigurie' : 'Security systems',
        language === 'sq' ? '6 muaj mbështetje' : '6 months support'
      ]
    },
    {
      name: language === 'sq' ? 'Enterprise' : 'Enterprise',
      stations: 20,
      price: 40000,
      features: [
        language === 'sq' ? '20+ Gaming PC' : '20+ Gaming PCs',
        language === 'sq' ? 'Infrastrukturë e plotë' : 'Complete infrastructure',
        language === 'sq' ? 'Menaxhim qendror' : 'Central management',
        language === 'sq' ? '1 vit mbështetje' : '1 year support'
      ]
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/services/gaming-center', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(language === 'sq' 
          ? 'Kërkesa juaj për kuotë u dërgua me sukses! Do t\'ju kontaktojmë brenda 24 orëve.'
          : 'Your quote request was sent successfully! We will contact you within 24 hours.'
        );
        
        // Reset form
        setFormData({
          businessName: '',
          contactName: '',
          email: '',
          phone: '',
          location: '',
          gamingStations: 10,
          services: [],
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'sq' 
        ? 'Gabim në dërgimin e kërkesës. Ju lutem provoni përsëri.'
        : 'Error submitting request. Please try again.'
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
            {language === 'sq' ? 'Zgjidhje për Qendra Lojërash' : 'Gaming Center Solutions'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Krijojmë qendra lojërash profesionale me hardue të nivelit më të lartë dhe infrastrukturë të plotë për suksesin tuaj në biznes.'
              : 'We create professional gaming centers with top-level hardware and complete infrastructure for your business success.'
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
                  <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Shërbimet Tona' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-brand-purple" />
                      </div>
                      <h3 className="font-semibold text-gray-800">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Packages */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Pakot Tona' : 'Our Packages'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-brand-purple scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                      {language === 'sq' ? 'Më Popullarti' : 'Most Popular'}
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle>{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-brand-purple">
                    €{pkg.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600">
                    {pkg.stations} {language === 'sq' ? 'stacione' : 'stations'}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full mt-6 bg-brand-gradient hover:opacity-90">
                    {language === 'sq' ? 'Kërko Kuotë' : 'Request Quote'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quote Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-brand-purple">
                {language === 'sq' ? 'Kërko Kuotë të Personalizuar' : 'Request Custom Quote'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessName">
                      {language === 'sq' ? 'Emri i Biznesit' : 'Business Name'}
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactName">
                      {language === 'sq' ? 'Emri i Kontaktit' : 'Contact Name'}
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
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
                    <Label htmlFor="location">
                      {language === 'sq' ? 'Lokacioni' : 'Location'}
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={language === 'sq' ? 'Qyteti, Rruga...' : 'City, Street...'}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="gamingStations">
                      {language === 'sq' ? 'Numri i Stacioneve Gaming' : 'Number of Gaming Stations'}
                    </Label>
                    <Input
                      id="gamingStations"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.gamingStations}
                      onChange={(e) => setFormData(prev => ({ ...prev, gamingStations: parseInt(e.target.value) || 10 }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>
                    {language === 'sq' ? 'Shërbimet e Dëshiruara' : 'Desired Services'}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={service.id}
                          checked={formData.services.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="rounded border-gray-300 text-brand-purple focus:ring-brand-purple"
                        />
                        <label htmlFor={service.id} className="text-sm text-gray-700">
                          {service.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">
                      {language === 'sq' ? 'Buxheti (EUR)' : 'Budget (EUR)'}
                    </Label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      required
                    >
                      <option value="">
                        {language === 'sq' ? 'Zgjidh buxhetin' : 'Select budget'}
                      </option>
                      <option value="10000-20000">€10,000 - €20,000</option>
                      <option value="20000-40000">€20,000 - €40,000</option>
                      <option value="40000-80000">€40,000 - €80,000</option>
                      <option value="80000+">€80,000+</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="timeline">
                      {language === 'sq' ? 'Koha e Implementimit' : 'Implementation Timeline'}
                    </Label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      required
                    >
                      <option value="">
                        {language === 'sq' ? 'Zgjidh kohën' : 'Select timeline'}
                      </option>
                      <option value="1-month">
                        {language === 'sq' ? '1 muaj' : '1 month'}
                      </option>
                      <option value="2-3-months">
                        {language === 'sq' ? '2-3 muaj' : '2-3 months'}
                      </option>
                      <option value="3-6-months">
                        {language === 'sq' ? '3-6 muaj' : '3-6 months'}
                      </option>
                      <option value="flexible">
                        {language === 'sq' ? 'Fleksibël' : 'Flexible'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">
                    {language === 'sq' ? 'Mesazh Shtesë' : 'Additional Message'}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={language === 'sq' 
                      ? 'Përshkruani nevojat specifike të biznesit tuaj...'
                      : 'Describe your specific business needs...'
                    }
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-gradient hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="loading-spinner mr-2" />
                      {language === 'sq' ? 'Duke dërguar...' : 'Submitting...'}
                    </div>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      {language === 'sq' ? 'Kërko Kuotë Falas' : 'Request Free Quote'}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}