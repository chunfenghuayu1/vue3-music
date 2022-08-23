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
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        screens: {
            '2xl': { max: '1535px' },
            // => @media (max-width: 1535px) { ... }

            xl: { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            lg: { max: '1023px' },
            // => @media (max-width: 1023px) { ... }

            md: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            sm: { max: '639px' }
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            textColor: {
                skin: {
                    base: withOpacity('--color-text-base'),
                    primary: withOpacity('--color-text-primary'),
                    secondary: withOpacity('--color-text-secondary'),
                    tertiary: withOpacity('--color-text-tertiary'),
                    base1: withOpacity('--color-text-base1'),
                    base2: withOpacity('--color-text-base2')
                }
            },
            backgroundColor: {
                skin: {
                    base: withOpacity('--color-text-base'),
                    primary: withOpacity('--color-text-primary'),
                    secondary: withOpacity('--color-text-secondary'),
                    tertiary: withOpacity('--color-text-tertiary'),
                    base1: withOpacity('--color-text-base1'),
                    base2: withOpacity('--color-text-base2')
                }
            },
            borderColor: {
                skin: {
                    base: withOpacity('--color-text-base'),
                    primary: withOpacity('--color-text-primary'),
                    secondary: withOpacity('--color-text-secondary'),
                    tertiary: withOpacity('--color-text-tertiary')
                }
            },
            keyframes: {
                pagination: {
                    '100%': { width: '20px' }
                },
                bgMove: {
                    '0%': { 'background-position': '0% 0%' },
                    '100%': { 'background-position': '0% 80%' }
                }
            },
            animation: {
                widthChange: 'pagination 0.2s linear forwards',
                'move-y': 'bgMove 30s linear forwards'
            },
            padding: {
                vw: '10vw',
                '1/20': '5%',
                '7/20': '3.5%'
            },
            saturate: {
                180: '1.8'
            },
            minWidth: {
                24: '6rem'
            }
        },
        variants: {
            extend: {}
        },
        corePlugins: {
            aspectRatio: false
        },
        plugins: []
    }
}
