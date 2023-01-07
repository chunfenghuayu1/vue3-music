/** @type {import('tailwindcss').Config} */
// 默认主题字体
const defaultTheme = require('tailwindcss/defaultTheme')
// 切换颜色包含透明度函数
function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}),${opacityValue})`
        }
        return `rgb(var(${variableName})`
    }
}
module.exports = {
    mode: 'jit',
    darkMode: 'class',
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
            Barlow: ['Barlow', ...defaultTheme.fontFamily.sans]
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
            },
            // 以下为主题设置
            backgroundColor: {
                theme: {
                    base: withOpacity('--color-base'),
                    baseActive: withOpacity('--color-baseActive'),
                    baseSecond: withOpacity('--color-baseSecond')
                }
            },
            textColor: {
                theme: {
                    base: withOpacity('--color-font'),
                    baseActive: withOpacity('--color-fontActive'),
                    baseSecond: withOpacity('--color-fontSecond')
                }
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
}
