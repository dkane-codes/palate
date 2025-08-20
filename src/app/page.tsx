'use client'

import { useRouter } from 'next/navigation'
import ColorPicker from '@/components/ColorPicker'

export default function Home() {
  const router = useRouter()

  return (
    <div 
      className="min-h-screen text-white relative" 
      style={{ 
        background: `
          linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
          radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
          linear-gradient(135deg, #3A3D4A 0%, #2A2E3B 25%, #343847 50%, #2D3240 75%, #262B38 100%)
        `,
        backgroundSize: '80px 80px, 80px 80px, 20px 20px, 100% 100%',
      }}
    >
      {/* Color Picker */}
      <div className="absolute top-6 left-6 z-10">
        <ColorPicker />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl lg:text-8xl font-black text-white mb-12" style={{ fontWeight: 900 }}>
          Welcome to Palate
        </h1>
        <button 
          onClick={() => router.push('/dashboard')}
          className="px-12 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 mx-auto"
          data-gradient-bg="true"
          style={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
            color: '#0A0B0D',
            fontSize: '1.25rem'
          }}
        >
          Dashboard
        </button>
      </div>
      </div>
    </div>
  )
}
