'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Printer,
  Box,
  Palette,
  Cog,
  Zap,
  CheckCircle,
  Upload,
  Calculator,
  Clock,
  Star
} from 'lucide-react';

export default function Printing3DPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    material: '',
    quantity: 1,
    description: '',
    budget: '',
    urgency: 'normal',
    files: [] as File[]
  });
  const [loading, setLoading] = useState(false);

  const services = [
    {
      icon: Box,
      title: language === 'sq' ? 'Prototipizim' : 'Prototyping',
      description: language === 'sq' 
        ? 'Krijimi i prototipeve për produkte të reja dhe testim'
        : 'Creating prototypes for new products and testing'
    },
    {
      icon: Palette,
      title: language === 'sq' ? 'Arte & Dekor' : 'Art & Decoration',
      description: language === 'sq' 
        ? 'Objekte artistike, skulptura dhe elemente dekorative'
        : 'Artistic objects, sculptures and decorative elements'
    },
    {
      icon: Cog,
      title: language === 'sq' ? 'Pjesë Teknike' : 'Technical Parts',
      description: language === 'sq' 
        ? 'Pjesë zëvendëse, komponente mekanike dhe mjete'
        : 'Replacement parts, mechanical components and tools'
    },
    {
      icon: Zap,
      title: language === 'sq' ? 'Reparim të Shpejtë' : 'Quick Repairs',
      description: language === 'sq' 
        ? 'Printim i shpejtë për pjesë që u duhen urgjentisht'
        : 'Quick printing for urgently needed parts'
    }
  ];

  const materials = [
    { value: 'pla', label: 'PLA', price: 0.05 },
    { value: 'abs', label: 'ABS', price: 0.07 },
    { value: 'petg', label: 'PETG', price: 0.08 },
    { value: 'tpu', label: 'TPU (Flexible)', price: 0.12 },
    { value: 'wood', label: 'Wood Filled', price: 0.10 },
    { value: 'metal', label: 'Metal Filled', price: 0.15 }
  ];

  const capabilities = [
    {
      icon: CheckCircle,
      title: language === 'sq' ? 'Cilësi e Lartë' : 'High Quality',
      description: language === 'sq' 
        ? 'Printer profesional me rezolucion të lartë'
        : 'Professional printers with high resolution'
    },
    {
      icon: Star,
      title: language === 'sq' ? 'Varieteti i Materialeve' : 'Material Variety',
      description: language === 'sq' 
        ? 'Mbi 10 lloje materialesh për nevoja të ndryshme'
        : 'Over 10 material types for different needs'
    },
    {
      icon: Clock,
      title: language === 'sq' ? 'Shërbim i Shpejtë' : 'Fast Service',
      description: language === 'sq' 
        ? 'Printim i shpejtë dhe dorëzim në kohë'
        : 'Fast printing and on-time delivery'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, files }));
  };

  const calculatePrice = () => {
    const selectedMaterial = materials.find(m => m.value === formData.material);
    if (!selectedMaterial) return 0;
    
    // Basic calculation - in real app would be more complex
    const basePrice = selectedMaterial.price * 100; // Assuming 100g average
    const quantityMultiplier = formData.quantity;
    const urgencyMultiplier = formData.urgency === 'urgent' ? 1.5 : 1;
    
    return (basePrice * quantityMultiplier * urgencyMultiplier).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('3D Printing Request:', formData);
      
      alert(language === 'sq' 
        ? 'Kërkesa juaj për printim 3D u dërgua me sukses! Do t\'ju kontaktojmë për detaje.'
        : 'Your 3D printing request was sent successfully! We will contact you for details.'
      );
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        material: '',
        quantity: 1,
        description: '',
        budget: '',
        urgency: 'normal',
        files: []
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'sq' 
        ? 'Gabim në dërgimin e kërkesës'
        : 'Error submitting request'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-midnight mb-4">
            {language === 'sq' ? 'Studio Printimi 3D' : '3D Printing Studio'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Studio profesionale e printimit 3D me teknologji të avancuar për krijimin e objekteve të personalizuara, prototipeve dhe pjesëve teknike.'
              : 'Professional 3D printing studio with advanced technology for creating custom objects, prototypes and technical parts.'
            }
          </p>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{capability.title}</h3>
                  <p className="text-sm text-gray-600">{capability.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Shërbimet Tona' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-brand-purple" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Materials & Pricing */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Materialet & Çmimet' : 'Materials & Pricing'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card key={material.value} className="text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">{material.label}</h3>
                  <div className="text-2xl font-bold text-brand-purple mb-2">
                    €{material.price}/g
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'sq' ? 'Çmim për gram' : 'Price per gram'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-brand-purple">
                {language === 'sq' ? 'Porosit Printim 3D' : 'Order 3D Printing'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">
                      {language === 'sq' ? 'Emri i Plotë' : 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      {language === 'sq' ? 'Email' : 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      {language === 'sq' ? 'Telefoni' : 'Phone'}
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectType">
                      {language === 'sq' ? 'Lloji i Projektit' : 'Project Type'}
                    </Label>
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      required
                    >
                      <option value="">
                        {language === 'sq' ? 'Zgjidh llojin' : 'Select type'}
                      </option>
                      <option value="prototype">
                        {language === 'sq' ? 'Prototip' : 'Prototype'}
                      </option>
                      <option value="art">
                        {language === 'sq' ? 'Arte/Dekor' : 'Art/Decoration'}
                      </option>
                      <option value="technical">
                        {language === 'sq' ? 'Pjesë Teknike' : 'Technical Part'}
                      </option>
                      <option value="repair">
                        {language === 'sq' ? 'Reparim' : 'Repair'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="material">
                      {language === 'sq' ? 'Materiali' : 'Material'}
                    </Label>
                    <select
                      id="material"
                      value={formData.material}
                      onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      required
                    >
                      <option value="">
                        {language === 'sq' ? 'Zgjidh materialin' : 'Select material'}
                      </option>
                      {materials.map(material => (
                        <option key={material.value} value={material.value}>
                          {material.label} (€{material.price}/g)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">
                      {language === 'sq' ? 'Sasia' : 'Quantity'}
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="files">
                    {language === 'sq' ? 'Ngarkoni Skedarët 3D' : 'Upload 3D Files'}
                  </Label>
                  <div className="mt-1 flex items-center space-x-4">
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept=".stl,.obj,.3mf,.ply"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    <div className="text-sm text-gray-500">
                      STL, OBJ, 3MF, PLY
                    </div>
                  </div>
                  {formData.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {formData.files.length} {language === 'sq' ? 'skedarë të zgjedhur' : 'files selected'}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="urgency">
                    {language === 'sq' ? 'Urgjenca' : 'Urgency'}
                  </Label>
                  <select
                    id="urgency"
                    value={formData.urgency}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                  >
                    <option value="normal">
                      {language === 'sq' ? 'Normal (3-5 ditë)' : 'Normal (3-5 days)'}
                    </option>
                    <option value="urgent">
                      {language === 'sq' ? 'Urgjent (1-2 ditë) +50%' : 'Urgent (1-2 days) +50%'}
                    </option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">
                    {language === 'sq' ? 'Përshkrimi i Projektit' : 'Project Description'}
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={language === 'sq' 
                      ? 'Përshkruani detajisht projektin tuaj, dimensionet, ngjyrat, etj...'
                      : 'Describe your project in detail, dimensions, colors, etc...'
                    }
                    rows={4}
                    required
                  />
                </div>

                {formData.material && (
                  <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calculator className="w-5 h-5 text-brand-purple mr-2" />
                        <span className="font-medium text-brand-purple">
                          {language === 'sq' ? 'Çmimi i Vlerësuar' : 'Estimated Price'}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-brand-purple">
                        €{calculatePrice()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {language === 'sq' 
                        ? '* Çmimi përfundimtar mund të ndryshojë bazuar në kompleksitetin'
                        : '* Final price may vary based on complexity'
                      }
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-brand-gradient hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="loading-spinner mr-2" />
                      {language === 'sq' ? 'Duke dërguar...' : 'Submitting...'}
                    </div>
                  ) : (
                    <>
                      <Printer className="w-4 h-4 mr-2" />
                      {language === 'sq' ? 'Dërgo Porosinë' : 'Submit Order'}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}