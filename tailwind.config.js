/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['index.html', './src/**/*.{vue,ts}'],
    theme: {
        screens: {
            xl: { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            lg: { max: '1300px' },
            // => @media (max-width: 1023px) { ... }

            md: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            sm: { max: '639px' }
            // => @media (max-width: 639px) { ... }
        },
        fontFamily: {
            Barlow: ['Barlow']
        },
        extend: {
            padding: {
                '10vw': '10vw'
            },
            backdropSaturate: {
                180: '1.8'
            },
            keyframes: {
                bgMove: {
                    '0%': { 'background-position': '0% 0%' },
                    '100%': { 'background-position': '0% 80%' }
                }
            },
            animation: {
                'move-y': 'bgMove 30s infinite linear alternate'
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
}
