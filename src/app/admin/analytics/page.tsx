'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  Euro, 
  Package,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  Target,
  Clock,
  Star
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    conversionRate: number;
    averageOrderValue: number;
    returningCustomers: number;
  };
  revenueChart: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  customerDemographics: {
    ageGroups: Array<{
      range: string;
      count: number;
      percentage: number;
    }>;
    regions: Array<{
      city: string;
      customers: number;
      orders: number;
    }>;
  };
  repairAnalytics: {
    totalRepairs: number;
    averageRepairTime: string;
    customerSatisfaction: number;
    mostCommonIssues: Array<{
      issue: string;
      count: number;
      percentage: number;
    }>;
  };
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [timePeriod]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/analytics?period=${timePeriod}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshAnalytics = () => {
    setRefreshing(true);
    fetchAnalytics();
  };

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = 'blue' 
  }: {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    color?: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={`text-sm flex items-center gap-1 ${
                change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Business intelligence and performance metrics</p>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="loading-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">Failed to load analytics data</p>
        <Button onClick={fetchAnalytics} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Business intelligence and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshAnalytics} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={`€${analytics.overview.totalRevenue.toLocaleString()}`}
          change="+12.5%"
          icon={Euro}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={analytics.overview.totalOrders.toLocaleString()}
          change="+8.3%"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Customers"
          value={analytics.overview.totalCustomers.toLocaleString()}
          change="+15.2%"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Conversion Rate"
          value={`${analytics.overview.conversionRate}%`}
          change="+2.1%"
          icon={Target}
          color="cyan"
        />
        <StatCard
          title="Average Order Value"
          value={`€${analytics.overview.averageOrderValue}`}
          change="+5.7%"
          icon={TrendingUp}
          color="orange"
        />
        <StatCard
          title="Returning Customers"
          value={analytics.overview.returningCustomers.toLocaleString()}
          change="+18.9%"
          icon={RefreshCw}
          color="indigo"
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {analytics.revenueChart.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2">
                    <div 
                      className="bg-blue-500 mx-auto rounded-t"
                      style={{ 
                        height: `${Math.max((item.revenue / 35000) * 120, 20)}px`,
                        width: '40px'
                      }}
                    />
                    <div className="text-xs text-gray-500 mt-1">{item.month}</div>
                  </div>
                  <div className="text-sm font-medium">€{item.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{item.orders} orders</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Customer Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Age Groups</h4>
                <div className="space-y-2">
                  {analytics.customerDemographics.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{group.range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${group.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Top Regions</h4>
                <div className="space-y-2">
                  {analytics.customerDemographics.regions.slice(0, 5).map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{region.city}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{region.customers} customers</div>
                        <div className="text-xs text-gray-500">{region.orders} orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Repair Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Repair Service Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analytics.repairAnalytics.totalRepairs}</div>
                  <div className="text-sm text-gray-600">Total Repairs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analytics.repairAnalytics.averageRepairTime}</div>
                  <div className="text-sm text-gray-600">Avg Repair Time</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold">{analytics.repairAnalytics.customerSatisfaction}</span>
                  <span className="text-gray-600">/5.0</span>
                </div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Common Issues</h4>
                <div className="space-y-2">
                  {analytics.repairAnalytics.mostCommonIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{issue.issue}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${issue.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{issue.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Customer Data
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Set KPI Goals
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}