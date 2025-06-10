'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.navigation.services, href: '/services' },
    { label: t.navigation.store, href: '/store' },
    { label: t.navigation.gamingZone, href: '/gaming-zone' },
    { label: t.navigation.portfolio, href: '/portfolio' },
    { label: t.navigation.support, href: '/support' },
    { label: t.footer.privacyPolicy, href: '/privacy' },
    { label: t.footer.termsOfService, href: '/terms' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/petabytetech', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/petabytetech', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/petabytetech', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/petabytetech', label: 'YouTube' },
  ];

  return (
    <footer className="bg-brand-midnight text-white mt-auto">
      {/* Petabyte Certified Mark */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-lime py-2 text-center">
        <p className="text-white font-semibold animate-pulse-glow">
          🏆 {t.petabyteCertified.title} - {t.petabyteCertified.description}
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              {t.footer.companyName}
            </h3>
            <p className="text-gray-300 mb-4">
              {t.footer.slogan}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand-lime transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-lime">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-lime transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-lime">
              {t.footer.contact}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} />
                <span>+383 44 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} />
                <span>info@petabyte.al</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} />
                <span>Prishtinë, Kosovë</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-lime">
              {t.footer.newsletter}
            </h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t.footer.newsletterPlaceholder}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button type="submit" variant="glow" className="w-full">
                {t.footer.subscribe}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 {t.footer.companyName}. {t.footer.allRightsReserved}.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-brand-lime transition-colors">
                {t.footer.privacyPolicy}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-brand-lime transition-colors">
                {t.footer.termsOfService}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}