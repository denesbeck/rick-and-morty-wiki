const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            '2xs': '320px',
            // => @media (min-width: 320px) { ... }
            xs: '480px',
            // => @media (min-width: 480px) { ... }
            ...defaultTheme.screens,
        },
    },
    plugins: [],
}
