'use client'

import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  SparklesIcon, 
  HeartIcon, 
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const simulateAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-mixed">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-primary-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">Palate</h1>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Your AI-Powered
            <span className="bg-gradient-to-r from-warm-400 to-vibrant-400 bg-clip-text text-transparent"> Menu Assistant</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload any restaurant menu and get personalized recommendations based on your preferences, 
            dietary restrictions, and past favorites. Never struggle with menu decisions again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={simulateAnalysis}
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Analyze a Menu
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
              See Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            How Palate Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Personal Preferences</h3>
              <p className="text-white/70">
                Tell us what you love, hate, and can't eat. Our AI learns your taste profile to make perfect recommendations.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-secondary-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Safety First</h3>
              <p className="text-white/70">
                Set your allergies and dietary restrictions once. We'll flag any potential issues and suggest safe alternatives.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Smart Analysis</h3>
              <p className="text-white/70">
                Upload or photo any menu. Our AI analyzes ingredients, flavors, and nutritional content instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Analysis Preview */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            See It In Action
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Menu Items */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Bella Vista Menu</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Grilled Salmon</h4>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-green-500 fill-current" />
                        <span className="text-sm text-green-600 font-medium">Perfect Match</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">With quinoa, roasted vegetables, and lemon herb sauce</p>
                    <p className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded inline-block">
                      ✓ Matches your love for seafood • ✓ Gluten-free friendly
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Chicken Parmesan</h4>
                      <span className="text-sm text-yellow-600 font-medium">⚠️ Contains Gluten</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Breaded chicken breast with marinara and mozzarella</p>
                    <p className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded inline-block">
                      Alternative: Try the Herb-Crusted Chicken instead
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Chocolate Lava Cake</h4>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600 font-medium">You'll Love This</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Warm chocolate cake with vanilla ice cream</p>
                    <p className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded inline-block">
                      Similar to desserts you've enjoyed at other restaurants
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Analysis Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Analysis Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700"><strong>3 perfect matches</strong> for your preferences</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700"><strong>2 items flagged</strong> for gluten content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700"><strong>4 alternatives</strong> suggested</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Quick Recommendation</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Start with the Grilled Salmon - it perfectly matches your seafood preference and dietary needs. 
                    For dessert, the Chocolate Lava Cake is similar to items you've rated highly before.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Never Struggle with Menus Again?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of food lovers who've discovered their perfect meals with Palate.
          </p>
          <button className="bg-white text-primary-600 px-12 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Analysis Loading Modal */}
      <Transition appear show={isAnalyzing}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl text-center">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <div className="animate-spin w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full"></div>
                  </div>
                  <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900 mb-2">
                    Analyzing Menu...
                  </Dialog.Title>
                  <p className="text-gray-600">
                    Our AI is reading the menu, checking your preferences, and preparing personalized recommendations.
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
