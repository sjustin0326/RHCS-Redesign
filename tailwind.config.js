/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkgreen: '#283618', // Dark forest green
        olive: '#606C38',  
        dark: '#283618', 
        cream: '#FEFAE0',
        'forest': {
          light: '#606C38',  // Olive green
          dark: '#283618', 
          cream: '#FEFAE0',  // cream
        },
        
        'logo-green': '#447c41', 
        
        'cream': '#FEFAE0',    // Off-white background
        'golden': '#DDA15E',   // Golden tan
        'terracotta': '#BC6C25', // Burnt orange
        
        // Enhanced navigation color system
        'nav': {
          bg: '#283618',           // Dark green background
          'bg-hover': '#3a4728',   // Slightly lighter green for hover
          
          // Desktop colors
          'text-desktop': '#FEFAE0',      // Cream text for main items
          'text-desktop-hover': '#DDA15E', // Golden hover for main items
          'text-desktop-active': '#FFFFFF', // White for active items
          
          'subtext-desktop': '#283618',    // Dark green for subpages
          'subtext-desktop-hover': '#447c41', // Logo green hover for subpages
          'subtext-desktop-bg-hover': '#F4F1E8', // Light cream bg hover for subpages
          
          // Mobile colors
          'text-mobile': '#283618',        // Dark green text for mobile
          'text-mobile-hover': '#447c41',  // Logo green hover for mobile
          'hamburger': '#FEFAE0',         // Cream hamburger icon
          'close': '#FEFAE0',             // Cream close icon
          
          accent: '#DDA15E',      // Golden accent
          border: '#3a4728',      // Slightly lighter green border
          dropdown: '#FFFFFF',    // Pure white for dropdowns
        },
        
        primary: '#283618',     // Dark green for primary actions
        secondary: '#606C38',   // Olive for secondary elements
        accent: '#DDA15E',      // Golden for highlights
        warning: '#BC6C25',     // Terracotta for call-to-actions
        background: '#FEFAE0',  // Cream background
      },
      
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Open Sans', 'system-ui', 'sans-serif'],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'leaf-sway': 'leafSway 2s ease-in-out infinite',
        'dropdown-appear': 'dropdownAppear 0.2s ease-out',
        'submenu-expand': 'submenuExpand 0.3s ease-out',
        'submenu-collapse': 'submenuCollapse 0.3s ease-in',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        leafSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        dropdownAppear: {
          '0%': { opacity: '0', transform: 'translateY(-10px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        submenuExpand: {
          '0%': { opacity: '0', maxHeight: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', maxHeight: '500px', transform: 'translateY(0)' },
        },
        submenuCollapse: {
          '0%': { opacity: '1', maxHeight: '500px', transform: 'translateY(0)' },
          '100%': { opacity: '0', maxHeight: '0', transform: 'translateY(-10px)' },
        },
      },
      
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(40, 54, 24, 0.1), 0 2px 4px -1px rgba(40, 54, 24, 0.06)',
        'medium': '0 10px 15px -3px rgba(40, 54, 24, 0.1), 0 4px 6px -2px rgba(40, 54, 24, 0.05)',
        'strong': '0 20px 25px -5px rgba(40, 54, 24, 0.1), 0 10px 10px -5px rgba(40, 54, 24, 0.04)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(40, 54, 24, 0.06)',
        'nav': '0 4px 12px -2px rgba(40, 54, 24, 0.08)',
        'dropdown': '0 10px 15px -3px rgba(40, 54, 24, 0.1), 0 4px 6px -2px rgba(40, 54, 24, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}