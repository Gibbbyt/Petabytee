'use client'

import React, { useState, useEffect } from 'react'

// Mock Data
const orders = [
  {
    id: 'ORD-2024-001',
    customerName: 'Ardit Gashi',
    customerEmail: 'ardit.gashi@email.com',
    customerPhone: '+383 44 123 456',
    products: [
      { name: 'Gaming Beast Pro', quantity: 1, price: 2899 }
    ],
    total: 2899,
    status: 'pending',
    paymentStatus: 'paid',
    shippingAddress: 'Rruga Agim Ramadani 15, 10000 Prishtina, Kosovo',
    orderDate: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-22T00:00:00Z',
    notes: 'Customer requested RGB lighting customization'
  },
  {
    id: 'ORD-2024-002',
    customerName: 'Blerta Krasniqi',
    customerEmail: 'blerta.k@email.com',
    customerPhone: '+383 45 678 901',
    products: [
      { name: 'Custom PS5 Controller', quantity: 2, price: 149 },
      { name: 'RTX 4070 Super', quantity: 1, price: 599 }
    ],
    total: 897,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: 'Rruga Dëshmorët e Kombit 45, 20000 Prizren, Kosovo',
    orderDate: '2024-01-14T14:20:00Z',
    estimatedDelivery: '2024-01-21T00:00:00Z',
    notes: 'Express shipping requested'
  },
  {
    id: 'ORD-2024-003',
    customerName: 'Dren Musliu',
    customerEmail: 'dren.musliu@email.com',
    customerPhone: '+383 46 234 567',
    products: [
      { name: 'Balanced Performance', quantity: 1, price: 1599 }
    ],
    total: 1599,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: 'Rruga Zahir Pajaziti 23, 60000 Gjilan, Kosovo',
    orderDate: '2024-01-12T09:15:00Z',
    estimatedDelivery: '2024-01-19T00:00:00Z',
    trackingNumber: 'PT2024001234',
    notes: ''
  },
  {
    id: 'ORD-2024-004',
    customerName: 'Arta Berisha',
    customerEmail: 'arta.berisha@email.com',
    customerPhone: '+383 47 345 678',
    products: [
      { name: 'Samsung 980 Pro 2TB', quantity: 1, price: 199 },
      { name: 'G.Skill Trident Z5 32GB', quantity: 1, price: 189 }
    ],
    total: 388,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: 'Rruga Bill Klinton 12, 30000 Peja, Kosovo',
    orderDate: '2024-01-10T16:45:00Z',
    deliveredDate: '2024-01-17T11:30:00Z',
    notes: 'Customer very satisfied'
  },
  {
    id: 'ORD-2024-005',
    customerName: 'Faton Hasani',
    customerEmail: 'faton.hasani@email.com',
    customerPhone: '+383 48 456 789',
    products: [
      { name: 'Budget Champion', quantity: 1, price: 899 }
    ],
    total: 899,
    status: 'cancelled',
    paymentStatus: 'refunded',
    shippingAddress: 'Rruga Adem Jashari 67, 70000 Ferizaj, Kosovo',
    orderDate: '2024-01-13T12:00:00Z',
    cancelledDate: '2024-01-14T10:15:00Z',
    notes: 'Customer changed mind, full refund processed'
  }
]

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
}

const paymentStatusColors = {
  paid: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
  refunded: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

// Status Badge Component
function StatusBadge({ status, type = 'order' }) {
  const colors = type === 'payment' ? paymentStatusColors : statusColors
  const colorClass = colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// Order Details Modal Component
function OrderDetailsModal({ order, isOpen, onClose, onStatusUpdate }) {
  if (!isOpen || !order) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = (newStatus) => {
    onStatusUpdate(order.id, newStatus)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">Order Details</h2>
            <p className="text-gray-400">{order.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Order Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Order Status</h3>
              <StatusBadge status={order.status} />
              <div className="mt-4">
                <label className="text-sm text-gray-400">Update Status:</label>
                <select 
                  value={order.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="mt-1 w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Payment Status</h3>
              <StatusBadge status={order.paymentStatus} type="payment" />
              <div className="mt-4">
                <p className="text-sm text-gray-400">Total Amount</p>
                <p className="text-xl font-bold text-green-400">€{order.total}</p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Dates</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-400">Order Date</p>
                  <p className="text-white">{formatDate(order.orderDate)}</p>
                </div>
                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-gray-400">Est. Delivery</p>
                    <p className="text-white">{formatDate(order.estimatedDelivery)}</p>
                  </div>
                )}
                {order.deliveredDate && (
                  <div>
                    <p className="text-sm text-gray-400">Delivered</p>
                    <p className="text-green-400">{formatDate(order.deliveredDate)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Shipping Address</p>
                <p className="text-white">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-sm text-gray-400">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">€{product.price}</p>
                    <p className="text-sm text-gray-400">€{product.price * product.quantity} total</p>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-gray-600 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-green-400">€{order.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {order.trackingNumber && (
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Tracking Information</h3>
              <p className="text-cyan-400 font-mono">{order.trackingNumber}</p>
              <button className="mt-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors">
                View Tracking Details
              </button>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Notes</h3>
              <p className="text-gray-300">{order.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-gray-700">
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors">
              Print Invoice
            </button>
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/30 transition-colors">
              Send Email Update
            </button>
            <button className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors">
              Generate Shipping Label
            </button>
            {order.status === 'pending' && (
              <button className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors">
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Filters Component
function OrderFilters({ filters, onFilterChange }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Status Filter */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Status</label>
          <select 
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        {/* Payment Status Filter */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Payment</label>
          <select 
            value={filters.paymentStatus}
            onChange={(e) => onFilterChange('paymentStatus', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
        
        {/* Date Range */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">From Date</label>
          <input 
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-400 mb-2 block">To Date</label>
          <input 
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          />
        </div>
      </div>
      
      {/* Search */}
      <div className="mt-4">
        <label className="text-sm text-gray-400 mb-2 block">Search Orders</label>
        <input 
          type="text"
          placeholder="Search by order ID, customer name, or email..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
        />
      </div>
      
      {/* Clear Filters */}
      <div className="mt-4">
        <button 
          onClick={() => onFilterChange('clear')}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    startDate: '',
    endDate: '',
    search: ''
  });

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        
        if (filters.status) queryParams.set('status', filters.status);
        if (filters.paymentStatus) queryParams.set('paymentStatus', filters.paymentStatus);
        if (filters.startDate) queryParams.set('startDate', filters.startDate);
        if (filters.endDate) queryParams.set('endDate', filters.endDate);
        if (filters.search) queryParams.set('search', filters.search);

        const response = await fetch(`/api/admin/orders?${queryParams}`);
        const ordersData = await response.json();
        
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Keep existing orders if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filters]);

  // Filter and sort orders
  useEffect(() => {
    let filtered = orders.filter(order => {
      if (filters.status && order.status !== filters.status) return false;
      if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus) return false;
      if (filters.startDate && new Date(order.orderDate) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(order.orderDate) > new Date(filters.endDate)) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          order.id.toLowerCase().includes(searchLower) ||
          order.customerName.toLowerCase().includes(searchLower) ||
          order.customerEmail.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'orderDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, filters, sortBy, sortOrder]);

  const handleFilterChange = (field, value) => {
    if (field === 'clear') {
      setFilters({
        status: '',
        paymentStatus: '',
        startDate: '',
        endDate: '',
        search: ''
      });
    } else {
      setFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        const updatedOrders = orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        
        // Update selected order
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action} on orders:`, selectedOrders);
    // Here you would implement bulk actions
    setSelectedOrders([]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">Order Management</h1>
            <p className="text-gray-400">Manage and track all customer orders</p>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors">
              Export Orders
            </button>
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors">
              Create Order
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Orders</h3>
            <p className="text-2xl font-bold text-white">{orders.length}</p>
            <p className="text-sm text-green-400">+12% from last month</p>
          </div>
          
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Pending Orders</h3>
            <p className="text-2xl font-bold text-white">{orders.filter(o => o.status === 'pending').length}</p>
            <p className="text-sm text-yellow-400">Needs attention</p>
          </div>
          
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-white">€{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</p>
            <p className="text-sm text-green-400">+8% from last month</p>
          </div>
          
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Avg Order Value</h3>
            <p className="text-2xl font-bold text-white">€{Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length)}</p>
            <p className="text-sm text-cyan-400">Stable</p>
          </div>
        </div>

        {/* Filters */}
        <OrderFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-cyan-400">{selectedOrders.length} orders selected</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleBulkAction('mark-processing')}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-sm hover:bg-blue-500/30 transition-colors"
                >
                  Mark as Processing
                </button>
                <button 
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-sm hover:bg-green-500/30 transition-colors"
                >
                  Export Selected
                </button>
                <button 
                  onClick={() => setSelectedOrders([])}
                  className="px-3 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded text-sm hover:bg-gray-500/30 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="p-4 text-left">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(filteredOrders.map(o => o.id))
                        } else {
                          setSelectedOrders([])
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th 
                    className="p-4 text-left text-gray-400 cursor-pointer hover:text-white"
                    onClick={() => handleSort('id')}
                  >
                    Order ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="p-4 text-left text-gray-400 cursor-pointer hover:text-white"
                    onClick={() => handleSort('customerName')}
                  >
                    Customer {sortBy === 'customerName' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="p-4 text-left text-gray-400 cursor-pointer hover:text-white"
                    onClick={() => handleSort('total')}
                  >
                    Total {sortBy === 'total' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="p-4 text-left text-gray-400">Status</th>
                  <th className="p-4 text-left text-gray-400">Payment</th>
                  <th 
                    className="p-4 text-left text-gray-400 cursor-pointer hover:text-white"
                    onClick={() => handleSort('orderDate')}
                  >
                    Date {sortBy === 'orderDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="p-4 text-left text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="border-t border-gray-700 hover:bg-gray-800/30 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-cyan-400">{order.id}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-400">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-semibold">€{order.total}</span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={order.paymentStatus} type="payment" />
                    </td>
                    <td className="p-4 text-gray-300">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-2">
                        <button 
                          className="px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-xs hover:bg-cyan-500/30 transition-colors"
                          onClick={() => handleOrderClick(order)}
                        >
                          View
                        </button>
                        <button className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs hover:bg-blue-500/30 transition-colors">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-400">No orders found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-400">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-cyan-500 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
              2
            </button>
            <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}