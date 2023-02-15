import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
// eslint插件
import eslintPlugin from '@nabla/vite-plugin-eslint'
// api自动引入
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动引入
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve, parse } from 'path'
// import { visualizer } from 'rollup-plugin-visualizer'
// import viteCompression from 'vite-plugin-compression'

rmSync('dist-electron', { recursive: true, force: true })

const isDevelopment = process.env.NODE_ENV === 'development' || !!process.env.VSCODE_DEBUG
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
    root: './', //项目根目录
    // 不能修改，否则会出现未知问题
    // base: '/', //项目基础路径
    base: isProduction ? './' : '/',

    plugins: [
        vue(),
        // 导入样式
        ElementPlus(),
        // 增加下面的配置项,这样在运行时就能检查eslint规范
        eslintPlugin({
            eslintOptions: {
                cache: false
            }
        }),
        // api自动引入
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
            ],
            // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
            // dts: 'src/auto-import.d.ts'
            imports: ['vue', 'vue-router', 'pinia'],
            // 必须声明
            dts: 'auto-import.d.ts',
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
            resolvers: [ElementPlusResolver()]
        }),
        // 组件自动引入
        Components({
            // // 自定义组件的解析器
            resolvers: [ElementPlusResolver()]
        }),
        // 增加svg处理插件
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[name]',

            /**
             * 自定义插入位置
             * @default: body-last
             */
            inject: 'body-first'

            /**
             * custom dom id
             * @default: __svg__icons__dom__
             */
            // customDomId: '__svg__icons__dom__',
        }),
        electron([
            {
                // Main-Process entry file of the Electron App.
                entry: 'electron/main/index.ts',
                onstart(options) {
                    if (process.env.VSCODE_DEBUG) {
                        console.log(/* For `.vscode/.debug.script.mjs` */ '[startup] Electron App')
                    } else {
                        options.startup()
                    }
                },
                vite: {
                    build: {
                        sourcemap: isDevelopment,
                        minify: isProduction,
                        outDir: 'dist-electron/main',
                        rollupOptions: {
                            external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
                        }
                    }
                }
            },
            {
                entry: 'electron/preload/index.ts',
                onstart(options) {
                    // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
                    // instead of restarting the entire Electron App.
                    options.reload()
                },
                vite: {
                    build: {
                        sourcemap: isDevelopment,
                        minify: isProduction,
                        outDir: 'dist-electron/preload',
                        rollupOptions: {
                            external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
                        }
                    }
                }
            }
        ]),
        // Use Node.js API in the Renderer-process
        renderer({
            nodeIntegration: false
        })
    ],
    build: {
        target: 'es2015',
        outDir: 'dist',
        minify: 'terser',
        manifest: true,
        assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
        chunkSizeWarningLimit: 500,
        cssCodeSplit: false, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
        terserOptions: {
            ecma: 2015,
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
                dead_code: true,
                toplevel: true
            },
            output: {
                comments: false
            }
        },
        rollupOptions: {
            maxParallelFileOps: 3,
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/bundle.js',
                assetFileNames: ({ name }) => {
                    const { ext } = parse(name)
                    if (ext === '.css') return 'style/[name].[ext]'
                    if (ext === '.ttf' || ext === '.woff2') return 'fonts/[name].[ext]'
                    return '[ext]/[name]-[hash].[ext]'
                },
                manualChunks: {
                    // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
                    common: ['vue-lazyload', 'js-cookie', 'axios'],
                    plyr: ['plyr'],
                    swiper: ['swiper', 'swiper/vue']
                }
            }
        }
    },
    // 配置代理
    server: {
        host: '127.0.0.1',
        port: 5173,
        open: !isDevelopment,
        proxy: {
            '/dev-api': {
                target: 'http://127.0.0.1:20231/',
                changeOrigin: true
            }
        }
    },
    resolve: {
        // 解决路径问题
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components'),
            '@utils': resolve(__dirname, './src/utils'),
            '@views': resolve(__dirname, './src/views'),
            '@stores': resolve(__dirname, './src/stores'),
            '@api': resolve(__dirname, './src/api'),
            '@router': resolve(__dirname, './src/router'),
            '@assets': resolve(__dirname, './src/assets')
        }
    },
    clearScreen: false
})
