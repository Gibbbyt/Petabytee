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
  Gamepad2, 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Star,
  Zap,
  Monitor,
  Headphones,
  Keyboard,
  Mouse,
  Wifi,
  Coffee,
  MapPin,
  Euro,
  Plus
} from 'lucide-react';

interface Tournament {
  id: string;
  name: string;
  game: string;
  date: string;
  prize: number;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'live' | 'completed';
  image: string;
}

interface GamingSetup {
  id: string;
  name: string;
  description: string;
  specs: string[];
  hourlyRate: number;
  image: string;
  available: boolean;
}

export default function GamingZonePage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [gamingSetups, setGamingSetups] = useState<GamingSetup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamingData();
  }, []);

  const fetchGamingData = async () => {
    try {
      setLoading(true);
      // For now, using mock data - can be replaced with real API calls
      const mockTournaments: Tournament[] = [
        {
          id: '1',
          name: 'CS2 Championship Kosovo',
          game: 'Counter-Strike 2',
          date: '2024-02-15T18:00:00Z',
          prize: 1500,
          participants: 12,
          maxParticipants: 16,
          status: 'upcoming',
          image: '/images/cs2-tournament.jpg'
        },
        {
          id: '2',
          name: 'Valorant Weekly',
          game: 'Valorant',
          date: '2024-02-10T19:00:00Z',
          prize: 500,
          participants: 8,
          maxParticipants: 8,
          status: 'live',
          image: '/images/valorant-tournament.jpg'
        },
        {
          id: '3',
          name: 'FIFA 24 Cup',
          game: 'FIFA 24',
          date: '2024-01-30T20:00:00Z',
          prize: 300,
          participants: 16,
          maxParticipants: 16,
          status: 'completed',
          image: '/images/fifa-tournament.jpg'
        }
      ];

      const mockSetups: GamingSetup[] = [
        {
          id: '1',
          name: 'Pro Gaming Station Alpha',
          description: 'High-end gaming setup perfect for competitive esports',
          specs: [
            'RTX 4080 GPU',
            'Intel i7-13700K',
            '32GB DDR5 RAM',
            '240Hz Monitor',
            'Mechanical Keyboard',
            'Gaming Mouse'
          ],
          hourlyRate: 8,
          image: '/images/gaming-setup-1.jpg',
          available: true
        },
        {
          id: '2',
          name: 'Streaming Setup Beta',
          description: 'Perfect for content creation and streaming',
          specs: [
            'RTX 4070 GPU',
            'AMD Ryzen 7 7700X',
            '32GB DDR5 RAM',
            'Dual Monitor Setup',
            'Stream Deck',
            'Professional Microphone'
          ],
          hourlyRate: 6,
          image: '/images/gaming-setup-2.jpg',
          available: true
        },
        {
          id: '3',
          name: 'Casual Gaming Gamma',
          description: 'Great for casual gaming and friends hangout',
          specs: [
            'RTX 4060 GPU',
            'Intel i5-13400F',
            '16GB DDR4 RAM',
            '144Hz Monitor',
            'Gaming Headset',
            'Controller Support'
          ],
          hourlyRate: 4,
          image: '/images/gaming-setup-3.jpg',
          available: false
        }
      ];

      setTournaments(mockTournaments);
      setGamingSetups(mockSetups);
    } catch (error) {
      console.error('Error fetching gaming data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sq-AL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Gamepad2 className="w-12 h-12 text-purple-400" />
                <h1 className="text-5xl md:text-6xl font-bold">Gaming Zone</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Përjetoni nivelin më të lartë të gaming-ut në Kosovë. Turne, konkurse, dhe stacione gaming profesionale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Trophy className="w-5 h-5 mr-2" />
                  Bashkohu në Turne
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                  <Monitor className="w-5 h-5 mr-2" />
                  Rezervo Stacion
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gaming Zone Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Çfarë Ofrojmë</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Gaming Zone i Petabyte Tech është destinacioni ultimat për gamerët në Kosovë
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  icon: Monitor,
                  title: 'Setup Profesional',
                  description: 'Kompjuterë gaming me komponentë të fundit'
                },
                {
                  icon: Wifi,
                  title: 'Internet i Shpejtë',
                  description: 'Fibër optik me latencë ultra të ulët'
                },
                {
                  icon: Users,
                  title: 'Komuniteti',
                  description: 'Bashkohu me gamerët më të mirë të Kosovës'
                },
                {
                  icon: Coffee,
                  title: 'Ambient Komod',
                  description: 'Pije, snacks dhe atmosferë e relaksuar'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center h-full">
                      <CardContent className="p-6">
                        <Icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="tournaments" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tournaments">Turnetë</TabsTrigger>
                <TabsTrigger value="setups">Gaming Setup</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>

              {/* Tournaments Tab */}
              <TabsContent value="tournaments" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Turnetë Aktuale</h3>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Krijo Turne
                  </Button>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="loading-pulse mx-auto mb-4" />
                    <p className="text-gray-600">Duke ngarkuar turnetë...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map((tournament) => (
                      <motion.div
                        key={tournament.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600">
                            <div className="absolute top-4 right-4">
                              <Badge className={getStatusColor(tournament.status)}>
                                {tournament.status === 'upcoming' && <Clock className="w-3 h-3 mr-1" />}
                                {tournament.status === 'live' && <Zap className="w-3 h-3 mr-1" />}
                                {tournament.status === 'completed' && <Trophy className="w-3 h-3 mr-1" />}
                                {tournament.status}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                              <h4 className="text-lg font-bold">{tournament.name}</h4>
                              <p className="text-purple-200">{tournament.game}</p>
                            </div>
                          </div>
                          
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Çmimi</span>
                                <div className="flex items-center gap-1 font-semibold text-green-600">
                                  <Euro className="w-4 h-4" />
                                  {tournament.prize}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Pjesëmarrës</span>
                                <span className="font-medium">{tournament.participants}/{tournament.maxParticipants}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{formatDate(tournament.date)}</span>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full mt-4" 
                              disabled={tournament.participants >= tournament.maxParticipants || tournament.status === 'completed'}
                            >
                              {tournament.status === 'completed' ? 'Përfunduar' : 
                               tournament.participants >= tournament.maxParticipants ? 'I Plotë' : 'Bashkohu'}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Gaming Setups Tab */}
              <TabsContent value="setups" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Stacionet Gaming</h3>
                  <Badge variant="outline" className="text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    Petabyte Gaming Center
                  </Badge>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="loading-pulse mx-auto mb-4" />
                    <p className="text-gray-600">Duke ngarkuar setup...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gamingSetups.map((setup) => (
                      <motion.div
                        key={setup.id}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Card className={`h-full ${!setup.available ? 'opacity-60' : 'hover:shadow-lg'} transition-all`}>
                          <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                            <div className="absolute top-4 right-4">
                              <Badge className={setup.available ? 
                                'bg-green-500/20 text-green-400 border-green-500/30' : 
                                'bg-red-500/20 text-red-400 border-red-500/30'
                              }>
                                {setup.available ? 'I Lirë' : 'I Zënë'}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                              <h4 className="text-lg font-bold">{setup.name}</h4>
                              <div className="flex items-center gap-1 text-yellow-300">
                                <Euro className="w-4 h-4" />
                                <span className="font-semibold">{setup.hourlyRate}/orë</span>
                              </div>
                            </div>
                          </div>
                          
                          <CardContent className="p-6">
                            <p className="text-gray-600 mb-4">{setup.description}</p>
                            
                            <div className="space-y-2 mb-4">
                              <h5 className="font-semibold text-sm">Specifikimet:</h5>
                              {setup.specs.slice(0, 3).map((spec, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  {spec}
                                </div>
                              ))}
                              {setup.specs.length > 3 && (
                                <p className="text-xs text-gray-500">+{setup.specs.length - 3} më shumë...</p>
                              )}
                            </div>
                            
                            <Button 
                              className="w-full" 
                              disabled={!setup.available}
                            >
                              {setup.available ? 'Rezervo Tani' : 'I Zënë'}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Top Gamerët</h3>
                  <p className="text-gray-600 mb-8">Gamerët më të mirë të Gaming Zone</p>
                </div>

                <div className="max-w-2xl mx-auto">
                  {[
                    { rank: 1, name: 'ArditGaming', points: 2850, badge: '🏆' },
                    { rank: 2, name: 'KosovoWarrior', points: 2720, badge: '🥈' },
                    { rank: 3, name: 'PrishtinaPro', points: 2650, badge: '🥉' },
                    { rank: 4, name: 'EagleEyes', points: 2400, badge: '' },
                    { rank: 5, name: 'FastFingers', points: 2350, badge: '' },
                  ].map((player) => (
                    <motion.div
                      key={player.rank}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: player.rank * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="mb-3 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold text-gray-500 w-8">
                                #{player.rank}
                              </div>
                              <div className="text-2xl">{player.badge}</div>
                              <div>
                                <h4 className="font-semibold">{player.name}</h4>
                                <p className="text-sm text-gray-600">{player.points} pikë</p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              Level {Math.floor(player.points / 100)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Gati për të Luajtur?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Bashkohu me komunitetin më të madh gaming në Kosovë dhe përjeto gaming-un në nivelin më të lartë
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Regjistrohu Tani
                  </Button>
                </Link>
                <Link href="/services/gaming-center">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600">
                    Mëso Më Shumë
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