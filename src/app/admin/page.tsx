'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign,
  ShoppingBag,
  Users,
  Wrench,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  Activity,
  BarChart3,
  Eye,
  Plus,
  RefreshCcw
} from 'lucide-react';

interface AdminStats {
  revenue: {
    today: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  orders: {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  repairs: {
    total: number;
    active: number;
    completed: number;
    easyMailIn: number;
  };
  customers: {
    total: number;
    new: number;
    active: number;
  };
  inventory: {
    lowStock: number;
    outOfStock: number;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: string;
  createdAt: Date;
}

interface Repair {
  id: string;
  repairNumber: string;
  customer: string;
  device: string;
  status: string;
  isEasyMailIn: boolean;
  createdAt: Date;
}

interface Notification {
  id: string;
  type: string;
  message: string;
  time: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    revenue: {
      today: 0,
      thisMonth: 0,
      lastMonth: 0,
      growth: 0
    },
    orders: {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      cancelled: 0
    },
    repairs: {
      total: 0,
      active: 0,
      completed: 0,
      easyMailIn: 0
    },
    customers: {
      total: 0,
      new: 0,
      active: 0
    },
    inventory: {
      lowStock: 0,
      outOfStock: 0
    }
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [activeRepairs, setActiveRepairs] = useState<Repair[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch admin statistics');
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
        setNotifications(data.notifications);
        
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to load dashboard data');
        
        // Fallback to mock data if API fails
        setStats({
          revenue: {
            today: 2453.67,
            thisMonth: 45230.89,
            lastMonth: 38450.23,
            growth: 17.6
          },
          orders: {
            total: 234,
            pending: 12,
            processing: 8,
            completed: 208,
            cancelled: 6
          },
          repairs: {
            total: 89,
            active: 15,
            completed: 68,
            easyMailIn: 6
          },
          customers: {
            total: 1249,
            new: 23,
            active: 156
          },
          inventory: {
            lowStock: 8,
            outOfStock: 3
          }
        });

        setRecentOrders([
          {
            id: '1',
            orderNumber: 'PB-2024-045',
            customer: 'Arben Krasniqi',
            total: 899.99,
            status: 'PROCESSING',
            createdAt: new Date('2024-01-15T10:30:00')
          },
          {
            id: '2',
            orderNumber: 'PB-2024-044',
            customer: 'Liridona Hasani',
            total: 299.99,
            status: 'PENDING',
            createdAt: new Date('2024-01-15T09:15:00')
          },
          {
            id: '3',
            orderNumber: 'PB-2024-043',
            customer: 'Mentor Gashi',
            total: 1299.99,
            status: 'COMPLETED',
            createdAt: new Date('2024-01-14T16:45:00')
          }
        ]);

        setActiveRepairs([
          {
            id: '1',
            repairNumber: 'PR-2024-012',
            customer: 'Valdrin Berisha',
            device: 'Gaming Laptop',
            status: 'DIAGNOSING',
            isEasyMailIn: true,
            createdAt: new Date('2024-01-12T14:20:00')
          },
          {
            id: '2',
            repairNumber: 'PR-2024-011',
            customer: 'Arta Shala',
            device: 'Desktop PC',
            status: 'REPAIRING',
            isEasyMailIn: false,
            createdAt: new Date('2024-01-10T11:30:00')
          }
        ]);

        setNotifications([
          {
            id: '1',
            type: 'low_stock',
            message: '8 produkte kanë stok të ulët',
            time: '5 minuta më parë'
          },
          {
            id: '2',
            type: 'new_order',
            message: 'Porosi e re #PB-2024-045',
            time: '15 minuta më parë'
          },
          {
            id: '3',
            type: 'repair_update',
            message: 'Riparim PR-2024-010 përfunduar',
            time: '1 orë më parë'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const quickActions = [
    {
      title: 'Shto Produkt',
      description: 'Shto produkt të ri në inventar',
      icon: Plus,
      href: '/admin/products/new',
      color: 'bg-green-500'
    },
    {
      title: 'Krijo PC Build',
      description: 'Konfiguro një PC build të ri',
      icon: Package,
      href: '/admin/services/pc-builds/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Menaxho Stokun',
      description: 'Përditëso sasinë e produkteve',
      icon: RefreshCcw,
      href: '/admin/products/stock',
      color: 'bg-orange-500'
    },
    {
      title: 'Raport Mujor',
      description: 'Shiko analitikat e detajuara',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-purple-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'PROCESSING': return 'text-blue-600 bg-blue-100';
      case 'COMPLETED': return 'text-green-600 bg-green-100';
      case 'CANCELLED': return 'text-red-600 bg-red-100';
      case 'DIAGNOSING': return 'text-purple-600 bg-purple-100';
      case 'REPAIRING': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Përmbledhje e përgjithshme e sistemit</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Përditësuar së fundi</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date().toLocaleString('sq-AL')}
          </p>
        </div>
      </div>

      {/* Revenue & Growth Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Të Ardhurat Sot</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{stats.revenue.today.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600">
              +12% nga dje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Të Ardhurat Mujore</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              €{stats.revenue.thisMonth.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              +{stats.revenue.growth}% nga muaji i kaluar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Porositë Totale</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{stats.orders.total}</div>
            <p className="text-xs text-gray-600">
              {stats.orders.pending} në pritje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Klientë Aktivë</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{stats.customers.active}</div>
            <p className="text-xs text-gray-600">
              {stats.customers.new} të rinj këtë muaj
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order & Repair Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statusi i Porosive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Në pritje</span>
                <span className="font-semibold text-yellow-600">{stats.orders.pending}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Në proces</span>
                <span className="font-semibold text-blue-600">{stats.orders.processing}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Përfunduar</span>
                <span className="font-semibold text-green-600">{stats.orders.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Anuluar</span>
                <span className="font-semibold text-red-600">{stats.orders.cancelled}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statusi i Riparimeve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Aktive</span>
                <span className="font-semibold text-orange-600">{stats.repairs.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">EasyMail-In</span>
                <span className="font-semibold text-purple-600">{stats.repairs.easyMailIn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Përfunduar</span>
                <span className="font-semibold text-green-600">{stats.repairs.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stok i ulët</span>
                <span className="font-semibold text-red-600">{stats.inventory.lowStock}</span>
              </div>
            </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Porositë e Fundit</span>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{order.orderNumber}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {order.createdAt.toLocaleTimeString('sq-AL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      €{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Repairs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Riparime Aktive</span>
              <Link href="/admin/repairs">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRepairs.map((repair: any) => (
                <div key={repair.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{repair.repairNumber}</span>
                    {repair.isEasyMailIn && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        EasyMail-In
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{repair.customer}</p>
                  <p className="text-sm text-gray-600">{repair.device}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {repair.createdAt.toLocaleDateString('sq-AL')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(repair.status)}`}>
                      {repair.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Njoftimet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification: any) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
              <Link href="/admin/notifications">
                <Button variant="outline" className="w-full" size="sm">
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