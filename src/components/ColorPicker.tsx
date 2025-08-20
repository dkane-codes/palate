'use client'

import { useState, useEffect } from 'react'
import PalateLogo from './PalateLogo'

interface ColorOption {
  name: string
  primary: string
  gradient: string
  css: string
}

const colorOptions: ColorOption[] = [
  {
    name: 'Teal',
    primary: '#00FFB8',
    gradient: 'linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%)',
    css: '--color-primary: #00FFB8; --color-gradient: linear-gradient(135deg, #00FFB8 0%, #22FFD3 100%);'
  },
  {
    name: 'Blue',
    primary: '#45B7D1',
    gradient: 'linear-gradient(135deg, #45B7D1 0%, #38BDF8 100%)',
    css: '--color-primary: #45B7D1; --color-gradient: linear-gradient(135deg, #45B7D1 0%, #38BDF8 100%);'
  },
  {
    name: 'Warm',
    primary: '#FFE66D',
    gradient: 'linear-gradient(135deg, #FFE66D 0%, #FCD34D 100%)',
    css: '--color-primary: #FFE66D; --color-gradient: linear-gradient(135deg, #FFE66D 0%, #FCD34D 100%);'
  },
  {
    name: 'Cool',
    primary: '#A8E6CF',
    gradient: 'linear-gradient(135deg, #A8E6CF 0%, #86EFAC 100%)',
    css: '--color-primary: #A8E6CF; --color-gradient: linear-gradient(135deg, #A8E6CF 0%, #86EFAC 100%);'
  },
  {
    name: 'Vibrant',
    primary: '#FF8E53',
    gradient: 'linear-gradient(135deg, #FF8E53 0%, #FB923C 100%)',
    css: '--color-primary: #FF8E53; --color-gradient: linear-gradient(135deg, #FF8E53 0%, #FB923C 100%);'
  }
]

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('Teal')
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const updateColors = (color: ColorOption) => {
    // Prevent hydration mismatch by only running on client
    if (typeof window === 'undefined') return
    
    console.log('Updating colors to:', color.name, color.gradient)
    
    // Create a dynamic style tag to override only teal/neon gradient styles
    let styleSheet = document.getElementById('dynamic-color-styles') as HTMLStyleElement
    if (!styleSheet) {
      styleSheet = document.createElement('style')
      styleSheet.id = 'dynamic-color-styles'
      document.head.appendChild(styleSheet)
    }

    // CSS rules to override only the original teal gradient elements
    const cssRules = `
      .bg-gradient-neon {
        background: ${color.gradient} !important;
      }
      
      [data-gradient-bg="true"] {
        background: ${color.gradient} !important;
      }
    `
    
    styleSheet.textContent = cssRules
    console.log('Applied CSS rules:', cssRules)

    // Target only elements with the original teal gradient (#00FFB8)
    const allElements = document.querySelectorAll('*')
    let updatedCount = 0
    allElements.forEach(el => {
      const element = el as HTMLElement
      if (element.style.background && 
          (element.style.background.includes('#00FFB8') || 
           element.style.background.includes('#22FFD3'))) {
        element.style.background = color.gradient
        element.style.setProperty('background', color.gradient, 'important')
        updatedCount++
      }
    })
    console.log('Updated', updatedCount, 'teal elements via DOM manipulation')
  }

  const toggleTheme = () => {
    // Prevent hydration mismatch by only running on client
    if (typeof window === 'undefined') return
    
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    
    // Create or update theme stylesheet
    let themeSheet = document.getElementById('dynamic-theme-styles') as HTMLStyleElement
    if (!themeSheet) {
      themeSheet = document.createElement('style')
      themeSheet.id = 'dynamic-theme-styles'
      document.head.appendChild(themeSheet)
    }

    if (newTheme) {
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
        .text-white { color: white !important; }
        .text-gray-400 { color: #9CA3AF !important; }
        .text-gray-300 { color: #D1D5DB !important; }
        .text-gray-900 { color: #111827 !important; }
        .bg-dark-100\\/60 { background-color: rgba(39, 39, 42, 0.6) !important; }
        .bg-dark-100\\/70 { background-color: rgba(39, 39, 42, 0.7) !important; }
        .bg-dark-100\\/90 { background-color: rgba(39, 39, 42, 0.9) !important; }
        .bg-dark-100 { background-color: #27272A !important; }
        .bg-dark-200 { background-color: #3F3F46 !important; }
        .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1) !important; }
        .border-white\\/20 { border-color: rgba(255, 255, 255, 0.2) !important; }
      `
    } else {
      // Light mode styles
      themeSheet.textContent = `
        body {
          color: #111827 !important;
        }
        div.min-h-screen.text-white[style*="background"] {
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
                      radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.1) 1px, transparent 0),
                      linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 25%, #F1F5F9 50%, #E2E8F0 75%, #CBD5E1 100%) !important;
          background-size: 80px 80px, 80px 80px, 20px 20px, 100% 100% !important;
        }
        .bg-dark-100\\/60 { background-color: rgba(255, 255, 255, 0.6) !important; }
        .bg-dark-100\\/70 { background-color: rgba(255, 255, 255, 0.7) !important; }
        .bg-dark-100\\/90 { background-color: rgba(255, 255, 255, 0.9) !important; }
        .bg-dark-100 { background-color: rgba(248, 250, 252, 1) !important; }
        .bg-dark-200 { background-color: rgba(241, 245, 249, 1) !important; }
        .bg-black\\/50 { background-color: rgba(255, 255, 255, 0.5) !important; }
        .border-dark-300 { border-color: rgba(203, 213, 225, 1) !important; }
        .text-dark-500 { color: #1f2937 !important; }
        .text-white { color: #111827 !important; }
        .text-gray-400 { color: #4B5563 !important; }
        .text-gray-300 { color: #374151 !important; }
        .text-gray-900 { color: #111827 !important; }
        .text-gray-200 { color: #374151 !important; }
        .text-gray-500 { color: #6B7280 !important; }
        .bg-dark-100\\/60 { background-color: rgba(255, 255, 255, 0.6) !important; }
        .bg-dark-100\\/70 { background-color: rgba(255, 255, 255, 0.7) !important; }
        .bg-dark-100\\/90 { background-color: rgba(255, 255, 255, 0.9) !important; }
        .bg-dark-100 { background-color: rgba(248, 250, 252, 1) !important; }
        .bg-dark-200 { background-color: rgba(241, 245, 249, 1) !important; }
        .bg-black\\/50 { background-color: rgba(255, 255, 255, 0.5) !important; }
        .border-dark-300 { border-color: rgba(203, 213, 225, 1) !important; }
        .text-dark-500 { color: #1f2937 !important; }
        .bg-dark-100\\/90 { background-color: rgba(255, 255, 255, 0.9) !important; }
        .bg-dark-100 { background-color: #F1F5F9 !important; }
        .bg-dark-200 { background-color: #E2E8F0 !important; }
        .border-white\\/10 { border-color: rgba(0, 0, 0, 0.1) !important; }
        .border-white\\/20 { border-color: rgba(0, 0, 0, 0.2) !important; }
      `
    }

    // Store theme preference
    localStorage.setItem('palate-theme', newTheme ? 'dark' : 'light')
    console.log('Switched to', newTheme ? 'dark' : 'light', 'mode')
  }

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color.name)
    updateColors(color)
    localStorage.setItem('palate-accent-color', color.name)
    setIsOpen(false)
  }

  // Load saved color and theme on mount
  useEffect(() => {
    // Prevent hydration mismatch by only running on client
    if (typeof window === 'undefined') return

    const savedColor = localStorage.getItem('palate-accent-color')
    if (savedColor) {
      const color = colorOptions.find(c => c.name === savedColor)
      if (color) {
        setSelectedColor(color.name)
        // Apply colors after a short delay to ensure DOM is ready
        setTimeout(() => {
          updateColors(color)
        }, 200)
      }
    }

    const savedTheme = localStorage.getItem('palate-theme')
    if (savedTheme) {
      const isDark = savedTheme === 'dark'
      setIsDarkMode(isDark)
      setTimeout(() => {
        // Apply theme without toggling state
        const themeSheet = document.getElementById('dynamic-theme-styles') as HTMLStyleElement || (() => {
          const sheet = document.createElement('style')
          sheet.id = 'dynamic-theme-styles'
          document.head.appendChild(sheet)
          return sheet
        })()

        if (isDark) {
          themeSheet.textContent = `
            body {
              background: linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
                          linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
                          radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
                          linear-gradient(135deg, #3A3D4A 0%, #2A2E3B 25%, #343847 50%, #2D3240 75%, #262B38 100%) !important;
              background-size: 80px 80px, 80px 80px, 20px 20px, 100% 100% !important;
              color: white !important;
            }
          `
        } else {
          themeSheet.textContent = `
            body {
              color: #111827 !important;
            }
            .min-h-screen {
              background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
                               linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%),
                               radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.1) 1px, transparent 0),
                               linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 25%, #F1F5F9 50%, #E2E8F0 75%, #CBD5E1 100%);
              background-size: 80px 80px, 80px 80px, 20px 20px, 100% 100%;
            }
            .bg-dark-100\\/60 { background-color: rgba(255, 255, 255, 0.6) !important; }
            .bg-dark-100\\/70 { background-color: rgba(255, 255, 255, 0.7) !important; }
            .text-white { color: #111827 !important; }
            .text-gray-400 { color: #4B5563 !important; }
            .text-gray-300 { color: #374151 !important; }
            .text-gray-900 { color: #111827 !important; }
            .text-gray-200 { color: #374151 !important; }
            .text-gray-500 { color: #6B7280 !important; }
          `
        }
      }, 100)
    }
  }, [])

  const currentColor = colorOptions.find(c => c.name === selectedColor) || colorOptions[0]

  return (
    <div className="flex gap-2">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg border-2 border-white/20 backdrop-blur-md flex items-center justify-center hover:border-white/40 transition-all duration-300 transform hover:scale-105 p-1"
          style={{ background: currentColor.gradient }}
          title="Change accent color"
        >
          <PalateLogo className="w-7 h-7 text-black" />
        </button>

      {isOpen && (
        <div 
          className="absolute top-12 left-0 bg-dark-100/90 backdrop-blur-md rounded-xl border border-white/10 p-3 z-50"
          style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)' }}
        >
          <div className="grid grid-cols-1 gap-2 min-w-[120px]">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color)}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors ${
                  selectedColor === color.name ? 'bg-white/10' : ''
                }`}
              >
                <div 
                  className="w-6 h-6 rounded-full border border-white/20"
                  style={{ background: color.gradient }}
                ></div>
                <span className="text-sm text-white">{color.name}</span>
                {selectedColor === color.name && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
      
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 rounded-lg border-2 backdrop-blur-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 p-1"
        style={{ 
          background: isDarkMode ? 'black' : 'white',
          borderColor: currentColor.primary,
        }}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <PalateLogo className={`w-7 h-7 ${isDarkMode ? 'text-white' : 'text-black'}`} />
      </button>
    </div>
  )
}