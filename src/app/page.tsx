'use client';

import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { GlowCard, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Gamepad2, 
  Building2, 
  Code2, 
  Printer, 
  Wrench, 
  ShoppingCart,
  Mail,
  CreditCard,
  UserPlus,
  Shield,
  Award,
  Users,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Monitor,
      title: t.services.pcConfigurator.title,
      description: t.services.pcConfigurator.description,
      href: '/services/pc-configurator',
      color: 'text-brand-purple',
    },
    {
      icon: Gamepad2,
      title: t.services.ps5Configurator.title,
      description: t.services.ps5Configurator.description,
      href: '/services/ps5-configurator',
      color: 'text-brand-lime',
    },
    {
      icon: Building2,
      title: t.services.gamingCenter.title,
      description: t.services.gamingCenter.description,
      href: '/services/gaming-center',
      color: 'text-brand-teal',
    },
    {
      icon: Code2,
      title: t.services.aiDevelopment.title,
      description: t.services.aiDevelopment.description,
      href: '/services/ai-development',
      color: 'text-brand-mint',
    },
    {
      icon: Printer,
      title: t.services.printing3d.title,
      description: t.services.printing3d.description,
      href: '/services/3d-printing',
      color: 'text-brand-purple',
    },
    {
      icon: Wrench,
      title: t.services.pcOptimization.title,
      description: t.services.pcOptimization.description,
      href: '/services/pc-optimization',
      color: 'text-brand-lime',
    },
  ];

  const storeFeatures = [
    {
      icon: Mail,
      title: t.store.easyMailIn.title,
      description: t.store.easyMailIn.description,
      href: '/store/easy-mail-in',
    },
    {
      icon: CreditCard,
      title: t.store.giftCards.title,
      description: t.store.giftCards.description,
      href: '/store/gift-cards',
    },
    {
      icon: UserPlus,
      title: t.store.accounts.title,
      description: t.store.accounts.description,
      href: '/store/accounts',
    },
  ];

  const stats = [
    { value: '500+', label: 'PC Konfigurime' },
    { value: '1000+', label: 'Klientë të Kënaqur' },
    { value: '24/7', label: 'Mbështetje' },
    { value: '5★', label: 'Vlerësim' },
  ];

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-midnight via-brand-darkBlue to-brand-purple opacity-90" />
          <div className="absolute inset-0 pattern-grid opacity-20" />
          
          {/* Floating elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-20 left-20 w-72 h-72 bg-brand-purple/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-lime/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </motion.div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              <span className="text-gradient">{t.hero.title}</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/services">
                <Button size="lg" variant="glow" className="text-lg px-8">
                  {t.hero.cta}
                </Button>
              </Link>
              <Link href="/store">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-brand-midnight">
                  {t.navigation.store}
                </Button>
              </Link>
            </motion.div>
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
              <h2 className="text-4xl font-bold text-brand-midnight mb-4">
                {t.navigation.services}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Eksploro gamën tonë të gjerë të shërbimeve teknologjike të dizajnuara për të plotësuar të gjitha nevojat tuaja
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.href}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={service.href}>
                      <GlowCard className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <CardHeader>
                          <Icon className={`w-12 h-12 ${service.color} mb-4`} />
                          <CardTitle>{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{service.description}</CardDescription>
                        </CardContent>
                      </GlowCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Store Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-brand-midnight mb-4">
                {t.navigation.store}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Blini produkte, dërgoni riparime, dhe aksesoni shërbime ekskluzive
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storeFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.href}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={feature.href}>
                      <Card className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 hover:border-brand-purple">
                        <CardHeader className="text-center">
                          <div className="mx-auto w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
                            <Icon className="w-8 h-8 text-brand-purple" />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-center">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 bg-brand-midnight text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">
                Pse të Zgjidhni Petabyte Tech?
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-brand-lime mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Shield className="w-16 h-16 text-brand-lime mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Garanci e Plotë</h3>
                <p className="text-gray-300">Të gjitha shërbimet tona vijnë me garanci dhe mbështetje të plotë</p>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Award className="w-16 h-16 text-brand-lime mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Petabyte Certified</h3>
                <p className="text-gray-300">Marka jonë e besimit që garanton cilësi të lartë</p>
              </motion.div>
              
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Clock className="w-16 h-16 text-brand-lime mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mbështetje 24/7</h3>
                <p className="text-gray-300">Jemi gjithmonë të gatshëm t'ju ndihmojmë</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-purple to-brand-lime">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Gati për të Filluar?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Bashkohuni me mijëra klientë të kënaqur dhe përjetoni shërbimin më të mirë teknologjik në Kosovë
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    {t.navigation.register}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-brand-purple">
                    {t.common.contactUs}
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