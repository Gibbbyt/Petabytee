'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap,
  Shield,
  HardDrive,
  Cpu,
  Settings,
  CheckCircle,
  Star,
  Clock,
  Download,
  Wrench
} from 'lucide-react';

export default function PCOptimizationPage() {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Zap,
      title: language === 'sq' ? 'Optimizim Performance' : 'Performance Optimization',
      description: language === 'sq' 
        ? 'Rritja e shpejtësisë së sistemit dhe optimizimi i performancës'
        : 'Increasing system speed and performance optimization',
      price: '€25-50'
    },
    {
      icon: Shield,
      title: language === 'sq' ? 'Pastrimi i Virusëve' : 'Virus Cleanup',
      description: language === 'sq' 
        ? 'Heqja e malware, virusëve dhe software-it të dëmshëm'
        : 'Removal of malware, viruses and harmful software',
      price: '€30-60'
    },
    {
      icon: HardDrive,
      title: language === 'sq' ? 'Optimizim Hard Disk' : 'Hard Disk Optimization',
      description: language === 'sq' 
        ? 'Defragmentimi, pastrimi dhe optimizimi i hapësirës ruajtëse'
        : 'Defragmentation, cleanup and storage space optimization',
      price: '€20-40'
    },
    {
      icon: Settings,
      title: language === 'sq' ? 'Konfigurimi i Sistemit' : 'System Configuration',
      description: language === 'sq' 
        ? 'Konfigurimi optimal i Windows dhe driverëve'
        : 'Optimal configuration of Windows and drivers',
      price: '€35-70'
    }
  ];

  const tips = [
    {
      title: language === 'sq' ? 'Pastroni Startup Programs' : 'Clean Startup Programs',
      description: language === 'sq' 
        ? 'Hiqni programet që nisen automatikisht dhe ngadalësojnë sistemin'
        : 'Remove programs that start automatically and slow down the system'
    },
    {
      title: language === 'sq' ? 'Përditësoni Driverët' : 'Update Drivers',
      description: language === 'sq' 
        ? 'Mbani driverët e përditësuar për performancë më të mirë'
        : 'Keep drivers updated for better performance'
    },
    {
      title: language === 'sq' ? 'Pastrim i Skedarëve Temporary' : 'Clean Temporary Files',
      description: language === 'sq' 
        ? 'Fshini skedarët e përkohshëm dhe cache për hapësirë më shumë'
        : 'Delete temporary files and cache for more space'
    },
    {
      title: language === 'sq' ? 'Defragmentim i Hard Disk' : 'Hard Disk Defragmentation',
      description: language === 'sq' 
        ? 'Defragmentoni hard diskun për shpejtësi më të madhe'
        : 'Defragment hard disk for greater speed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-midnight mb-4">
            {language === 'sq' ? 'Optimizim PC' : 'PC Optimization'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Rritni performancën e PC-së tuaj me shërbimet tona profesionale të optimizimit dhe këshillat e pageshuaja.'
              : 'Increase your PC performance with our professional optimization services and paid tips.'
            }
          </p>
        </div>

        {/* Free Tips Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Këshilla Falas për Optimizim' : 'Free Optimization Tips'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center mr-4 mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Shërbime Profesionale' : 'Professional Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-brand-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{service.title}</h3>
                        <div className="text-brand-purple font-bold">{service.price}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <Button className="w-full" variant="outline">
                      {language === 'sq' ? 'Porosit Shërbimin' : 'Order Service'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact for Custom Solutions */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Wrench className="w-16 h-16 text-brand-purple mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'sq' ? 'Keni Nevojë për Ndihmë?' : 'Need Help?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'sq' 
                  ? 'Kontaktoni ekspertët tanë për zgjidhje të personalizuara optimizimi.'
                  : 'Contact our experts for custom optimization solutions.'
                }
              </p>
              <Button className="bg-brand-gradient hover:opacity-90">
                {language === 'sq' ? 'Kontakto Ekspertët' : 'Contact Experts'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}