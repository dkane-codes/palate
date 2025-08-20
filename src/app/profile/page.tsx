'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeftIcon,
  UserIcon,
  Cog6ToothIcon,
  BellIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import PalateLogo from '@/components/PalateLogo'
import ThemeInitializer from '@/components/ThemeInitializer'

export default function Profile() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [userInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  const stats = {
    totalAnalyses: 24,
    favoriteRestaurants: 8,
    savedDishes: 47,
    averageRating: 4.2
  }

  const dietaryPreferences = [
    { name: 'Vegetarian', enabled: false },
    { name: 'Vegan', enabled: false },
    { name: 'Gluten-Free', enabled: true },
    { name: 'Dairy-Free', enabled: false },
    { name: 'Nut-Free', enabled: true },
    { name: 'Low-Sodium', enabled: false }
  ]

  const allergies = ['Shellfish', 'Peanuts']

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
          backgroundPosition: isClient ? `
            ${scrollY * 0.1}px ${scrollY * 0.05}px,
            ${-scrollY * 0.1}px ${scrollY * 0.1}px,
            ${scrollY * 0.2}px ${scrollY * 0.15}px,
            0 0
          ` : '0 0, 0 0, 0 0, 0 0'
      }}
    >
      {/* Header */}
      <div className="bg-dark-100/60 backdrop-blur-xl border-b border-white/10 px-4 py-2 sticky top-0 z-10" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-dark-200 transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <PalateLogo className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              <h1 className="text-lg lg:text-2xl text-white" style={{ fontWeight: 900 }}>Palate</h1>
            </button>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-white hover:text-primary-400 rounded-lg hover:bg-dark-200 transition-colors"
          >
            <PencilIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <div className="bg-dark-100/70 backdrop-blur-md rounded-3xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.03)' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-neon rounded-full flex items-center justify-center" data-gradient-bg="true">
              <UserIcon className="w-10 h-10 text-dark-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{userInfo.name}</h2>
              <p className="text-primary-400 font-medium">Palate Member since 2024</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <EnvelopeIcon className="w-4 h-4 text-blue-400" />
              </div>
              <span>{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <PhoneIcon className="w-4 h-4 text-green-400" />
              </div>
              <span>{userInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <MapPinIcon className="w-4 h-4 text-orange-400" />
              </div>
              <span>{userInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.totalAnalyses}</p>
              <p className="text-xs text-gray-400">Total Analyses</p>
            </div>
          </div>
          <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.favoriteRestaurants}</p>
              <p className="text-xs text-gray-400">Favorites</p>
            </div>
          </div>
          <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.savedDishes}</p>
              <p className="text-xs text-gray-400">Saved Dishes</p>
            </div>
          </div>
          <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)' }}>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.averageRating.toFixed(1)}</p>
              <p className="text-xs text-gray-400">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Dietary Preferences</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {dietaryPreferences.map((pref) => (
                <div key={pref.name} className={`p-3 rounded-xl border transition-colors ${
                  pref.enabled 
                    ? 'border-primary-400 bg-primary-400/10' 
                    : 'border-gray-600 bg-dark-200/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">{pref.name}</span>
                    <div className={`w-4 h-4 rounded border ${
                      pref.enabled 
                        ? 'bg-primary-400 border-primary-400' 
                        : 'border-gray-500'
                    }`}>
                      {pref.enabled && <div className="w-full h-full flex items-center justify-center text-dark-500 text-xs">✓</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
              Allergies & Restrictions
            </h3>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy) => (
                <div key={allergy} className="px-3 py-2 bg-red-500/20 border border-red-400/30 rounded-lg">
                  <span className="text-sm text-red-200">{allergy}</span>
                </div>
              ))}
              <button className="px-3 py-2 border border-dashed border-gray-500 rounded-lg text-gray-400 hover:border-primary-400 hover:text-primary-400 transition-colors">
                <span className="text-sm">+ Add Allergy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Settings</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-200/50 transition-colors">
              <div className="flex items-center gap-3">
                <BellIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Push Notifications</span>
              </div>
              <div className="w-12 h-6 bg-primary-400 rounded-full flex items-center px-1" data-gradient-bg="true">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-200/50 transition-colors">
              <div className="flex items-center gap-3">
                <HeartIcon className="w-5 h-5 text-pink-400" />
                <span className="text-white">Save Favorites</span>
              </div>
              <div className="w-12 h-6 bg-primary-400 rounded-full flex items-center px-1" data-gradient-bg="true">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-200/50 transition-colors">
              <div className="flex items-center gap-3">
                <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
                <span className="text-white">Advanced Settings</span>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}