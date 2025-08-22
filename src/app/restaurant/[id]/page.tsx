'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  CameraIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  DocumentTextIcon,
  HeartIcon,
  ChartBarIcon,
  Bars3Icon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, UserIcon } from '@heroicons/react/24/solid'
import PalateLogo from '@/components/PalateLogo'
import ThemeInitializer from '@/components/ThemeInitializer'

interface Dish {
  id: string
  name: string
  image: string
  rating: number
  price: number
  description: string
  dateOrdered?: string
}

export default function RestaurantDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('past-orders')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showMenu, setShowMenu] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const resolvedParams = use(params)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  // Mock restaurant data based on ID
  const getRestaurantData = (id: string) => {
    const restaurants = {
      '1': {
        name: 'Bella Vista',
        genre: 'Italian',
        logo: '🍝',
        rating: 4.5,
        address: '123 Main St, Downtown',
        phone: '(555) 123-4567',
        hours: 'Open until 10:00 PM'
      },
      '2': {
        name: 'The Rustic Table',
        genre: 'American',
        logo: '🥩',
        rating: 4.2,
        address: '456 Oak Ave, Midtown',
        phone: '(555) 987-6543',
        hours: 'Open until 9:00 PM'
      },
      '3': {
        name: 'Ocean Breeze',
        genre: 'Seafood',
        logo: '🦐',
        rating: 4.7,
        address: '789 Harbor Blvd, Waterfront',
        phone: '(555) 456-7890',
        hours: 'Open until 11:00 PM'
      }
    }
    return restaurants[id as keyof typeof restaurants] || restaurants['1']
  }

  const restaurant = getRestaurantData(resolvedParams.id)

  // Mock past orders
  const pastOrders: Dish[] = [
    {
      id: '1',
      name: 'Grilled Salmon',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=entropy&auto=format',
      rating: 5,
      price: 28,
      description: 'Fresh Atlantic salmon with quinoa and roasted vegetables',
      dateOrdered: '2024-01-15'
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=entropy&auto=format',
      rating: 4,
      price: 18,
      description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
      dateOrdered: '2024-01-10'
    },
    {
      id: '3',
      name: 'Caesar Salad',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=entropy&auto=format',
      rating: 4,
      price: 14,
      description: 'Crisp romaine lettuce with parmesan and house-made croutons',
      dateOrdered: '2024-01-05'
    }
  ]

  // Mock suggested items
  const suggestedItems: Dish[] = [
    {
      id: '4',
      name: 'Seafood Risotto',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&crop=entropy&auto=format',
      rating: 4.5,
      price: 24,
      description: 'Creamy arborio rice with mixed seafood and saffron'
    },
    {
      id: '5',
      name: 'Tiramisu',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=entropy&auto=format',
      rating: 4.8,
      price: 12,
      description: 'Classic Italian dessert with coffee and mascarpone'
    },
    {
      id: '6',
      name: 'Bruschetta',
      image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop&crop=entropy&auto=format',
      rating: 4.3,
      price: 10,
      description: 'Toasted bread with fresh tomatoes, garlic, and basil'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarSolidIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-600'
        }`}
      />
    ))
  }

  const renderDishCard = (dish: Dish, showDate = false) => (
    <div 
      key={dish.id} 
      className="relative bg-dark-100/60 backdrop-blur-md rounded-3xl transition-all duration-300 border border-white/10 hover:border-primary-400/20 mt-16"
      style={{ 
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.5), 0 16px 35px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.04)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4), 0 12px 25px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)'
      }}
    >
      {/* Diamond Image */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
        {/* Background Diamond */}
        <div 
          className="w-20 h-20 absolute top-1/2 left-1/2 -z-10 bg-dark-100/60 backdrop-blur-md"
          style={{
            transform: 'translate(-50%, -50%) rotate(45deg)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: 'none',
            borderRight: 'none',
            boxShadow: '-8px -8px 16px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.08)'
          }}
        ></div>
        <div 
          className="w-24 h-24 relative overflow-hidden shadow-lg"
          style={{
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
          }}
        >
          <img 
            src={dish.image} 
            alt={dish.name}
            className="w-full h-full object-cover"
            style={{
              filter: 'contrast(1.1) brightness(1.05)',
            }}
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                  <span class="text-2xl opacity-50">🍽️</span>
                </div>
              `;
            }}
          />
        </div>
      </div>
      <div className="p-5 pt-8">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-white text-lg">{dish.name}</h3>
          <span className="text-primary-400 font-bold text-xl">${dish.price}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          {renderStars(dish.rating)}
        </div>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{dish.description}</p>
        {showDate && dish.dateOrdered && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <ClockIcon className="w-3 h-3" />
            Ordered on {new Date(dish.dateOrdered).toLocaleDateString()}
          </div>
        )}
        <button 
          className="w-full font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
          data-gradient-bg="true"
          onClick={() => router.push(`/dish/${dish.id}`)}
          style={{
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
          Dish Details
        </button>
      </div>
    </div>
  )

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
                onClick={() => {router.push('/dashboard'); setShowMenu(false)}}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors font-medium text-gray-600 hover:bg-dark-200/50 hover:text-white"
              >
                <ChartBarIcon className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => {setSelectedTab('analyses'); setShowMenu(false)}}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors font-medium ${
                  selectedTab === 'analyses' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:bg-dark-200/50 hover:text-white'
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
                onClick={() => {setSelectedTab('preferences'); setShowMenu(false)}}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors font-medium ${
                  selectedTab === 'preferences' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:bg-dark-200/50 hover:text-white'
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

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="w-64 bg-dark-100/70 backdrop-blur-md border-r border-white/10 sticky overflow-y-auto" style={{ top: '3.5rem', height: 'calc(100vh - 3.5rem)', boxShadow: '0 0 40px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.05)' }}>
          <div className="p-6">
            <nav className="space-y-2">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors text-gray-600 hover:bg-dark-200 hover:text-white"
              >
                <ChartBarIcon className="w-5 h-5" />
                Dashboard
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
            {/* XL Desktop Layout - Side by Side */}
            <div className="xl:flex xl:gap-8 xl:items-start space-y-6 xl:space-y-0">
              {/* Restaurant Info - Left Column (1/3) */}
              <div className="xl:w-1/3">
                <div className="bg-dark-100/70 backdrop-blur-md rounded-3xl p-8 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.03)' }}>
                  <div className="mb-6">
                    <div className="mb-4">
                      <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
                      <p className="text-primary-400 font-medium text-lg">{restaurant.genre} Restaurant</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(Math.floor(restaurant.rating))}
                      </div>
                      <span className="text-sm text-gray-400">({restaurant.rating})</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-5 text-base">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <MapPinIcon className="w-4 h-4 text-blue-400" />
                      </div>
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <PhoneIcon className="w-4 h-4 text-green-400" />
                      </div>
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <ClockIcon className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span>{restaurant.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs and Content - Right Column (2/3) */}
              <div className="xl:w-2/3 space-y-6">
                {/* Tab Navigation */}
                <div className="flex bg-dark-100/60 backdrop-blur-md rounded-xl p-1 border border-white/10" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.06)' }}>
                  <button
                    onClick={() => setActiveTab('past-orders')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === 'past-orders'
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-white hover:bg-dark-200'
                    }`}
                    style={activeTab === 'past-orders' ? {
                      background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                    } : {}}
                    data-gradient-bg={activeTab === 'past-orders' ? "true" : undefined}
                  >
                    Past Orders
                  </button>
                  <button
                    onClick={() => setActiveTab('suggested')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === 'suggested'
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-white hover:bg-dark-200'
                    }`}
                    style={activeTab === 'suggested' ? {
                      background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                    } : {}}
                    data-gradient-bg={activeTab === 'suggested' ? "true" : undefined}
                  >
                    Suggested
                  </button>
                </div>

                {/* Content */}
                {activeTab === 'past-orders' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Your Past Orders</h2>
                      <span className="text-sm text-gray-400">{pastOrders.length} items</span>
                    </div>
                    <div className="space-y-6">
                      {pastOrders.map((dish) => renderDishCard(dish, true))}
                    </div>
                  </div>
                )}

                {activeTab === 'suggested' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Suggested for You</h2>
                      <span className="text-sm text-gray-400">Based on your preferences</span>
                    </div>
                    <div className="space-y-6">
                      {suggestedItems.map((dish) => renderDishCard(dish))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        <div className="p-4 space-y-6">
          {/* Restaurant Info */}
          <div className="bg-dark-100/70 backdrop-blur-md rounded-3xl p-8 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.03)' }}>
            <div className="mb-6">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
                <p className="text-primary-400 font-medium text-lg">{restaurant.genre} Restaurant</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(Math.floor(restaurant.rating))}
                </div>
                <span className="text-sm text-gray-400">({restaurant.rating})</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-5 text-base">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 text-blue-400" />
                </div>
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <PhoneIcon className="w-4 h-4 text-green-400" />
                </div>
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-4 h-4 text-yellow-400" />
                </div>
                <span>{restaurant.hours}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-dark-100/60 backdrop-blur-md rounded-xl p-1 border border-white/10" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.06)' }}>
            <button
              onClick={() => setActiveTab('past-orders')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'past-orders'
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-white hover:bg-dark-200'
              }`}
              style={activeTab === 'past-orders' ? {
                background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
              } : {}}
              data-gradient-bg={activeTab === 'past-orders' ? "true" : undefined}
            >
              Past Orders
            </button>
            <button
              onClick={() => setActiveTab('suggested')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'suggested'
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-white hover:bg-dark-200'
              }`}
              style={activeTab === 'suggested' ? {
                background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
              } : {}}
              data-gradient-bg={activeTab === 'suggested' ? "true" : undefined}
            >
              Suggested
            </button>
          </div>

          {/* Content */}
          {activeTab === 'past-orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Past Orders</h2>
                <span className="text-sm text-gray-400">{pastOrders.length} items</span>
              </div>
              <div className="space-y-6">
                {pastOrders.map((dish) => renderDishCard(dish, true))}
              </div>
            </div>
          )}

          {activeTab === 'suggested' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Suggested for You</h2>
                <span className="text-sm text-gray-400">Based on your preferences</span>
              </div>
              <div className="space-y-6">
                {suggestedItems.map((dish) => renderDishCard(dish))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}