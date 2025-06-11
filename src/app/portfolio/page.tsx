'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Monitor, 
  Gamepad2, 
  Cpu, 
  Printer, 
  Code2, 
  Star,
  Users,
  Calendar,
  Award,
  ExternalLink,
  Play,
  Image as ImageIcon,
  Video,
  Quote,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  clientName: string;
  completedDate: string;
  status: 'completed' | 'ongoing';
  featured: boolean;
  gallery: string[];
}

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
  avatar: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      // Mock data - can be replaced with real API calls later
      const mockProjects: Project[] = [
        {
          id: '1',
          title: 'Gaming Center Setup Kompleks',
          category: 'gaming',
          description: 'Ndërtimi i një qendre gaming me 20 stacione të plotë me setup-e të fundit.',
          image: '/images/portfolio/gaming-center-1.jpg',
          technologies: ['RTX 4080', 'Intel i7-13700K', 'DDR5 32GB', '240Hz Monitors'],
          clientName: 'Digital Arena Prishtinë',
          completedDate: '2024-01-15',
          status: 'completed',
          featured: true,
          gallery: [
            '/images/portfolio/gaming-center-1.jpg',
            '/images/portfolio/gaming-center-2.jpg',
            '/images/portfolio/gaming-center-3.jpg'
          ]
        },
        {
          id: '2',
          title: 'PC Configurator për Biznes',
          category: 'software',
          description: 'Aplikacion web i avancuar për konfigurimin e PC-ve me AI recommendations.',
          image: '/images/portfolio/pc-configurator.jpg',
          technologies: ['Next.js', 'TypeScript', 'AI/ML', 'Prisma'],
          clientName: 'TechMall Kosovo',
          completedDate: '2024-02-01',
          status: 'completed',
          featured: true,
          gallery: [
            '/images/portfolio/pc-config-1.jpg',
            '/images/portfolio/pc-config-2.jpg'
          ]
        },
        {
          id: '3',
          title: 'Sistemи 3D Printing Industrial',
          category: '3d-printing',
          description: 'Implementimi i një sistemi të plotë 3D printing për prodhim industrial.',
          image: '/images/portfolio/3d-printing-1.jpg',
          technologies: ['Ultimaker S5', 'PLA/ABS', 'CAD Design', 'Quality Control'],
          clientName: 'Prodhimi i Kosovës',
          completedDate: '2023-12-20',
          status: 'completed',
          featured: false,
          gallery: [
            '/images/portfolio/3d-print-1.jpg',
            '/images/portfolio/3d-print-2.jpg',
            '/images/portfolio/3d-print-3.jpg'
          ]
        },
        {
          id: '4',
          title: 'AI Chatbot për E-commerce',
          category: 'ai',
          description: 'Chatbot inteligjent për shitjen online me përgjigje automatike.',
          image: '/images/portfolio/ai-chatbot.jpg',
          technologies: ['OpenAI GPT', 'Node.js', 'MongoDB', 'Real-time Chat'],
          clientName: 'ShopKosova',
          completedDate: '2024-01-30',
          status: 'ongoing',
          featured: true,
          gallery: [
            '/images/portfolio/chatbot-1.jpg',
            '/images/portfolio/chatbot-2.jpg'
          ]
        },
        {
          id: '5',
          title: 'PC Repair Service Network',
          category: 'repair',
          description: 'Rrjet i shërbimeve të riparimit me tracking system të avancuar.',
          image: '/images/portfolio/repair-network.jpg',
          technologies: ['React', 'Node.js', 'GPS Tracking', 'Payment Gateway'],
          clientName: 'FixIt Kosovo',
          completedDate: '2023-11-15',
          status: 'completed',
          featured: false,
          gallery: [
            '/images/portfolio/repair-1.jpg',
            '/images/portfolio/repair-2.jpg'
          ]
        }
      ];

      const mockTestimonials: Testimonial[] = [
        {
          id: '1',
          clientName: 'Arben Rexhepi',
          company: 'Digital Arena Prishtinë',
          rating: 5,
          comment: 'Petabyte Tech e ktheu vizionin tonë në realitet. Gaming center-i që ndërtuan është thjesht i mrekullueshëm. Cilësia e punës dhe profesionalizmi i tyre është i jashtëzakonshëm.',
          project: 'Gaming Center Setup Kompleks',
          date: '2024-01-20',
          avatar: '/images/avatars/client-1.jpg'
        },
        {
          id: '2',
          clientName: 'Valdete Krasniqi',
          company: 'TechMall Kosovo',
          rating: 5,
          comment: 'PC Configurator-i që na zhvilluan e rrit shitjet tona për 40%. AI recommendations janë të mrekullueshme dhe klientët tona janë shumë të kënaqur.',
          project: 'PC Configurator për Biznes',
          date: '2024-02-05',
          avatar: '/images/avatars/client-2.jpg'
        },
        {
          id: '3',
          clientName: 'Driton Hoxha',
          company: 'Prodhimi i Kosovës',
          rating: 5,
          comment: 'Sistemi i 3D printing që na instaluan e transformoi prodhimin tonë. Efikasiteti u rrit për 60% dhe cilësia e produkteve është e shkëlqyer.',
          project: 'Sistemי 3D Printing Industrial',
          date: '2023-12-25',
          avatar: '/images/avatars/client-3.jpg'
        },
        {
          id: '4',
          clientName: 'Blerta Salihu',
          company: 'ShopKosova',
          rating: 4,
          comment: 'AI Chatbot-i që po na zhvillojnë është jashtëzakonisht i avancuar. Edhe në fazën e zhvillimit, rezultatet janë mbresëlënëse.',
          project: 'AI Chatbot për E-commerce',
          date: '2024-02-10',
          avatar: '/images/avatars/client-4.jpg'
        }
      ];

      setProjects(mockProjects);
      setTestimonials(mockTestimonials);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Të Gjitha', icon: Star },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'software', name: 'Software', icon: Code2 },
    { id: '3d-printing', name: '3D Printing', icon: Printer },
    { id: 'ai', name: 'AI & ML', icon: Cpu },
    { id: 'repair', name: 'Riparime', icon: Monitor }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  const stats = [
    { value: '150+', label: 'Projekte të Kompletuar', icon: CheckCircle },
    { value: '98%', label: 'Kënaqësi e Klientëve', icon: Star },
    { value: '50+', label: 'Klientë Aktivë', icon: Users },
    { value: '24/7', label: 'Mbështetje', icon: TrendingUp }
  ];

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Award className="w-12 h-12 text-blue-400" />
                <h1 className="text-5xl md:text-6xl font-bold">Portfolio</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Zbuloni projektet tona të suksesshme dhe shihni si kemi ndihmuar biznese të ndryshme të arrijnë qëllimet e tyre teknologjike.
              </p>
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
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-blue-600" />
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

        {/* Featured Projects */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Projektet e Zgjedhura</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Disa nga projektet tona më të suksesshme që tregojnë ekspertizën dhe cilësinë e punës sonë
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="loading-pulse mx-auto mb-4" />
                <p className="text-gray-600">Duke ngarkuar projektet...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge variant="outline" className="border-white text-white">
                            {project.category}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Shiko Detajet
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        
                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Klienti:</span>
                            <p className="text-sm">{project.clientName}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Përfunduar:</span>
                            <p className="text-sm">{new Date(project.completedDate).toLocaleDateString('sq-AL')}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <Button className="w-full">
                          Shiko Projektin
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* All Projects */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Të Gjitha Projektet</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Eksploroni koleksionin e plotë të projekteve tona në kategori të ndryshme
              </p>
            </div>

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

            {/* Projects Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="loading-pulse mx-auto mb-4" />
                <p className="text-gray-600">Duke ngarkuar projektet...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="relative h-40 bg-gradient-to-br from-gray-400 to-gray-600">
                        <div className="absolute top-3 right-3">
                          <Badge className={project.status === 'completed' ? 
                            'bg-green-500/20 text-green-400 border-green-500/30' : 
                            'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }>
                            {project.status === 'completed' ? 'Përfunduar' : 'Në progres'}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{project.clientName}</span>
                          <span>{new Date(project.completedDate).toLocaleDateString('sq-AL')}</span>
                        </div>
                        
                        <Button size="sm" className="w-full">
                          Detajet
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Çfarë Thonë Klientët</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Feedback-u nga klientët tanë është motivimi ynë më i madh për të vazhduar përmirësimin
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <div className="loading-pulse mx-auto mb-4" />
                <p className="text-gray-600">Duke ngarkuar vlerësimet...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
                          <div>
                            <h4 className="font-semibold">{testimonial.clientName}</h4>
                            <p className="text-sm text-gray-600">{testimonial.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        
                        <blockquote className="text-gray-700 mb-4">
                          <Quote className="w-6 h-6 text-gray-400 mb-2" />
                          "{testimonial.comment}"
                        </blockquote>
                        
                        <div className="border-t pt-3">
                          <p className="text-sm text-gray-600">
                            Projekti: <span className="font-medium">{testimonial.project}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(testimonial.date).toLocaleDateString('sq-AL')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Gati për Projektin Tuaj të Ardhshëm?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Le të bashkëpunojmë për të kthyer idetë tuaja në realitet. Kontaktoni ne sot për një konsultim falas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Shihni Shërbimet
                  </Button>
                </Link>
                <Link href="/support">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                    Kontaktoni Ne
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}