'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Users,
  Building,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Star,
  Headphones,
  Wrench,
  ShoppingCart,
  Code,
  Gamepad2,
  ArrowRight,
  Calendar,
  Zap
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
}

interface TeamMember {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  image: string;
  specialties: string[];
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      value: '+383 44 123 456',
      available: '24/7',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email anytime',
      value: 'support@gametech.ks',
      available: 'Response within 2 hours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Available on website',
      available: 'Mon-Fri 8AM-10PM',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come to our office',
      value: 'Prishtina, Kosovo',
      available: 'Mon-Fri 9AM-6PM',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const services = [
    'PC Configuration',
    'PS5 Customization',
    'Gaming Center Setup',
    'AI Development',
    '3D Printing',
    'PC Optimization',
    'Repair Services',
    'General Inquiry',
    'Partnership',
    'Other'
  ];

  const businessHours = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM', available: true },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM', available: true },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM', available: true },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM', available: true },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM', available: true },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM', available: true },
    { day: 'Sunday', hours: 'Closed', available: false }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Ardit Krasniqi',
      position: 'Technical Director',
      department: 'Engineering',
      email: 'ardit@gametech.ks',
      phone: '+383 44 111 222',
      image: '/team/ardit.jpg',
      specialties: ['PC Building', 'Hardware', 'System Optimization']
    },
    {
      name: 'Bleona Hoti',
      position: 'Customer Success Manager',
      department: 'Support',
      email: 'bleona@gametech.ks',
      phone: '+383 44 333 444',
      image: '/team/bleona.jpg',
      specialties: ['Customer Support', 'Order Management', 'Troubleshooting']
    },
    {
      name: 'Driton Berisha',
      position: 'AI Development Lead',
      department: 'Software',
      email: 'driton@gametech.ks',
      phone: '+383 44 555 666',
      image: '/team/driton.jpg',
      specialties: ['AI Development', 'Machine Learning', 'Software Solutions']
    },
    {
      name: 'Valdete Mustafa',
      position: 'Sales Manager',
      department: 'Sales',
      email: 'valdete@gametech.ks',
      phone: '+383 44 777 888',
      image: '/team/valdete.jpg',
      specialties: ['Sales', 'Business Development', 'Client Relations']
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/gametechks', name: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/gametechks', name: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/gametechks', name: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/gametechks', name: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com/company/gametechks', name: 'LinkedIn' }
  ];

  const getCurrentDayHours = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return businessHours.find(day => day.day === today);
  };

  const currentDay = getCurrentDayHours();

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Phone className="w-12 h-12 text-blue-400" />
                <h1 className="text-5xl md:text-7xl font-bold">Contact Us</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Get in touch with our expert team. We're here to help you with all your gaming and technology needs.
              </p>
              
              {currentDay && (
                <div className="flex items-center justify-center gap-2 mb-8">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">
                    Today: {currentDay.hours}
                    {currentDay.available && (
                      <Badge className="ml-2 bg-green-500 text-white">Open</Badge>
                    )}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={method.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className={`w-8 h-8 ${method.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                        <p className="font-medium text-gray-900 mb-2">{method.value}</p>
                        <Badge variant="outline" className="text-xs">
                          {method.available}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Send className="w-6 h-6 text-blue-600" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+383 44 123 456"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Interest
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief subject of your message"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your needs, questions, or how we can help you..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                      
                      {submitStatus === 'success' && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                          <CheckCircle className="w-5 h-5" />
                          <span>Message sent successfully! We'll get back to you soon.</span>
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                          <AlertCircle className="w-5 h-5" />
                          <span>Failed to send message. Please try again or contact us directly.</span>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Business Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {businessHours.map((day) => (
                        <div key={day.day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className={`font-medium ${day.day === currentDay?.day ? 'text-blue-600' : 'text-gray-700'}`}>
                            {day.day}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={day.available ? 'text-gray-900' : 'text-gray-500'}>
                              {day.hours}
                            </span>
                            {day.day === currentDay?.day && day.available && (
                              <Badge className="bg-green-500 text-white text-xs">Open Now</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">Emergency Support</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        For urgent technical issues, call +383 44 999 000 (24/7)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Our Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">GameTech Solutions</p>
                        <p className="text-gray-600">Rr. UÇK, Nr. 123</p>
                        <p className="text-gray-600">10000 Prishtina, Kosovo</p>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <MapPin className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Interactive Map</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Follow Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors group"
                          >
                            <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                          </a>
                        );
                      })}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Stay updated with our latest news, products, and tutorials.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get to know the experts behind our services. Each team member brings unique expertise to help you succeed.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-10 h-10 text-gray-400" />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {member.department}
                      </Badge>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Questions?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Before reaching out, check if your question is answered in our frequently asked questions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Support</h3>
                    <p className="text-sm text-gray-600">General support and troubleshooting questions</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <ShoppingCart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Orders</h3>
                    <p className="text-sm text-gray-600">Order status, shipping, and delivery questions</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Wrench className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Services</h3>
                    <p className="text-sm text-gray-600">Information about our services and pricing</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button variant="outline" size="lg">
                View Full FAQ
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}