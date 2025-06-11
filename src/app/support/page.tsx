'use client';

import React, { useState } from 'react';
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
  HeadphonesIcon, 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  AlertCircle,
  Info,
  MapPin,
  Calendar,
  Users,
  Zap,
  Shield,
  Star,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Globe
} from 'lucide-react';

export default function SupportPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    priority: '',
    message: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - could integrate with API
    console.log('Contact form submitted:', contactForm);
    alert('Mesazhi juaj u dërgua me sukses! Do t\'ju kontaktojmë së shpejti.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      priority: '',
      message: ''
    });
  };

  const supportChannels = [
    {
      icon: Phone,
      title: 'Telefoni',
      description: 'Merrni mbështetje të menjëhershme',
      details: '+383 45 123 456',
      availability: '24/7',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Dërgoni pyetjen tuaj',
      details: 'support@petabyte.al',
      availability: 'Përgjigje brenda 4 orë',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat me ekspertët tanë',
      details: 'Chat i menjëhershëm',
      availability: '09:00 - 22:00',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: MapPin,
      title: 'Vizitë Fizike',
      description: 'Ejani në zyrat tona',
      details: 'Rruga Bill Clinton 123',
      availability: 'Hënë - Shtunë',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const faqCategories = [
    {
      id: 'general',
      title: 'Të Përgjithshme',
      questions: [
        {
          id: '1',
          question: 'Çfarë shërbimesh ofron Petabyte Tech?',
          answer: 'Ne ofrojmë një gamë të gjerë shërbimesh përfshirë: PC konfigurimi, riparime hardware, zhvillim software, AI/ML zgjidhje, 3D printing, gaming center, dhe mbështetje teknike 24/7.'
        },
        {
          id: '2',
          question: 'A jeni të certifikuar për riparime?',
          answer: 'Po, ekipi ynë përbëhet nga teknike të certifikuar me përvojë mbi 10 vjet në fushën e teknologjisë. Të gjitha ripamimet vijnë me garanci.'
        },
        {
          id: '3',
          question: 'Ku ndodheni fizikisht?',
          answer: 'Zyrat tona kryesore ndodhen në Prishtinë, Rruga "Bill Clinton" Nr. 123. Gjithashtu ofrojmë shërbime online dhe në shtëpi për disa kategori.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Teknike',
      questions: [
        {
          id: '4',
          question: 'Sa kohë merr një riparim PC?',
          answer: 'Zakonisht riparimeve të thjeshtë u duhen 1-2 ditë, ndërsa ato komplekse mund të marrin deri 5-7 ditë pune. Do t\'ju informojmë për kohën e saktë pas diagnostikimit.'
        },
        {
          id: '5',
          question: 'A ofroni garanci për riparime?',
          answer: 'Po, të gjitha ripamimet vijnë me garanci 6 mujore për punën e kryer dhe 30 ditë për pjesët e zëvendësuara. Për PC të rinj, garancie është 2 vjet.'
        },
        {
          id: '6',
          question: 'A mund të konfiguroj PC online?',
          answer: 'Absolutisht! PC Configurator-i ynë online ju lejon të ndërtoni PC-in tuaj të personalizuar me rekomandime AI. Gjithashtu mund të konsultoheni me ekspertët tanë.'
        }
      ]
    },
    {
      id: 'billing',
      title: 'Pagesa',
      questions: [
        {
          id: '7',
          question: 'Cilat metoda pagese pranoni?',
          answer: 'Pranojmë pagesa në para të gatshme, karta krediti/debiti, PayPal, bankovere, dhe për biznese ofrojmë edhe faturim me afat.'
        },
        {
          id: '8',
          question: 'A ka kosto për diagnostikimin?',
          answer: 'Diagnostikimi bazë është falas. Nëse vendosni të mos vazhdoni me riparimin, diagnostikimi i detajuar kushton 10€.'
        },
        {
          id: '9',
          question: 'A ofroni zbritje për studentë?',
          answer: 'Po, studentët marrin 15% zbritje në të gjitha shërbimet me paraqitjen e ID-së studente. Gjithashtu kemi paketa speciale për shkolla dhe universitete.'
        }
      ]
    }
  ];

  const knowledgeBase = [
    {
      id: '1',
      title: 'Si të konfiguroni PC gaming?',
      category: 'Tutoriale',
      type: 'video',
      description: 'Udhëzues i plotë për ndërtimin e PC gaming përfekt për nevojat tuaja.',
      duration: '15 min',
      views: '2.5K',
      icon: Video
    },
    {
      id: '2',
      title: 'Riparimi i problemeve të Windows',
      category: 'Zgjidhje',
      type: 'article',
      description: 'Problemet më të zakonshme të Windows dhe si t\'i zgjidhni ato.',
      readTime: '8 min',
      views: '1.8K',
      icon: BookOpen
    },
    {
      id: '3',
      title: 'Drivers pak të gjithë pajisjeve',
      category: 'Downloads',
      type: 'download',
      description: 'Koleksion i plotë i driver-ave për të gjitha pajisjet më të populullta.',
      size: '2.3GB',
      downloads: '5.2K',
      icon: Download
    },
    {
      id: '4',
      title: 'Optimizimi i përformancës së PC',
      category: 'Këshilla',
      type: 'article',
      description: 'Teknika profesionale për të rritur performancën e kompjuterit tuaj.',
      readTime: '12 min',
      views: '3.1K',
      icon: BookOpen
    }
  ];

  const filteredFAQ = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const operatingHours = [
    { day: 'Hënë - Premte', hours: '08:00 - 20:00' },
    { day: 'Shtunë', hours: '09:00 - 18:00' },
    { day: 'Diel', hours: '10:00 - 16:00' },
    { day: 'Emergjencë', hours: '24/7' }
  ];

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <HeadphonesIcon className="w-12 h-12 text-green-400" />
                <h1 className="text-5xl md:text-6xl font-bold">Mbështetje</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Jemi këtu për t'ju ndihmuar. Gjeni përgjigjet që kerkoni ose kontaktoni ekipin tonë të ekspertëve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Filloni Chat
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900">
                  <Phone className="w-5 h-5 mr-2" />
                  Telefononi Tani
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Si Mund T'ju Ndihmojmë</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Zgjidhni mënyrën më të përshtatshme për të marrë mbështetjen që ju nevojitet
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.div
                    key={channel.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 ${channel.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className={`w-8 h-8 ${channel.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
                        <p className="text-gray-600 mb-3">{channel.description}</p>
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-900">{channel.details}</p>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {channel.availability}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="contact">Kontakt</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Pyetje të Shpeshta</h3>
                  <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Kërkoni në FAQ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {filteredFAQ.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      {category.title}
                    </h4>
                    <div className="space-y-2">
                      {category.questions.map((faq) => (
                        <Card key={faq.id} className="overflow-hidden">
                          <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => setActiveAccordion(
                              activeAccordion === faq.id ? null : faq.id
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-gray-900">{faq.question}</h5>
                              {activeAccordion === faq.id ? (
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </CardHeader>
                          {activeAccordion === faq.id && (
                            <CardContent className="border-t bg-gray-50">
                              <p className="text-gray-600">{faq.answer}</p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Dërgoni Mesazh</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Emri *
                            </label>
                            <Input
                              required
                              value={contactForm.name}
                              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
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
                              value={contactForm.email}
                              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                              placeholder="email@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefoni
                          </label>
                          <Input
                            type="tel"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                            placeholder="+383 XX XXX XXX"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kategoria *
                            </label>
                            <Select
                              value={contactForm.category}
                              onValueChange={(value) => setContactForm({...contactForm, category: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Zgjidhni kategorinë" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technical">Mbështetje Teknike</SelectItem>
                                <SelectItem value="billing">Pagesa</SelectItem>
                                <SelectItem value="general">Të Përgjithshme</SelectItem>
                                <SelectItem value="complaint">Ankesë</SelectItem>
                                <SelectItem value="suggestion">Sugjerim</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Prioriteti
                            </label>
                            <Select
                              value={contactForm.priority}
                              onValueChange={(value) => setContactForm({...contactForm, priority: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Zgjidhni prioritetin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">I Ulët</SelectItem>
                                <SelectItem value="medium">Mesatar</SelectItem>
                                <SelectItem value="high">I Lartë</SelectItem>
                                <SelectItem value="urgent">Urgjent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subjekti *
                          </label>
                          <Input
                            required
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                            placeholder="Shkruani subjektin e mesazhit"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mesazhi *
                          </label>
                          <Textarea
                            required
                            rows={5}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            placeholder="Përshkruani detajisht problemin ose pyetjen tuaj..."
                          />
                        </div>

                        <Button type="submit" className="w-full">
                          <Send className="w-4 h-4 mr-2" />
                          Dërgo Mesazhin
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Contact Info & Hours */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Oraret e Punës</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {operatingHours.map((schedule, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                              <span className="font-medium text-gray-900">{schedule.day}</span>
                              <span className="text-gray-600">{schedule.hours}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Informacion Kontakti</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
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
                          <Mail className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600 text-sm">support@petabyte.al</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Knowledge Base Tab */}
              <TabsContent value="knowledge" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Baza e Njohurive</h3>
                  <p className="text-gray-600">Udhëzues, tutoriale dhe burime për të zgjidhur problemet vetë</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {knowledgeBase.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {item.category}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {item.type}
                                  </Badge>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>
                                    {item.duration && `${item.duration} • `}
                                    {item.readTime && `${item.readTime} • `}
                                    {item.size && `${item.size} • `}
                                    {item.views} views
                                  </span>
                                  <ExternalLink className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Status Tab */}
              <TabsContent value="status" className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Statusi i Shërbimeve</h3>
                  <p className="text-gray-600">Monitoroni statusin e të gjitha shërbimeve tona</p>
                </div>

                <div className="space-y-4">
                  {[
                    { service: 'Website', status: 'operational', uptime: '99.9%' },
                    { service: 'PC Configurator', status: 'operational', uptime: '99.8%' },
                    { service: 'Gaming Center', status: 'operational', uptime: '100%' },
                    { service: 'Support Chat', status: 'maintenance', uptime: '95.2%' },
                    { service: 'Email System', status: 'operational', uptime: '99.5%' },
                    { service: '3D Printing', status: 'operational', uptime: '98.7%' }
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              item.status === 'operational' ? 'bg-green-500' :
                              item.status === 'maintenance' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} />
                            <h4 className="font-medium text-gray-900">{item.service}</h4>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant={
                                item.status === 'operational' ? 'default' :
                                item.status === 'maintenance' ? 'secondary' :
                                'destructive'
                              }
                            >
                              {item.status === 'operational' ? 'Operacional' :
                               item.status === 'maintenance' ? 'Mirëmbajtje' :
                               'Problem'}
                            </Badge>
                            <span className="text-sm text-gray-600">{item.uptime} uptime</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Mirëmbajtje e Planifikuar
                        </h4>
                        <p className="text-blue-800 text-sm">
                          Sistemi i chat-it do të jetë në mirëmbajtje të shtunën nga 02:00 - 04:00 AM.
                          Ju lutem përdorni email për mbështetje gjatë kësaj kohe.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Nuk Gjetët Atë Që Kerkoni?</h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Kontaktoni ekipin tonë të mbështetjes dhe do t'ju ndihmojmë të gjeni zgjidhjen e përshtatshme
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Filloni Chat Live
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-green-600">
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