'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import * as THREE from 'three'
import { 
  Palette, 
  Sparkles, 
  Download, 
  Share2, 
  Save, 
  ShoppingCart,
  RotateCcw,
  Eye,
  Gamepad2,
  Zap,
  Star,
  Heart,
  Settings,
  Brush,
  Image as ImageIcon
} from 'lucide-react'

// PS5 Controller 3D Model Component
function PS5Controller({ config }) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main Controller Body */}
      <mesh position={[0, 0, 0]}>
        <roundedBoxGeometry args={[4, 2.5, 1, 0.2]} />
        <meshStandardMaterial 
          color={config.bodyColor || '#ffffff'}
          metalness={config.finish === 'metallic' ? 0.8 : 0.1}
          roughness={config.finish === 'matte' ? 0.9 : 0.2}
        />
      </mesh>
      
      {/* D-Pad */}
      <mesh position={[-1.2, 0.3, 0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color={config.dpadColor || '#333333'} />
      </mesh>
      
      {/* Action Buttons */}
      <mesh position={[1.2, 0.3, 0.6]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1]} />
        <meshStandardMaterial color={config.buttonsColor || '#333333'} />
      </mesh>
      
      {/* Analog Sticks */}
      <mesh position={[-0.6, -0.2, 0.6]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3]} />
        <meshStandardMaterial color={config.sticksColor || '#333333'} />
      </mesh>
      <mesh position={[0.6, -0.2, 0.6]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3]} />
        <meshStandardMaterial color={config.sticksColor || '#333333'} />
      </mesh>
      
      {/* Triggers */}
      <mesh position={[0, 1, 0.3]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2, 0.3, 0.8]} />
        <meshStandardMaterial color={config.triggersColor || '#e0e0e0'} />
      </mesh>
      
      {/* RGB Lighting */}
      {config.rgbLighting && (
        <>
          <mesh position={[0, 0, 0.6]}>
            <boxGeometry args={[3.5, 0.1, 0.1]} />
            <meshBasicMaterial 
              color={config.rgbColor || '#00f5ff'} 
              emissive={config.rgbColor || '#00f5ff'}
              emissiveIntensity={0.5}
            />
          </mesh>
          <pointLight 
            position={[0, 0, 1]} 
            color={config.rgbColor || '#00f5ff'} 
            intensity={0.5} 
          />
        </>
      )}
      
      {/* Custom Pattern Overlay */}
      {config.pattern && config.pattern !== 'solid' && (
        <mesh position={[0, 0, 0.51]}>
          <planeGeometry args={[3.8, 2.3]} />
          <meshBasicMaterial 
            color={config.patternColor || '#ff6b35'}
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  )
}

// Color Picker Component
function ColorPicker({ label, value, onChange, presets = [] }) {
  const [showPicker, setShowPicker] = useState(false)
  
  const defaultPresets = [
    '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff6b35', '#00f5ff',
    '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'
  ]
  
  const colors = presets.length > 0 ? presets : defaultPresets

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-300">{label}</Label>
      <div className="flex items-center space-x-3">
        <div 
          className="w-12 h-12 rounded-lg border-2 border-gray-600 cursor-pointer flex items-center justify-center"
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(!showPicker)}
        >
          <Palette className="w-5 h-5 text-white/70" />
        </div>
        <Input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-gray-800 border-gray-600 text-white"
        />
      </div>
      
      {showPicker && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-5 gap-2 p-3 bg-gray-800 rounded-lg border border-gray-600"
        >
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-md cursor-pointer border border-gray-600 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color)
                setShowPicker(false)
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Pattern Designer Component
function PatternDesigner({ pattern, onPatternChange }) {
  const patterns = [
    { id: 'solid', name: 'Solid Color', preview: 'bg-gray-700' },
    { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
    { id: 'stripes', name: 'Stripes', preview: 'bg-gradient-to-r from-cyan-500 via-transparent to-cyan-500' },
    { id: 'dots', name: 'Dots', preview: 'bg-gray-700' },
    { id: 'geometric', name: 'Geometric', preview: 'bg-gray-700' },
    { id: 'carbon', name: 'Carbon Fiber', preview: 'bg-gray-900' }
  ]

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-300">Pattern Style</Label>
      <div className="grid grid-cols-2 gap-3">
        {patterns.map((patternOption) => (
          <div
            key={patternOption.id}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
              pattern === patternOption.id 
                ? 'border-cyan-500 bg-cyan-500/10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => onPatternChange(patternOption.id)}
          >
            <div className={`w-full h-8 rounded ${patternOption.preview} mb-2`} />
            <p className="text-sm text-gray-300 text-center">{patternOption.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Feature Options Component
function FeatureOptions({ config, onConfigChange }) {
  const features = [
    {
      id: 'rgbLighting',
      name: 'RGB Lighting',
      description: 'Customizable LED lighting strip',
      price: 25,
      icon: Zap
    },
    {
      id: 'premiumGrips',
      name: 'Premium Grips',
      description: 'Anti-slip textured grips',
      price: 15,
      icon: Settings
    },
    {
      id: 'customButtons',
      name: 'Custom Buttons',
      description: 'Mechanical clicky buttons',
      price: 20,
      icon: Gamepad2
    },
    {
      id: 'wirelessCharging',
      name: 'Wireless Charging',
      description: 'Qi wireless charging base',
      price: 35,
      icon: Sparkles
    }
  ]

  return (
    <div className="space-y-4">
      {features.map((feature) => {
        const IconComponent = feature.icon
        return (
          <Card 
            key={feature.id}
            className={`cursor-pointer transition-all ${
              config[feature.id] 
                ? 'border-cyan-500 bg-cyan-500/10' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => onConfigChange(feature.id, !config[feature.id])}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{feature.name}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">+€{feature.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function PS5ConfiguratorAdvanced() {
  const [config, setConfig] = useState({
    bodyColor: '#ffffff',
    dpadColor: '#333333',
    buttonsColor: '#333333',
    sticksColor: '#333333',
    triggersColor: '#e0e0e0',
    pattern: 'solid',
    patternColor: '#ff6b35',
    finish: 'matte',
    rgbLighting: false,
    rgbColor: '#00f5ff',
    premiumGrips: false,
    customButtons: false,
    wirelessCharging: false
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [totalPrice, setTotalPrice] = useState(149)
  const [savedConfigs, setSavedConfigs] = useState([])

  const steps = ['Colors', 'Pattern', 'Features', 'Review']

  useEffect(() => {
    // Calculate total price
    let price = 149 // Base price
    if (config.rgbLighting) price += 25
    if (config.premiumGrips) price += 15
    if (config.customButtons) price += 20
    if (config.wirelessCharging) price += 35
    if (config.pattern !== 'solid') price += 10
    if (config.finish === 'metallic') price += 15
    
    setTotalPrice(price)
  }, [config])

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const saveConfiguration = () => {
    const newConfig = {
      id: Date.now(),
      name: `Custom PS5 Controller - ${new Date().toLocaleDateString()}`,
      config,
      totalPrice,
      createdAt: new Date().toISOString()
    }
    setSavedConfigs(prev => [...prev, newConfig])
  }

  const addToCart = () => {
    console.log('Adding PS5 controller to cart:', config)
  }

  const resetConfig = () => {
    setConfig({
      bodyColor: '#ffffff',
      dpadColor: '#333333',
      buttonsColor: '#333333',
      sticksColor: '#333333',
      triggersColor: '#e0e0e0',
      pattern: 'solid',
      patternColor: '#ff6b35',
      finish: 'matte',
      rgbLighting: false,
      rgbColor: '#00f5ff',
      premiumGrips: false,
      customButtons: false,
      wirelessCharging: false
    })
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PS5 Controller Configurator
          </h1>
          <p className="text-xl text-gray-400">
            Design your personalized PlayStation 5 DualSense controller
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer transition-all ${
                    index <= currentStep 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {index + 1}
                </div>
                <span className={`ml-2 mr-4 text-sm ${
                  index <= currentStep ? 'text-purple-400' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-purple-500' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 3D Preview */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  3D Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-gray-800/50 rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.4} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    
                    <PS5Controller config={config} />
                    
                    <OrbitControls 
                      enableZoom={true} 
                      enablePan={false} 
                      autoRotate={true}
                      autoRotateSpeed={2}
                    />
                    <Environment preset="studio" />
                    <ContactShadows 
                      rotation-x={Math.PI / 2} 
                      position={[0, -2, 0]} 
                      opacity={0.25} 
                      width={10} 
                      height={10} 
                      blur={1.5} 
                      far={1.5} 
                    />
                  </Canvas>
                </div>
                
                <div className="flex justify-center space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={resetConfig}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Price Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Base Controller</span>
                    <span>€149</span>
                  </div>
                  {config.rgbLighting && (
                    <div className="flex justify-between text-gray-300">
                      <span>RGB Lighting</span>
                      <span>€25</span>
                    </div>
                  )}
                  {config.premiumGrips && (
                    <div className="flex justify-between text-gray-300">
                      <span>Premium Grips</span>
                      <span>€15</span>
                    </div>
                  )}
                  {config.customButtons && (
                    <div className="flex justify-between text-gray-300">
                      <span>Custom Buttons</span>
                      <span>€20</span>
                    </div>
                  )}
                  {config.wirelessCharging && (
                    <div className="flex justify-between text-gray-300">
                      <span>Wireless Charging</span>
                      <span>€35</span>
                    </div>
                  )}
                  {config.pattern !== 'solid' && (
                    <div className="flex justify-between text-gray-300">
                      <span>Custom Pattern</span>
                      <span>€10</span>
                    </div>
                  )}
                  {config.finish === 'metallic' && (
                    <div className="flex justify-between text-gray-300">
                      <span>Metallic Finish</span>
                      <span>€15</span>
                    </div>
                  )}
                  <Separator className="bg-gray-600" />
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-purple-400">€{totalPrice}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button onClick={saveConfiguration} variant="outline" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={addToCart} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardContent className="p-6">
                
                {/* Colors Step */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold text-purple-400 mb-6">Customize Colors</h2>
                    
                    <ColorPicker
                      label="Main Body Color"
                      value={config.bodyColor}
                      onChange={(color) => updateConfig('bodyColor', color)}
                    />
                    
                    <ColorPicker
                      label="D-Pad & Buttons"
                      value={config.buttonsColor}
                      onChange={(color) => {
                        updateConfig('buttonsColor', color)
                        updateConfig('dpadColor', color)
                      }}
                    />
                    
                    <ColorPicker
                      label="Analog Sticks"
                      value={config.sticksColor}
                      onChange={(color) => updateConfig('sticksColor', color)}
                    />
                    
                    <ColorPicker
                      label="Triggers"
                      value={config.triggersColor}
                      onChange={(color) => updateConfig('triggersColor', color)}
                    />
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-300">Finish Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={config.finish === 'matte' ? 'default' : 'outline'}
                          onClick={() => updateConfig('finish', 'matte')}
                          className={config.finish === 'matte' ? 'bg-purple-500' : ''}
                        >
                          Matte
                        </Button>
                        <Button
                          variant={config.finish === 'metallic' ? 'default' : 'outline'}
                          onClick={() => updateConfig('finish', 'metallic')}
                          className={config.finish === 'metallic' ? 'bg-purple-500' : ''}
                        >
                          Metallic (+€15)
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Pattern Step */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold text-purple-400 mb-6">Pattern Design</h2>
                    
                    <PatternDesigner 
                      pattern={config.pattern}
                      onPatternChange={(pattern) => updateConfig('pattern', pattern)}
                    />
                    
                    {config.pattern !== 'solid' && (
                      <ColorPicker
                        label="Pattern Color"
                        value={config.patternColor}
                        onChange={(color) => updateConfig('patternColor', color)}
                      />
                    )}
                  </motion.div>
                )}

                {/* Features Step */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold text-purple-400 mb-6">Premium Features</h2>
                    
                    <FeatureOptions config={config} onConfigChange={updateConfig} />
                    
                    {config.rgbLighting && (
                      <ColorPicker
                        label="RGB Light Color"
                        value={config.rgbColor}
                        onChange={(color) => updateConfig('rgbColor', color)}
                        presets={['#00f5ff', '#ff6b35', '#00ff88', '#ff0080', '#8b5cf6']}
                      />
                    )}
                  </motion.div>
                )}

                {/* Review Step */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold text-purple-400 mb-6">Configuration Review</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <h3 className="font-semibold text-white mb-2">Colors</h3>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: config.bodyColor }} />
                          <div className="w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: config.buttonsColor }} />
                          <div className="w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: config.sticksColor }} />
                          <div className="w-6 h-6 rounded border border-gray-600" style={{ backgroundColor: config.triggersColor }} />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <h3 className="font-semibold text-white mb-2">Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {config.rgbLighting && <Badge className="bg-purple-500">RGB Lighting</Badge>}
                          {config.premiumGrips && <Badge className="bg-purple-500">Premium Grips</Badge>}
                          {config.customButtons && <Badge className="bg-purple-500">Custom Buttons</Badge>}
                          {config.wirelessCharging && <Badge className="bg-purple-500">Wireless Charging</Badge>}
                          <Badge className="bg-purple-500">{config.finish} Finish</Badge>
                          <Badge className="bg-purple-500">{config.pattern} Pattern</Badge>
                        </div>
                      </div>
                    </div>
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
                    disabled={currentStep === steps.length - 1}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}