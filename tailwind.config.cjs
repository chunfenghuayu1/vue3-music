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
                }
            },
            animation: {
                widthChange: 'pagination 0.2s linear forwards'
            }
        },
        variants: {
            extend: {}
        },
        plugins: []
    }
}
