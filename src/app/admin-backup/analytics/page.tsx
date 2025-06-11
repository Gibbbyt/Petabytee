'use client'

import React, { useState, useEffect } from 'react'

// Mock Analytics Data
const analyticsData = {
  overview: {
    totalRevenue: 125450,
    totalOrders: 347,
    totalCustomers: 892,
    conversionRate: 3.2,
    averageOrderValue: 361,
    returningCustomers: 234
  },
  
  revenueChart: [
    { month: 'Jan', revenue: 18500, orders: 42 },
    { month: 'Feb', revenue: 22300, orders: 56 },
    { month: 'Mar', revenue: 19800, orders: 48 },
    { month: 'Apr', revenue: 25200, orders: 67 },
    { month: 'May', revenue: 28100, orders: 73 },
    { month: 'Jun', revenue: 31550, orders: 85 }
  ],

  productPerformance: [
    { name: 'Gaming Beast Pro', sales: 45, revenue: 130350, margin: 0.25 },
    { name: 'Custom PS5 Controllers', sales: 89, revenue: 13261, margin: 0.35 },
    { name: 'RTX 4070 Super', sales: 34, revenue: 20366, margin: 0.18 },
    { name: 'Balanced Performance', sales: 67, revenue: 107133, margin: 0.22 },
    { name: 'Budget Champion', sales: 123, revenue: 110577, margin: 0.28 }
  ],

  customerDemographics: {
    ageGroups: [
      { range: '18-24', count: 234, percentage: 26 },
      { range: '25-34', count: 312, percentage: 35 },
      { range: '35-44', count: 198, percentage: 22 },
      { range: '45-54', count: 89, percentage: 10 },
      { range: '55+', count: 59, percentage: 7 }
    ],
    regions: [
      { city: 'Prishtina', customers: 287, orders: 156 },
      { city: 'Prizren', customers: 124, orders: 78 },
      { city: 'Peja', customers: 98, orders: 45 },
      { city: 'Gjilan', customers: 87, orders: 34 },
      { city: 'Ferizaj', customers: 76, orders: 28 },
      { city: 'Other', customers: 220, orders: 89 }
    ]
  },

  salesTrends: {
    daily: [
      { date: '2024-01-15', sales: 12, revenue: 4350 },
      { date: '2024-01-16', sales: 8, revenue: 2890 },
      { date: '2024-01-17', sales: 15, revenue: 5670 },
      { date: '2024-01-18', sales: 19, revenue: 6840 },
      { date: '2024-01-19', sales: 22, revenue: 8120 },
      { date: '2024-01-20', sales: 17, revenue: 6230 },
      { date: '2024-01-21', sales: 25, revenue: 9180 }
    ],
    hourly: [
      { hour: '09:00', orders: 2, revenue: 780 },
      { hour: '10:00', orders: 5, revenue: 1350 },
      { hour: '11:00', orders: 8, revenue: 2890 },
      { hour: '12:00', orders: 12, revenue: 4230 },
      { hour: '13:00', orders: 15, revenue: 5670 },
      { hour: '14:00', orders: 18, revenue: 6540 },
      { hour: '15:00', orders: 22, revenue: 7890 },
      { hour: '16:00', orders: 19, revenue: 6780 },
      { hour: '17:00', orders: 16, revenue: 5430 },
      { hour: '18:00', orders: 13, revenue: 4560 },
      { hour: '19:00', orders: 9, revenue: 3210 },
      { hour: '20:00', orders: 6, revenue: 2180 }
    ]
  },

  repairAnalytics: {
    totalRepairs: 89,
    averageRepairTime: '4.5 days',
    customerSatisfaction: 4.7,
    mostCommonIssues: [
      { issue: 'Performance Issues', count: 34, percentage: 38 },
      { issue: 'Hardware Problems', count: 18, percentage: 20 },
      { issue: 'Software Issues', count: 15, percentage: 17 },
      { issue: 'Gaming Issues', count: 12, percentage: 13 },
      { issue: 'Other', count: 10, percentage: 12 }
    ]
  }
}

// Simple Chart Components
function LineChart({ data, title, valueKey, labelKey }) {
  const maxValue = Math.max(...data.map(item => item[valueKey]))
  
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t"
              style={{ 
                height: `${(item[valueKey] / maxValue) * 200}px`,
                minHeight: '4px'
              }}
            />
            <span className="text-xs text-gray-400 mt-2 transform -rotate-45 origin-top-left">
              {item[labelKey]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BarChart({ data, title, valueKey, labelKey, color = 'cyan' }) {
  const maxValue = Math.max(...data.map(item => item[valueKey]))
  
  const colorClasses = {
    cyan: 'from-cyan-500 to-cyan-400',
    orange: 'from-orange-500 to-orange-400',
    purple: 'from-purple-500 to-purple-400',
    green: 'from-green-500 to-green-400'
  }
  
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-sm text-gray-300 w-24 text-right">{item[labelKey]}</span>
            <div className="flex-1 bg-gray-700 rounded-full h-6 relative">
              <div 
                className={`bg-gradient-to-r ${colorClasses[color]} h-full rounded-full transition-all duration-1000`}
                style={{ width: `${(item[valueKey] / maxValue) * 100}%` }}
              />
              <span className="absolute right-2 top-0 h-full flex items-center text-xs text-white">
                {item[valueKey]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutChart({ data, title, valueKey, labelKey }) {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0)
  let cumulativePercentage = 0
  
  const colors = ['#00f5ff', '#ff6b35', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
  
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item[valueKey] / total) * 100
              const strokeDasharray = `${percentage} ${100 - percentage}`
              const strokeDashoffset = -cumulativePercentage
              cumulativePercentage += percentage
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={colors[index % colors.length]}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000"
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
          </div>
        </div>
        
        <div className="ml-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-300">{item[labelKey]}</span>
              <span className="text-sm text-white font-semibold">{item[valueKey]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({ title, value, change, icon, color = 'cyan' }) {
  const colorClasses = {
    cyan: 'border-cyan-500/30 bg-cyan-500/10',
    orange: 'border-orange-500/30 bg-orange-500/10',
    purple: 'border-purple-500/30 bg-purple-500/10',
    green: 'border-green-500/30 bg-green-500/10'
  }
  
  const textColors = {
    cyan: 'text-cyan-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
    green: 'text-green-400'
  }
  
  return (
    <div className={`bg-gray-900/50 border rounded-lg p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className={`text-2xl ${textColors[color]}`}>{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-white mb-1">{value}</div>
          {change && (
            <div className={`text-sm ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '↗' : '↘'} {Math.abs(change)}%
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Real-time Activity Feed
function ActivityFeed() {
  const [activities] = useState([
    { id: 1, type: 'order', message: 'New order #ORD-2024-347 - €2,899', time: '2 min ago', user: 'Ardit Gashi' },
    { id: 2, type: 'repair', message: 'Repair completed #RPR-2024-089', time: '5 min ago', user: 'Tech Team' },
    { id: 3, type: 'user', message: 'New customer registration', time: '12 min ago', user: 'Blerta Krasniqi' },
    { id: 4, type: 'order', message: 'Order shipped #ORD-2024-345', time: '18 min ago', user: 'Fulfillment' },
    { id: 5, type: 'payment', message: 'Payment received €1,599', time: '25 min ago', user: 'Stripe' },
    { id: 6, type: 'support', message: 'New support ticket created', time: '32 min ago', user: 'Dren Musliu' }
  ])
  
  const activityIcons = {
    order: '🛒',
    repair: '🔧',
    user: '👤',
    payment: '💳',
    support: '💬'
  }
  
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Live Activity Feed</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded">
            <span className="text-lg">{activityIcons[activity.type]}</span>
            <div className="flex-1">
              <p className="text-white text-sm">{activity.message}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">by {activity.user}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Time Period Selector
function TimePeriodSelector({ selectedPeriod, onPeriodChange }) {
  const periods = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 3 Months' },
    { id: '1y', label: 'Last Year' }
  ]
  
  return (
    <div className="flex space-x-2">
      {periods.map(period => (
        <button
          key={period.id}
          onClick={() => onPeriodChange(period.id)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            selectedPeriod === period.id
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'sales', name: 'Sales', icon: '💰' },
    { id: 'customers', name: 'Customers', icon: '👥' },
    { id: 'products', name: 'Products', icon: '📦' },
    { id: 'repairs', name: 'Repairs', icon: '🔧' }
  ];

  // Fetch analytics data from API
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/analytics?period=${selectedPeriod}`);
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Keep fallback data if API fails
        setAnalyticsData({
          overview: {
            totalRevenue: 125450,
            totalOrders: 347,
            totalCustomers: 892,
            conversionRate: 3.2,
            averageOrderValue: 361,
            returningCustomers: 234
          },
          revenueChart: [
            { month: 'Jan', revenue: 18500, orders: 42 },
            { month: 'Feb', revenue: 22300, orders: 56 },
            { month: 'Mar', revenue: 19800, orders: 48 },
            { month: 'Apr', revenue: 25200, orders: 67 },
            { month: 'May', revenue: 28100, orders: 73 },
            { month: 'Jun', revenue: 31550, orders: 85 }
          ],
          customerDemographics: {
            ageGroups: [
              { range: '18-24', count: 234, percentage: 26 },
              { range: '25-34', count: 312, percentage: 35 },
              { range: '35-44', count: 198, percentage: 22 },
              { range: '45-54', count: 89, percentage: 10 },
              { range: '55+', count: 59, percentage: 7 }
            ],
            regions: [
              { city: 'Prishtina', customers: 287, orders: 156 },
              { city: 'Prizren', customers: 124, orders: 78 },
              { city: 'Peja', customers: 98, orders: 45 },
              { city: 'Gjilan', customers: 87, orders: 34 },
              { city: 'Ferizaj', customers: 76, orders: 28 },
              { city: 'Other', customers: 220, orders: 89 }
            ]
          },
          repairAnalytics: {
            totalRepairs: 89,
            averageRepairTime: '4.5 days',
            customerSatisfaction: 4.7,
            mostCommonIssues: [
              { issue: 'Performance Issues', count: 34, percentage: 38 },
              { issue: 'Hardware Problems', count: 18, percentage: 20 },
              { issue: 'Software Issues', count: 15, percentage: 17 },
              { issue: 'Gaming Issues', count: 12, percentage: 13 },
              { issue: 'Other', count: 10, percentage: 12 }
            ]
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  if (loading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Business intelligence and performance metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <TimePeriodSelector 
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
            <button className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value={`€${analyticsData.overview.totalRevenue.toLocaleString()}`}
                change={8.2}
                icon="💰"
                color="green"
              />
              <MetricCard
                title="Total Orders"
                value={analyticsData.overview.totalOrders}
                change={12.5}
                icon="🛒"
                color="cyan"
              />
              <MetricCard
                title="Total Customers"
                value={analyticsData.overview.totalCustomers}
                change={15.3}
                icon="👥"
                color="purple"
              />
              <MetricCard
                title="Conversion Rate"
                value={`${analyticsData.overview.conversionRate}%`}
                change={-0.8}
                icon="📈"
                color="orange"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart
                data={analyticsData.revenueChart}
                title="Revenue Trend"
                valueKey="revenue"
                labelKey="month"
              />
              
              <DonutChart
                data={analyticsData.customerDemographics.ageGroups}
                title="Customer Age Distribution"
                valueKey="count"
                labelKey="range"
              />
              
              <BarChart
                data={analyticsData.productPerformance}
                title="Top Products by Sales"
                valueKey="sales"
                labelKey="name"
                color="purple"
              />
              
              <ActivityFeed />
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Total Revenue"
                value={`€${analyticsData.overview.totalRevenue.toLocaleString()}`}
                change={8.2}
                icon="💰"
                color="green"
              />
              <MetricCard
                title="Average Order Value"
                value={`€${analyticsData.overview.averageOrderValue}`}
                change={5.1}
                icon="📊"
                color="cyan"
              />
              <MetricCard
                title="Orders This Month"
                value={analyticsData.revenueChart[analyticsData.revenueChart.length - 1].orders}
                change={18.4}
                icon="📦"
                color="orange"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart
                data={analyticsData.salesTrends.daily}
                title="Daily Sales"
                valueKey="sales"
                labelKey="date"
              />
              
              <LineChart
                data={analyticsData.salesTrends.hourly}
                title="Hourly Sales Pattern"
                valueKey="orders"
                labelKey="hour"
              />
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Total Customers"
                value={analyticsData.overview.totalCustomers}
                change={15.3}
                icon="👥"
                color="purple"
              />
              <MetricCard
                title="Returning Customers"
                value={analyticsData.overview.returningCustomers}
                change={22.7}
                icon="🔄"
                color="green"
              />
              <MetricCard
                title="Customer Retention"
                value="68.5%"
                change={3.2}
                icon="❤️"
                color="cyan"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DonutChart
                data={analyticsData.customerDemographics.ageGroups}
                title="Age Distribution"
                valueKey="count"
                labelKey="range"
              />
              
              <BarChart
                data={analyticsData.customerDemographics.regions}
                title="Customers by Region"
                valueKey="customers"
                labelKey="city"
                color="orange"
              />
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                data={analyticsData.productPerformance}
                title="Product Sales Volume"
                valueKey="sales"
                labelKey="name"
                color="cyan"
              />
              
              <BarChart
                data={analyticsData.productPerformance}
                title="Revenue by Product"
                valueKey="revenue"
                labelKey="name"
                color="green"
              />
            </div>

            {/* Product Performance Table */}
            <div className="bg-gray-800/50 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Product Performance Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="text-left p-4 text-gray-300">Product</th>
                      <th className="text-left p-4 text-gray-300">Sales</th>
                      <th className="text-left p-4 text-gray-300">Revenue</th>
                      <th className="text-left p-4 text-gray-300">Margin</th>
                      <th className="text-left p-4 text-gray-300">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.productPerformance.map((product, index) => (
                      <tr key={index} className="border-t border-gray-700">
                        <td className="p-4 text-white">{product.name}</td>
                        <td className="p-4 text-gray-300">{product.sales}</td>
                        <td className="p-4 text-green-400">€{product.revenue.toLocaleString()}</td>
                        <td className="p-4 text-cyan-400">{(product.margin * 100).toFixed(1)}%</td>
                        <td className="p-4 text-green-400">€{(product.revenue * product.margin).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Repairs Tab */}
        {activeTab === 'repairs' && (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Total Repairs"
                value={analyticsData.repairAnalytics.totalRepairs}
                change={12.3}
                icon="🔧"
                color="orange"
              />
              <MetricCard
                title="Avg Repair Time"
                value={analyticsData.repairAnalytics.averageRepairTime}
                change={-8.5}
                icon="⏱️"
                color="green"
              />
              <MetricCard
                title="Customer Satisfaction"
                value={`${analyticsData.repairAnalytics.customerSatisfaction}/5`}
                change={2.1}
                icon="⭐"
                color="purple"
              />
              <MetricCard
                title="Repair Revenue"
                value="€15,430"
                change={18.7}
                icon="💰"
                color="cyan"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DonutChart
                data={analyticsData.repairAnalytics.mostCommonIssues}
                title="Most Common Issues"
                valueKey="count"
                labelKey="issue"
              />
              
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Repair Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded">
                    <span className="text-gray-300">First Response Time</span>
                    <span className="text-cyan-400 font-semibold">2.3 hours</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded">
                    <span className="text-gray-300">Resolution Rate</span>
                    <span className="text-green-400 font-semibold">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded">
                    <span className="text-gray-300">Repeat Issues</span>
                    <span className="text-orange-400 font-semibold">3.1%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded">
                    <span className="text-gray-300">Warranty Claims</span>
                    <span className="text-purple-400 font-semibold">1.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="px-4 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors">
              📊 Generate Custom Report
            </button>
            <button className="px-4 py-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors">
              📧 Email Report
            </button>
            <button className="px-4 py-3 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded hover:bg-purple-500/30 transition-colors">
              📅 Schedule Report
            </button>
            <button className="px-4 py-3 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded hover:bg-orange-500/30 transition-colors">
              🔔 Set Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}