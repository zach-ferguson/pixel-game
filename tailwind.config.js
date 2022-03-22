module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D3BDB0',
        secondary : '#715B64',
        tertiary: '#A1C096'
      },
      animation:{
        'spin': 'spin 1.5s ease-in-out infinite',
        'fadein': 'fadein .5s ease-in-out',
        'fadeout': 'fadeout .5s ease-in-out',
      },
      keyframes:{
        spin: {
          '0%':{
              transform: 'rotate(0deg)'
  
          },
          '100%':{
              transform: 'rotate(360deg)'
          }
        },
        fadein: {
          from: { 
            opacity: 0
          },
          to: { 
            opacity: 1
          }
        },
        fadeout: {
          from: { 
            opacity: 1
          },
          to: { 
            opacity: 0
          }
        }
      },
    },
  },
  plugins: [],
}