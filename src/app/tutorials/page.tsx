'use client'

import React, { useState, useEffect } from 'react'

// Tutorial Categories and Data
const tutorialCategories = [
  {
    id: 'pc-building',
    name: 'PC Building',
    description: 'Learn to build gaming PCs from scratch',
    icon: '🖥️',
    color: 'cyan'
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    description: 'Fix common PC and gaming issues',
    icon: '🔧',
    color: 'orange'
  },
  {
    id: 'gaming-optimization',
    name: 'Gaming Optimization',
    description: 'Optimize your system for best performance',
    icon: '🎮',
    color: 'purple'
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Keep your PC running smoothly',
    icon: '🧹',
    color: 'green'
  },
  {
    id: 'overclocking',
    name: 'Overclocking',
    description: 'Safely overclock your hardware',
    icon: '⚡',
    color: 'red'
  },
  {
    id: 'controller-mods',
    name: 'Controller Mods',
    description: 'Customize and modify controllers',
    icon: '🎯',
    color: 'blue'
  }
]

const tutorials = [
  {
    id: 1,
    title: 'Ultimate Gaming PC Build Guide - RTX 4090 & Ryzen 9',
    category: 'pc-building',
    difficulty: 'Advanced',
    duration: '45 min',
    views: 15420,
    rating: 4.9,
    thumbnail: '/tutorials/pc-build-ultimate.jpg',
    videoUrl: '/videos/pc-build-ultimate.mp4',
    description: 'Complete step-by-step guide to building a high-end gaming PC with RTX 4090 and Ryzen 9 processor.',
    author: 'Petabyte Tech Team',
    publishedDate: '2024-01-10',
    tags: ['Gaming PC', 'RTX 4090', 'Ryzen 9', 'High-End Build'],
    steps: [
      'Prepare workspace and tools',
      'Install CPU and RAM on motherboard',
      'Mount motherboard in case',
      'Install graphics card',
      'Connect power supply',
      'Install storage drives',
      'Cable management',
      'First boot and BIOS setup',
      'Install operating system',
      'Install drivers and software'
    ],
    components: [
      'AMD Ryzen 9 7950X',
      'NVIDIA RTX 4090',
      'ASUS ROG X670E Motherboard',
      '32GB DDR5 RAM',
      '2TB NVMe SSD'
    ]
  },
  {
    id: 2,
    title: 'PS5 Controller Stick Drift Fix - Complete Repair Guide',
    category: 'troubleshooting',
    difficulty: 'Intermediate',
    duration: '25 min',
    views: 23750,
    rating: 4.7,
    thumbnail: '/tutorials/ps5-controller-repair.jpg',
    videoUrl: '/videos/ps5-controller-repair.mp4',
    description: 'Learn how to fix PS5 controller stick drift issues with professional repair techniques.',
    author: 'Repair Specialist',
    publishedDate: '2024-01-08',
    tags: ['PS5', 'Controller', 'Repair', 'Stick Drift'],
    steps: [
      'Diagnose the stick drift issue',
      'Gather necessary tools',
      'Safely disassemble controller',
      'Clean analog stick mechanism',
      'Replace potentiometer if needed',
      'Reassemble controller',
      'Test functionality',
      'Calibrate sticks'
    ],
    tools: [
      'Phillips head screwdriver',
      'Plastic prying tools',
      'Isopropyl alcohol',
      'Cotton swabs',
      'Replacement potentiometers'
    ]
  },
  {
    id: 3,
    title: 'GPU Overclocking Safe Guide - Maximize Gaming Performance',
    category: 'overclocking',
    difficulty: 'Advanced',
    duration: '35 min',
    views: 12850,
    rating: 4.8,
    thumbnail: '/tutorials/gpu-overclocking.jpg',
    videoUrl: '/videos/gpu-overclocking.mp4',
    description: 'Safely overclock your graphics card for maximum gaming performance without damaging hardware.',
    author: 'Performance Expert',
    publishedDate: '2024-01-05',
    tags: ['GPU', 'Overclocking', 'Performance', 'Gaming'],
    steps: [
      'Understanding GPU overclocking basics',
      'Install monitoring software',
      'Baseline performance testing',
      'Gradual memory clock increases',
      'Core clock optimization',
      'Temperature monitoring',
      'Stability testing',
      'Fine-tuning for optimal performance'
    ],
    software: [
      'MSI Afterburner',
      'GPU-Z',
      'FurMark',
      'Unigine Heaven',
      'HWiNFO64'
    ]
  },
  {
    id: 4,
    title: 'Budget Gaming PC Build - Best Value for Money',
    category: 'pc-building',
    difficulty: 'Beginner',
    duration: '30 min',
    views: 31240,
    rating: 4.6,
    thumbnail: '/tutorials/budget-pc-build.jpg',
    videoUrl: '/videos/budget-pc-build.mp4',
    description: 'Build a capable gaming PC on a budget without compromising on performance.',
    author: 'Budget Builder',
    publishedDate: '2024-01-12',
    tags: ['Budget Build', 'Gaming PC', 'Value', 'Beginner'],
    steps: [
      'Selecting budget components',
      'Preparing for assembly',
      'Installing motherboard',
      'Adding CPU and cooler',
      'Installing memory',
      'Graphics card installation',
      'Storage and power connections',
      'First boot and setup'
    ],
    budget: '€899',
    performance: '1080p High Settings'
  },
  {
    id: 5,
    title: 'PC Maintenance Complete Guide - Keep Your System Fast',
    category: 'maintenance',
    difficulty: 'Beginner',
    duration: '20 min',
    views: 18690,
    rating: 4.5,
    thumbnail: '/tutorials/pc-maintenance.jpg',
    videoUrl: '/videos/pc-maintenance.mp4',
    description: 'Essential maintenance tasks to keep your gaming PC running at peak performance.',
    author: 'Maintenance Pro',
    publishedDate: '2024-01-15',
    tags: ['Maintenance', 'Cleaning', 'Performance', 'Longevity'],
    steps: [
      'Regular cleaning schedule',
      'Dust removal techniques',
      'Thermal paste replacement',
      'Fan maintenance',
      'Cable management check',
      'Software optimization',
      'Driver updates',
      'Performance monitoring'
    ],
    frequency: 'Monthly',
    tools: ['Compressed air', 'Cleaning cloths', 'Thermal paste']
  }
]

const difficultyColors = {
  'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
}

const categoryColors = {
  'cyan': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'orange': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'purple': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'green': 'bg-green-500/20 text-green-400 border-green-500/30',
  'red': 'bg-red-500/20 text-red-400 border-red-500/30',
  'blue': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
}

// Tutorial Card Component
function TutorialCard({ tutorial, onClick }) {
  const category = tutorialCategories.find(cat => cat.id === tutorial.category)
  
  return (
    <div 
      className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(tutorial)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800 overflow-hidden">
        <img 
          src={tutorial.thumbnail} 
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-tutorial.jpg'
          }}
        />
        
        {/* Duration Overlay */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
          {tutorial.duration}
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-cyan-500/80 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-6 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`px-2 py-1 rounded text-xs border ${categoryColors[category?.color]}`}>
            {category?.icon} {category?.name}
          </span>
          <span className={`px-2 py-1 rounded text-xs border ${difficultyColors[tutorial.difficulty]}`}>
            {tutorial.difficulty}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {tutorial.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {tutorial.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>👁️ {tutorial.views.toLocaleString()}</span>
            <span>⭐ {tutorial.rating}</span>
          </div>
          <span>{tutorial.publishedDate}</span>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
          <span className="text-sm text-gray-400">By {tutorial.author}</span>
          <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-sm hover:bg-cyan-500/30 transition-colors">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  )
}

// Tutorial Detail Modal Component
function TutorialDetailModal({ tutorial, isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  if (!isOpen || !tutorial) return null

  const category = tutorialCategories.find(cat => cat.id === tutorial.category)

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">{tutorial.title}</h2>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`px-2 py-1 rounded text-xs border ${categoryColors[category?.color]}`}>
                {category?.icon} {category?.name}
              </span>
              <span className={`px-2 py-1 rounded text-xs border ${difficultyColors[tutorial.difficulty]}`}>
                {tutorial.difficulty}
              </span>
              <span className="text-gray-400">⏱️ {tutorial.duration}</span>
              <span className="text-gray-400">⭐ {tutorial.rating}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
              <video 
                className="w-full h-full object-cover"
                controls={isPlaying}
                poster={tutorial.thumbnail}
                onPlay={() => setIsPlaying(true)}
              >
                <source src={tutorial.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-cyan-500/80 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                  >
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-2"></div>
                  </button>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">About This Tutorial</h3>
              <p className="text-gray-300 mb-4">{tutorial.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Author:</span>
                  <span className="text-white ml-2">{tutorial.author}</span>
                </div>
                <div>
                  <span className="text-gray-400">Published:</span>
                  <span className="text-white ml-2">{tutorial.publishedDate}</span>
                </div>
                <div>
                  <span className="text-gray-400">Views:</span>
                  <span className="text-white ml-2">{tutorial.views.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400">Rating:</span>
                  <span className="text-white ml-2">⭐ {tutorial.rating}/5</span>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tutorial.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Steps */}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Tutorial Steps</h3>
              <div className="space-y-2">
                {tutorial.steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      currentStep === index 
                        ? 'bg-cyan-500/20 border border-cyan-500/30' 
                        : 'bg-gray-700/50 hover:bg-gray-700'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        currentStep === index ? 'bg-cyan-500 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </span>
                      <span className={`text-sm ${
                        currentStep === index ? 'text-cyan-400' : 'text-gray-300'
                      }`}>
                        {step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Components/Tools */}
            {tutorial.components && (
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Components Used</h3>
                <div className="space-y-2">
                  {tutorial.components.map((component, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      <span className="text-gray-300">{component}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tutorial.tools && (
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Tools Required</h3>
                <div className="space-y-2">
                  {tutorial.tools.map((tool, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span className="text-gray-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tutorial.software && (
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Software Needed</h3>
                <div className="space-y-2">
                  {tutorial.software.map((software, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span className="text-gray-300">{software}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {tutorial.budget && (
              <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Build Budget</h3>
                <p className="text-green-300 text-2xl font-bold">{tutorial.budget}</p>
                {tutorial.performance && (
                  <p className="text-sm text-green-400 mt-1">{tutorial.performance}</p>
                )}
              </div>
            )}

            {tutorial.frequency && (
              <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Recommended Frequency</h3>
                <p className="text-blue-300 text-lg font-semibold">{tutorial.frequency}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-500/30 transition-colors">
                Add to Playlist
              </button>
              <button className="w-full px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors">
                Download PDF Guide
              </button>
              <button className="w-full px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded hover:bg-purple-500/30 transition-colors">
                Share Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Category Filter Component
function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onCategoryChange('')}
        className={`px-4 py-2 rounded-lg border transition-colors ${
          selectedCategory === '' 
            ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' 
            : 'bg-gray-800 text-gray-400 border-gray-600 hover:border-gray-500'
        }`}
      >
        All Categories
      </button>
      
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            selectedCategory === category.id 
              ? `${categoryColors[category.color]} border-opacity-50` 
              : 'bg-gray-800 text-gray-400 border-gray-600 hover:border-gray-500'
          }`}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  )
}

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTutorial, setSelectedTutorial] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  // Filter and sort tutorials
  const filteredTutorials = tutorials
    .filter(tutorial => {
      if (selectedCategory && tutorial.category !== selectedCategory) return false
      if (selectedDifficulty && tutorial.difficulty !== selectedDifficulty) return false
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        return (
          tutorial.title.toLowerCase().includes(searchLower) ||
          tutorial.description.toLowerCase().includes(searchLower) ||
          tutorial.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        case 'popular':
          return b.views - a.views
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const handleTutorialClick = (tutorial) => {
    setSelectedTutorial(tutorial)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gaming Tech Tutorials
          </h1>
          <p className="text-xl text-gray-400">
            Learn from experts with step-by-step video guides
          </p>
        </div>

        {/* Featured Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-white">{tutorials.length}</h3>
            <p className="text-gray-400">Total Tutorials</p>
          </div>
          <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-white">{tutorialCategories.length}</h3>
            <p className="text-gray-400">Categories</p>
          </div>
          <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-white">{tutorials.reduce((sum, t) => sum + t.views, 0).toLocaleString()}</h3>
            <p className="text-gray-400">Total Views</p>
          </div>
          <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-white">
              {(tutorials.reduce((sum, t) => sum + t.rating, 0) / tutorials.length).toFixed(1)}⭐
            </h3>
            <p className="text-gray-400">Avg Rating</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
              />
            </div>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Shortest First</option>
            </select>
          </div>

          <CategoryFilter 
            categories={tutorialCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Showing {filteredTutorials.length} of {tutorials.length} tutorials
          </p>
          {(selectedCategory || selectedDifficulty || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('')
                setSelectedDifficulty('')
                setSearchQuery('')
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map(tutorial => (
            <TutorialCard 
              key={tutorial.id} 
              tutorial={tutorial} 
              onClick={handleTutorialClick}
            />
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎥</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tutorials found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSelectedCategory('')
                setSelectedDifficulty('')
                setSearchQuery('')
              }}
              className="px-6 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded hover:bg-purple-500/30 transition-colors"
            >
              Show All Tutorials
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Tutorial?</h2>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Request a custom tutorial and we'll create it for you!
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
            Request Tutorial
          </button>
        </div>
      </div>

      {/* Tutorial Detail Modal */}
      <TutorialDetailModal 
        tutorial={selectedTutorial}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}