'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Package,
  Truck,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Upload,
  Euro,
  Calendar,
  ArrowRight,
  Shield
} from 'lucide-react';

export default function EasyMailInPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    deviceType: '',
    deviceModel: '',
    issue: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    urgency: 'MEDIUM'
  });
  const [loading, setLoading] = useState(false);

  const deviceTypes = [
    { id: 'laptop', name: 'Laptop', nameEn: 'Laptop' },
    { id: 'desktop', name: 'Desktop PC', nameEn: 'Desktop PC' },
    { id: 'gaming-pc', name: 'Gaming PC', nameEn: 'Gaming PC' },
    { id: 'console', name: 'Konsol Lojërash', nameEn: 'Gaming Console' },
    { id: 'phone', name: 'Telefon', nameEn: 'Phone' },
    { id: 'tablet', name: 'Tablet', nameEn: 'Tablet' },
    { id: 'other', name: 'Tjetër', nameEn: 'Other' }
  ];

  const urgencyLevels = [
    { value: 'LOW', name: 'E ulët (7-14 ditë)', nameEn: 'Low (7-14 days)', price: 0 },
    { value: 'MEDIUM', name: 'Normale (3-7 ditë)', nameEn: 'Normal (3-7 days)', price: 0 },
    { value: 'HIGH', name: 'E lartë (1-3 ditë)', nameEn: 'High (1-3 days)', price: 15 },
    { value: 'URGENT', name: 'Urgjente (24 orë)', nameEn: 'Urgent (24 hours)', price: 35 }
  ];

  const steps = [
    {
      icon: Package,
      title: language === 'sq' ? 'Apliko për Riparim' : 'Apply for Repair',
      description: language === 'sq' 
        ? 'Plotëso formularin me detajet e pajisjes'
        : 'Fill out the form with device details'
    },
    {
      icon: Mail,
      title: language === 'sq' ? 'Merr Kutinë' : 'Receive Box',
      description: language === 'sq' 
        ? 'Ne do të dërgojmë një kuti falas në adresën tuaj'
        : 'We will send a free box to your address'
    },
    {
      icon: Truck,
      title: language === 'sq' ? 'Dërgo Pajisjen' : 'Send Device',
      description: language === 'sq' 
        ? 'Vendos pajisjen në kuti dhe dërgo në laboratorin tonë'
        : 'Place device in box and send to our lab'
    },
    {
      icon: CheckCircle,
      title: language === 'sq' ? 'Riparim & Kthim' : 'Repair & Return',
      description: language === 'sq' 
        ? 'Ne e riparojmë dhe e kthejmë të rregulluar'
        : 'We repair and return it fixed'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceType: formData.deviceType,
          deviceModel: formData.deviceModel,
          issueDescription: formData.issue,
          urgency: formData.urgency,
          isEasyMailIn: true,
          shippingAddress: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: 'Kosovo'
          },
          language: language
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(language === 'sq' 
          ? `Kërkesa për riparim u dërgua me sukses! Numri i riparimit: ${data.repair.repairNumber}`
          : `Repair request submitted successfully! Repair number: ${data.repair.repairNumber}`
        );
        // Reset form
        setFormData({
          deviceType: '',
          deviceModel: '',
          issue: '',
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          postalCode: '',
          urgency: 'MEDIUM'
        });
      } else {
        throw new Error('Failed to submit repair request');
      }
    } catch (error) {
      console.error('Error submitting repair:', error);
      alert(language === 'sq' 
        ? 'Gabim në dërgimin e kërkesës për riparim'
        : 'Error submitting repair request'
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedUrgency = urgencyLevels.find(u => u.value === formData.urgency);
  const estimatedCost = 25 + (selectedUrgency?.price || 0); // Base diagnostic fee + urgency fee

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-midnight mb-4">
            {language === 'sq' ? 'EasyMail-In Riparim' : 'EasyMail-In Repair'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Dërgo pajisjen tuaj për riparim pa u larguar nga shtëpia. Ne dërgojmë kutinë, ju dërgoni pajisjen, ne e rregullojmë dhe e kthejmë.'
              : 'Send your device for repair without leaving home. We send the box, you send the device, we fix it and return it.'
            }
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Si Funksionon' : 'How It Works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-brand-purple">
                  {language === 'sq' ? 'Detajet e Riparimit' : 'Repair Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Device Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'sq' ? 'Informacioni i Pajisjes' : 'Device Information'}
                    </h3>
                    
                    <div>
                      <Label htmlFor="deviceType">
                        {language === 'sq' ? 'Lloji i Pajisjes' : 'Device Type'}
                      </Label>
                      <select
                        id="deviceType"
                        value={formData.deviceType}
                        onChange={(e) => handleInputChange('deviceType', e.target.value)}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      >
                        <option value="">
                          {language === 'sq' ? 'Zgjidh llojin e pajisjes' : 'Select device type'}
                        </option>
                        {deviceTypes.map(type => (
                          <option key={type.id} value={type.id}>
                            {language === 'sq' ? type.name : type.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="deviceModel">
                        {language === 'sq' ? 'Modeli i Pajisjes' : 'Device Model'}
                      </Label>
                      <Input
                        id="deviceModel"
                        value={formData.deviceModel}
                        onChange={(e) => handleInputChange('deviceModel', e.target.value)}
                        placeholder={language === 'sq' ? 'p.sh. MacBook Pro 2021, HP Pavilion...' : 'e.g. MacBook Pro 2021, HP Pavilion...'}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="issue">
                        {language === 'sq' ? 'Përshkrimi i Problemit' : 'Problem Description'}
                      </Label>
                      <Textarea
                        id="issue"
                        value={formData.issue}
                        onChange={(e) => handleInputChange('issue', e.target.value)}
                        placeholder={language === 'sq' 
                          ? 'Përshkruaj në detaje problemin që ka pajisja...'
                          : 'Describe in detail the problem with your device...'
                        }
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="urgency">
                        {language === 'sq' ? 'Urgjenca e Riparimit' : 'Repair Urgency'}
                      </Label>
                      <select
                        id="urgency"
                        value={formData.urgency}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      >
                        {urgencyLevels.map(level => (
                          <option key={level.value} value={level.value}>
                            {language === 'sq' ? level.name : level.nameEn}
                            {level.price > 0 && ` (+€${level.price})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'sq' ? 'Informacioni i Dërgimit' : 'Shipping Information'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">
                          {language === 'sq' ? 'Emri i Plotë' : 'Full Name'}
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          {language === 'sq' ? 'Numri i Telefonit' : 'Phone Number'}
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">
                        {language === 'sq' ? 'Email Adresa' : 'Email Address'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">
                        {language === 'sq' ? 'Adresa' : 'Address'}
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">
                          {language === 'sq' ? 'Qyteti' : 'City'}
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="postalCode">
                          {language === 'sq' ? 'Kodi Postar' : 'Postal Code'}
                        </Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>
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
                        {language === 'sq' ? 'Dërgo Kërkesën për Riparim' : 'Submit Repair Request'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-brand-purple">
                    {language === 'sq' ? 'Çmimi i Vlerësuar' : 'Estimated Cost'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>{language === 'sq' ? 'Diagnostika:' : 'Diagnostic:'}</span>
                      <span>€25.00</span>
                    </div>
                    {selectedUrgency && selectedUrgency.price > 0 && (
                      <div className="flex justify-between">
                        <span>{language === 'sq' ? 'Urgjencë:' : 'Urgency:'}</span>
                        <span>€{selectedUrgency.price.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>{language === 'sq' ? 'Transport:' : 'Shipping:'}</span>
                      <span className="text-green-600">
                        {language === 'sq' ? 'Falas' : 'Free'}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>{language === 'sq' ? 'Totali:' : 'Total:'}</span>
                      <span className="text-brand-purple">€{estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          {language === 'sq' ? 'Garanci' : 'Warranty'}
                        </p>
                        <p className="text-xs text-blue-600">
                          {language === 'sq' 
                            ? '30 ditë garanci për të gjitha riparimet'
                            : '30-day warranty on all repairs'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'sq' ? 'Përfitimet' : 'Benefits'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">
                        {language === 'sq' ? 'Transport falas në të dy drejtimet' : 'Free shipping both ways'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">
                        {language === 'sq' ? 'Diagnostikë profesionale' : 'Professional diagnosis'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">
                        {language === 'sq' ? 'Ndreqje nga ekspertë' : 'Expert repairs'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">
                        {language === 'sq' ? 'Garanci 30 ditë' : '30-day warranty'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm">
                        {language === 'sq' ? 'Njoftim në kohë reale' : 'Real-time updates'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}