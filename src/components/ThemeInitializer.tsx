'use client'

import { useEffect, useState } from 'react'

const colorOptions = [
  {
    name: 'Teal',
    primary: '#00FFB8',
    gradient: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)'
  },
  {
    name: 'Blue',
    primary: '#45B7D1',
    gradient: 'linear-gradient(135deg, #45B7D1 0%, #38BDF8 100%)'
  },
  {
    name: 'Warm',
    primary: '#FFE66D',
    gradient: 'linear-gradient(135deg, #FFE66D 0%, #FCD34D 100%)'
  },
  {
    name: 'Cool',
    primary: '#A8E6CF',
    gradient: 'linear-gradient(135deg, #A8E6CF 0%, #86EFAC 100%)'
  },
  {
    name: 'Vibrant',
    primary: '#FF8E53',
    gradient: 'linear-gradient(135deg, #FF8E53 0%, #FB923C 100%)'
  }
]

export default function ThemeInitializer() {

  useEffect(() => {
    if (typeof window === 'undefined') return

    const applyTheme = (isDark: boolean) => {
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

    const applyColors = (color: { name: string; primary: string; gradient: string }) => {
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

    // Initialize theme and colors from localStorage
    const savedTheme = localStorage.getItem('palate-theme')
    const savedColor = localStorage.getItem('palate-accent-color')
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark'
      applyTheme(isDark)
    } else {
      // Default to dark mode
      applyTheme(true)
    }

    if (savedColor) {
      const color = colorOptions.find(c => c.name === savedColor)
      if (color) {
        applyColors(color)
      }
    }
  }, [])

  return null // This component doesn't render anything
}