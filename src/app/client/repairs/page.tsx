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
  Wrench, 
  Clock, 
  CheckCircle, 
  Truck, 
  Eye, 
  Plus,
  Calendar, 
  Euro,
  Package,
  AlertCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface Repair {
  id: string;
  repairNumber: string;
  deviceType: string;
  deviceModel?: string;
  issueDescription: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'READY_FOR_PICKUP' | 'CANCELLED';
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isEasyMailIn: boolean;
  estimatedValue?: number;
  createdAt: string;
  timelineEntries: any[];
  assignedTechnician?: {
    id: string;
    name: string;
    email: string;
  };
}

const statusColors = {
  PENDING: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  CONFIRMED: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
  IN_PROGRESS: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
  COMPLETED: 'bg-green-500/20 text-green-600 border-green-500/30',
  READY_FOR_PICKUP: 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30',
  CANCELLED: 'bg-red-500/20 text-red-600 border-red-500/30'
};

const urgencyColors = {
  LOW: 'bg-gray-500/20 text-gray-600 border-gray-500/30',
  MEDIUM: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
  HIGH: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
  URGENT: 'bg-red-500/20 text-red-600 border-red-500/30'
};

const statusSteps = [
  { key: 'PENDING', label: 'Request Submitted', icon: Clock },
  { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle },
  { key: 'IN_PROGRESS', label: 'Being Repaired', icon: Wrench },
  { key: 'COMPLETED', label: 'Repair Complete', icon: CheckCircle },
  { key: 'READY_FOR_PICKUP', label: 'Ready for Pickup', icon: Package }
];

export default function ClientRepairsPage() {
  const { data: session } = useSession();
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [showRepairModal, setShowRepairModal] = useState(false);

  useEffect(() => {
    fetchRepairs();
  }, [statusFilter]);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      
      const response = await fetch(`/api/repairs?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setRepairs(data.repairs || []);
      }
    } catch (error) {
      console.error('Error fetching repairs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'CONFIRMED': return <CheckCircle className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Wrench className="w-4 h-4" />;
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'READY_FOR_PICKUP': return <Package className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getRepairProgress = (status: string) => {
    const statusIndex = statusSteps.findIndex(step => step.key === status);
    return Math.max(0, statusIndex);
  };

  const filteredRepairs = repairs.filter(repair => 
    repair.repairNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repair.deviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const RepairTrackingModal = ({ repair }: { repair: Repair }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Repair Tracking</h2>
            <Button variant="outline" onClick={() => setShowRepairModal(false)}>
              Close
            </Button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Repair Header */}
          <div className="text-center">
            <h3 className="text-lg font-semibold">{repair.repairNumber}</h3>
            <p className="text-gray-600">{repair.deviceType} {repair.deviceModel && `- ${repair.deviceModel}`}</p>
            <div className="flex justify-center gap-2 mt-2">
              <Badge className={statusColors[repair.status]}>
                {getStatusIcon(repair.status)}
                <span className="ml-1">{repair.status.replace('_', ' ')}</span>
              </Badge>
              <Badge className={urgencyColors[repair.urgency]}>
                {repair.urgency}
              </Badge>
            </div>
          </div>

          {/* EasyMail-In Info */}
          {repair.isEasyMailIn && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">EasyMail-In Service</h4>
              </div>
              <p className="text-sm text-blue-700">
                This is an EasyMail-In repair. We'll send you a shipping box and handle all logistics.
              </p>
            </div>
          )}

          {/* Progress Tracker */}
          <div className="space-y-4">
            <h4 className="font-medium">Repair Progress</h4>
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const isCompleted = getRepairProgress(repair.status) >= index;
                const isCurrent = getRepairProgress(repair.status) === index;
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

          {/* Issue Description */}
          <div className="space-y-2">
            <h4 className="font-medium">Issue Description</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{repair.issueDescription}</p>
          </div>

          {/* Technician Info */}
          {repair.assignedTechnician && (
            <div className="space-y-2">
              <h4 className="font-medium">Assigned Technician</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">{repair.assignedTechnician.name}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {repair.assignedTechnician.email}
                </p>
              </div>
            </div>
          )}

          {/* Timeline */}
          {repair.timelineEntries && repair.timelineEntries.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Repair Timeline</h4>
              <div className="space-y-3">
                {repair.timelineEntries.map((entry, index) => (
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

          {/* Contact Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-700 mb-3">
              If you have questions about your repair, contact our support team.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                Call Support
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email Support
              </Button>
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
          <h1 className="text-3xl font-bold text-gray-900">My Repairs</h1>
          <p className="text-gray-600">Track and manage your repair requests</p>
        </div>
        <Button onClick={() => window.location.href = '/repair-services'} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Repair Request
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search repairs..."
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
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="READY_FOR_PICKUP">Ready for Pickup</SelectItem>
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

      {/* Repairs Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="loading-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading your repairs...</p>
        </div>
      ) : filteredRepairs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No repairs found</h3>
            <p className="text-gray-600 mb-6">You haven't submitted any repair requests yet</p>
            <Button onClick={() => window.location.href = '/repair-services'}>
              Request Repair
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepairs.map((repair) => (
            <Card key={repair.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{repair.repairNumber}</span>
                  <div className="flex gap-1">
                    <Badge className={statusColors[repair.status]}>
                      {getStatusIcon(repair.status)}
                      <span className="ml-1">{repair.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Device</p>
                  <p className="font-medium">{repair.deviceType}</p>
                  {repair.deviceModel && (
                    <p className="text-sm text-gray-500">{repair.deviceModel}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-600">Issue</p>
                  <p className="text-sm line-clamp-2">{repair.issueDescription}</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Urgency</p>
                    <Badge className={urgencyColors[repair.urgency]}>
                      {repair.urgency}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(repair.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {repair.isEasyMailIn && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    <Truck className="w-4 h-4" />
                    EasyMail-In Service
                  </div>
                )}

                {/* Quick Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{((getRepairProgress(repair.status) + 1) / statusSteps.length * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${(getRepairProgress(repair.status) + 1) / statusSteps.length * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRepair(repair);
                      setShowRepairModal(true);
                    }}
                    className="flex-1 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Track Repair
                  </Button>
                  {repair.status === 'READY_FOR_PICKUP' && (
                    <Button size="sm" className="flex-1">
                      Schedule Pickup
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Repair Tracking Modal */}
      {showRepairModal && selectedRepair && (
        <RepairTrackingModal repair={selectedRepair} />
      )}
    </div>
  );
}