'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Wrench, 
  Smartphone, 
  Monitor, 
  Laptop, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  Gamepad2,
  Printer,
  Wifi,
  Battery,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  MapPin,
  Phone,
  Euro,
  Calendar,
  Search,
  Upload,
  FileText,
  Star,
  ThumbsUp,
  Settings,
  Zap,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

interface RepairService {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  basePrice: number;
  duration: string;
  warranty: string;
  popular: boolean;
}

interface RepairRequest {
  name: string;
  email: string;
  phone: string;
  deviceType: string;
  brand: string;
  model: string;
  issue: string;
  description: string;
  urgency: string;
  pickupMethod: string;
}

export default function FixYourStuffPage() {
  const [repairForm, setRepairForm] = useState<RepairRequest>({
    name: '',
    email: '',
    phone: '',
    deviceType: '',
    brand: '',
    model: '',
    issue: '',
    description: '',
    urgency: 'normal',
    pickupMethod: 'drop-off'
  });
  const [trackingId, setTrackingId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleRepairSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Repair request submitted:', repairForm);
    const requestId = 'REP' + Date.now().toString().slice(-6);
    alert(`Kërkesa për riparim u dërgua me sukses! ID-ja juaj: ${requestId}`);
    setRepairForm({
      name: '',
      email: '',
      phone: '',
      deviceType: '',
      brand: '',
      model: '',
      issue: '',
      description: '',
      urgency: 'normal',
      pickupMethod: 'drop-off'
    });
  };

  const repairServices: RepairService[] = [
    {
      id: '1',
      name: 'Riparim PC Desktop',
      category: 'computer',
      description: 'Riparim i plotë i PC desktop, përfshirë hardware dhe software.',
      icon: Monitor,
      basePrice: 25,
      duration: '1-3 ditë',
      warranty: '6 muaj',
      popular: true
    },
    {
      id: '2',
      name: 'Riparim Laptop',
      category: 'computer',
      description: 'Riparim laptopi, zëvendësim ekrani, keyboard, bateri dhe më shumë.',
      icon: Laptop,
      basePrice: 30,
      duration: '2-5 ditë',
      warranty: '6 muaj',
      popular: true
    },
    {
      id: '3',
      name: 'Riparim Smartphone',
      category: 'mobile',
      description: 'Riparim telefoni, zëvendësim ekrani, bateri, kamera dhe komponentë.',
      icon: Smartphone,
      basePrice: 20,
      duration: '1-2 ditë',
      warranty: '3 muaj',
      popular: true
    },
    {
      id: '4',
      name: 'Riparim Gaming Console',
      category: 'gaming',
      description: 'PlayStation, Xbox, Nintendo Switch - të gjitha riparimeve gaming.',
      icon: Gamepad2,
      basePrice: 35,
      duration: '3-7 ditë',
      warranty: '6 muaj',
      popular: false
    },
    {
      id: '5',
      name: 'Data Recovery',
      category: 'data',
      description: 'Rikuperim të dhënave nga HDD, SSD dhe media të tjera.',
      icon: HardDrive,
      basePrice: 50,
      duration: '3-10 ditë',
      warranty: 'N/A',
      popular: false
    },
    {
      id: '6',
      name: 'Riparim Printer',
      category: 'printer',
      description: 'Riparim printerash të gjitha llojeve - inkjet, laser, 3D.',
      icon: Printer,
      basePrice: 20,
      duration: '1-3 ditë',
      warranty: '3 muaj',
      popular: false
    },
    {
      id: '7',
      name: 'Upgrade Komponenti',
      category: 'upgrade',
      description: 'Upgrade RAM, SSD, GPU dhe komponentë të tjera.',
      icon: Cpu,
      basePrice: 15,
      duration: '1 ditë',
      warranty: '12 muaj',
      popular: true
    },
    {
      id: '8',
      name: 'Pastrim dhe Mirëmbajtje',
      category: 'maintenance',
      description: 'Pastrim profesional dhe mirëmbajtje parandaluese.',
      icon: Settings,
      basePrice: 10,
      duration: '1 ditë',
      warranty: '1 muaj',
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Të Gjitha', icon: Wrench },
    { id: 'computer', name: 'Kompjuterë', icon: Monitor },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'data', name: 'Data Recovery', icon: HardDrive },
    { id: 'printer', name: 'Printers', icon: Printer },
    { id: 'upgrade', name: 'Upgrades', icon: Cpu },
    { id: 'maintenance', name: 'Mirëmbajtje', icon: Settings }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? repairServices 
    : repairServices.filter(service => service.category === selectedCategory);

  const repairProcess = [
    {
      step: 1,
      title: 'Dërgoni Kërkesën',
      description: 'Plotësoni formularin online ose na kontaktoni telefonikisht',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      step: 2,
      title: 'Diagnostikimi',
      description: 'Ekipi ynë ekspert bën diagnostikimin falas të problemit',
      icon: Search,
      color: 'text-purple-600'
    },
    {
      step: 3,
      title: 'Oferta dhe Miratimi',
      description: 'Ju dërgojmë ofertën me çmim dhe kohë - ju vendosni',
      icon: Package,
      color: 'text-orange-600'
    },
    {
      step: 4,
      title: 'Riparimi',
      description: 'Bëjmë riparimin me pjesë origjinale dhe garanci të plotë',
      icon: Wrench,
      color: 'text-green-600'
    }
  ];

  const stats = [
    { value: '5000+', label: 'Riparime të Kompletuar', icon: CheckCircle },
    { value: '98%', label: 'Shkalla e Suksesit', icon: TrendingUp },
    { value: '24h', label: 'Koha Mesatare e Riparimit', icon: Clock },
    { value: '4.9★', label: 'Vlerësimi i Klientëve', icon: Star }
  ];

  const commonIssues = [
    { issue: 'Kompjuteri nuk ndizet', category: 'computer', frequency: '25%' },
    { issue: 'Ekrani i thyer', category: 'mobile', frequency: '20%' },
    { issue: 'Performancë e ngadaltë', category: 'computer', frequency: '18%' },
    { issue: 'Probleme me baterinë', category: 'mobile', frequency: '15%' },
    { issue: 'Overheating', category: 'computer', frequency: '12%' },
    { issue: 'Të dhëna të humbura', category: 'data', frequency: '10%' }
  ];

  const testimonials = [
    {
      name: 'Ardit Krasniqi',
      rating: 5,
      comment: 'Shërbim i shkëlqyer! Më riparuan laptop-in brenda 2 ditëve me çmim të arsyeshëm.',
      service: 'Riparim Laptop'
    },
    {
      name: 'Blerta Morina',
      rating: 5,
      comment: 'Data recovery perfekt! Më rikuperuan të gjitha fotot e familjes që mendoja se ishin humbur.',
      service: 'Data Recovery'
    },
    {
      name: 'Driton Berisha',
      rating: 5,
      comment: 'Upgrade-i i RAM dhe SSD e bëri PC-in si të ri. Rekomandoj!',
      service: 'Upgrade Komponenti'
    }
  ];

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Wrench className="w-12 h-12 text-orange-400" />
                <h1 className="text-5xl md:text-6xl font-bold">Fix Your Stuff</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Riparime eksperte për të gjitha pajisjet tuaja teknologjike. Shpejtë, besnik dhe me garanci të plotë.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  <Package className="w-5 h-5 mr-2" />
                  Dërgo për Riparim
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-900">
                  <Search className="w-5 h-5 mr-2" />
                  Gjurmo Riparimin
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-orange-600" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Shërbimet Tona</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Riparime eksperte për të gjitha pajisjet teknologjike me garanci dhe çmime të arsyeshme
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 relative">
                      {service.popular && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-orange-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Popullar
                          </Badge>
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{service.name}</h3>
                            <div className="flex items-center gap-1 text-orange-600">
                              <Euro className="w-4 h-4" />
                              <span className="font-semibold">{service.basePrice}+</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Kohëzgjatja:</span>
                            <span className="font-medium">{service.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Garancia:</span>
                            <span className="font-medium">{service.warranty}</span>
                          </div>
                        </div>
                        
                        <Button className="w-full">
                          Dërgo për Riparim
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Repair Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Si Funksionon</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Proces i thjeshtë në 4 hapa për të riparuar pajisjen tuaj
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {repairProcess.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-center relative"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center relative">
                        <Icon className={`w-8 h-8 ${step.color}`} />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    
                    {/* Connector line */}
                    {index < repairProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="request" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="request">Dërgo Kërkesë</TabsTrigger>
                <TabsTrigger value="track">Gjurmo Riparimin</TabsTrigger>
                <TabsTrigger value="info">Informacione</TabsTrigger>
              </TabsList>

              {/* Request Repair Tab */}
              <TabsContent value="request" className="space-y-8">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Dërgo Kërkesë për Riparim
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRepairSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Emri *
                          </label>
                          <Input
                            required
                            value={repairForm.name}
                            onChange={(e) => setRepairForm({...repairForm, name: e.target.value})}
                            placeholder="Emri juaj"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <Input
                            type="email"
                            required
                            value={repairForm.email}
                            onChange={(e) => setRepairForm({...repairForm, email: e.target.value})}
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefoni *
                        </label>
                        <Input
                          type="tel"
                          required
                          value={repairForm.phone}
                          onChange={(e) => setRepairForm({...repairForm, phone: e.target.value})}
                          placeholder="+383 XX XXX XXX"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lloji i Pajisjes *
                          </label>
                          <Select
                            value={repairForm.deviceType}
                            onValueChange={(value) => setRepairForm({...repairForm, deviceType: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Zgjidhni llojin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="laptop">Laptop</SelectItem>
                              <SelectItem value="desktop">PC Desktop</SelectItem>
                              <SelectItem value="smartphone">Smartphone</SelectItem>
                              <SelectItem value="tablet">Tablet</SelectItem>
                              <SelectItem value="console">Gaming Console</SelectItem>
                              <SelectItem value="printer">Printer</SelectItem>
                              <SelectItem value="other">Tjetër</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Marka
                          </label>
                          <Input
                            value={repairForm.brand}
                            onChange={(e) => setRepairForm({...repairForm, brand: e.target.value})}
                            placeholder="p.sh. Apple, Dell, HP"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Modeli
                          </label>
                          <Input
                            value={repairForm.model}
                            onChange={(e) => setRepairForm({...repairForm, model: e.target.value})}
                            placeholder="p.sh. iPhone 13, Latitude 5520"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Problemi Kryesor *
                        </label>
                        <Select
                          value={repairForm.issue}
                          onValueChange={(value) => setRepairForm({...repairForm, issue: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Zgjidhni problemin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-power">Nuk ndizet</SelectItem>
                            <SelectItem value="broken-screen">Ekrani i thyer</SelectItem>
                            <SelectItem value="slow-performance">Performancë e ngadaltë</SelectItem>
                            <SelectItem value="battery-issue">Problem me baterinë</SelectItem>
                            <SelectItem value="overheating">Nxehje e tepërt</SelectItem>
                            <SelectItem value="data-loss">Humbje e të dhënave</SelectItem>
                            <SelectItem value="software-issue">Problem software</SelectItem>
                            <SelectItem value="hardware-upgrade">Upgrade komponenti</SelectItem>
                            <SelectItem value="other">Tjetër</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Përshkrimi i Detajuar
                        </label>
                        <Textarea
                          rows={4}
                          value={repairForm.description}
                          onChange={(e) => setRepairForm({...repairForm, description: e.target.value})}
                          placeholder="Përshkruani detajisht problemin, kur filloi, çfarë ndodhi para se të fillonte problemi, etj."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Urgjenca
                          </label>
                          <Select
                            value={repairForm.urgency}
                            onValueChange={(value) => setRepairForm({...repairForm, urgency: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">E ulët (5-7 ditë)</SelectItem>
                              <SelectItem value="normal">Normale (2-3 ditë)</SelectItem>
                              <SelectItem value="high">E lartë (1-2 ditë)</SelectItem>
                              <SelectItem value="urgent">Urgjente (24 orë)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Metoda e Dorëzimit
                          </label>
                          <Select
                            value={repairForm.pickupMethod}
                            onValueChange={(value) => setRepairForm({...repairForm, pickupMethod: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="drop-off">Do ta sjell vetë</SelectItem>
                              <SelectItem value="pickup">Merreni nga shtëpia (+10€)</SelectItem>
                              <SelectItem value="mail">Dërgim me postë</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Package className="w-4 h-4 mr-2" />
                        Dërgo Kërkesën
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Track Repair Tab */}
              <TabsContent value="track" className="space-y-6">
                <div className="max-w-md mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Gjurmo Riparimin
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID e Riparimit
                          </label>
                          <Input
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            placeholder="REP123456"
                          />
                        </div>
                        <Button className="w-full">
                          <Search className="w-4 h-4 mr-2" />
                          Gjurmo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sample tracking result */}
                <div className="max-w-2xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statusi i Riparimit - REP123456</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900">Riparimi i Përfunduar</p>
                            <p className="text-sm text-green-700">Pajisja është gati për marrje</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            { status: 'Përfunduar', date: '2024-02-15 14:30', description: 'Riparimi përfundoi me sukses. Pajisja është testuar.' },
                            { status: 'Në Riparim', date: '2024-02-14 09:15', description: 'Riparimi ka filluar. Zëvendësimi i ekranit.' },
                            { status: 'Pjesët e Porositura', date: '2024-02-13 16:45', description: 'Pjesët e nevojshme janë porositur.' },
                            { status: 'Diagnostikuar', date: '2024-02-13 11:20', description: 'Diagnostikimi tregoi nevojën për zëvendësim ekrani.' },
                            { status: 'Pranuar', date: '2024-02-13 09:00', description: 'Pajisja është pranuar në qendër.' }
                          ].map((event, index) => (
                            <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-900">{event.status}</span>
                                  <span className="text-sm text-gray-500">{event.date}</span>
                                </div>
                                <p className="text-sm text-gray-600">{event.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Info Tab */}
              <TabsContent value="info" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Common Issues */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Problemet më të Shpeshta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {commonIssues.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-900">{item.issue}</span>
                            <Badge variant="outline">{item.frequency}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Testimonials */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Vlerësimet e Klientëve</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {testimonials.map((testimonial, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <span className="font-medium text-gray-900">{testimonial.name}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">"{testimonial.comment}"</p>
                            <Badge variant="outline" className="text-xs">{testimonial.service}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informacione Kontakti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Adresa</p>
                          <p className="text-gray-600 text-sm">Rruga "Bill Clinton" Nr. 123, Prishtinë</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Telefoni</p>
                          <p className="text-gray-600 text-sm">+383 45 123 456</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Orari</p>
                          <p className="text-gray-600 text-sm">Hënë - Shtunë: 09:00 - 19:00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Gati për të Riparuar Pajisjen Tuaj?</h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Mos e lini teknologjinë tuaj të prishur të ju ngadalësojë. Kontaktoni ne sot për një diagnostikim falas!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Package className="w-5 h-5 mr-2" />
                  Dërgo për Riparim
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-orange-600">
                  <Phone className="w-5 h-5 mr-2" />
                  Telefononi +383 45 123 456
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}