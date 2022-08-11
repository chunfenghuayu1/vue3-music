// function withOpacity(variableName) {
//     return ({ opacityValue }) => {
//         if (opacityValue !== undefined) {
//             return `rgba(var(${variableName}),${opacityValue})`
//         }
//         return `rgb(var(${variableName})`
//     }
// }

module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            // textColor: {
            //     skin: {
            //         base: 'var(--color-text-base)',
            //         muted: 'var(--color-text-muted)',
            //         inverted: 'var(--color-text-inverted)'
            //     }
            // },
            // backgroundColor: {
            //     skin: {
            //         fill: 'var(--color-fill)',
            //         'button-accent': 'var(--color-button-accent)',
            //         'button-accent-hover': 'var(--color-button-accent-hover)',
            //         'button-muted': withOpacity('--color-button-muted')
            //     },
            //     gradientColorStops: {
            //         skin: {
            //             hue: 'var(--color-fill)'
            //         }
            //     }
            // }
        },
        variants: {
            extend: {}
        },
        plugins: []
    }
}
