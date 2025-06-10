'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Zap, 
  MemoryStick, 
  Fan, 
  Circle,
  Check,
  ShoppingCart,
  Bookmark,
  Share2,
  ArrowLeft,
  ArrowRight,
  Info
} from 'lucide-react';

interface PCComponent {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image?: string;
  specs: string[];
  specsEn: string[];
  compatibility: string[];
  inStock: boolean;
}

interface PCBuild {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  targetGames: string[];
  minPrice: number;
  maxPrice: number;
  color: string;
}

export default function PCConfiguratorPage() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBuild, setSelectedBuild] = useState<string | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<{[key: string]: PCComponent}>({});
  const [totalPrice, setTotalPrice] = useState(0);

  const pcBuilds: PCBuild[] = [
    {
      name: 'Gaming Beast Pro',
      nameEn: 'Gaming Beast Pro',
      description: 'Për lojtarët më të kërkueshëm - ruan 144FPS në Valorant, CS2, Fortnite',
      descriptionEn: 'For the most demanding gamers - maintains 144FPS in Valorant, CS2, Fortnite',
      targetGames: ['Valorant', 'CS2', 'Fortnite', 'Cyberpunk 2077', 'Apex Legends'],
      minPrice: 1200,
      maxPrice: 2500,
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Balanced Performance',
      nameEn: 'Balanced Performance',
      description: 'Ekuilibër perfekt midis performancës dhe çmimit - 90-120FPS',
      descriptionEn: 'Perfect balance between performance and price - 90-120FPS',
      targetGames: ['Valorant', 'League of Legends', 'Minecraft', 'Rocket League'],
      minPrice: 800,
      maxPrice: 1500,
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Budget Champion',
      nameEn: 'Budget Champion',
      description: 'Çmim i arsyeshëm, performance i mirë - 60-90FPS në shumicën e lojërave',
      descriptionEn: 'Reasonable price, good performance - 60-90FPS in most games',
      targetGames: ['Valorant', 'CS2', 'League of Legends', 'Dota 2'],
      minPrice: 500,
      maxPrice: 900,
      color: 'from-green-500 to-green-700'
    }
  ];

  const componentCategories = [
    {
      id: 'motherboard',
      icon: Circle,
      name: 'Motherboard',
      nameEn: 'Motherboard',
      description: 'Bazë e sistemit',
      descriptionEn: 'System foundation'
    },
    {
      id: 'cpu',
      icon: Cpu,
      name: 'Procesor (CPU)',
      nameEn: 'CPU',
      description: 'Truri i kompjuterit',
      descriptionEn: 'Computer brain'
    },
    {
      id: 'gpu',
      icon: Monitor,
      name: 'Karta Grafike (GPU)',
      nameEn: 'GPU',
      description: 'Për gaming dhe grafika',
      descriptionEn: 'For gaming and graphics'
    },
    {
      id: 'ram',
      icon: MemoryStick,
      name: 'Memoria (RAM)',
      nameEn: 'RAM',
      description: 'Memoria e punës',
      descriptionEn: 'Working memory'
    },
    {
      id: 'storage',
      icon: HardDrive,
      name: 'Ruajtja (SSD/HDD)',
      nameEn: 'Storage',
      description: 'Hapësira ruajtëse',
      descriptionEn: 'Storage space'
    },
    {
      id: 'psu',
      icon: Zap,
      name: 'PSU (Furnizimi)',
      nameEn: 'PSU',
      description: 'Furnizimi me energji',
      descriptionEn: 'Power supply'
    },
    {
      id: 'cooling',
      icon: Fan,
      name: 'Ftohja',
      nameEn: 'Cooling',
      description: 'Sistem ftohje',
      descriptionEn: 'Cooling system'
    }
  ];

  // Mock component data
  const mockComponents: {[key: string]: PCComponent[]} = {
    cpu: [
      {
        id: 'cpu1',
        name: 'AMD Ryzen 7 7700X',
        nameEn: 'AMD Ryzen 7 7700X',
        description: 'Procesor i fuqishëm për gaming dhe multitasking',
        descriptionEn: 'Powerful processor for gaming and multitasking',
        price: 399.99,
        specs: ['8 Cores / 16 Threads', '4.5-5.4 GHz', '32MB Cache', 'AM5 Socket'],
        specsEn: ['8 Cores / 16 Threads', '4.5-5.4 GHz', '32MB Cache', 'AM5 Socket'],
        compatibility: ['AM5'],
        inStock: true
      },
      {
        id: 'cpu2',
        name: 'Intel Core i7-13700K',
        nameEn: 'Intel Core i7-13700K',
        description: 'Performance i lartë për gaming dhe punë',
        descriptionEn: 'High performance for gaming and work',
        price: 419.99,
        specs: ['16 Cores / 24 Threads', '3.4-5.4 GHz', '30MB Cache', 'LGA1700'],
        specsEn: ['16 Cores / 24 Threads', '3.4-5.4 GHz', '30MB Cache', 'LGA1700'],
        compatibility: ['LGA1700'],
        inStock: true
      }
    ],
    gpu: [
      {
        id: 'gpu1',
        name: 'NVIDIA RTX 4070',
        nameEn: 'NVIDIA RTX 4070',
        description: 'Gaming në 1440p me ray tracing',
        descriptionEn: '1440p gaming with ray tracing',
        price: 599.99,
        specs: ['12GB GDDR6X', 'DLSS 3.0', 'Ray Tracing', '200W TDP'],
        specsEn: ['12GB GDDR6X', 'DLSS 3.0', 'Ray Tracing', '200W TDP'],
        compatibility: ['PCIe 4.0'],
        inStock: true
      },
      {
        id: 'gpu2',
        name: 'AMD RX 7700 XT',
        nameEn: 'AMD RX 7700 XT',
        description: 'Performance i shkëlqyer për çmimin',
        descriptionEn: 'Excellent performance for the price',
        price: 449.99,
        specs: ['12GB GDDR6', 'FSR 3.0', 'Ray Tracing', '245W TDP'],
        specsEn: ['12GB GDDR6', 'FSR 3.0', 'Ray Tracing', '245W TDP'],
        compatibility: ['PCIe 4.0'],
        inStock: true
      }
    ]
  };

  useEffect(() => {
    const total = Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0);
    setTotalPrice(total);
  }, [selectedComponents]);

  const steps = [
    { id: 'build', title: 'Zgjidh Build-in', titleEn: 'Choose Build' },
    { id: 'components', title: 'Konfigurim Komponentësh', titleEn: 'Configure Components' },
    { id: 'review', title: 'Rishikim dhe Porosi', titleEn: 'Review & Order' }
  ];

  const selectComponent = (category: string, component: PCComponent) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
  };

  const getBuildDescription = (build: PCBuild) => {
    return language === 'sq' ? build.description : build.descriptionEn;
  };

  const getBuildName = (build: PCBuild) => {
    return language === 'sq' ? build.name : build.nameEn;
  };

  const getComponentName = (component: PCComponent) => {
    return language === 'sq' ? component.name : component.nameEn;
  };

  const getComponentDescription = (component: PCComponent) => {
    return language === 'sq' ? component.description : component.descriptionEn;
  };

  const getComponentSpecs = (component: PCComponent) => {
    return language === 'sq' ? component.specs : component.specsEn;
  };

  const renderBuildSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === 'sq' ? 'Zgjidh Build-in Tuaj' : 'Choose Your Build'}
        </h2>
        <p className="text-gray-600">
          {language === 'sq' 
            ? 'Filloni me një nga konfiguracionet tona të optimizuara'
            : 'Start with one of our optimized configurations'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pcBuilds.map((build, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedBuild === build.name ? 'ring-2 ring-brand-purple shadow-lg' : ''
            }`}
            onClick={() => setSelectedBuild(build.name)}
          >
            <CardHeader>
              <div className={`w-full h-32 bg-gradient-to-r ${build.color} rounded-lg flex items-center justify-center mb-4`}>
                <Monitor className="w-16 h-16 text-white" />
              </div>
              <CardTitle className="text-center">{getBuildName(build)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4 text-center">
                {getBuildDescription(build)}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {language === 'sq' ? 'Çmim nga:' : 'Price from:'}
                  </span>
                  <span className="font-semibold">€{build.minPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {language === 'sq' ? 'Deri në:' : 'Up to:'}
                  </span>
                  <span className="font-semibold">€{build.maxPrice}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">
                  {language === 'sq' ? 'Lojëra të optimizuara:' : 'Optimized games:'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {build.targetGames.slice(0, 3).map((game, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {game}
                    </span>
                  ))}
                  {build.targetGames.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      +{build.targetGames.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {selectedBuild === build.name && (
                <div className="flex items-center justify-center text-green-600">
                  <Check className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    {language === 'sq' ? 'Zgjedhur' : 'Selected'}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderComponentConfiguration = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === 'sq' ? 'Konfigurim Komponentësh' : 'Component Configuration'}
        </h2>
        <p className="text-gray-600">
          {language === 'sq' 
            ? 'Personalizoni komponentët e PC-së tuaj'
            : 'Customize your PC components'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'sq' ? 'Komponentët' : 'Components'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {componentCategories.map((category) => {
                  const Icon = category.icon;
                  const selected = selectedComponents[category.id];
                  return (
                    <div 
                      key={category.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-brand-purple'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${selected ? 'text-green-600' : 'text-gray-600'}`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {language === 'sq' ? category.name : category.nameEn}
                          </p>
                          <p className="text-xs text-gray-500">
                            {language === 'sq' ? category.description : category.descriptionEn}
                          </p>
                        </div>
                        {selected && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      {selected && (
                        <div className="mt-2 pl-8">
                          <p className="text-xs font-medium text-gray-800">
                            {getComponentName(selected)}
                          </p>
                          <p className="text-xs text-green-600">
                            €{selected.price.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'sq' ? 'Zgjidh CPU' : 'Select CPU'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockComponents.cpu?.map((component) => (
                  <div 
                    key={component.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedComponents.cpu?.id === component.id 
                        ? 'border-brand-purple bg-brand-purple/5' 
                        : 'border-gray-200 hover:border-brand-purple/50'
                    }`}
                    onClick={() => selectComponent('cpu', component)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">
                        {getComponentName(component)}
                      </h3>
                      <span className="text-lg font-bold text-brand-purple">
                        €{component.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {getComponentDescription(component)}
                    </p>
                    
                    <div className="space-y-1 mb-3">
                      {getComponentSpecs(component).map((spec, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-500">
                          <Circle className="w-2 h-2 mr-2 fill-current" />
                          {spec}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs ${
                        component.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {component.inStock 
                          ? (language === 'sq' ? 'Në stok' : 'In stock')
                          : (language === 'sq' ? 'Jashtë stokut' : 'Out of stock')
                        }
                      </span>
                      
                      {selectedComponents.cpu?.id === component.id && (
                        <div className="flex items-center text-brand-purple">
                          <Check className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">
                            {language === 'sq' ? 'Zgjedhur' : 'Selected'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Price Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'sq' ? 'Çmimi Total' : 'Total Price'}
              </h3>
              <p className="text-sm text-gray-600">
                {Object.keys(selectedComponents).length} {language === 'sq' ? 'komponentë zgjedhur' : 'components selected'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-purple">
                €{totalPrice.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500">
                {language === 'sq' ? 'Pa TVSH' : 'Excluding VAT'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReviewAndOrder = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === 'sq' ? 'Rishikimi Final' : 'Final Review'}
        </h2>
        <p className="text-gray-600">
          {language === 'sq' 
            ? 'Kontrolloni konfigurimin tuaj para porosisë'
            : 'Review your configuration before ordering'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'sq' ? 'Konfigurimi Juaj' : 'Your Configuration'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(selectedComponents).map(([category, component]) => {
                  const categoryInfo = componentCategories.find(cat => cat.id === category);
                  const Icon = categoryInfo?.icon || Circle;
                  
                  return (
                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-brand-purple" />
                        <div>
                          <p className="font-medium text-gray-800">
                            {getComponentName(component)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {language === 'sq' ? categoryInfo?.name : categoryInfo?.nameEn}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800">
                        €{component.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'sq' ? 'Përmbledhje Çmimi' : 'Price Summary'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{language === 'sq' ? 'Nëntotali:' : 'Subtotal:'}</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{language === 'sq' ? 'TVSH (20%):' : 'VAT (20%):'}</span>
                  <span>€{(totalPrice * 0.2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{language === 'sq' ? 'Ndërtimi (falas):' : 'Assembly (free):'}</span>
                  <span className="text-green-600">€0.00</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>{language === 'sq' ? 'Totali:' : 'Total:'}</span>
                  <span className="text-brand-purple">€{(totalPrice * 1.2).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="glow" className="w-full" size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {language === 'sq' ? 'Shto në Shportë' : 'Add to Cart'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Bookmark className="w-4 h-4 mr-2" />
                  {language === 'sq' ? 'Ruaj Konfigurimin' : 'Save Configuration'}
                </Button>
                
                <Button variant="ghost" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'sq' ? 'Ndaj me Miqtë' : 'Share with Friends'}
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Info className="w-4 h-4 mr-2" />
                  <span>
                    {language === 'sq' 
                      ? 'Garancion 2 vjet për të gjithë konfigurimin'
                      : '2-year warranty for the entire configuration'
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-brand-purple hover:text-brand-purple/80 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'sq' ? 'Kthehu në Fillim' : 'Back to Home'}
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                PC Configurator
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'sq' 
                  ? 'Krijoni PC-në tuaj të ëndrrave'
                  : 'Build your dream PC'
                }
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-purple">
                €{totalPrice.toFixed(2)}
              </div>
              <p className="text-sm text-gray-500">
                {language === 'sq' ? 'Çmimi aktual' : 'Current price'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'border-brand-purple bg-brand-purple text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-brand-purple' : 'text-gray-500'
                }`}>
                  {language === 'sq' ? step.title : step.titleEn}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-brand-purple' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 0 && renderBuildSelection()}
        {currentStep === 1 && renderComponentConfiguration()}
        {currentStep === 2 && renderReviewAndOrder()}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'sq' ? 'Prapa' : 'Previous'}
          </Button>

          <Button
            variant="glow"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === 0 && !selectedBuild}
          >
            {currentStep === steps.length - 1 
              ? (language === 'sq' ? 'Porosi Tani' : 'Order Now')
              : (language === 'sq' ? 'Vazhdoni' : 'Continue')
            }
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}