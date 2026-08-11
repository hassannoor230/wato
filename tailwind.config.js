/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fb',
          100: '#e8ecf6',
          200: '#c9d1e6',
          300: '#9aa8d1',
          400: '#6b7fbc',
          500: '#4a5fa3',
          600: '#1e3a8a',
          700: '#172d6e',
          800: '#0f2254',
          900: '#08163a',
          950: '#040c1e',
        },
        navy: {
          50: '#f8f9fb',
          100: '#eef0f5',
          200: '#d5d9e6',
          300: '#a8afc8',
          400: '#7b85a8',
          500: '#4e587a',
          600: '#2a3150',
          700: '#1a1f35',
          800: '#111520',
          900: '#090c14',
          950: '#05070d',
        },
        gold: {
          50: '#faf8f3',
          100: '#f3efe0',
          200: '#e6dcc0',
          300: '#d4c494',
          400: '#c2a86a',
          500: '#b0924e',
          600: '#94783d',
          700: '#6e5a2f',
          800: '#4a3d20',
          900: '#332a18',
          950: '#1f1a0e',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfae6',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'premium': '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 12px -2px rgb(0 0 0 / 0.06)',
        'premium-hover': '0 20px 40px -15px rgb(0 0 0 / 0.12), 0 8px 16px -8px rgb(0 0 0 / 0.08)',
        'premium-lg': '0 20px 50px -12px rgb(0 0 0 / 0.15)',
        'nav': '0 1px 0 0 rgb(0 0 0 / 0.04)',
        'glow': '0 0 40px -10px rgb(176, 146, 78 / 0.3)',
        'inner-glow': 'inset 0 0 20px -5px rgb(255 255 255 / 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
