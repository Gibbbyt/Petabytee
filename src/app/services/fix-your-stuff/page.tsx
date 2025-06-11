'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Wrench,
  Play,
  BookOpen,
  Download,
  Search,
  Star,
  Clock,
  CheckCircle,
  Users,
  Monitor,
  Smartphone,
  Gamepad2
} from 'lucide-react';

export default function FixYourStuffPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      icon: Monitor,
      title: language === 'sq' ? 'PC & Laptop' : 'PC & Laptop',
      count: 25,
      tutorials: [
        language === 'sq' ? 'Si të pastroni një PC' : 'How to clean a PC',
        language === 'sq' ? 'Zëvendësimi i RAM' : 'RAM replacement',
        language === 'sq' ? 'Instalimi i SSD' : 'SSD installation'
      ]
    },
    {
      icon: Smartphone,
      title: language === 'sq' ? 'Telefona' : 'Phones',
      count: 18,
      tutorials: [
        language === 'sq' ? 'Ndërrimi i baterisë' : 'Battery replacement',
        language === 'sq' ? 'Riparimi i ekranit' : 'Screen repair',
        language === 'sq' ? 'Pastrimi i portit' : 'Port cleaning'
      ]
    },
    {
      icon: Gamepad2,
      title: language === 'sq' ? 'Gaming' : 'Gaming',
      count: 12,
      tutorials: [
        language === 'sq' ? 'Riparimi i kontrollerit' : 'Controller repair',
        language === 'sq' ? 'Pastrimi i konsolit' : 'Console cleaning',
        language === 'sq' ? 'Zëvendësimi i stick-ave' : 'Stick replacement'
      ]
    }
  ];

  const popularTutorials = [
    {
      title: language === 'sq' ? 'Si të Pastroni PC-në tuaj' : 'How to Clean Your PC',
      duration: '15 min',
      difficulty: language === 'sq' ? 'E lehtë' : 'Easy',
      views: 2840,
      rating: 4.8,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      title: language === 'sq' ? 'Zëvendësimi i Baterisë së Telefonit' : 'Phone Battery Replacement',
      duration: '20 min',
      difficulty: language === 'sq' ? 'Mesatare' : 'Medium',
      views: 1920,
      rating: 4.6,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      title: language === 'sq' ? 'Instalimi i SSD në Laptop' : 'Installing SSD in Laptop',
      duration: '25 min',
      difficulty: language === 'sq' ? 'E avancuar' : 'Advanced',
      views: 3100,
      rating: 4.9,
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const tools = [
    {
      name: language === 'sq' ? 'Set Kaçavidash' : 'Screwdriver Set',
      description: language === 'sq' ? 'Kaçavida të ndryshme për pajisje elektronike' : 'Various screwdrivers for electronic devices',
      price: '€15-25'
    },
    {
      name: language === 'sq' ? 'Spudger Set' : 'Spudger Set',
      description: language === 'sq' ? 'Mjete për hapjen e pajisjeve pa dëmtime' : 'Tools for opening devices without damage',
      price: '€8-15'
    },
    {
      name: language === 'sq' ? 'Multimeter' : 'Multimeter',
      description: language === 'sq' ? 'Për testimin e voltazhit dhe rezistencës' : 'For testing voltage and resistance',
      price: '€20-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-midnight mb-4">
            {language === 'sq' ? 'Riparo Gjërat e Tua' : 'Fix Your Stuff'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Mëso si të riparosh pajisjet elektronike me tutorialet tona të detajuara dhe udhëzimet hap pas hapi.'
              : 'Learn how to repair electronic devices with our detailed tutorials and step-by-step guides.'
            }
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={language === 'sq' ? 'Kërko tutoriale...' : 'Search tutorials...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Kategoritë' : 'Categories'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-brand-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{category.title}</h3>
                        <p className="text-sm text-gray-600">
                          {category.count} {language === 'sq' ? 'tutoriale' : 'tutorials'}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {category.tutorials.map((tutorial, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="w-4 h-4 text-brand-lime mr-2" />
                          {tutorial}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Popular Tutorials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Tutorialet Popullorë' : 'Popular Tutorials'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularTutorials.map((tutorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <Play className="w-16 h-16 text-white bg-brand-purple rounded-full p-4" />
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {tutorial.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{tutorial.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{tutorial.difficulty}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {tutorial.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tutorial.views.toLocaleString()}
                    </div>
                    <Button size="sm" variant="outline">
                      {language === 'sq' ? 'Shiko' : 'Watch'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Tools */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Mjetet e Rekomanduara' : 'Recommended Tools'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                  <div className="text-lg font-bold text-brand-purple mb-3">{tool.price}</div>
                  <Button size="sm" className="w-full">
                    {language === 'sq' ? 'Bli Tani' : 'Buy Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-brand-gradient text-white">
            <CardContent className="p-8">
              <BookOpen className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                {language === 'sq' ? 'Nuk gjeni atë që kërkoni?' : 'Can\'t find what you\'re looking for?'}
              </h3>
              <p className="mb-6">
                {language === 'sq' 
                  ? 'Kërkoni ndihmë për një riparim specifik? Kontaktoni ekspertët tanë.'
                  : 'Need help with a specific repair? Contact our experts.'
                }
              </p>
              <Button variant="secondary" className="bg-white text-brand-purple hover:bg-gray-100">
                {language === 'sq' ? 'Kontakto Ekspertët' : 'Contact Experts'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}