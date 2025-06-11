'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ShoppingCart,
  Truck,
  CreditCard,
  Shield,
  Wrench,
  Monitor,
  Gamepad2,
  Settings,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Star,
  Users,
  Book,
  Headphones
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  questionAl: string;
  answer: string;
  answerAl: string;
  category: string;
  helpful: number;
  tags: string[];
}

interface FAQCategory {
  id: string;
  name: string;
  nameAl: string;
  description: string;
  descriptionAl: string;
  icon: any;
  color: string;
  count: number;
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How long does it take to build a custom PC?',
      questionAl: 'Sa kohë duhet për të ndërtuar një PC të personalizuar?',
      answer: 'Typically, our custom PC builds take 3-5 business days depending on component availability and complexity. For urgent orders, we offer express service (1-2 days) for an additional fee.',
      answerAl: 'Zakonisht, ndërtimet tona të PC-ve të personalizuara marrin 3-5 ditë pune në varësi të disponueshmërisë së komponentëve dhe kompleksitetit. Për porosi urgjente, ofrojmë shërbim ekspres (1-2 ditë) për një pagesë shtesë.',
      category: 'Hardware',
      helpful: 124,
      tags: ['PC Building', 'Timeline', 'Custom']
    },
    {
      id: '2',
      question: 'What warranty do you offer on gaming PCs?',
      questionAl: 'Çfarë garancie ofroni për PC-të gaming?',
      answer: 'We provide a comprehensive 2-year warranty on all custom-built PCs, covering parts and labor. Individual components may have longer manufacturer warranties that we help you claim.',
      answerAl: 'Ofrojmë një garanci të plotë 2-vjeçare për të gjitha PC-të e ndërtuara të personalizuara, duke mbuluar pjesët dhe punën. Komponentët individualë mund të kenë garanci më të gjata të prodhuesit që ju ndihmojmë ta kërkoni.',
      category: 'Support',
      helpful: 89,
      tags: ['Warranty', 'Support', 'PC']
    },
    {
      id: '3',
      question: 'Do you ship internationally?',
      questionAl: 'A dërgoni ndërkombëtarisht?',
      answer: 'Currently, we ship within Kosovo and to select European countries. International shipping rates and times vary by destination. Contact us for specific shipping information to your location.',
      answerAl: 'Aktualisht, dërgojmë brenda Kosovës dhe në vende të zgjedhura evropiane. Tarifat dhe kohët e dërgimit ndërkombëtar variojnë sipas destinacionit. Na kontaktoni për informacion specifik dërgimi në vendndodhjen tuaj.',
      category: 'Shipping',
      helpful: 67,
      tags: ['Shipping', 'International', 'Delivery']
    },
    {
      id: '4',
      question: 'How secure are your gaming accounts?',
      questionAl: 'Sa të sigurta janë llogaritë tuaja gaming?',
      answer: 'All gaming accounts are verified, legitimate, and come with full ownership transfer. We use secure methods to ensure account safety and provide recovery information. Each account is guaranteed authentic.',
      answerAl: 'Të gjitha llogaritë gaming janë të verifikuara, legjitimate dhe vijnë me transferim të plotë pronësie. Përdorim metoda të sigurta për të siguruar sigurinë e llogarisë dhe ofrojmë informacion rikuperimi. Çdo llogari është e garantuar autentike.',
      category: 'Accounts',
      helpful: 156,
      tags: ['Gaming Accounts', 'Security', 'Authentic']
    },
    {
      id: '5',
      question: 'What payment methods do you accept?',
      questionAl: 'Çfarë metodash pagese pranoni?',
      answer: 'We accept all major credit cards (Visa, Mastercard), PayPal, bank transfers, and local payment methods. All payments are processed securely with SSL encryption.',
      answerAl: 'Pranojmë të gjitha kartat kryesore të kreditit (Visa, Mastercard), PayPal, transferime bankare dhe metoda lokale pagese. Të gjitha pagesat përpunohen me siguri me enkriptim SSL.',
      category: 'Payment',
      helpful: 203,
      tags: ['Payment', 'Credit Card', 'PayPal', 'Security']
    },
    {
      id: '6',
      question: 'Can I upgrade my PC later?',
      questionAl: 'A mund ta përmirësoj PC-në time më vonë?',
      answer: 'Absolutely! We design our PCs with future upgrades in mind. We provide detailed upgrade guides and offer upgrade services. Many components can be easily upgraded as technology advances.',
      answerAl: 'Absolutisht! I dizajnojmë PC-të tona duke menduar për përmirësimet e ardhshme. Ofrojmë udhëzues të detajuar përmirësimi dhe shërbime përmirësimi. Shumë komponentë mund të përmirësohen lehtë ndërsa teknologjia përparon.',
      category: 'Hardware',
      helpful: 98,
      tags: ['Upgrade', 'Future-proof', 'Components']
    },
    {
      id: '7',
      question: 'How does the EasyMail-In repair service work?',
      questionAl: 'Si funksionon shërbimi i riparimit EasyMail-In?',
      answer: 'Simply package your device, print our prepaid shipping label, and send it to us. We diagnose the issue within 24 hours, provide a quote, and complete repairs typically within 3-7 days. Free return shipping included.',
      answerAl: 'Thjesht paketoni pajisjen tuaj, printoni etiketën tonë të paguar paraprakisht dhe na e dërgoni. Diagnostikojmë problemin brenda 24 orëve, ofrojmë një kuotë dhe kompletojmë riparimet zakonisht brenda 3-7 ditëve. Dërgimi i kthimit falas i përfshirë.',
      category: 'Repair',
      helpful: 142,
      tags: ['EasyMail-In', 'Repair', 'Shipping', 'Diagnosis']
    },
    {
      id: '8',
      question: 'What if I\'m not satisfied with my purchase?',
      questionAl: 'Çfarë nëse nuk jam i kënaqur me blerjen time?',
      answer: 'We offer a 30-day money-back guarantee on most products. Items must be in original condition. Digital products and custom-built PCs have specific return policies. Contact support for assistance.',
      answerAl: 'Ofrojmë një garanci 30-ditore kthimi parash për shumicën e produkteve. Artikujt duhet të jenë në gjendje origjinale. Produktet dixhitale dhe PC-të e ndërtuara të personalizuara kanë politika specifike kthimi. Kontaktoni mbështetjen për ndihmë.',
      category: 'Returns',
      helpful: 87,
      tags: ['Return Policy', 'Money-back', 'Guarantee']
    },
    {
      id: '9',
      question: 'Do you provide technical support after purchase?',
      questionAl: 'A ofroni mbështetje teknike pas blerjes?',
      answer: 'Yes! We provide free technical support for all customers. This includes setup assistance, troubleshooting, optimization tips, and general questions. Premium support packages are also available.',
      answerAl: 'Po! Ofrojmë mbështetje teknike falas për të gjithë klientët. Kjo përfshin ndihmë setup-i, zgjidhje problemesh, këshilla optimizimi dhe pyetje të përgjithshme. Paketat e mbështetjes premium janë gjithashtu të disponueshme.',
      category: 'Support',
      helpful: 178,
      tags: ['Technical Support', 'Free', 'Setup', 'Troubleshooting']
    },
    {
      id: '10',
      question: 'How do I track my order?',
      questionAl: 'Si ta gjurmoj porosinë time?',
      answer: 'You can track your order through your account dashboard or using the tracking link sent to your email. Real-time updates are provided throughout the build and shipping process.',
      answerAl: 'Mund ta gjurmoni porosinë tuaj përmes dashbordit të llogarisë suaj ose duke përdorur lidhjen e gjurmimit të dërguar në email-in tuaj. Përditësimet në kohë reale ofrohen gjatë procesit të ndërtimit dhe dërgimit.',
      category: 'Orders',
      helpful: 134,
      tags: ['Order Tracking', 'Dashboard', 'Email']
    },
    {
      id: '11',
      question: 'Can I cancel or modify my order?',
      questionAl: 'A mund ta anuloj ose modifikoj porosinë time?',
      answer: 'Orders can be cancelled or modified within 2 hours of placement if building hasn\'t started. Once assembly begins, modifications may incur additional fees. Contact us immediately for changes.',
      answerAl: 'Porositë mund të anulohen ose modifikohen brenda 2 orëve nga vendosja nëse ndërtimi nuk ka filluar. Pasi të fillojë montimi, modifikimet mund të kenë tarifa shtesë. Na kontaktoni menjëherë për ndryshime.',
      category: 'Orders',
      helpful: 76,
      tags: ['Order Changes', 'Cancellation', 'Modification']
    },
    {
      id: '12',
      question: 'What makes your gaming setups different?',
      questionAl: 'Çfarë i bën setup-et tuaja gaming të ndryshme?',
      answer: 'Our gaming setups are professionally designed with optimal cable management, RGB synchronization, and performance tuning. Each setup is custom-tailored to your needs and includes professional installation and optimization.',
      answerAl: 'Setup-et tona gaming janë të dizajnuara profesionalisht me menaxhim optimal të kabllove, sinkronizim RGB dhe tuning performancë. Çdo setup është i përshtatur sipas nevojave tuaja dhe përfshin instalim profesional dhe optimizim.',
      category: 'Gaming',
      helpful: 112,
      tags: ['Gaming Setup', 'Custom', 'Professional', 'RGB']
    }
  ];

  const categories: FAQCategory[] = [
    {
      id: 'all',
      name: 'All Questions',
      nameAl: 'Të Gjitha Pyetjet',
      description: 'Browse all frequently asked questions',
      descriptionAl: 'Shfleto të gjitha pyetjet e bëra shpesh',
      icon: HelpCircle,
      color: 'text-gray-600',
      count: faqItems.length
    },
    {
      id: 'Hardware',
      name: 'Hardware & PC Building',
      nameAl: 'Hardware & Ndërtim PC',
      description: 'Questions about PC components and building',
      descriptionAl: 'Pyetje për komponentët PC dhe ndërtimin',
      icon: Monitor,
      color: 'text-blue-600',
      count: faqItems.filter(item => item.category === 'Hardware').length
    },
    {
      id: 'Support',
      name: 'Support & Service',
      nameAl: 'Mbështetje & Shërbim',
      description: 'Technical support and customer service',
      descriptionAl: 'Mbështetje teknike dhe shërbim klientësh',
      icon: Headphones,
      color: 'text-green-600',
      count: faqItems.filter(item => item.category === 'Support').length
    },
    {
      id: 'Orders',
      name: 'Orders & Shipping',
      nameAl: 'Porosia & Dërgimi',
      description: 'Order process and shipping information',
      descriptionAl: 'Procesi i porosisë dhe informacioni i dërgimit',
      icon: Truck,
      color: 'text-purple-600',
      count: faqItems.filter(item => item.category === 'Orders' || item.category === 'Shipping').length
    },
    {
      id: 'Payment',
      name: 'Payment & Pricing',
      nameAl: 'Pagesa & Çmimi',
      description: 'Payment methods and pricing questions',
      descriptionAl: 'Metodat e pagesës dhe pyetjet e çmimit',
      icon: CreditCard,
      color: 'text-orange-600',
      count: faqItems.filter(item => item.category === 'Payment').length
    },
    {
      id: 'Accounts',
      name: 'Gaming Accounts',
      nameAl: 'Llogaritë Gaming',
      description: 'Questions about gaming accounts and security',
      descriptionAl: 'Pyetje për llogaritë gaming dhe sigurinë',
      icon: Gamepad2,
      color: 'text-indigo-600',
      count: faqItems.filter(item => item.category === 'Accounts').length
    },
    {
      id: 'Gaming',
      name: 'Gaming Services',
      nameAl: 'Shërbimet Gaming',
      description: 'Gaming setups and configurations',
      descriptionAl: 'Setup-et gaming dhe konfiguracionet',
      icon: Settings,
      color: 'text-pink-600',
      count: faqItems.filter(item => item.category === 'Gaming').length
    }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           item.category === selectedCategory ||
                           (selectedCategory === 'Orders' && (item.category === 'Orders' || item.category === 'Shipping'));

    return matchesSearch && matchesCategory;
  });

  const quickActions = [
    {
      title: 'Start Live Chat',
      titleAl: 'Fillo Chat Live',
      description: 'Get instant help from our support team',
      descriptionAl: 'Merr ndihmë të menjëhershme nga ekipi ynë i mbështetjes',
      icon: MessageCircle,
      color: 'bg-blue-500',
      action: '/chat'
    },
    {
      title: 'Call Support',
      titleAl: 'Telefono Mbështetjen',
      description: '24/7 phone support available',
      descriptionAl: 'Mbështetje telefonike 24/7 e disponueshme',
      icon: Phone,
      color: 'bg-green-500',
      action: 'tel:+383441234567'
    },
    {
      title: 'Email Us',
      titleAl: 'Na Dërgo Email',
      description: 'Send detailed questions via email',
      descriptionAl: 'Dërgo pyetje të detajuara përmes email-it',
      icon: Mail,
      color: 'bg-purple-500',
      action: 'mailto:support@gametech.ks'
    },
    {
      title: 'Contact Form',
      titleAl: 'Forma e Kontaktit',
      description: 'Fill out our comprehensive contact form',
      descriptionAl: 'Plotëso formën tonë të plotë të kontaktit',
      icon: HelpCircle,
      color: 'bg-orange-500',
      action: '/contact'
    }
  ];

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <HelpCircle className="w-12 h-12 text-blue-400" />
                <h1 className="text-4xl md:text-6xl font-bold">Frequently Asked Questions</h1>
              </div>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Find answers to the most common questions about our services, products, and support.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search FAQ..."
                    className="pl-12 pr-4 py-3 text-lg bg-white/10 backdrop-blur border-white/20 text-white placeholder-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
              <p className="text-gray-600">Can't find what you're looking for? Get in touch with us directly.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={action.action}>
                      <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardContent className="p-6">
                          <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main FAQ Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Categories */}
              <div className="lg:w-80 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={category.id}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-blue-50 text-blue-600 border border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${category.color}`} />
                            <span className="font-medium text-sm">{category.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Popular Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Most Helpful
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {faqItems
                      .sort((a, b) => b.helpful - a.helpful)
                      .slice(0, 5)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            if (!expandedItems.includes(item.id)) {
                              toggleExpanded(item.id);
                            }
                            document.getElementById(`faq-${item.id}`)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <p className="text-sm font-medium line-clamp-2">{item.question}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Users className="w-3 h-3" />
                            <span>{item.helpful} found helpful</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                {/* Still Need Help */}
                <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">Still Need Help?</h3>
                    <p className="text-sm text-blue-100 mb-4">
                      Our support team is ready to assist you with any questions.
                    </p>
                    <Link href="/contact">
                      <Button variant="secondary" className="w-full">
                        Contact Support
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Items */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">
                      {filteredItems.length} questions found
                    </span>
                    {(searchTerm || selectedCategory !== 'all') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      id={`faq-${item.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden">
                        <CardHeader
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleExpanded(item.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-left">{item.question}</CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Users className="w-3 h-3" />
                                  <span>{item.helpful} helpful</span>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              {expandedItems.includes(item.id) ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        
                        {expandedItems.includes(item.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Helpful Actions */}
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">Was this helpful?</span>
                                    <div className="flex items-center gap-2">
                                      <Button size="sm" variant="outline">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Yes
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <AlertTriangle className="w-4 h-4 mr-1" />
                                        No
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <Link href="/contact">
                                    <Button size="sm" variant="outline">
                                      <MessageCircle className="w-4 h-4 mr-1" />
                                      Need More Help?
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* No Results */}
                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search terms or browse different categories
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                      <Link href="/contact">
                        <Button variant="outline">
                          Ask a Question
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore more ways to get help and learn about our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <Book className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">User Guides</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive guides for all our products and services
                  </p>
                  <Link href="/tutorials">
                    <Button variant="outline">
                      View Guides
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Community Forum</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with other users and get community support
                  </p>
                  <Button variant="outline">
                    Join Forum
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <Headphones className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Premium Support</h3>
                  <p className="text-gray-600 mb-4">
                    Get priority support with faster response times
                  </p>
                  <Button variant="outline">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}