'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Calendar,
  User,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  BookOpen,
  Tag,
  TrendingUp,
  Clock,
  ArrowRight,
  Filter,
  Grid,
  List,
  Star,
  Play,
  FileText,
  Image as ImageIcon,
  Video,
  Gamepad2,
  Monitor,
  Code2,
  Wrench,
  Zap
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  titleAl: string;
  excerpt: string;
  excerptAl: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  featured: boolean;
  type: 'article' | 'tutorial' | 'review' | 'news' | 'video';
  image: string;
  videoUrl?: string;
}

interface BlogCategory {
  id: string;
  name: string;
  nameAl: string;
  description: string;
  descriptionAl: string;
  count: number;
  color: string;
  icon: any;
}

export default function BlogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Ultimate Guide to Building Your Dream Gaming PC',
      titleAl: 'Udhëzuesi i Plotë për Ndërtimin e PC-së Gaming të Ëndrrave',
      excerpt: 'Learn how to build the perfect gaming PC with the latest components and optimization techniques.',
      excerptAl: 'Mëso si të ndërtosh PC-në perfekte gaming me komponentët më të fundit dhe teknikat e optimizimit.',
      content: 'Full article content here...',
      author: {
        name: 'Ardit Krasniqi',
        avatar: '/avatars/ardit.jpg',
        role: 'Hardware Expert'
      },
      publishedAt: '2024-03-10',
      readTime: 12,
      views: 2847,
      likes: 156,
      comments: 23,
      category: 'Hardware',
      tags: ['PC Building', 'Gaming', 'RTX 4070', 'Components'],
      featured: true,
      type: 'tutorial',
      image: '/blog/gaming-pc-build.jpg'
    },
    {
      id: '2',
      title: 'RTX 4070 Super vs RTX 4060 Ti: Performance Comparison',
      titleAl: 'RTX 4070 Super vs RTX 4060 Ti: Krahasim Performancë',
      excerpt: 'Detailed comparison of NVIDIA\'s latest graphics cards for gaming performance.',
      excerptAl: 'Krahasim i detajuar i kartave grafike më të fundit të NVIDIA për performancën e gaming.',
      content: 'Full article content here...',
      author: {
        name: 'Bleona Hoti',
        avatar: '/avatars/bleona.jpg',
        role: 'Tech Reviewer'
      },
      publishedAt: '2024-03-08',
      readTime: 8,
      views: 1923,
      likes: 89,
      comments: 15,
      category: 'Reviews',
      tags: ['GPU', 'RTX', 'Performance', 'Gaming'],
      featured: true,
      type: 'review',
      image: '/blog/gpu-comparison.jpg'
    },
    {
      id: '3',
      title: 'Top 10 Gaming Trends for 2024',
      titleAl: 'Top 10 Trendet Gaming për 2024',
      excerpt: 'Explore the biggest gaming trends that will shape the industry this year.',
      excerptAl: 'Eksploro trendet më të mëdha gaming që do të formojnë industrinë këtë vit.',
      content: 'Full article content here...',
      author: {
        name: 'Driton Berisha',
        avatar: '/avatars/driton.jpg',
        role: 'Gaming Analyst'
      },
      publishedAt: '2024-03-05',
      readTime: 6,
      views: 3421,
      likes: 234,
      comments: 67,
      category: 'Gaming',
      tags: ['Gaming Trends', '2024', 'Industry', 'Future'],
      featured: false,
      type: 'article',
      image: '/blog/gaming-trends.jpg'
    },
    {
      id: '4',
      title: 'How to Optimize Your PC for Maximum Gaming Performance',
      titleAl: 'Si të Optimizosh PC-në për Performancë Maksimale Gaming',
      excerpt: 'Step-by-step guide to optimize your computer for the best gaming experience.',
      excerptAl: 'Udhëzues hap pas hapi për të optimizuar kompjuterin për përvojën më të mirë gaming.',
      content: 'Full article content here...',
      author: {
        name: 'Valdete Mustafa',
        avatar: '/avatars/valdete.jpg',
        role: 'Performance Specialist'
      },
      publishedAt: '2024-03-03',
      readTime: 10,
      views: 1654,
      likes: 98,
      comments: 34,
      category: 'Tutorials',
      tags: ['Optimization', 'Performance', 'Gaming', 'Tips'],
      featured: false,
      type: 'tutorial',
      image: '/blog/pc-optimization.jpg'
    },
    {
      id: '5',
      title: 'AI in Gaming: The Future is Here',
      titleAl: 'AI në Gaming: E Ardhmja është Këtu',
      excerpt: 'Discover how artificial intelligence is revolutionizing the gaming industry.',
      excerptAl: 'Zbulo si inteligjenca artificiale po revolucionarizon industrinë e gaming.',
      content: 'Full article content here...',
      author: {
        name: 'Ardit Krasniqi',
        avatar: '/avatars/ardit.jpg',
        role: 'AI Researcher'
      },
      publishedAt: '2024-03-01',
      readTime: 15,
      views: 2198,
      likes: 167,
      comments: 42,
      category: 'AI & Tech',
      tags: ['AI', 'Gaming', 'Technology', 'Future'],
      featured: true,
      type: 'article',
      image: '/blog/ai-gaming.jpg'
    },
    {
      id: '6',
      title: 'Video: Building a Custom Gaming Setup',
      titleAl: 'Video: Ndërtimi i Gaming Setup-it të Personalizuar',
      excerpt: 'Watch our complete guide to creating the ultimate gaming setup from scratch.',
      excerptAl: 'Shiko udhëzuesin tonë të plotë për krijimin e gaming setup-it ultimativ nga fillimi.',
      content: 'Video content here...',
      author: {
        name: 'Driton Berisha',
        avatar: '/avatars/driton.jpg',
        role: 'Content Creator'
      },
      publishedAt: '2024-02-28',
      readTime: 25,
      views: 4521,
      likes: 312,
      comments: 89,
      category: 'Gaming',
      tags: ['Gaming Setup', 'Video', 'Tutorial', 'Custom'],
      featured: false,
      type: 'video',
      image: '/blog/gaming-setup-video.jpg',
      videoUrl: 'https://youtube.com/watch?v=example'
    }
  ];

  const categories: BlogCategory[] = [
    {
      id: 'all',
      name: 'All Posts',
      nameAl: 'Të Gjitha Postimet',
      description: 'All blog posts',
      descriptionAl: 'Të gjitha postimet e blogut',
      count: blogPosts.length,
      color: 'text-gray-600',
      icon: BookOpen
    },
    {
      id: 'Hardware',
      name: 'Hardware',
      nameAl: 'Hardware',
      description: 'PC components and builds',
      descriptionAl: 'Komponentë PC dhe ndërtime',
      count: blogPosts.filter(p => p.category === 'Hardware').length,
      color: 'text-blue-600',
      icon: Monitor
    },
    {
      id: 'Gaming',
      name: 'Gaming',
      nameAl: 'Gaming',
      description: 'Gaming news and trends',
      descriptionAl: 'Lajme dhe trende gaming',
      count: blogPosts.filter(p => p.category === 'Gaming').length,
      color: 'text-purple-600',
      icon: Gamepad2
    },
    {
      id: 'Reviews',
      name: 'Reviews',
      nameAl: 'Recensione',
      description: 'Product reviews and comparisons',
      descriptionAl: 'Recensione produktesh dhe krahasime',
      count: blogPosts.filter(p => p.category === 'Reviews').length,
      color: 'text-green-600',
      icon: Star
    },
    {
      id: 'Tutorials',
      name: 'Tutorials',
      nameAl: 'Mësime',
      description: 'How-to guides and tutorials',
      descriptionAl: 'Udhëzues dhe mësime',
      count: blogPosts.filter(p => p.category === 'Tutorials').length,
      color: 'text-orange-600',
      icon: Wrench
    },
    {
      id: 'AI & Tech',
      name: 'AI & Tech',
      nameAl: 'AI & Teknologji',
      description: 'AI and technology news',
      descriptionAl: 'Lajme AI dhe teknologjie',
      count: blogPosts.filter(p => p.category === 'AI & Tech').length,
      color: 'text-indigo-600',
      icon: Code2
    }
  ];

  const postTypes = [
    { id: 'all', name: 'All Types', icon: BookOpen },
    { id: 'article', name: 'Articles', icon: FileText },
    { id: 'tutorial', name: 'Tutorials', icon: Wrench },
    { id: 'review', name: 'Reviews', icon: Star },
    { id: 'news', name: 'News', icon: TrendingUp },
    { id: 'video', name: 'Videos', icon: Video }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesType = selectedType === 'all' || post.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tutorial': return Wrench;
      case 'review': return Star;
      case 'video': return Video;
      case 'news': return TrendingUp;
      default: return FileText;
    }
  };

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <BookOpen className="w-12 h-12 text-indigo-400" />
                <h1 className="text-5xl md:text-7xl font-bold">GameTech Blog</h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Stay updated with the latest gaming technology news, tutorials, reviews, and insights from our expert team.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles, tutorials, reviews..."
                    className="pl-12 pr-4 py-3 text-lg bg-white/10 backdrop-blur border-white/20 text-white placeholder-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Posts</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't miss our most popular and trending articles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => {
                const TypeIcon = getTypeIcon(post.type);
                return (
                  <motion.div
                    key={post.id}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                      {/* Post Image */}
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-500" />
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-2">
                          <Badge className="bg-yellow-500 text-yellow-900">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <TypeIcon className="w-3 h-3" />
                            {post.type}
                          </Badge>
                        </div>

                        {/* Video Play Button */}
                        {post.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        )}

                        {/* Reading Time */}
                        <div className="absolute bottom-3 right-3">
                          <Badge variant="outline" className="bg-white/90 text-gray-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime} min
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        {/* Category & Date */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Title & Excerpt */}
                        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Author & Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{post.author.name}</p>
                              <p className="text-xs text-gray-500">{post.author.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes}
                            </span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Read More Button */}
                        <Link href={`/blog/${post.id}`}>
                          <Button className="w-full mt-4">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filters & All Posts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="lg:w-80 space-y-6">
                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={category.id}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-blue-50 text-blue-600 border border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${category.color}`} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Post Types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Content Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {postTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div
                          key={type.id}
                          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                            selectedType === type.id
                              ? 'bg-blue-50 text-blue-600'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedType(type.id)}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{type.name}</span>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                    <p className="text-sm text-blue-100 mb-4">
                      Get the latest posts delivered to your inbox
                    </p>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Your email"
                        className="bg-white/20 border-white/30 text-white placeholder-white/70"
                      />
                      <Button variant="secondary" className="w-full">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Popular Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Gaming', 'PC Building', 'RTX', 'Performance', 'Reviews', 'AI', 'Hardware', 'Optimization'].map((tag) => (
                        <Badge key={tag} variant="outline" className="hover:bg-blue-50 cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Controls */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">
                      {filteredPosts.length} posts found
                    </span>
                    {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                          setSelectedType('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>

                  {/* View Toggle */}
                  <div className="flex rounded-lg border">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Posts Grid/List */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="loading-pulse mx-auto mb-4" />
                    <p className="text-gray-600">Loading posts...</p>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredPosts.map((post, index) => {
                      const TypeIcon = getTypeIcon(post.type);
                      return (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={viewMode === 'list' ? 'w-full' : ''}
                        >
                          <Card className={`h-full hover:shadow-lg transition-shadow group ${
                            viewMode === 'list' ? 'flex flex-row' : ''
                          }`}>
                            {/* Post Image */}
                            <div className={`relative ${
                              viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'
                            } bg-gray-200 overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-gray-500" />
                              </div>
                              
                              {/* Type Badge */}
                              <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <TypeIcon className="w-3 h-3" />
                                  {post.type}
                                </Badge>
                              </div>

                              {/* Reading Time */}
                              <div className="absolute top-2 right-2">
                                <Badge variant="outline" className="bg-white/90">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {post.readTime}m
                                </Badge>
                              </div>

                              {post.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white ml-1" />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Post Content */}
                            <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                              <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                                <Badge variant="outline">{post.category}</Badge>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(post.publishedAt).toLocaleDateString()}
                                </span>
                              </div>

                              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {post.title}
                              </h3>
                              
                              {viewMode === 'grid' && (
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                  {post.excerpt}
                                </p>
                              )}

                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{post.author.name}</span>
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {post.views}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" />
                                    {post.comments}
                                  </span>
                                </div>
                              </div>

                              <Link href={`/blog/${post.id}`}>
                                <Button size="sm" className="w-full mt-3">
                                  Read More
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* No Results */}
                {!loading && filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedType('all');
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {!loading && filteredPosts.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button size="sm">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}