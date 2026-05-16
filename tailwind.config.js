/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'luxury-dark': '#0B0B0B',
        'luxury-card': '#151515',
        'luxury-gold': '#C8A96B',
        'luxury-text': '#F5F5F5',
        'luxury-muted': '#888888'
      },
      spacing: {
        'luxury-sm': '1.5rem',
        'luxury-md': '2.5rem',
        'luxury-lg': '4rem'
      },
      fontSize: {
        'luxury-xs': ['0.875rem', '1.25rem'],
        'luxury-sm': ['1rem', '1.5rem'],
        'luxury-base': ['1.125rem', '1.75rem'],
        'luxury-lg': ['1.5rem', '2rem'],
        'luxury-xl': ['2rem', '2.5rem'],
        'luxury-2xl': ['2.5rem', '3rem'],
        'luxury-3xl': ['3rem', '3.5rem']
      },
      boxShadow: {
        'luxury-sm': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'luxury-md': '0 8px 16px rgba(0, 0, 0, 0.4)',
        'luxury-lg': '0 16px 32px rgba(0, 0, 0, 0.5)',
        'luxury-gold': '0 0 20px rgba(200, 169, 107, 0.3)'
      },
      borderRadius: {
        'luxury': '0.75rem'
      },
      backdropBlur: {
        'luxury': '10px'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200, 169, 107, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(200, 169, 107, 0.6)' }
        }
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0.0, 0.2, 1)'
      }
    }
  },
  plugins: []
}
