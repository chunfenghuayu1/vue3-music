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
        extend: {
            textColor: {
                skin: {
                    base: withOpacity('--color-text-base'),
                    primary: withOpacity('--color-text-primary'),
                    secondary: withOpacity('--color-text-secondary'),
                    tertiary: withOpacity('--color-text-tertiary')
                }
            },
            backgroundColor: {
                skin: {
                    base: withOpacity('--color-text-base'),
                    primary: withOpacity('--color-text-primary'),
                    secondary: withOpacity('--color-text-secondary'),
                    tertiary: withOpacity('--color-text-tertiary')
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
                    '100%': { 'background-position': '0% 100%' }
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
            }
        },
        variants: {
            extend: {}
        },
        plugins: []
    }
}
