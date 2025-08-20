import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme with neon teal accents
        primary: {
          50: '#ECFFFE',
          100: '#CFFFF8',
          200: '#A5FFF0',
          300: '#67FFE8',
          400: '#22FFD3',
          500: '#00FFB8', // Neon green-teal
          600: '#00D19A',
          700: '#00A37D',
          800: '#008B6B',
          900: '#007359',
        },
        secondary: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#4ECDC4', // Main secondary
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        accent: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#45B7D1', // Main accent
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        warm: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FFE66D', // Main warm
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        cool: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#A8E6CF', // Main cool
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        vibrant: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF8E53', // Main vibrant
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        deep: {
          50: '#F3F4F6',
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#6C5CE7', // Main deep
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        soft: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FDCB6E', // Main soft
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Dark theme colors
        dark: {
          50: '#18181B',
          100: '#27272A',
          200: '#3F3F46',
          300: '#52525B',
          400: '#71717A',
          500: '#1A1A1D', // Main dark background
          600: '#16161A',
          700: '#0D0D0F',
          800: '#000000',
          900: '#000000',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1A1A1D 0%, #27272A 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0D0D0F 0%, #1A1A1D 50%, #27272A 100%)',
        'gradient-light': 'linear-gradient(135deg, #2A2D3A 0%, #212734 50%, #1E2028 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00E5FF 0%, #22D3EE 100%)',
        'gradient-mixed': 'linear-gradient(135deg, #0D0D0F 0%, #1A1A1D 50%, #27272A 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'pattern-dots': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        'pattern-geometric': 'radial-gradient(circle at 1px 1px, rgba(0, 229, 255, 0.15) 1px, transparent 0), linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%)',
      },
      backgroundSize: {
        'pattern-dots': '20px 20px',
        'pattern-geometric': '20px 20px, 40px 40px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'vibrant': '0 10px 25px -3px rgba(255, 107, 107, 0.3), 0 4px 6px -2px rgba(255, 107, 107, 0.1)',
        'cool': '0 10px 25px -3px rgba(69, 183, 209, 0.3), 0 4px 6px -2px rgba(69, 183, 209, 0.1)',
        'warm': '0 10px 25px -3px rgba(255, 230, 109, 0.3), 0 4px 6px -2px rgba(255, 230, 109, 0.1)',
        'card': '0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 8px 20px -6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 12px 30px -6px rgba(0, 0, 0, 0.15)',
        'button': '0 12px 24px -8px rgba(0, 229, 255, 0.4), 0 4px 12px -2px rgba(0, 229, 255, 0.2)',
        'button-hover': '0 16px 32px -8px rgba(0, 229, 255, 0.5), 0 6px 16px -2px rgba(0, 229, 255, 0.3)',
        'inset': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'bevel': '0 1px 3px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.05), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;