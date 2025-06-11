'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  Wrench, 
  Monitor, 
  Gamepad2, 
  Clock,
  Eye,
  Package,
  Activity,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface ClientStats {
  totalOrders: number;
  activeRepairs: number;
  pcConfigs: number;
  ps5Configs: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: Date;
  items: string[];
}

interface Repair {
  id: string;
  repairNumber: string;
  deviceType: string;
  status: string;
  createdAt: Date;
}

export default function ClientDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<ClientStats>({
    totalOrders: 0,
    activeRepairs: 0,
    pcConfigs: 0,
    ps5Configs: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [activeRepairs, setActiveRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/client/stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch client statistics');
        }

        const data = await response.json();
        
        setStats(data.stats);
        setRecentOrders(data.recentOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt)
        })));
        setActiveRepairs(data.activeRepairs.map((repair: any) => ({
          ...repair,
          createdAt: new Date(repair.createdAt)
        })));
        
      } catch (err) {
        console.error('Error fetching client stats:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientStats();
  }, []);

  const quickActions = [
    {
      icon: Monitor,
      title: 'Konfiguruesi PC',
      description: 'Krijo një PC të personalizuar',
      href: '/services/pc-configurator',
      color: 'bg-gradient-to-r from-brand-purple to-brand-lime'
    },
    {
      icon: Gamepad2,
      title: 'Konfiguruesi PS5',
      description: 'Personalizo kontrollerin tuaj',
      href: '/services/ps5-configurator',
      color: 'bg-gradient-to-r from-brand-teal to-brand-mint'
    },
    {
      icon: Wrench,
      title: 'Dërgo për Riparim',
      description: 'EasyMail-In riparim',
      href: '/store/easy-mail-in',
      color: 'bg-gradient-to-r from-brand-midnight to-brand-purple'
    },
    {
      icon: ShoppingBag,
      title: 'Dyqani',
      description: 'Blej produkte dhe shërbime',
      href: '/store',
      color: 'bg-gradient-to-r from-brand-lime to-brand-mint'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'PROCESSING': return 'text-blue-600 bg-blue-100';
      case 'DELIVERED': return 'text-green-600 bg-green-100';
      case 'CANCELLED': return 'text-red-600 bg-red-100';
      case 'DIAGNOSING': return 'text-purple-600 bg-purple-100';
      case 'REPAIRING': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-lime rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {t.dashboard.welcome}!
        </h1>
        <p className="text-white/90">
          Menaxho porositë tuaja, riparimet dhe konfigurimet nga paneli juaj personal.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Porositë Totale</CardTitle>
            <ShoppingBag className="h-4 w-4 text-brand-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-midnight">{stats.totalOrders}</div>
            <p className="text-xs text-gray-600">+2 këtë muaj</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Riparime Aktive</CardTitle>
            <Wrench className="h-4 w-4 text-brand-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-midnight">{stats.activeRepairs}</div>
            <p className="text-xs text-gray-600">Në proces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PC Konfigurime</CardTitle>
            <Monitor className="h-4 w-4 text-brand-lime" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-midnight">{stats.pcConfigs}</div>
            <p className="text-xs text-gray-600">Të ruajtura</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PS5 Konfigurime</CardTitle>
            <Gamepad2 className="h-4 w-4 text-brand-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-midnight">{stats.ps5Configs}</div>
            <p className="text-xs text-gray-600">Të ruajtura</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Veprime të Shpejta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-brand-purple" />
              <span>Porositë e Fundit</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.items[0]}</p>
                    <p className="text-xs text-gray-500">
                      {order.createdAt.toLocaleDateString('sq-AL')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-semibold text-gray-800 mt-1">
                      €{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <Link href="/client/orders">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Shiko të Gjitha
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Active Repairs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-brand-teal" />
              <span>Riparime Aktive</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRepairs.map((repair: any) => (
                <div key={repair.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{repair.repairNumber}</p>
                    <p className="text-sm text-gray-600">{repair.deviceType}</p>
                    <p className="text-xs text-gray-500">
                      {repair.createdAt.toLocaleDateString('sq-AL')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(repair.status)}`}>
                      {repair.status}
                    </span>
                    <Button size="sm" variant="outline" className="mt-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Timeline
                    </Button>
                  </div>
                </div>
              ))}
              <Link href="/client/repairs">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Shiko të Gjitha
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}