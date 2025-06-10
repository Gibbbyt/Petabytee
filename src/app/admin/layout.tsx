'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard,
  Users,
  ShoppingBag,
  Wrench,
  Package,
  BarChart3,
  Settings,
  FileText,
  Monitor,
  Gamepad2,
  MessageSquare,
  Calendar,
  User,
  LogOut,
  ChevronDown,
  Shield,
  CreditCard,
  Truck,
  Megaphone,
  BookOpen
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard']);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    if (session.user.role !== 'ADMIN') {
      router.push('/client');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-pulse" />
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const navigationItems = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin',
    },
    {
      id: 'orders',
      icon: ShoppingBag,
      label: 'Porositë',
      href: '/admin/orders',
      subItems: [
        { label: 'Të Gjitha Porositë', href: '/admin/orders' },
        { label: 'PC Konfigurime', href: '/admin/orders/pc-configs' },
        { label: 'PS5 Konfigurime', href: '/admin/orders/ps5-configs' },
        { label: 'Faturat', href: '/admin/invoices' },
      ]
    },
    {
      id: 'repairs',
      icon: Wrench,
      label: 'Riparimet',
      href: '/admin/repairs',
      subItems: [
        { label: 'Të Gjitha Riparimet', href: '/admin/repairs' },
        { label: 'EasyMail-In', href: '/admin/repairs/easy-mail-in' },
        { label: 'Timeline Management', href: '/admin/repairs/timeline' },
      ]
    },
    {
      id: 'products',
      icon: Package,
      label: 'Produktet',
      href: '/admin/products',
      subItems: [
        { label: 'Të Gjitha Produktet', href: '/admin/products' },
        { label: 'PC Komponentët', href: '/admin/products/pc-components' },
        { label: 'PS5 Aksesorët', href: '/admin/products/ps5-accessories' },
        { label: 'Gift Cards', href: '/admin/products/gift-cards' },
        { label: 'Stock Management', href: '/admin/products/stock' },
      ]
    },
    {
      id: 'customers',
      icon: Users,
      label: 'Klientët',
      href: '/admin/customers',
      subItems: [
        { label: 'Të Gjithë Klientët', href: '/admin/customers' },
        { label: 'Klientë PC', href: '/admin/customers/pc-clients' },
        { label: 'Klientë PS5', href: '/admin/customers/ps5-clients' },
        { label: 'Klientë Riparimesh', href: '/admin/customers/repair-clients' },
      ]
    },
    {
      id: 'services',
      icon: Monitor,
      label: 'Shërbimet',
      href: '/admin/services',
      subItems: [
        { label: 'PC Builds', href: '/admin/services/pc-builds' },
        { label: 'PS5 Components', href: '/admin/services/ps5-components' },
        { label: 'Service Pricing', href: '/admin/services/pricing' },
      ]
    },
    {
      id: 'support',
      icon: MessageSquare,
      label: 'Mbështetja',
      href: '/admin/support',
      subItems: [
        { label: 'Support Tickets', href: '/admin/support/tickets' },
        { label: 'Forum', href: '/admin/support/forum' },
        { label: '24/7 Support Packs', href: '/admin/support/packs' },
      ]
    },
    {
      id: 'content',
      icon: FileText,
      label: 'Përmbajtja',
      href: '/admin/content',
      subItems: [
        { label: 'Blog Posts', href: '/admin/content/blog' },
        { label: 'News', href: '/admin/content/news' },
        { label: 'Tutorials', href: '/admin/content/tutorials' },
        { label: 'Team Members', href: '/admin/content/team' },
      ]
    },
    {
      id: 'events',
      icon: Calendar,
      label: 'Eventet',
      href: '/admin/events',
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: 'Analitikat',
      href: '/admin/analytics',
      subItems: [
        { label: 'Dashboard', href: '/admin/analytics' },
        { label: 'Sales Reports', href: '/admin/analytics/sales' },
        { label: 'Service Performance', href: '/admin/analytics/services' },
        { label: 'Client Analytics', href: '/admin/analytics/clients' },
        { label: 'Financial Reports', href: '/admin/analytics/financial' },
      ]
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Cilësimet',
      href: '/admin/settings',
      subItems: [
        { label: 'General Settings', href: '/admin/settings' },
        { label: 'Email Templates', href: '/admin/settings/email' },
        { label: 'Notifications', href: '/admin/settings/notifications' },
        { label: 'User Management', href: '/admin/settings/users' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-midnight">Petabyte</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="px-4 pb-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus.includes(item.id);
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <li key={item.id}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-brand-purple/10 hover:text-brand-purple transition-colors flex-1"
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                    {hasSubItems && (
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown 
                          size={16} 
                          className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  
                  {hasSubItems && isExpanded && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.subItems?.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            href={subItem.href}
                            className="block px-3 py-1 text-sm text-gray-500 hover:text-brand-purple transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => router.push('/api/auth/signout')}
          >
            <LogOut size={20} className="mr-3" />
            {t.navigation.logout}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Admin Dashboard
              </h2>
              <p className="text-gray-600">
                Menaxho të gjithë sistemin e Petabyte Tech
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                🏆 Petabyte Certified
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-gradient rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}