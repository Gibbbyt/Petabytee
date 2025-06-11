'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ShoppingBag, 
  Wrench, 
  Settings, 
  Monitor, 
  Gamepad2, 
  HeadphonesIcon,
  User,
  LogOut,
  Bell
} from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    const userRole = (session?.user as any)?.role;
    if (userRole === 'ADMIN') {
      router.push('/admin');
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

  const userRole = (session?.user as any)?.role;
  if (!session || userRole !== 'CLIENT') {
    return null;
  }

  const navigationItems = [
    {
      icon: Home,
      label: t.dashboard.overview,
      href: '/client',
    },
    {
      icon: ShoppingBag,
      label: t.dashboard.orders,
      href: '/client/orders',
    },
    {
      icon: Wrench,
      label: t.dashboard.repairs,
      href: '/client/repairs',
    },
    {
      icon: Monitor,
      label: 'PC Konfigurime',
      href: '/client/pc-configs',
    },
    {
      icon: Gamepad2,
      label: 'PS5 Konfigurime',
      href: '/client/ps5-configs',
    },
    {
      icon: HeadphonesIcon,
      label: t.dashboard.support,
      href: '/client/support',
    },
    {
      icon: User,
      label: t.dashboard.profile,
      href: '/client/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <Link href="/client" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-midnight">Petabyte</h1>
              <p className="text-xs text-gray-500">Client Panel</p>
            </div>
          </Link>
        </div>

        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-brand-purple/10 hover:text-brand-purple transition-colors"
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
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
                {t.dashboard.welcome}, {session?.user?.name || 'User'}!
              </h2>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('sq-AL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-gradient rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}