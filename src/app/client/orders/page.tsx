'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  Eye, 
  Download, 
  Calendar, 
  Euro,
  Monitor,
  Gamepad2,
  ShoppingBag,
  Gift,
  ArrowRight
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  type: 'PC_BUILD' | 'PS5_CONTROLLER' | 'PRODUCT' | 'GIFT_CARD';
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  createdAt: string;
  orderItems: any[];
  timelineEntries: any[];
}

const statusColors = {
  PENDING: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  CONFIRMED: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
  IN_PROGRESS: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
  SHIPPED: 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30',
  DELIVERED: 'bg-green-500/20 text-green-600 border-green-500/30',
  CANCELLED: 'bg-red-500/20 text-red-600 border-red-500/30'
};

const typeIcons = {
  PC_BUILD: Monitor,
  PS5_CONTROLLER: Gamepad2,
  PRODUCT: ShoppingBag,
  GIFT_CARD: Gift
};

const statusSteps = [
  { key: 'PENDING', label: 'Order Placed', icon: Clock },
  { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle },
  { key: 'IN_PROGRESS', label: 'In Progress', icon: Package },
  { key: 'SHIPPED', label: 'Shipped', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle }
];

export default function ClientOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      
      const response = await fetch(`/api/orders?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'CONFIRMED': return <CheckCircle className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Package className="w-4 h-4" />;
      case 'SHIPPED': return <Truck className="w-4 h-4" />;
      case 'DELIVERED': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getOrderProgress = (status: string) => {
    const statusIndex = statusSteps.findIndex(step => step.key === status);
    return Math.max(0, statusIndex);
  };

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const OrderTrackingModal = ({ order }: { order: Order }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Order Tracking</h2>
            <Button variant="outline" onClick={() => setShowOrderModal(false)}>
              Close
            </Button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Order Header */}
          <div className="text-center">
            <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
            <p className="text-gray-600">Total: €{order.total.toFixed(2)}</p>
            <Badge className={`mt-2 ${statusColors[order.status]}`}>
              {getStatusIcon(order.status)}
              <span className="ml-1">{order.status}</span>
            </Badge>
          </div>

          {/* Progress Tracker */}
          <div className="space-y-4">
            <h4 className="font-medium">Order Progress</h4>
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const isCompleted = getOrderProgress(order.status) >= index;
                const isCurrent = getOrderProgress(order.status) === index;
                const StepIcon = step.icon;
                
                return (
                  <div key={step.key} className={`flex items-center gap-4 p-3 rounded-lg ${
                    isCurrent ? 'bg-blue-50 border border-blue-200' : 
                    isCompleted ? 'bg-green-50' : 'bg-gray-50'
                  }`}>
                    <div className={`p-2 rounded-full ${
                      isCurrent ? 'bg-blue-500 text-white' :
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                        {step.label}
                      </p>
                      {isCurrent && <p className="text-sm text-blue-600">Current status</p>}
                      {isCompleted && !isCurrent && <p className="text-sm text-green-600">Completed</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          {order.timelineEntries && order.timelineEntries.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Order Timeline</h4>
              <div className="space-y-3">
                {order.timelineEntries.map((entry, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">{entry.title}</p>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="space-y-4">
            <h4 className="font-medium">Order Items</h4>
            <div className="space-y-3">
              {order.orderItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Item {index + 1}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">€{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
              }} variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="loading-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
            <Button onClick={() => window.location.href = '/services/pc-configurator'}>
              Start Building
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => {
            const TypeIcon = typeIcons[order.type];
            return (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{order.orderNumber}</span>
                    </div>
                    <Badge className={statusColors[order.status]}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Type</p>
                    <p className="font-medium">{order.type.replace('_', ' ')}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-lg flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        {order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Quick Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{((getOrderProgress(order.status) + 1) / statusSteps.length * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${(getOrderProgress(order.status) + 1) / statusSteps.length * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderModal(true);
                      }}
                      className="flex-1 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Track Order
                    </Button>
                    {order.status === 'DELIVERED' && (
                      <Button size="sm" className="flex-1">
                        Reorder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Order Tracking Modal */}
      {showOrderModal && selectedOrder && (
        <OrderTrackingModal order={selectedOrder} />
      )}
    </div>
  );
}