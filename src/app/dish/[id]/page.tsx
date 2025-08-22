'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeftIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  CameraIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Bars3Icon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon, UserIcon } from '@heroicons/react/24/solid'
import PalateLogo from '@/components/PalateLogo'
import ThemeInitializer from '@/components/ThemeInitializer'

interface NutritionalInfo {
  calories: number
  protein: string
  carbs: string
  fat: string
  fiber: string
  sodium: string
}

interface Ingredient {
  name: string
  category: string
}

interface Review {
  id: string
  username: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

interface DishData {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  price: number
  description: string
  longDescription: string
  preparationTime: string
  servingSize: string
  category: string
  tags: string[]
  ingredients: Ingredient[]
  nutritionalInfo: NutritionalInfo
  allergens: string[]
  restaurantName: string
  restaurantId: string
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  spiceLevel: number
  reviews: Review[]
}

export default function DishDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
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

  // Mock dish data based on ID
  const getDishData = (id: string): DishData => {
    const dishes: Record<string, DishData> = {
      '1': {
        id: '1',
        name: 'Grilled Salmon',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&crop=entropy&auto=format',
        rating: 4.8,
        reviewCount: 127,
        price: 28,
        description: 'Fresh Atlantic salmon with quinoa and roasted vegetables',
        longDescription: 'Our signature grilled salmon is sourced fresh from the Atlantic and grilled to perfection. Served with organic quinoa, seasonal roasted vegetables, and our house-made lemon herb sauce. This dish is rich in omega-3 fatty acids and provides a perfect balance of protein and nutrients.',
        preparationTime: '15-20 mins',
        servingSize: '1 portion (350g)',
        category: 'Main Course',
        tags: ['Healthy', 'High Protein', 'Low Carb', 'Omega-3'],
        ingredients: [
          { name: 'Atlantic Salmon', category: 'Protein' },
          { name: 'Quinoa', category: 'Grain' },
          { name: 'Asparagus', category: 'Vegetable' },
          { name: 'Bell Peppers', category: 'Vegetable' },
          { name: 'Lemon', category: 'Citrus' },
          { name: 'Olive Oil', category: 'Fat' },
          { name: 'Fresh Herbs', category: 'Seasoning' }
        ],
        nutritionalInfo: {
          calories: 420,
          protein: '35g',
          carbs: '28g',
          fat: '18g',
          fiber: '4g',
          sodium: '380mg'
        },
        allergens: ['Fish'],
        restaurantName: 'Bella Vista',
        restaurantId: '1',
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        spiceLevel: 1,
        reviews: [
          {
            id: '1',
            username: 'Sarah M.',
            rating: 5,
            comment: 'Absolutely delicious! The salmon was cooked perfectly and the quinoa was so flavorful.',
            date: '2024-01-18',
            verified: true
          },
          {
            id: '2',
            username: 'Michael R.',
            rating: 4,
            comment: 'Great healthy option. Could use a bit more seasoning but overall very good.',
            date: '2024-01-15',
            verified: true
          }
        ]
      },
      '2': {
        id: '2',
        name: 'Margherita Pizza',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop&crop=entropy&auto=format',
        rating: 4.6,
        reviewCount: 89,
        price: 18,
        description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
        longDescription: 'Our traditional Margherita pizza features hand-stretched dough made fresh daily, topped with San Marzano tomatoes, fresh mozzarella di bufala, and aromatic basil leaves. Baked in our wood-fired oven at 900°F for that perfect crispy crust with a tender center.',
        preparationTime: '12-15 mins',
        servingSize: '1 pizza (12 inch)',
        category: 'Pizza',
        tags: ['Classic', 'Vegetarian', 'Wood-fired', 'Traditional Italian'],
        ingredients: [
          { name: 'Pizza Dough', category: 'Base' },
          { name: 'San Marzano Tomatoes', category: 'Sauce' },
          { name: 'Mozzarella di Bufala', category: 'Cheese' },
          { name: 'Fresh Basil', category: 'Herb' },
          { name: 'Extra Virgin Olive Oil', category: 'Fat' },
          { name: 'Sea Salt', category: 'Seasoning' }
        ],
        nutritionalInfo: {
          calories: 680,
          protein: '28g',
          carbs: '78g',
          fat: '26g',
          fiber: '4g',
          sodium: '920mg'
        },
        allergens: ['Wheat', 'Dairy'],
        restaurantName: 'Bella Vista',
        restaurantId: '1',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        spiceLevel: 0,
        reviews: [
          {
            id: '3',
            username: 'Emma L.',
            rating: 5,
            comment: 'Best pizza in town! The crust is perfect and the ingredients are so fresh.',
            date: '2024-01-20',
            verified: true
          }
        ]
      }
    }
    return dishes[id] || dishes['1']
  }

  const dish = getDishData(resolvedParams.id)

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarSolidIcon
        key={i}
        className={`${size} ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'
        }`}
      />
    ))
  }

  const renderSpiceLevel = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < level ? 'text-red-500' : 'text-gray-600'
        }`}
      >
        🌶️
      </span>
    ))
  }

  const handleShare = () => {
    // This would handle sharing functionality
    console.log('Sharing dish:', dish.name)
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
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-dark-200 transition-colors"
            >
              {isFavorited ? (
                <HeartSolidIcon className="w-6 h-6 text-red-400" />
              ) : (
                <HeartIcon className="w-6 h-6" />
              )}
            </button>
            <button 
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-dark-200 transition-colors"
            >
              <ShareIcon className="w-6 h-6" />
            </button>
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
              {/* Left Column - Hero, Info, Tags (1/2) */}
              <div className="xl:w-1/2 space-y-6">
                {/* Hero Image */}
                <div className="relative rounded-3xl overflow-hidden" style={{ height: '300px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'contrast(1.1) brightness(1.05)',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                          <span class="text-6xl opacity-50">🍽️</span>
                        </div>
                      `;
                    }}
                  />
                  
                  {/* Bottom Left Container - Dish Info */}
                  <div className="absolute bottom-4 left-4">
                    <div 
                      className="hero-overlay-box backdrop-blur-md rounded-2xl px-5 py-4 border border-white/20"
                      style={{ 
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                      }}
                    >
                      <h1 className="text-2xl font-bold text-white mb-2">{dish.name}</h1>
                      <div className="flex items-center gap-3 text-sm text-gray-200">
                        <div className="flex items-center gap-1">
                          {renderStars(dish.rating)}
                          <span className="ml-1">({dish.reviewCount})</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span>{dish.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Right Container - Price */}
                  <div className="absolute top-4 right-4">
                    <div 
                      className="hero-overlay-box backdrop-blur-md rounded-xl px-3 py-2 border border-white/20"
                      style={{ 
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(16px)'
                      }}
                    >
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary-400">${dish.price}</div>
                        <div className="text-xs text-white">{dish.servingSize}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
                    <ClockIcon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-400">Prep Time</div>
                    <div className="font-bold text-white">{dish.preparationTime}</div>
                  </div>
                  <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
                    <div className="w-6 h-6 text-yellow-400 mx-auto mb-2 flex items-center justify-center">
                      <span className="text-lg">🔥</span>
                    </div>
                    <div className="text-sm text-gray-400">Calories</div>
                    <div className="font-bold text-white">{dish.nutritionalInfo.calories}</div>
                  </div>
                  <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
                    <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                      {renderSpiceLevel(dish.spiceLevel)}
                    </div>
                    <div className="text-sm text-gray-400">Spice Level</div>
                    <div className="font-bold text-white">{dish.spiceLevel === 0 ? 'Mild' : dish.spiceLevel === 1 ? 'Medium' : 'Hot'}</div>
                  </div>
                </div>

                {/* Allergens Section - moved from tab content */}
                {dish.allergens.length > 0 && (
                  <div className="allergen-warning-box bg-yellow-500/30 border-2 border-yellow-500/60 rounded-2xl p-5" style={{ 
                    boxShadow: '0 10px 20px rgba(245, 158, 11, 0.1), 0 3px 8px rgba(245, 158, 11, 0.05), inset 0 1px 2px rgba(245, 158, 11, 0.1)' 
                  }}>
                    <h4 className="allergen-warning-title font-bold mb-3 text-lg flex items-center gap-2">
                      <span className="text-xl">⚠️</span>
                      Allergens
                    </h4>
                    <p className="allergen-warning-text font-medium">{dish.allergens.join(', ')}</p>
                  </div>
                )}

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-2">
                  {dish.isVegetarian && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                      🌱 Vegetarian
                    </span>
                  )}
                  {dish.isVegan && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                      🌿 Vegan
                    </span>
                  )}
                  {dish.isGlutenFree && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                      🌾 Gluten-Free
                    </span>
                  )}
                  {dish.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Tabs and Content (1/2) */}
              <div className="xl:w-1/2 space-y-6">
                {/* Tab Navigation */}
                <div className="flex xl:flex-col bg-dark-100/60 backdrop-blur-md rounded-xl p-1 border border-white/10" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
                  {['overview', 'nutrition', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 xl:flex-none py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                        activeTab === tab
                          ? 'text-gray-900'
                          : 'text-gray-400 hover:text-white hover:bg-dark-200'
                      }`}
                      style={activeTab === tab ? {
                        background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                      } : {}}
                      data-gradient-bg={activeTab === tab ? "true" : undefined}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                      <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{dish.longDescription}</p>
                    </div>

                    <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                      <h3 className="text-xl font-bold text-white mb-4">Ingredients</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {dish.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-dark-200/50 rounded-xl">
                            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                            <span className="text-gray-300">{ingredient.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                    <h3 className="text-xl font-bold text-white mb-6">Nutritional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(dish.nutritionalInfo).map(([key, value]) => (
                        <div key={key} className="bg-dark-200/50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-primary-400">{value}</div>
                          <div className="text-sm text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Reviews</h3>
                        <div className="flex items-center gap-2">
                          {renderStars(dish.rating, 'w-5 h-5')}
                          <span className="text-gray-300">({dish.reviewCount})</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {dish.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-700 pb-4 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-white">{review.username}</span>
                                {review.verified && (
                                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Verified</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {renderStars(review.rating, 'w-4 h-4')}
                                <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <p className="text-gray-300">{review.comment}</p>
                          </div>
                        ))}
                      </div>
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
          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden" style={{ height: '300px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
            <img 
              src={dish.image} 
              alt={dish.name}
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.1) brightness(1.05)',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <span class="text-6xl opacity-50">🍽️</span>
                  </div>
                `;
              }}
            />
            
            {/* Bottom Left Container - Dish Info */}
            <div className="absolute bottom-4 left-4">
              <div 
                className="hero-overlay-box backdrop-blur-md rounded-2xl px-5 py-4 border border-white/20"
                style={{ 
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                }}
              >
                <h1 className="text-2xl font-bold text-white mb-2">{dish.name}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <div className="flex items-center gap-1">
                    {renderStars(dish.rating)}
                    <span className="ml-1">({dish.reviewCount})</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>{dish.category}</span>
                </div>
              </div>
            </div>

            {/* Top Right Container - Price */}
            <div className="absolute top-4 right-4">
              <div 
                className="hero-overlay-box backdrop-blur-md rounded-xl px-3 py-2 border border-white/20"
                style={{ 
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)'
                }}
              >
                <div className="text-right">
                  <div className="text-xl font-bold text-primary-400">${dish.price}</div>
                  <div className="text-xs text-white">{dish.servingSize}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
              <ClockIcon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400">Prep Time</div>
              <div className="font-bold text-white">{dish.preparationTime}</div>
            </div>
            <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
              <div className="w-6 h-6 text-yellow-400 mx-auto mb-2 flex items-center justify-center">
                <span className="text-lg">🔥</span>
              </div>
              <div className="text-sm text-gray-400">Calories</div>
              <div className="font-bold text-white">{dish.nutritionalInfo.calories}</div>
            </div>
            <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
              <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                {renderSpiceLevel(dish.spiceLevel)}
              </div>
              <div className="text-sm text-gray-400">Spice Level</div>
              <div className="font-bold text-white">{dish.spiceLevel === 0 ? 'Mild' : dish.spiceLevel === 1 ? 'Medium' : 'Hot'}</div>
            </div>
          </div>

          {/* Allergens Section - moved from tab content */}
          {dish.allergens.length > 0 && (
            <div className="allergen-warning-box bg-yellow-500/30 border-2 border-yellow-500/60 rounded-2xl p-5" style={{ 
              boxShadow: '0 10px 20px rgba(245, 158, 11, 0.1), 0 3px 8px rgba(245, 158, 11, 0.05), inset 0 1px 2px rgba(245, 158, 11, 0.1)' 
            }}>
              <h4 className="allergen-warning-title font-bold mb-3 text-lg flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                Allergens
              </h4>
              <p className="allergen-warning-text font-medium">{dish.allergens.join(', ')}</p>
            </div>
          )}

          {/* Dietary Tags */}
          <div className="flex flex-wrap gap-2">
            {dish.isVegetarian && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                🌱 Vegetarian
              </span>
            )}
            {dish.isVegan && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                🌿 Vegan
              </span>
            )}
            {dish.isGlutenFree && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                🌾 Gluten-Free
              </span>
            )}
            {dish.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                {tag}
              </span>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-dark-100/60 backdrop-blur-md rounded-xl p-1 border border-white/10" style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)' }}>
            {['overview', 'nutrition', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'text-gray-900'
                    : 'text-gray-400 hover:text-white hover:bg-dark-200'
                }`}
                style={activeTab === tab ? {
                  background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.1)'
                } : {}}
                data-gradient-bg={activeTab === tab ? "true" : undefined}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                <p className="text-gray-300 leading-relaxed">{dish.longDescription}</p>
              </div>

              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                <h3 className="text-xl font-bold text-white mb-4">Ingredients</h3>
                <div className="grid grid-cols-2 gap-3">
                  {dish.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-dark-200/50 rounded-xl">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      <span className="text-gray-300">{ingredient.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
              <h3 className="text-xl font-bold text-white mb-6">Nutritional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(dish.nutritionalInfo).map(([key, value]) => (
                  <div key={key} className="bg-dark-200/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary-400">{value}</div>
                    <div className="text-sm text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="bg-dark-100/60 backdrop-blur-md rounded-2xl p-6 border border-white/10" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.2)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Reviews</h3>
                  <div className="flex items-center gap-2">
                    {renderStars(dish.rating, 'w-5 h-5')}
                    <span className="text-gray-300">({dish.reviewCount})</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {dish.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white">{review.username}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Verified</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating, 'w-4 h-4')}
                          <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}