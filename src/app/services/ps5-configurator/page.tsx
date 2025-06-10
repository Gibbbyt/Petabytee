'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Gamepad2,
  Palette,
  Sparkles,
  Zap,
  Check,
  ShoppingCart,
  Bookmark,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface PS5Component {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  price: number;
  colorOptions?: string[];
  image?: string;
  inStock: boolean;
}

interface PS5Configuration {
  faceplate?: PS5Component;
  buttons?: PS5Component;
  sticks?: PS5Component;
  triggers?: PS5Component;
  touchpad?: PS5Component;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function PS5ConfiguratorPage() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [configuration, setConfiguration] = useState<PS5Configuration>({});
  const [components, setComponents] = useState<{[key: string]: PS5Component[]}>({});
  const [selectedColors, setSelectedColors] = useState({
    primary: '#000000',
    secondary: '#FFFFFF', 
    accent: '#0070F3'
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const steps = [
    'Faceplate',
    'Buttons', 
    'Analog Sticks',
    'Triggers',
    'Touchpad',
    'Colors',
    'Review'
  ];

  const categories = [
    {
      id: 'faceplate',
      name: 'Faceplate',
      nameEn: 'Faceplate',
      description: 'Dizajni kryesor i kontrollerit',
      descriptionEn: 'Main controller design',
      icon: Gamepad2
    },
    {
      id: 'buttons',
      name: 'Butonat',
      nameEn: 'Buttons', 
      description: 'Butonat e aksionit dhe drejtimit',
      descriptionEn: 'Action and directional buttons',
      icon: Sparkles
    },
    {
      id: 'sticks',
      name: 'Analog Sticks',
      nameEn: 'Analog Sticks',
      description: 'Analog sticks për kontroll preciz',
      descriptionEn: 'Analog sticks for precise control',
      icon: Zap
    },
    {
      id: 'triggers',
      name: 'Triggers',
      nameEn: 'Triggers',
      description: 'L2/R2 triggers me haptic feedback',
      descriptionEn: 'L2/R2 triggers with haptic feedback',
      icon: Zap
    },
    {
      id: 'touchpad',
      name: 'Touchpad',
      nameEn: 'Touchpad',
      description: 'Touchpad me RGB lighting',
      descriptionEn: 'Touchpad with RGB lighting',
      icon: Palette
    }
  ];

  const colorPresets = [
    { name: 'Classic', primary: '#000000', secondary: '#FFFFFF', accent: '#0070F3' },
    { name: 'Crimson', primary: '#DC143C', secondary: '#000000', accent: '#FFD700' },
    { name: 'Ocean', primary: '#0066CC', secondary: '#87CEEB', accent: '#00FF7F' },
    { name: 'Sunset', primary: '#FF4500', secondary: '#FFD700', accent: '#FF69B4' },
    { name: 'Gaming', primary: '#00FF00', secondary: '#000000', accent: '#FF0000' },
    { name: 'Royal', primary: '#4B0082', secondary: '#FFD700', accent: '#FFFFFF' }
  ];

  // Fetch PS5 components from API
  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const categoryNames = ['FACEPLATE', 'BUTTONS', 'STICKS', 'TRIGGERS', 'TOUCHPAD'];
        const componentPromises = categoryNames.map(async (category) => {
          const response = await fetch(`/api/ps5-components?category=${category}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${category} components`);
          }
          const data = await response.json();
          return { category: category.toLowerCase(), components: data.components };
        });

        const results = await Promise.all(componentPromises);
        const componentsData: {[key: string]: PS5Component[]} = {};
        
        results.forEach(({ category, components }) => {
          componentsData[category] = components;
        });

        setComponents(componentsData);
      } catch (error) {
        console.error('Error fetching PS5 components:', error);
        
        // Fallback data for development
        setComponents({
          faceplate: [
            {
              id: 'fp1',
              name: 'Classic Black',
              nameEn: 'Classic Black',
              description: 'Dizajni klasik i zi',
              descriptionEn: 'Classic black design',
              category: 'FACEPLATE',
              price: 25.99,
              colorOptions: ['#000000', '#1A1A1A', '#2D2D2D'],
              inStock: true
            },
            {
              id: 'fp2',
              name: 'Cosmic Red',
              nameEn: 'Cosmic Red',
              description: 'Dizajn i kuq kozmik',
              descriptionEn: 'Cosmic red design',
              category: 'FACEPLATE',
              price: 29.99,
              colorOptions: ['#DC143C', '#B22222', '#FF6347'],
              inStock: true
            }
          ],
          buttons: [
            {
              id: 'btn1',
              name: 'RGB Buttons',
              nameEn: 'RGB Buttons',
              description: 'Butona me ndriçim RGB',
              descriptionEn: 'RGB illuminated buttons',
              category: 'BUTTONS',
              price: 15.99,
              inStock: true
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  // Calculate total price
  useEffect(() => {
    const total = Object.values(configuration).reduce((sum, component) => {
      return sum + (component?.price || 0);
    }, 0);
    setTotalPrice(total);
  }, [configuration]);

  const selectComponent = (category: string, component: PS5Component) => {
    setConfiguration(prev => ({
      ...prev,
      [category]: component
    }));
  };

  const selectColorPreset = (preset: typeof colorPresets[0]) => {
    setSelectedColors({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.accent
    });
  };

  const getStepName = (step: number) => {
    return steps[step];
  };

  const renderStepContent = () => {
    const currentCategory = categories[currentStep];
    
    if (currentStep === 5) { // Colors step
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {language === 'sq' ? 'Zgjidh Ngjyrat' : 'Choose Colors'}
            </h2>
            <p className="text-gray-600">
              {language === 'sq' ? 'Personalizo skemën e ngjyrave të kontrollerit' : 'Customize your controller color scheme'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorPresets.map((preset, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedColors.primary === preset.primary ? 'ring-2 ring-brand-purple' : ''
                }`}
                onClick={() => selectColorPreset(preset)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: preset.secondary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: preset.accent }}
                    />
                  </div>
                  <p className="font-medium text-sm">{preset.name}</p>
                  {selectedColors.primary === preset.primary && (
                    <Check className="w-4 h-4 text-green-600 mt-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'sq' ? 'Ngjyra Kryesore' : 'Primary Color'}
              </label>
              <input
                type="color"
                value={selectedColors.primary}
                onChange={(e) => setSelectedColors(prev => ({ ...prev, primary: e.target.value }))}
                className="w-full h-12 rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'sq' ? 'Ngjyra Dytësore' : 'Secondary Color'}
              </label>
              <input
                type="color"
                value={selectedColors.secondary}
                onChange={(e) => setSelectedColors(prev => ({ ...prev, secondary: e.target.value }))}
                className="w-full h-12 rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'sq' ? 'Ngjyra Theksore' : 'Accent Color'}
              </label>
              <input
                type="color"
                value={selectedColors.accent}
                onChange={(e) => setSelectedColors(prev => ({ ...prev, accent: e.target.value }))}
                className="w-full h-12 rounded-lg border border-gray-300"
              />
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === 6) { // Review step
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {language === 'sq' ? 'Rishiko Konfigurimin' : 'Review Configuration'}
            </h2>
            <p className="text-gray-600">
              {language === 'sq' ? 'Kontrollo përzgjedhjet tuaja përpara porosisë' : 'Review your selections before ordering'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'sq' ? 'Komponentët' : 'Components'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(configuration).map(([category, component]) => (
                  <div key={category} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{language === 'sq' ? component.name : component.nameEn}</p>
                      <p className="text-sm text-gray-600">{category}</p>
                    </div>
                    <span className="font-semibold">€{component.price.toFixed(2)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'sq' ? 'Skema e Ngjyrave' : 'Color Scheme'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>{language === 'sq' ? 'Kryesore:' : 'Primary:'}</span>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: selectedColors.primary }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'sq' ? 'Dytësore:' : 'Secondary:'}</span>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: selectedColors.secondary }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'sq' ? 'Theksore:' : 'Accent:'}</span>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: selectedColors.accent }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    // Component selection steps
    const categoryComponents = components[currentCategory?.id] || [];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {language === 'sq' ? `Zgjidh ${currentCategory?.name}` : `Select ${currentCategory?.nameEn}`}
          </h2>
          <p className="text-gray-600">
            {language === 'sq' ? currentCategory?.description : currentCategory?.descriptionEn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryComponents.map((component) => (
            <Card 
              key={component.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                configuration[currentCategory?.id || '']?.id === component.id 
                  ? 'ring-2 ring-brand-purple shadow-lg' 
                  : ''
              }`}
              onClick={() => selectComponent(currentCategory?.id || '', component)}
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'sq' ? component.name : component.nameEn}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'sq' ? component.description : component.descriptionEn}
                </p>
                
                {component.colorOptions && (
                  <div className="flex space-x-2 mb-4">
                    {component.colorOptions.map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand-purple">
                    €{component.price.toFixed(2)}
                  </span>
                  {configuration[currentCategory?.id || '']?.id === component.id && (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveConfiguration = async () => {
    try {
      const response = await fetch('/api/configurations?type=ps5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `PS5 Controller - ${new Date().toLocaleDateString()}`,
          components: configuration,
          colors: selectedColors,
          totalPrice: totalPrice + (totalPrice * 0.2), // Include VAT
          notes: `Custom PS5 controller configuration`,
        }),
      });

      if (response.ok) {
        alert(language === 'sq' ? 'Konfigurimi u ruajt me sukses!' : 'Configuration saved successfully!');
      }
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert(language === 'sq' ? 'Gabim në ruajtjen e konfigurimit' : 'Error saving configuration');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-midnight via-brand-darkBlue to-brand-purple">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {language === 'sq' ? 'Konfigurues PS5 Controller' : 'PS5 Controller Configurator'}
          </h1>
          <p className="text-white/80 text-lg">
            {language === 'sq' 
              ? 'Krijo kontrollerin tuaj unik PS5 me komponentë dhe ngjyra të personalizuara'
              : 'Create your unique PS5 controller with custom components and colors'
            }
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'border-brand-lime bg-brand-lime text-brand-midnight' 
                    : 'border-white/30 text-white/50'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-brand-lime' : 'text-white/50'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-brand-lime' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Configuration Steps */}
            <div className="lg:col-span-3">
              <Card className="min-h-[500px]">
                <CardContent className="p-8">
                  {loading ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <div className="loading-spinner mb-4" />
                        <p className="text-gray-600">
                          {language === 'sq' ? 'Duke ngarkuar komponentët...' : 'Loading components...'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    renderStepContent()
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-brand-purple">
                    {language === 'sq' ? 'Përmbledhje' : 'Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'sq' ? 'Komponentët:' : 'Components:'}</span>
                      <span>€{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{language === 'sq' ? 'TVSH (20%):' : 'VAT (20%):'}</span>
                      <span>€{(totalPrice * 0.2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{language === 'sq' ? 'Transporti:' : 'Shipping:'}</span>
                      <span className="text-green-600">{language === 'sq' ? 'Falas' : 'Free'}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>{language === 'sq' ? 'Totali:' : 'Total:'}</span>
                      <span className="text-brand-purple">€{(totalPrice * 1.2).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleSaveConfiguration}
                      variant="outline"
                      className="w-full"
                      disabled={totalPrice === 0}
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      {language === 'sq' ? 'Ruaj Konfigurimin' : 'Save Configuration'}
                    </Button>
                    
                    {currentStep === steps.length - 1 && (
                      <Button className="w-full bg-brand-gradient hover:opacity-90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {language === 'sq' ? 'Shto në Shportë' : 'Add to Cart'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'sq' ? 'Mbrapa' : 'Previous'}
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="bg-brand-gradient hover:opacity-90"
            >
              {language === 'sq' ? 'Tjetër' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}