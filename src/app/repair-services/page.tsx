'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Wrench, 
  Upload, 
  Camera, 
  CheckCircle, 
  Clock, 
  Truck, 
  AlertCircle,
  Package,
  FileText,
  Smartphone,
  Monitor,
  Gamepad2,
  Laptop,
  Headphones,
  Keyboard,
  Mouse,
  HardDrive,
  Cpu,
  MemoryStick,
  Download,
  MapPin,
  Calendar,
  Euro,
  Phone,
  Mail,
  Star,
  MessageSquare
} from 'lucide-react'

// Device Types and Common Issues
const deviceTypes = {
  'gaming-pc': {
    name: 'Gaming PC',
    icon: Monitor,
    commonIssues: [
      'Won\'t boot/power on',
      'Blue screen errors',
      'Overheating issues',
      'Performance problems',
      'Graphics card issues',
      'Storage failure',
      'RAM problems',
      'Network connectivity'
    ]
  },
  'laptop': {
    name: 'Laptop',
    icon: Laptop,
    commonIssues: [
      'Screen issues',
      'Keyboard not working',
      'Battery problems',
      'Overheating',
      'Wi-Fi connectivity',
      'Charging port issues',
      'Software problems',
      'Hardware diagnostics'
    ]
  },
  'ps5-controller': {
    name: 'PS5 Controller',
    icon: Gamepad2,
    commonIssues: [
      'Stick drift',
      'Button issues',
      'Charging problems',
      'Connection issues',
      'Trigger problems',
      'LED not working',
      'Audio issues',
      'Vibration problems'
    ]
  },
  'peripherals': {
    name: 'Peripherals',
    icon: Keyboard,
    commonIssues: [
      'Key not working',
      'Mouse sensor issues',
      'Headset audio problems',
      'Microphone issues',
      'Cable damage',
      'Software configuration',
      'Driver problems',
      'RGB lighting issues'
    ]
  }
}

// Repair Process Steps
const repairSteps = [
  { id: 'submitted', name: 'Repair Submitted', description: 'Your repair request has been received' },
  { id: 'diagnosed', name: 'Diagnosis Complete', description: 'Issue identified and quote provided' },
  { id: 'approved', name: 'Repair Approved', description: 'Quote accepted, repair in progress' },
  { id: 'completed', name: 'Repair Complete', description: 'Device repaired and tested' },
  { id: 'shipped', name: 'Shipped', description: 'Device shipped back to you' }
]

// Photo Upload Component
function PhotoUpload({ photos, onPhotosChange }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files) as File[]
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      onPhotosChange([...photos, ...imageFiles])
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    onPhotosChange([...photos, ...files])
  }

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    onPhotosChange(newPhotos)
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-300">Upload Photos of Damage/Issues</Label>
      
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-cyan-500 bg-cyan-500/10' 
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-300 mb-2">Drop photos here or click to upload</p>
        <p className="text-sm text-gray-500">Support: JPG, PNG, GIF (Max 10MB each)</p>
      </div>

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={URL.createObjectURL(photo)} 
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePhoto(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Diagnostic Wizard Component
function DiagnosticWizard({ deviceType, onIssueSelect }) {
  const [selectedIssues, setSelectedIssues] = useState([])
  const [customIssue, setCustomIssue] = useState('')

  const device = deviceTypes[deviceType]
  const IconComponent = device?.icon || Monitor

  const toggleIssue = (issue) => {
    const newIssues = selectedIssues.includes(issue)
      ? selectedIssues.filter(i => i !== issue)
      : [...selectedIssues, issue]
    
    setSelectedIssues(newIssues)
    onIssueSelect(newIssues, customIssue)
  }

  const handleCustomIssue = (value) => {
    setCustomIssue(value)
    onIssueSelect(selectedIssues, value)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-cyan-500/20 rounded-lg">
          <IconComponent className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{device?.name} Diagnostics</h3>
          <p className="text-sm text-gray-400">Select all issues you're experiencing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {device?.commonIssues.map((issue, index) => (
          <div
            key={index}
            className={`p-3 border rounded-lg cursor-pointer transition-all ${
              selectedIssues.includes(issue)
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => toggleIssue(issue)}
          >
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={selectedIssues.includes(issue)}
                disabled
              />
              <span className="text-sm text-gray-300">{issue}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-300">Other Issues (Describe)</Label>
        <Textarea
          placeholder="Describe any other issues not listed above..."
          value={customIssue}
          onChange={(e) => handleCustomIssue(e.target.value)}
          className="bg-gray-800 border-gray-600 text-white"
          rows={3}
        />
      </div>
    </div>
  )
}

// Repair Tracking Component
function RepairTracking({ repairId, currentStatus, estimatedCompletion }) {
  const currentStepIndex = repairSteps.findIndex(step => step.id === currentStatus)
  
  return (
    <Card className="bg-gray-900/50 border-cyan-500/20">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Repair Status - #{repairId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {repairSteps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStepIndex 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {index <= currentStepIndex ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-medium ${
                  index <= currentStepIndex ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.name}
                </h4>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
              
              {index === currentStepIndex && (
                <Badge className="bg-cyan-500">Current</Badge>
              )}
            </div>
          ))}
        </div>
        
        {estimatedCompletion && (
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Estimated Completion:</span>
              <span className="text-cyan-400 font-medium">{estimatedCompletion}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Cost Estimation Component
function CostEstimation({ deviceType, issues }) {
  const baseCosts = {
    'gaming-pc': { labor: 25, diagnostic: 15 },
    'laptop': { labor: 30, diagnostic: 20 },
    'ps5-controller': { labor: 15, diagnostic: 10 },
    'peripherals': { labor: 20, diagnostic: 10 }
  }

  const issueCosts = {
    'Won\'t boot/power on': 45,
    'Blue screen errors': 35,
    'Overheating issues': 40,
    'Screen issues': 80,
    'Stick drift': 25,
    'Button issues': 20,
    'Battery problems': 60,
    'Charging problems': 30
  }

  const base = baseCosts[deviceType] || { labor: 25, diagnostic: 15 }
  let estimatedCost = base.diagnostic + base.labor
  
  issues.forEach(issue => {
    estimatedCost += issueCosts[issue] || 25
  })

  return (
    <Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-green-500/30">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-green-400">Cost Estimation</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>Diagnostic Fee</span>
            <span>€{base.diagnostic}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Labor (Base)</span>
            <span>€{base.labor}</span>
          </div>
          {issues.map((issue, index) => (
            <div key={index} className="flex justify-between text-gray-300">
              <span className="text-sm">{issue}</span>
              <span>€{issueCosts[issue] || 25}</span>
            </div>
          ))}
          
          <div className="border-t border-gray-600 pt-3">
            <div className="flex justify-between text-xl font-bold text-white">
              <span>Estimated Total</span>
              <span className="text-green-400">€{estimatedCost}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              *Final cost may vary based on parts needed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RepairServicesPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    issues: [],
    customIssue: '',
    photos: [],
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    shippingMethod: 'mail-in'
  })

  const steps = ['Device Info', 'Diagnostics', 'Photos', 'Contact Info', 'Review']

  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleIssueSelect = (issues, customIssue) => {
    setFormData(prev => ({
      ...prev,
      issues,
      customIssue
    }))
  }

  const submitRepair = () => {
    console.log('Submitting repair request:', formData)
    // Here you would submit to API
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Repair Services
          </h1>
          <p className="text-xl text-gray-400">
            Professional repair services for all your gaming hardware
          </p>
        </motion.div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Wrench className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Expert Technicians</h3>
              <p className="text-sm text-gray-400">Certified professionals</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Truck className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-400">Both ways within Kosovo</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">90-Day Warranty</h3>
              <p className="text-sm text-gray-400">On all repairs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Fast Turnaround</h3>
              <p className="text-sm text-gray-400">3-7 business days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="submit" className="data-[state=active]:bg-orange-500">Submit Repair</TabsTrigger>
            <TabsTrigger value="track" className="data-[state=active]:bg-orange-500">Track Repair</TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:bg-orange-500">Repair Status</TabsTrigger>
          </TabsList>

          {/* Submit Repair Tab */}
          <TabsContent value="submit">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index <= currentStep 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-sm ${
                      index <= currentStep ? 'text-orange-400' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-4 ${
                        index < currentStep ? 'bg-orange-500' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form Steps */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-900/50 border-orange-500/20">
                  <CardContent className="p-6">
                    
                    {/* Step 0: Device Info */}
                    {currentStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-semibold text-orange-400">Device Information</h2>
                        
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-300">Device Type</Label>
                            <Select value={formData.deviceType} onValueChange={(value) => updateFormData('deviceType', value)}>
                              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                <SelectValue placeholder="Select device type" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(deviceTypes).map(([key, device]) => (
                                  <SelectItem key={key} value={key}>
                                    {device.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-300">Brand</Label>
                              <Input
                                placeholder="e.g., ASUS, Sony, etc."
                                value={formData.brand}
                                onChange={(e) => updateFormData('brand', e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-300">Model</Label>
                              <Input
                                placeholder="e.g., ROG Strix, DualSense, etc."
                                value={formData.model}
                                onChange={(e) => updateFormData('model', e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 1: Diagnostics */}
                    {currentStep === 1 && formData.deviceType && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h2 className="text-2xl font-semibold text-orange-400 mb-6">Diagnostic Wizard</h2>
                        <DiagnosticWizard 
                          deviceType={formData.deviceType}
                          onIssueSelect={handleIssueSelect}
                        />
                      </motion.div>
                    )}

                    {/* Step 2: Photos */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h2 className="text-2xl font-semibold text-orange-400 mb-6">Upload Photos</h2>
                        <PhotoUpload 
                          photos={formData.photos}
                          onPhotosChange={(photos) => updateFormData('photos', photos)}
                        />
                      </motion.div>
                    )}

                    {/* Step 3: Contact Info */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-semibold text-orange-400">Contact Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-300">Full Name</Label>
                            <Input
                              placeholder="Your full name"
                              value={formData.customerInfo.name}
                              onChange={(e) => updateFormData('customerInfo.name', e.target.value)}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-300">Email</Label>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.customerInfo.email}
                              onChange={(e) => updateFormData('customerInfo.email', e.target.value)}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-300">Phone</Label>
                            <Input
                              placeholder="+383 xx xxx xxx"
                              value={formData.customerInfo.phone}
                              onChange={(e) => updateFormData('customerInfo.phone', e.target.value)}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Address</Label>
                          <Textarea
                            placeholder="Your full address for device pickup/return"
                            value={formData.customerInfo.address}
                            onChange={(e) => updateFormData('customerInfo.address', e.target.value)}
                            className="bg-gray-800 border-gray-600 text-white"
                            rows={3}
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-300">Shipping Method</Label>
                          <Select value={formData.shippingMethod} onValueChange={(value) => updateFormData('shippingMethod', value)}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mail-in">Mail-In Service (Free)</SelectItem>
                              <SelectItem value="pickup">Home Pickup (€10)</SelectItem>
                              <SelectItem value="drop-off">Drop-off at Store</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Review */}
                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-semibold text-orange-400">Review & Submit</h2>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-white mb-2">Device</h3>
                            <p className="text-gray-300">{formData.brand} {formData.model}</p>
                            <p className="text-sm text-gray-400">{deviceTypes[formData.deviceType]?.name}</p>
                          </div>
                          
                          <div className="p-4 bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-white mb-2">Issues</h3>
                            <div className="flex flex-wrap gap-2">
                              {formData.issues.map((issue, index) => (
                                <Badge key={index} className="bg-orange-500">{issue}</Badge>
                              ))}
                            </div>
                            {formData.customIssue && (
                              <p className="text-sm text-gray-400 mt-2">{formData.customIssue}</p>
                            )}
                          </div>
                          
                          <div className="p-4 bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-white mb-2">Contact</h3>
                            <p className="text-gray-300">{formData.customerInfo.name}</p>
                            <p className="text-sm text-gray-400">{formData.customerInfo.email}</p>
                            <p className="text-sm text-gray-400">{formData.customerInfo.phone}</p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={submitRepair}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                          size="lg"
                        >
                          Submit Repair Request
                        </Button>
                      </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                      >
                        Previous
                      </Button>
                      <Button 
                        onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                        disabled={currentStep === steps.length - 1 || (currentStep === 0 && !formData.deviceType)}
                        className="bg-gradient-to-r from-orange-500 to-red-500"
                      >
                        Next
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {formData.deviceType && formData.issues.length > 0 && (
                  <CostEstimation 
                    deviceType={formData.deviceType}
                    issues={formData.issues}
                  />
                )}
                
                {/* Contact Card */}
                <Card className="bg-gray-900/50 border-orange-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-orange-400 mb-4">Need Help?</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">+383 44 123 456</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">support@petabytetech.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">Live Chat Available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Track Repair Tab */}
          <TabsContent value="track">
            <Card className="bg-gray-900/50 border-orange-500/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-orange-400 mb-6">Track Your Repair</h2>
                
                <div className="max-w-md">
                  <Label className="text-sm font-medium text-gray-300">Repair ID</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      placeholder="Enter your repair ID"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                      Track
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RepairTracking 
                repairId="RPR-2024-001"
                currentStatus="approved"
                estimatedCompletion="March 15, 2024"
              />
              
              <Card className="bg-gray-900/50 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-orange-400">Repair Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white">Device</h4>
                      <p className="text-gray-400">Sony DualSense PS5 Controller</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Issues</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge className="bg-orange-500">Stick drift</Badge>
                        <Badge className="bg-orange-500">Button issues</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Cost</h4>
                      <p className="text-green-400 font-semibold">€45.00</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Technician Notes</h4>
                      <p className="text-sm text-gray-400">
                        Left analog stick requires replacement. Triangle button mechanism needs cleaning.
                        Parts ordered and expected to arrive tomorrow.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}