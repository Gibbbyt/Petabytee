'use client';

import React from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  Zap, 
  Shield,
  Globe,
  Lightbulb,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2,
  Cpu,
  Code2,
  Wrench
} from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      id: '1',
      name: 'Ardi Berisha',
      position: 'CEO & Founder',
      bio: 'Me më shumë se 10 vjet përvojë në teknologji, Ardi e themeloi Petabyte Tech me vizionin për të bërë teknologjinë të qasshme për të gjithë.',
      image: '/images/team/ardi.jpg',
      skills: ['Leadership', 'Business Strategy', 'Tech Vision'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'ardi@petabyte.al'
      }
    },
    {
      id: '2',
      name: 'Blerta Krasniqi',
      position: 'CTO & Co-Founder',
      bio: 'Eksperte në zhvillimin e software-it dhe AI, Blerta udhëheq ekipin teknik dhe siguron cilësinë e të gjitha produkteve tona.',
      image: '/images/team/blerta.jpg',
      skills: ['Software Development', 'AI/ML', 'System Architecture'],
      social: {
        linkedin: '#',
        github: '#',
        email: 'blerta@petabyte.al'
      }
    },
    {
      id: '3',
      name: 'Driton Ahmeti',
      position: 'Hardware Specialist',
      bio: 'Ekspert i hardware-it me specializim në gaming PC dhe sistem kompleksë. Responsabil për të gjitha konfiguracionet dhe ripamimet.',
      image: '/images/team/driton.jpg',
      skills: ['PC Building', 'Hardware Repair', 'Gaming Systems'],
      social: {
        linkedin: '#',
        email: 'driton@petabyte.al'
      }
    },
    {
      id: '4',
      name: 'Valdete Morina',
      position: 'Customer Success Manager',
      bio: 'Me fokus në kënaqësinë e klientëve, Valdete siguron që çdo klient të marrë shërbimin më të mirë të mundshëm.',
      image: '/images/team/valdete.jpg',
      skills: ['Customer Relations', 'Project Management', 'Quality Assurance'],
      social: {
        linkedin: '#',
        email: 'valdete@petabyte.al'
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Ekscelencë',
      description: 'Synojmë përsosmërinë në çdo projekt dhe shërbim që ofrojmë.',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Pasion',
      description: 'E duam teknologjinë dhe këtë pasion e reflektojmë në punën tonë.',
      color: 'text-red-600'
    },
    {
      icon: Shield,
      title: 'Besueshmëri',
      description: 'Ndërtojmë marrëdhënie afatgjata të bazuara në besim dhe transparencë.',
      color: 'text-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Inovacion',
      description: 'Gjithmonë në kërkim të zgjidhjeve të reja dhe më të mira.',
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      title: 'Bashkëpunim',
      description: 'Besojmë në forcën e punës në ekip dhe kolaborimit.',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Rritje',
      description: 'Përmirësohemi çdo ditë dhe ndihmojmë klientët tanë të bëjnë të njëjtën.',
      color: 'text-orange-600'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Themelimi',
      description: 'Petabyte Tech u themelua me vizionin për të demokratizuar teknologjinë në Kosovë.',
      icon: Building2
    },
    {
      year: '2021',
      title: 'Zgjerimi i Shërbimeve',
      description: 'Shtuam shërbimet e PC konfigurimit dhe riparimit profesional.',
      icon: Wrench
    },
    {
      year: '2022',
      title: 'Gaming Center',
      description: 'Hapëm Gaming Center-in e parë me teknologjinë më të fundit.',
      icon: Target
    },
    {
      year: '2023',
      title: 'AI & 3D Printing',
      description: 'Integruam shërbimet e AI zhvillimit dhe 3D printing industrial.',
      icon: Cpu
    },
    {
      year: '2024',
      title: 'Platforma Digitale',
      description: 'Lançuam platformën tonë të plotë online me të gjitha shërbimet.',
      icon: Code2
    }
  ];

  const stats = [
    { value: '1000+', label: 'Klientë të Kënaqur', icon: Users },
    { value: '150+', label: 'Projekte të Kompletuar', icon: CheckCircle },
    { value: '98%', label: 'Shkalla e Kënaqësisë', icon: Star },
    { value: '24/7', label: 'Mbështetje', icon: Clock }
  ];

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Building2 className="w-12 h-12 text-purple-400" />
                <h1 className="text-5xl md:text-6xl font-bold">Rreth Nesh</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Ne jemi Petabyte Tech - ekipi që bën teknologjinë të thjeshtë, të qasshme dhe të fuqishme për të gjithë në Kosovë.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Historia Jonë</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Petabyte Tech u lind nga pasioni për teknologji dhe dëshira për të ndihmuar njerëz. 
                  E themeluar në 2020, ne filluan si një ekip i vogël ekspertësh teknologjikë me një 
                  vizion të madh: të bëjmë teknologjinë të qasshme për të gjithë në Kosovë.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Misioni Ynë</h3>
                      <p className="text-gray-600">
                        Të demokratizojmë teknologjinë duke ofruar shërbime cilësore, të qasshme dhe 
                        inovative që ndihmojnë individët dhe bizneset të realizojnë potencialin e tyre të plotë.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Vizioni Ynë</h3>
                      <p className="text-gray-600">
                        Të jemi liderët e teknologjisë në Kosovë dhe rajon, duke krijuar zgjidhje që 
                        transformojnë jetën e njerëzve dhe mënyrën si ata bashkëveprojnë me teknologjinë.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-2xl"></div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <Building2 className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg font-semibold">Zyrat tona në Prishtinë</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
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
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-purple-600" />
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

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Vlerat Tona</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Këto janë parimet që na udhëheqin çdo ditë dhe që përshkojnë gjithçka që bëjmë
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon className={`w-8 h-8 ${value.color}`} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Udhëtimi Ynë</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nga themelimi deri sot, shihni se si kemi evoluuar dhe rritur
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center mb-12 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <Card className="inline-block max-w-md">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-purple-100 text-purple-800">
                            {item.year}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ekipi Ynë</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Njihuni me njerëzit që bëjnë magjinë e teknologjisë të mundshme çdo ditë
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-purple-600 font-medium mb-3">{member.position}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      
                      <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {member.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-center space-x-3">
                        {member.social.email && (
                          <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                            <Mail className="w-4 h-4" />
                          </Button>
                        )}
                        {member.social.linkedin && (
                          <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                            <Users className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Na Gjeni</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Jemi të vendosur në zemër të Prishtinës dhe gjithmonë gati për t'ju ndihmuar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Adresa</h3>
                    <p className="text-gray-600">
                      Rruga "Bill Clinton" Nr. 123<br />
                      10000 Prishtinë, Kosovë
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Telefoni</h3>
                    <p className="text-gray-600">
                      +383 45 123 456<br />
                      +383 49 987 654
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">
                      info@petabyte.al<br />
                      support@petabyte.al
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Gati për të Bashkëpunuar?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Le të punojmë së bashku për të kthyer idetë tuaja teknologjike në realitet
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Shihni Shërbimet
                  </Button>
                </Link>
                <Link href="/support">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600">
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