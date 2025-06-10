'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: t.navigation.services,
      href: '/services',
      subItems: [
        { label: t.services.pcConfigurator.title, href: '/services/pc-configurator' },
        { label: t.services.ps5Configurator.title, href: '/services/ps5-configurator' },
        { label: t.services.gamingCenter.title, href: '/services/gaming-center' },
        { label: t.services.aiDevelopment.title, href: '/services/ai-development' },
        { label: t.services.printing3d.title, href: '/services/3d-printing' },
        { label: t.services.pcOptimization.title, href: '/services/pc-optimization' },
        { label: t.services.fixYourStuff.title, href: '/services/fix-your-stuff' },
        { label: t.services.store.title, href: '/store' },
      ],
    },
    {
      label: t.navigation.store,
      href: '/store',
      subItems: [
        { label: t.store.easyMailIn.title, href: '/store/easy-mail-in' },
        { label: t.store.giftCards.title, href: '/store/gift-cards' },
        { label: t.store.accounts.title, href: '/store/accounts' },
      ],
    },
    {
      label: t.navigation.gamingZone,
      href: '/gaming-zone',
    },
    {
      label: t.navigation.portfolio,
      href: '/portfolio',
    },
    {
      label: t.navigation.aboutUs,
      href: '/about',
    },
    {
      label: t.navigation.support,
      href: '/support',
    },
    {
      label: t.navigation.fixYourStuff,
      href: '/fix-your-stuff',
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gradient animate-color-shift">
              Petabyte
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-brand-purple transition-colors duration-300"
                >
                  {item.label}
                </Link>
                
                {/* Dropdown for sub-items */}
                {item.subItems && (
                  <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-purple/10 hover:text-brand-purple transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'sq' ? 'en' : 'sq')}
              className="flex items-center space-x-2 text-gray-700 hover:text-brand-purple transition-colors"
              aria-label="Change language"
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Auth Buttons */}
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                {t.navigation.login}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="glow" size="sm">
                {t.navigation.register}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-brand-purple transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-brand-purple transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Mobile sub-items */}
                  {item.subItems && (
                    <div className="pl-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-1 text-sm text-gray-600 hover:text-brand-purple transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Language Switcher and Auth */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => setLanguage(language === 'sq' ? 'en' : 'sq')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-brand-purple transition-colors w-full py-2"
                >
                  <Globe size={20} />
                  <span className="text-sm font-medium">
                    {language === 'sq' ? 'English' : 'Shqip'}
                  </span>
                </button>
                
                <Link
                  href="/auth/login"
                  className="block py-2 text-gray-700 hover:text-brand-purple transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.navigation.login}
                </Link>
                
                <Link
                  href="/auth/register"
                  className="block py-2 text-brand-purple font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.navigation.register}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}