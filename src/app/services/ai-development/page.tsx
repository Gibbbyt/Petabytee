'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain,
  Code2,
  Smartphone,
  Globe,
  Zap,
  Bot,
  Database,
  Shield,
  CheckCircle,
  Star,
  Users,
  Rocket
} from 'lucide-react';

export default function AIDevelopmentPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    projectType: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    features: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const services = [
    {
      icon: Globe,
      title: language === 'sq' ? 'Zhvillim Web me AI' : 'AI Web Development',
      description: language === 'sq' 
        ? 'Faqe web inteligjente me chatbots, rekomandime të personalizuara dhe automatizim'
        : 'Intelligent websites with chatbots, personalized recommendations and automation'
    },
    {
      icon: Smartphone,
      title: language === 'sq' ? 'Aplikacione Mobile AI' : 'AI Mobile Apps',
      description: language === 'sq' 
        ? 'Aplikacione mobile me njohjen e zërit, vizionin kompjuterik dhe ML'
        : 'Mobile apps with voice recognition, computer vision and ML'
    },
    {
      icon: Bot,
      title: language === 'sq' ? 'Chatbots të Avancuar' : 'Advanced Chatbots',
      description: language === 'sq' 
        ? 'Asistentë virtualë që kuptojnë kontekstin dhe japin përgjigje të zgjuara'
        : 'Virtual assistants that understand context and provide smart responses'
    },
    {
      icon: Database,
      title: language === 'sq' ? 'Analitikë Prediktive' : 'Predictive Analytics',
      description: language === 'sq' 
        ? 'Sisteme që analizojnë të dhënat dhe parashikojnë trendet e ardhshme'
        : 'Systems that analyze data and predict future trends'
    },
    {
      icon: Brain,
      title: language === 'sq' ? 'Machine Learning' : 'Machine Learning',
      description: language === 'sq' 
        ? 'Modele të personalizuara ML për automatizimin e proceseve të biznesit'
        : 'Custom ML models for business process automation'
    },
    {
      icon: Zap,
      title: language === 'sq' ? 'Automatizim Procesesh' : 'Process Automation',
      description: language === 'sq' 
        ? 'Automatizimi i detyrave të përsëritura me AI dhe RPA'
        : 'Automation of repetitive tasks with AI and RPA'
    }
  ];

  const features = [
    {
      icon: Code2,
      title: language === 'sq' ? 'Kod i Optimizuar' : 'Optimized Code',
      description: language === 'sq' 
        ? 'AI na ndihmon të shkruajmë kod më të pastër dhe më efikas'
        : 'AI helps us write cleaner and more efficient code'
    },
    {
      icon: Shield,
      title: language === 'sq' ? 'Siguri e Lartë' : 'High Security',
      description: language === 'sq' 
        ? 'Sisteme AI të sigurta me enkriptim dhe mbrojtje avancuar'
        : 'Secure AI systems with encryption and advanced protection'
    },
    {
      icon: Users,
      title: language === 'sq' ? 'Mbështetje 24/7' : '24/7 Support',
      description: language === 'sq' 
        ? 'Mbështetje e vazhdueshme për sistemet tuaja AI'
        : 'Continuous support for your AI systems'
    }
  ];

  const projectTypes = [
    { value: 'web-app', label: language === 'sq' ? 'Aplikacion Web' : 'Web Application' },
    { value: 'mobile-app', label: language === 'sq' ? 'Aplikacion Mobile' : 'Mobile Application' },
    { value: 'chatbot', label: language === 'sq' ? 'Chatbot' : 'Chatbot' },
    { value: 'analytics', label: language === 'sq' ? 'Sistem Analitike' : 'Analytics System' },
    { value: 'automation', label: language === 'sq' ? 'Automatizim' : 'Automation' },
    { value: 'custom', label: language === 'sq' ? 'Projekt i Personalizuar' : 'Custom Project' }
  ];

  const aiFeatures = [
    { id: 'nlp', name: language === 'sq' ? 'Procesimi i Gjuhës Natyrore' : 'Natural Language Processing' },
    { id: 'computer-vision', name: language === 'sq' ? 'Vizion Kompjuterik' : 'Computer Vision' },
    { id: 'machine-learning', name: language === 'sq' ? 'Machine Learning' : 'Machine Learning' },
    { id: 'voice-recognition', name: language === 'sq' ? 'Njohja e Zërit' : 'Voice Recognition' },
    { id: 'predictive-analytics', name: language === 'sq' ? 'Analitikë Prediktive' : 'Predictive Analytics' },
    { id: 'recommendation-engine', name: language === 'sq' ? 'Motor Rekomandimesh' : 'Recommendation Engine' }
  ];

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/services/ai-development', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(language === 'sq' 
          ? 'Kërkesa juaj për zhvillim AI u dërgua me sukses! Do t\'ju kontaktojmë brenda 24 orëve.'
          : 'Your AI development request was sent successfully! We will contact you within 24 hours.'
        );
        
        // Reset form
        setFormData({
          projectType: '',
          name: '',
          email: '',
          phone: '',
          company: '',
          projectDescription: '',
          budget: '',
          timeline: '',
          features: []
        });
      } else {
        throw new Error(result.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'sq' 
        ? 'Gabim në dërgimin e kërkesës. Ju lutem provoni përsëri.'
        : 'Error submitting request. Please try again.'
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
            {language === 'sq' ? 'Zhvillim Web & Mobile me AI' : 'AI Enhanced Web & Mobile Development'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'sq' 
              ? 'Maksimizojmë performancën e zhvillimit me fuqinë e AI duke krijuar faqe interneti dhe sisteme të nivelit të lartë me inteligjencë artificiale të integruar.'
              : 'Maximize development performance with AI power by creating top-level websites and systems with integrated artificial intelligence.'
            }
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {language === 'sq' ? 'Shërbimet Tona AI' : 'Our AI Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-brand-purple" />
                      </div>
                      <h3 className="font-semibold text-gray-800">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Project Request Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-brand-purple">
                {language === 'sq' ? 'Kërko Projekt AI' : 'Request AI Project'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      {language === 'sq' ? 'Zgjidh llojin e projektit' : 'Select project type'}
                    </option>
                    {projectTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

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
                    <Label htmlFor="company">
                      {language === 'sq' ? 'Kompania (opsional)' : 'Company (optional)'}
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>
                    {language === 'sq' ? 'Funksionalitetet AI të Dëshiruara' : 'Desired AI Features'}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {aiFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={feature.id}
                          checked={formData.features.includes(feature.id)}
                          onChange={() => handleFeatureToggle(feature.id)}
                          className="rounded border-gray-300 text-brand-purple focus:ring-brand-purple"
                        />
                        <label htmlFor={feature.id} className="text-sm text-gray-700">
                          {feature.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectDescription">
                    {language === 'sq' ? 'Përshkrimi i Projektit' : 'Project Description'}
                  </Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                    placeholder={language === 'sq' 
                      ? 'Përshkruani detajisht projektin tuaj, objektivat dhe nevojat specifike...'
                      : 'Describe your project in detail, objectives and specific needs...'
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">
                      {language === 'sq' ? 'Buxheti (EUR)' : 'Budget (EUR)'}
                    </Label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      required
                    >
                      <option value="">
                        {language === 'sq' ? 'Zgjidh buxhetin' : 'Select budget'}
                      </option>
                      <option value="5000-10000">€5,000 - €10,000</option>
                      <option value="10000-25000">€10,000 - €25,000</option>
                      <option value="25000-50000">€25,000 - €50,000</option>
                      <option value="50000+">€50,000+</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="timeline">
                      {language === 'sq' ? 'Koha e Zhvillimit' : 'Development Timeline'}
                    </Label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                      required
                    >
                      <option value="">
                        {language === 'sq' ? 'Zgjidh kohën' : 'Select timeline'}
                      </option>
                      <option value="1-3-months">
                        {language === 'sq' ? '1-3 muaj' : '1-3 months'}
                      </option>
                      <option value="3-6-months">
                        {language === 'sq' ? '3-6 muaj' : '3-6 months'}
                      </option>
                      <option value="6-12-months">
                        {language === 'sq' ? '6-12 muaj' : '6-12 months'}
                      </option>
                      <option value="flexible">
                        {language === 'sq' ? 'Fleksibël' : 'Flexible'}
                      </option>
                    </select>
                  </div>
                </div>

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
                      <Rocket className="w-4 h-4 mr-2" />
                      {language === 'sq' ? 'Fillo Projektin AI' : 'Start AI Project'}
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