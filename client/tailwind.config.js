/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          animation: {
            slideInLeft: 'slideInLeft 0.5s ease-in-out',
            slideInRight: 'slideInRight 0.5s ease-in-out',
          },
          keyframes: {
            slideInLeft: {
              '0%': { transform: 'translateX(-100%)', opacity: '0' },
              '100%': { transform: 'translateX(0)', opacity: '1' },
            },
            slideInRight: {
              '0%': { transform: 'translateX(100%)', opacity: '0' },
              '100%': { transform: 'translateX(0)', opacity: '1' },
            },
          },
          fontFamily: {
            opensans: ['Open Sans'],
            display: ['Oswald'],
            body: ['Open Sans'],
          },
          colors:{
            darkGray: "#292929",
            gray: "#8d8d8d",
            tealDark: "#20515d",
            tealLight: "#2f7585",
            primary: "#2f7585", 
            secondary: "#20515d",
            accent: "#f59e0b",
          },
          boxShadow: {
            'custom': '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          borderRadius: {
            'xl': '1rem',
          },
        },
  },
  plugins: [
    require('daisyui'),
  ],
}

