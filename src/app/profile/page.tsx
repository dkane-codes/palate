'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeftIcon,
  UserIcon,
  BellIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
  SunIcon,
  MoonIcon,
  SwatchIcon,
  Bars3Icon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import PalateLogo from '@/components/PalateLogo'
import ThemeInitializer from '@/components/ThemeInitializer'

export default function Profile() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedAccentColor, setSelectedAccentColor] = useState('Teal')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedTab, setSelectedTab] = useState('preferences')

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showColorPicker && !target.closest('.profile-color-picker')) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])
  const [userInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  })

  const colorOptions = [
    { name: 'Teal', primary: '#00FFB8', gradient: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)' },
    { name: 'Blue', primary: '#45B7D1', gradient: 'linear-gradient(135deg, #45B7D1 0%, #38BDF8 100%)' },
    { name: 'Warm', primary: '#FFE66D', gradient: 'linear-gradient(135deg, #FFE66D 0%, #FCD34D 100%)' },
    { name: 'Cool', primary: '#A8E6CF', gradient: 'linear-gradient(135deg, #A8E6CF 0%, #86EFAC 100%)' },
    { name: 'Vibrant', primary: '#FF8E53', gradient: 'linear-gradient(135deg, #FF8E53 0%, #FB923C 100%)' }
  ]

  useEffect(() => {
    setIsClient(true)
    // Load saved preferences
    const savedTheme = localStorage.getItem('palate-theme')
    const savedColor = localStorage.getItem('palate-accent-color')
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark'
      setIsDarkMode(isDark)
      setTimeout(() => applyTheme(isDark), 100)
    } else {
      // Default to dark mode
      setTimeout(() => applyTheme(true), 100)
    }
    
    if (savedColor) {
      setSelectedAccentColor(savedColor)
      const color = colorOptions.find(c => c.name === savedColor)
      if (color) {
        setTimeout(() => updateColors(color), 100)
      }
    }
  }, [])

  useEffect(() => {
    if (!isClient) return
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])


  const dietaryPreferences = [
    { name: 'Vegetarian', enabled: false },
    { name: 'Vegan', enabled: false },
    { name: 'Gluten-Free', enabled: true },
    { name: 'Dairy-Free', enabled: false },
    { name: 'Nut-Free', enabled: true },
    { name: 'Low-Sodium', enabled: false }
  ]

  const allergies = ['Shellfish', 'Peanuts']

  const applyTheme = (isDark: boolean) => {
    if (typeof window === 'undefined') return
    
    let themeSheet = document.getElementById('palate-theme-styles') as HTMLStyleElement
    if (!themeSheet) {
      themeSheet = document.createElement('style')
      themeSheet.id = 'palate-theme-styles'
      document.head.appendChild(themeSheet)
    }

    if (isDark) {
      // Dark mode styles
      themeSheet.textContent = `
        body {
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
                      radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
                      linear-gradient(135deg, #3A3D4A 0%, #2A2E3B 25%, #343847 50%, #2D3240 75%, #262B38 100%) !important;
          background-size: 80px 80px, 80px 80px, 20px 20px, 100% 100% !important;
          color: white !important;
        }
        .min-h-screen.text-white {
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
                      radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
                      linear-gradient(135deg, #3A3D4A 0%, #2A2E3B 25%, #343847 50%, #2D3240 75%, #262B38 100%) !important;
          background-size: 80px 80px, 80px 80px, 20px 20px, 100% 100% !important;
        }
        .text-white { color: white !important; }
        .text-gray-400 { color: #9CA3AF !important; }
        .text-gray-600 { color: #6B7280 !important; }
        .text-gray-300 { color: #D1D5DB !important; }
        .text-gray-900 { color: #111827 !important; }
        .bg-dark-100\\/60 { background-color: rgba(39, 39, 42, 0.6) !important; }
        .bg-dark-100\\/70 { background-color: rgba(39, 39, 42, 0.7) !important; }
        .bg-dark-100 { background-color: #27272A !important; }
        .bg-dark-200 { background-color: #3F3F46 !important; }
        .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1) !important; }
        .border-white\\/20 { border-color: rgba(255, 255, 255, 0.2) !important; }
        .bg-dark-200\\/50 { background-color: rgba(63, 63, 70, 0.5) !important; }
        .hero-overlay-box { background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(20, 20, 20, 0.9) 100%) !important; }
        .allergen-warning-box { background-color: rgba(245, 158, 11, 0.2) !important; }
        .allergen-warning-title { color: #FDE047 !important; }
        .allergen-warning-text { color: #FFFFFF !important; }
      `
    } else {
      // Light mode styles
      themeSheet.textContent = `
        body {
          color: #111827 !important;
        }
        .min-h-screen.text-white {
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
                      radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.1) 1px, transparent 0),
                      linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 25%, #F1F5F9 50%, #E2E8F0 75%, #CBD5E1 100%) !important;
          background-size: 80px 80px, 80px 80px, 20px 20px, 100% 100% !important;
          color: #111827 !important;
        }
        .text-white { color: #111827 !important; }
        .text-gray-400 { color: #4B5563 !important; }
        .text-gray-600 { color: #374151 !important; }
        .text-gray-300 { color: #6B7280 !important; }
        .text-gray-900 { color: #111827 !important; }
        .bg-dark-100\\/60 { background-color: rgba(255, 255, 255, 0.8) !important; }
        .bg-dark-100\\/70 { background-color: rgba(255, 255, 255, 0.85) !important; }
        .bg-dark-100 { background-color: rgba(248, 250, 252, 1) !important; }
        .bg-dark-200 { background-color: rgba(241, 245, 249, 1) !important; }
        .border-white\\/10 { border-color: rgba(0, 0, 0, 0.1) !important; }
        .border-white\\/20 { border-color: rgba(0, 0, 0, 0.2) !important; }
        .bg-dark-200\\/50 { background-color: rgba(241, 245, 249, 0.7) !important; }
        .hero-overlay-box { background: linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 250, 252, 0.8) 100%) !important; }
        .text-gray-200 { color: #374151 !important; }
        .allergen-warning-box { background-color: rgba(245, 158, 11, 0.2) !important; }
        .allergen-warning-title { color: #A16207 !important; }
        .allergen-warning-text { color: #1F2937 !important; }
      `
    }
  }

  const updateColors = (color: any) => {
    if (typeof window === 'undefined') return
    
    // Create a dynamic style tag to override gradient styles
    let colorSheet = document.getElementById('palate-color-styles') as HTMLStyleElement
    if (!colorSheet) {
      colorSheet = document.createElement('style')
      colorSheet.id = 'palate-color-styles'
      document.head.appendChild(colorSheet)
    }

    // CSS rules to override gradient elements
    const cssRules = `
      .bg-gradient-neon {
        background: ${color.gradient} !important;
      }
      
      [data-gradient-bg="true"] {
        background: ${color.gradient} !important;
      }
    `
    
    colorSheet.textContent = cssRules
    
    // Update inline styles that contain the original teal gradient
    const allElements = document.querySelectorAll('*')
    allElements.forEach(el => {
      const element = el as HTMLElement
      if (element.style.background && 
          (element.style.background.includes('#00FFB8') || 
           element.style.background.includes('#22FFD3'))) {
        element.style.background = color.gradient
      }
    })
  }

  const toggleTheme = () => {
    if (typeof window === 'undefined') return
    
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('palate-theme', newTheme ? 'dark' : 'light')
  }

  const handleColorChange = (colorName: string) => {
    setSelectedAccentColor(colorName)
    localStorage.setItem('palate-accent-color', colorName)
    setShowColorPicker(false)
    
    const color = colorOptions.find(c => c.name === colorName)
    if (color) {
      updateColors(color)
    }
  }

  const currentColor = colorOptions.find(c => c.name === selectedAccentColor) || colorOptions[0]

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
        </div>
        
        {/* Mobile Menu Dropdown */}
        {showMenu && (
          <div className="absolute top-full left-0 right-0 bg-dark-100/95 backdrop-blur-xl border-b border-white/10 px-4 py-2" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
            <div className="space-y-1">
              <button 
                onClick={() => { router.push('/dashboard'); setShowMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-200/50 rounded-lg transition-colors"
              >
                <ChartBarIcon className="w-5 h-5" />
                Dashboard
              </button>
              <button 
                onClick={() => { setSelectedTab('analyses'); setShowMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-200/50 rounded-lg transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5" />
                Menu Analyses
              </button>
              <button 
                onClick={() => { setSelectedTab('preferences'); setShowMenu(false) }}
                className="w-full flex items-center gap-3 px-3 py-2 text-primary-400 bg-dark-200/50 rounded-lg"
              >
                <UserIcon className="w-5 h-5" />
                Preferences
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="w-64 bg-dark-100/70 backdrop-blur-md border-r border-white/10 sticky overflow-y-auto" style={{ top: '3.5rem', height: 'calc(100vh - 3.5rem)', boxShadow: '0 0 40px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.05)' }}>
          <div className="p-6">
            <nav className="space-y-2">
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-200/30 rounded-xl transition-colors"
              >
                <ChartBarIcon className="w-5 h-5" />
                Dashboard
              </button>
              <button 
                onClick={() => setSelectedTab('analyses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  selectedTab === 'analyses' 
                    ? 'text-white bg-dark-200/50' 
                    : 'text-gray-300 hover:text-white hover:bg-dark-200/30'
                }`}
              >
                <DocumentTextIcon className="w-5 h-5" />
                Menu Analyses
              </button>
              <button 
                onClick={() => setSelectedTab('preferences')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  selectedTab === 'preferences' 
                    ? 'text-white bg-dark-200/50' 
                    : 'text-gray-300 hover:text-white hover:bg-dark-200/30'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                Preferences
              </button>
            </nav>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Profile Info */}
            <div className="bg-dark-100/70 backdrop-blur-md rounded-3xl p-6 border border-white/10 relative" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.03)' }}>
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
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-dark-200 transition-colors"
                title="Edit profile"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Dietary Preferences */}
            <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <HeartIcon className="w-5 h-5 text-green-400" />
                  Dietary Preferences
                </h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {dietaryPreferences.filter(pref => pref.enabled).map((pref) => (
                    <div key={pref.name} className="px-3 py-2 bg-green-500/30 border border-green-400/30 rounded-lg">
                      <span className="text-sm text-white font-medium">{pref.name}</span>
                    </div>
                  ))}
                  {dietaryPreferences.filter(pref => pref.enabled).length === 0 && (
                    <p className="text-gray-400 text-sm">No dietary preferences selected</p>
                  )}
                  <button className="px-3 py-2 border border-dashed border-gray-500 rounded-lg text-gray-400 hover:border-green-400 hover:text-green-400 transition-colors">
                    <span className="text-sm">+ Add Preference</span>
                  </button>
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
                    <div key={allergy} className="px-3 py-2 bg-red-500/30 border border-red-400/30 rounded-lg">
                      <span className="text-sm text-white font-medium">{allergy}</span>
                    </div>
                  ))}
                  <button className="px-3 py-2 border border-dashed border-gray-500 rounded-lg text-gray-400 hover:border-red-400 hover:text-red-400 transition-colors">
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
                    {isDarkMode ? (
                      <MoonIcon className="w-5 h-5 text-blue-400" />
                    ) : (
                      <SunIcon className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="text-white">Dark Mode</span>
                  </div>
                  <button 
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      isDarkMode ? 'bg-primary-400' : 'bg-gray-500'
                    }`}
                    data-gradient-bg={isDarkMode ? "true" : undefined}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      isDarkMode ? 'ml-auto' : 'ml-0'
                    }`}></div>
                  </button>
                </div>
                
                <div className="relative profile-color-picker">
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-200/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <SwatchIcon className="w-5 h-5 text-purple-400" />
                      <span className="text-white">Accent Color</span>
                    </div>
                    <button 
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg border border-white/20 hover:border-white/40 transition-colors"
                    >
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ background: currentColor.gradient }}
                      ></div>
                      <span className="text-sm text-white">{selectedAccentColor}</span>
                    </button>
                  </div>
                  
                  {showColorPicker && (
                    <div 
                      className="absolute bottom-full right-3 mb-2 bg-dark-100/95 backdrop-blur-md rounded-xl border border-white/10 p-3 z-50"
                      style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)', backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)' }}
                    >
                      <div className="grid grid-cols-1 gap-2 min-w-[120px]">
                        {colorOptions.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => handleColorChange(color.name)}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                              selectedAccentColor === color.name 
                                ? (isDarkMode ? 'bg-white/10' : 'bg-black/10')
                                : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/15')
                            }`}
                          >
                            <div 
                              className="w-6 h-6 rounded-full border border-white/20"
                              style={{ background: color.gradient }}
                            ></div>
                            <span className="text-sm text-white">{color.name}</span>
                            {selectedAccentColor === color.name && (
                              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        <div className="p-4 space-y-6">
          {/* Profile Info */}
          <div className="bg-dark-100/70 backdrop-blur-md rounded-3xl p-6 border border-white/10 relative" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.03)' }}>
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
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-dark-200 transition-colors"
              title="Edit profile"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Dietary Preferences */}
          <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl border border-white/10" style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)' }}>
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-green-400" />
                Dietary Preferences
              </h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {dietaryPreferences.filter(pref => pref.enabled).map((pref) => (
                  <div key={pref.name} className="px-3 py-2 bg-green-500/30 border border-green-400/30 rounded-lg">
                    <span className="text-sm text-white font-medium">{pref.name}</span>
                  </div>
                ))}
                {dietaryPreferences.filter(pref => pref.enabled).length === 0 && (
                  <p className="text-gray-400 text-sm">No dietary preferences selected</p>
                )}
                <button className="px-3 py-2 border border-dashed border-gray-500 rounded-lg text-gray-400 hover:border-green-400 hover:text-green-400 transition-colors">
                  <span className="text-sm">+ Add Preference</span>
                </button>
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
                  <div key={allergy} className="px-3 py-2 bg-red-500/30 border border-red-400/30 rounded-lg">
                    <span className="text-sm text-white font-medium">{allergy}</span>
                  </div>
                ))}
                <button className="px-3 py-2 border border-dashed border-gray-500 rounded-lg text-gray-400 hover:border-red-400 hover:text-red-400 transition-colors">
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
                  {isDarkMode ? (
                    <MoonIcon className="w-5 h-5 text-blue-400" />
                  ) : (
                    <SunIcon className="w-5 h-5 text-yellow-400" />
                  )}
                  <span className="text-white">Dark Mode</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    isDarkMode ? 'bg-primary-400' : 'bg-gray-500'
                  }`}
                  data-gradient-bg={isDarkMode ? "true" : undefined}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    isDarkMode ? 'ml-auto' : 'ml-0'
                  }`}></div>
                </button>
              </div>
              
              <div className="relative profile-color-picker">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-dark-200/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <SwatchIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Accent Color</span>
                  </div>
                  <button 
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg border border-white/20 hover:border-white/40 transition-colors"
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ background: currentColor.gradient }}
                    ></div>
                    <span className="text-sm text-white">{selectedAccentColor}</span>
                  </button>
                </div>
                
                {showColorPicker && (
                  <div 
                    className="absolute bottom-full right-3 mb-2 bg-dark-100/95 backdrop-blur-md rounded-xl border border-white/10 p-3 z-50"
                    style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)', backgroundColor: isDarkMode ? 'rgba(39, 39, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)' }}
                  >
                    <div className="grid grid-cols-1 gap-2 min-w-[120px]">
                      {colorOptions.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => handleColorChange(color.name)}
                          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                            selectedAccentColor === color.name 
                              ? (isDarkMode ? 'bg-white/10' : 'bg-black/10')
                              : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/15')
                          }`}
                        >
                          <div 
                            className="w-6 h-6 rounded-full border border-white/20"
                            style={{ background: color.gradient }}
                          ></div>
                          <span className="text-sm text-white">{color.name}</span>
                          {selectedAccentColor === color.name && (
                            <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}