/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- Cozy, Peaceful & Welcoming Earthy Palette ---
        cream: {
          50: '#FFFDF7', // Soft Ivory (Cards / Surface)
          100: '#F7F4EC', // Warm Cream (Main Background)
          200: '#EFECE2', // Soft Pale Cream
          300: '#E5DFD2', // Soft Beige (Borders / Dividers)
          400: '#D9D1C2',
          500: '#C7BCAB',
        },
        sage: {
          50: '#F4F6F2',
          100: '#E8ECE4',
          200: '#D2DCD0',
          300: '#B6C4B0',
          400: '#9FB098',
          500: '#879779', // Primary Button & Calm Sage Green
          600: '#6F8164', // Deep Sage Green (Hover)
          700: '#56664C',
          800: '#3F4D37',
          900: '#2A3424',
        },
        sand: {
          50: '#FAF7F0',
          100: '#F4EEE1',
          200: '#E8DDC9', // Warm Sand (Subtle Accent)
          300: '#D9C8AC',
          400: '#C6B08E',
          500: '#B39972',
        },
        terracotta: {
          50: '#FAF3F0',
          100: '#F4E4DF',
          200: '#E7C8BE',
          300: '#D8AB9C',
          400: '#C58F78', // Soft Terracotta (Secondary Accent)
          500: '#B2765E',
          600: '#9B5F48',
          700: '#7E4935',
        },
        charcoal: {
          50: '#F8F8F7',
          100: '#EEEEEC',
          200: '#DCDCDB',
          300: '#B9B9B6',
          400: '#979791',
          500: '#77786C', // Secondary Text (Muted Earthy Grey)
          600: '#5E5F55',
          700: '#4A4B42',
          800: '#393A32', // Primary Text (Warm Charcoal Brown)
          900: '#282923',
          950: '#1C1D18',
        },
        olive: {
          500: '#788B68', // Muted Olive Green (Success / Verified)
          600: '#647555',
        },

        // Semantic mapping for full backwards compatibility
        brand: {
          50: '#F7F4EC',  // Warm Cream
          100: '#EFECE2',
          200: '#E5DFD2', // Soft Beige Border
          300: '#D9D1C2',
          400: '#979791',
          500: '#77786C', // Muted Earthy Grey text
          600: '#5E5F55',
          700: '#4A4B42',
          800: '#393A32', // Warm Charcoal Brown
          900: '#282923',
          950: '#1F201B',
        },
        gold: {
          50: '#FAF7F0',
          100: '#F4EEE1',
          200: '#E8DDC9', // Warm Sand
          300: '#D9C8AC',
          400: '#C58F78', // Soft Terracotta
          500: '#879779', // Sage Green primary
          600: '#6F8164', // Deep Sage hover
          700: '#56664C',
          800: '#4A4B42',
          900: '#393A32',
        },
        emerald: {
          500: '#788B68', // Muted Olive Green
          600: '#647555',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'cozy': '0 4px 20px -2px rgba(57, 58, 50, 0.05), 0 2px 6px -1px rgba(57, 58, 50, 0.03)',
        'cozy-hover': '0 8px 30px -4px rgba(57, 58, 50, 0.09), 0 4px 12px -2px rgba(57, 58, 50, 0.04)',
        'luxury': '0 4px 20px -2px rgba(57, 58, 50, 0.05), 0 2px 6px -1px rgba(57, 58, 50, 0.03)',
        'luxury-hover': '0 8px 30px -4px rgba(57, 58, 50, 0.09), 0 4px 12px -2px rgba(57, 58, 50, 0.04)',
        'glow-gold': '0 0 15px -3px rgba(135, 151, 121, 0.25)',
      }
    },
  },
  plugins: [],
};
