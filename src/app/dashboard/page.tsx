'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  CameraIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  ClockIcon,
  StarIcon,
  DocumentTextIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  Bars3Icon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import PalateLogo from '@/components/PalateLogo'
import ThemeInitializer from '@/components/ThemeInitializer'

export default function Dashboard() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showMenu, setShowMenu] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mock data for now
  const recentAnalyses = [
    {
      id: 1,
      restaurant: 'Bella Vista',
      date: '2024-01-15',
      matches: 8,
      warnings: 2,
      status: 'completed'
    },
    {
      id: 2,
      restaurant: 'The Rustic Table',
      date: '2024-01-12',
      matches: 5,
      warnings: 1,
      status: 'completed'
    },
    {
      id: 3,
      restaurant: 'Ocean Breeze',
      date: '2024-01-10',
      matches: 12,
      warnings: 0,
      status: 'completed'
    }
  ]

  const stats = {
    totalAnalyses: 24,
    favoriteRestaurants: 8,
    savedDishes: 47,
    topDish: 'Grilled Salmon'
  }

  return (
    <>
      <ThemeInitializer />
      <div 
        className="min-h-screen text-white" 
        style={{ 
          background: `
            linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
            radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
            linear-gradient(135deg, #3A3D4A 0%, #2A2E3B 25%, #343847 50%, #2D3240 75%, #262B38 100%)
          `,
          backgroundSize: '80px 80px, 80px 80px, 20px 20px, 100% 100%',
          backgroundPosition: `
            ${scrollY * 0.1}px ${scrollY * 0.05}px,
            ${-scrollY * 0.1}px ${scrollY * 0.1}px,
            ${scrollY * 0.2}px ${scrollY * 0.15}px,
            0 0
          `
        }}
      >
      {/* Mobile Header */}
      <nav className="bg-dark-100/60 backdrop-blur-xl border-b border-white/10 px-4 py-2 sticky top-0 z-10" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-dark-200 lg:hidden transition-colors"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <PalateLogo className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              <h1 className="text-lg lg:text-2xl text-white" style={{ fontWeight: 900 }}>Palate</h1>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push('/profile')}
              className="p-2 text-white hover:text-primary-400 rounded-lg hover:bg-dark-200 transition-colors"
            >
              <UserIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-20 lg:hidden transition-all duration-300 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" onClick={() => setShowMenu(false)}></div>
        <div 
          className={`bg-dark-100/60 backdrop-blur-md w-64 h-full p-6 border-r border-white/10 transition-all duration-300 ease-out transform ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }} 
          onClick={e => e.stopPropagation()}
        >
            <nav className="space-y-2">
              <button
                onClick={() => {setSelectedTab('overview'); setShowMenu(false)}}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors font-medium`}
                style={selectedTab === 'overview' ? {
                  background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
                  color: '#0A0B0D'
                } : {
                  color: '#6B7280'
                }}
                onMouseEnter={(e) => {
                  if (selectedTab !== 'overview') {
                    e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.5)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTab !== 'overview') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6B7280'
                  }
                }}
              >
                <ChartBarIcon className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => {setSelectedTab('analyses'); setShowMenu(false)}}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors font-medium`}
                style={selectedTab === 'analyses' ? {
                  background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
                  color: '#0A0B0D'
                } : {
                  color: '#6B7280'
                }}
                onMouseEnter={(e) => {
                  if (selectedTab !== 'analyses') {
                    e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.5)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTab !== 'analyses') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6B7280'
                  }
                }}
              >
                <DocumentTextIcon className="w-5 h-5" />
                Menu Analyses
              </button>
              <button
                onClick={() => {setSelectedTab('preferences'); setShowMenu(false)}}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors font-medium`}
                style={selectedTab === 'preferences' ? {
                  background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
                  color: '#0A0B0D'
                } : {
                  color: '#6B7280'
                }}
                onMouseEnter={(e) => {
                  if (selectedTab !== 'preferences') {
                    e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.5)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTab !== 'preferences') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6B7280'
                  }
                }}
              >
                <HeartIcon className="w-5 h-5" />
                Preferences
              </button>
            </nav>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="w-64 bg-dark-100/70 backdrop-blur-md border-r border-white/10 sticky overflow-y-auto" style={{ top: '3.5rem', height: 'calc(100vh - 3.5rem)', boxShadow: '0 0 40px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.05)' }}>
          <div className="p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                  selectedTab === 'overview' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:bg-dark-200 hover:text-white'
                }`}
                style={selectedTab === 'overview' ? {
                  background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                } : {}}
                data-gradient-bg={selectedTab === 'overview' ? "true" : undefined}
              >
                <ChartBarIcon className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('analyses')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                  selectedTab === 'analyses' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:bg-dark-200 hover:text-white'
                }`}
                style={selectedTab === 'analyses' ? {
                  background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                } : {}}
                data-gradient-bg={selectedTab === 'analyses' ? "true" : undefined}
              >
                <DocumentTextIcon className="w-5 h-5" />
                Menu Analyses
              </button>
              <button
                onClick={() => setSelectedTab('preferences')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                  selectedTab === 'preferences' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:bg-dark-200 hover:text-white'
                }`}
                style={selectedTab === 'preferences' ? {
                  background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                } : {}}
                data-gradient-bg={selectedTab === 'preferences' ? "true" : undefined}
              >
                <HeartIcon className="w-5 h-5" />
                Preferences
              </button>
            </nav>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="flex-1">
          <div className="p-8">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Mobile-First Quick Actions */}
              <div className="text-center pt-12">
                <h2 className="text-4xl lg:text-5xl text-white mb-6" style={{ fontWeight: 900 }}>Ready to order?</h2>
                <p className="text-gray-400 text-base lg:text-lg mb-10">Get instant menu recommendations</p>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    className="p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                    suppressHydrationWarning={true}
                    style={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)',
                      color: '#F3F4F6'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #4B5563 0%, #374151 100%)'
                      e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.25)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
                      e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <CameraIcon className="w-6 h-6" />
                    Menu Camera
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className="p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                      data-gradient-bg="true"
                      suppressHydrationWarning={true}
                      style={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
                        color: '#0A0B0D'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #22FFD3 0%, #00FFB8 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <MagnifyingGlassIcon className="w-6 h-6" />
                      Search for Restaurant
                    </button>
                    <button 
                      className="p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                      data-gradient-bg="true"
                      suppressHydrationWarning={true}
                      style={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
                        color: '#0A0B0D'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #22FFD3 0%, #00FFB8 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <LinkIcon className="w-6 h-6" />
                      Paste Menu Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Chatbot Component */}
              <div className="py-8">
                <div className="bg-dark-100/60 backdrop-blur-md rounded-3xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Ask Palate AI</h3>
                    <p className="text-gray-400 text-sm">Get instant answers about menus, dietary restrictions, and recommendations</p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask me anything about food, menus, or restaurants..."
                      className="w-full p-4 pr-12 bg-dark-200/50 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400/50 focus:bg-dark-200/70 transition-all duration-300 text-ellipsis overflow-hidden"
                      suppressHydrationWarning={true}
                      style={{
                        fontSize: '16px',
                        minHeight: '56px'
                      }}
                    />
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 hover:scale-105"
                      data-gradient-bg="true"
                      style={{
                        background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Grid - Mobile Optimized */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.totalAnalyses}</p>
                    <p className="text-xs text-gray-400">Analyses</p>
                  </div>
                </div>

                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <HeartIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.favoriteRestaurants}</p>
                    <p className="text-xs text-gray-400">Favorites</p>
                  </div>
                </div>

                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <StarIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.savedDishes}</p>
                    <p className="text-xs text-gray-400">Saved</p>
                  </div>
                </div>

                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <SparklesIcon className="w-5 h-5 text-orange-400" />
                    </div>
                    <p className="text-lg font-bold text-white truncate">{stats.topDish}</p>
                    <p className="text-xs text-gray-400">Top Dish</p>
                  </div>
                </div>
              </div>

              {/* Recent Analyses - Mobile Optimized */}
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10 mt-12" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Recent Analyses</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {recentAnalyses.map((analysis) => (
                      <div key={analysis.id} className="p-4 border border-dark-300 bg-dark-100 rounded-xl hover:border-primary-400 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white text-lg">{analysis.restaurant}</h4>
                          <button 
                            onClick={() => router.push(`/restaurant/${analysis.id}`)}
                            className="text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-105"
                            data-gradient-bg="true"
                            suppressHydrationWarning={true}
                            style={{
                              background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
                              color: '#0A0B0D'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #22FFD3 0%, #00FFB8 100%)'
                              e.currentTarget.style.boxShadow = 'inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.15)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)'
                              e.currentTarget.style.boxShadow = 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            View
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {new Date(analysis.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-green-400" />
                            {analysis.matches}
                          </span>
                          {analysis.warnings > 0 && (
                            <span className="flex items-center gap-1">
                              <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400" />
                              {analysis.warnings}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'analyses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Menu Analyses</h2>
                <button className="bg-gradient-neon hover:bg-primary-600 text-dark-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
                  <CameraIcon className="w-5 h-5" />
                  New Analysis
                </button>
              </div>
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">All Your Menu Analyses</h3>
                <p className="text-gray-400 mb-6">Detailed view of all your restaurant menu analyses and recommendations.</p>
                <button className="bg-gradient-neon hover:bg-primary-600 text-dark-500 px-6 py-3 rounded-xl font-semibold">
                  Coming Soon
                </button>
              </div>
            </div>
          )}

          {selectedTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Food Preferences</h2>
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Manage Your Preferences</h3>
                <p className="text-gray-400 mb-6">Set your dietary restrictions, allergies, and food preferences to get better recommendations.</p>
                <button className="bg-gradient-neon hover:bg-primary-600 text-dark-500 px-6 py-3 rounded-xl font-semibold">
                  Coming Soon
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        <div className="p-4">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Mobile-First Quick Actions */}
              <div className="text-center pt-12">
                <h2 className="text-4xl text-white mb-6" style={{ fontWeight: 900 }}>Ready to order?</h2>
                <p className="text-gray-400 text-base mb-10">Get instant menu recommendations</p>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    className="p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                    style={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)',
                      color: '#F3F4F6'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #4B5563 0%, #374151 100%)'
                      e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.25)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
                      e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <CameraIcon className="w-6 h-6" />
                    Menu Camera
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className="p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                      data-gradient-bg="true"
                      suppressHydrationWarning={true}
                      style={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
                        color: '#0A0B0D'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #22FFD3 0%, #00FFB8 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <MagnifyingGlassIcon className="w-6 h-6" />
                      Search for Restaurant
                    </button>
                    <button 
                      className="p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                      data-gradient-bg="true"
                      suppressHydrationWarning={true}
                      style={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
                        color: '#0A0B0D'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #22FFD3 0%, #00FFB8 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <LinkIcon className="w-6 h-6" />
                      Paste Menu Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Chatbot Component */}
              <div className="py-8">
                <div className="bg-dark-100/60 backdrop-blur-md rounded-3xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Ask Palate AI</h3>
                    <p className="text-gray-400 text-sm">Get instant answers about menus, dietary restrictions, and recommendations</p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask me anything about food, menus, or restaurants..."
                      className="w-full p-4 pr-12 bg-dark-200/50 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400/50 focus:bg-dark-200/70 transition-all duration-300 text-ellipsis overflow-hidden"
                      suppressHydrationWarning={true}
                      style={{
                        fontSize: '16px',
                        minHeight: '56px'
                      }}
                    />
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 hover:scale-105"
                      data-gradient-bg="true"
                      suppressHydrationWarning={true}
                      style={{
                        background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Grid - Mobile Optimized */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.totalAnalyses}</p>
                    <p className="text-xs text-gray-400">Analyses</p>
                  </div>
                </div>

                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <HeartIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.favoriteRestaurants}</p>
                    <p className="text-xs text-gray-400">Favorites</p>
                  </div>
                </div>

                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <StarIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.savedDishes}</p>
                    <p className="text-xs text-gray-400">Saved</p>
                  </div>
                </div>

                <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <SparklesIcon className="w-5 h-5 text-orange-400" />
                    </div>
                    <p className="text-lg font-bold text-white truncate">{stats.topDish}</p>
                    <p className="text-xs text-gray-400">Top Dish</p>
                  </div>
                </div>
              </div>

              {/* Recent Analyses - Mobile Optimized */}
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10 mt-12" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Recent Analyses</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {recentAnalyses.map((analysis) => (
                      <div key={analysis.id} className="p-4 border border-dark-300 bg-dark-100 rounded-xl hover:border-primary-400 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white text-lg">{analysis.restaurant}</h4>
                          <button 
                            onClick={() => router.push(`/restaurant/${analysis.id}`)}
                            className="text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-105"
                            data-gradient-bg="true"
                            suppressHydrationWarning={true}
                            style={{
                              background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
                              color: '#0A0B0D'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #22FFD3 0%, #00FFB8 100%)'
                              e.currentTarget.style.boxShadow = 'inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.15)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)'
                              e.currentTarget.style.boxShadow = 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            View
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {new Date(analysis.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-green-400" />
                            {analysis.matches}
                          </span>
                          {analysis.warnings > 0 && (
                            <span className="flex items-center gap-1">
                              <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400" />
                              {analysis.warnings}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'analyses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Menu Analyses</h2>
                <button className="bg-gradient-neon hover:bg-primary-600 text-dark-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
                  <CameraIcon className="w-5 h-5" />
                  New Analysis
                </button>
              </div>
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">All Your Menu Analyses</h3>
                <p className="text-gray-400 mb-6">Detailed view of all your restaurant menu analyses and recommendations.</p>
                <button className="bg-gradient-neon hover:bg-primary-600 text-dark-500 px-6 py-3 rounded-xl font-semibold">
                  Coming Soon
                </button>
              </div>
            </div>
          )}

          {selectedTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Food Preferences</h2>
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
                <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Manage Your Preferences</h3>
                <p className="text-gray-400 mb-6">Set your dietary restrictions, allergies, and food preferences to get better recommendations.</p>
                <button className="bg-gradient-neon hover:bg-primary-600 text-dark-500 px-6 py-3 rounded-xl font-semibold">
                  Coming Soon
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}