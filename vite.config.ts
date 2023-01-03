import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
// import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
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
import { resolve } from 'path'
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname)
    return {
        root: './', //项目根目录
        base: env.VITE_MODE_NAME === 'development' ? '/' : './', //项目基础路径
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
                // 要搜索组件的目录的相对路径
                dirs: ['src/components', 'src/views'],
                // 组件的有效文件扩展名。
                extensions: ['vue'],
                // 搜索子目录
                deep: true,
                // 自定义组件的解析器
                resolvers: [ElementPlusResolver()],
                // 生成 `components.d.ts` 全局声明，
                // 也接受自定义文件名的路径
                dts: true,
                // 允许子目录作为组件的命名空间前缀。
                directoryAsNamespace: false,
                // 自动导入指令
                // 默认值：Vue 3 的`true`，Vue 2 的`false`
                // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
                directives: true,
                // 忽略命名空间前缀的子目录路径
                // 当`directoryAsNamespace: true` 时有效
                globalNamespaces: [],
                // filters for transforming targets
                include: [/.vue$/, /.vue?vue/],
                // eslint-disable-next-line no-useless-escape
                exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/]
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
            })
            // visualizer({
            //     gzipSize: true,
            //     brotliSize: true,
            //     emitFile: false,
            //     filename: 'test.html', //分析图生成的文件名
            //     open: true //如果存在本地服务端口，将在打包后自动展示
            // }) as PluginOption
        ],
        build: {
            outDir: 'dist',
            // minify: 'terser',
            assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
            chunkSizeWarningLimit: 500,
            cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
            terserOptions: {
                ecma: 2015,
                compress: {
                    //生产环境时移除console
                    drop_console: true,
                    drop_debugger: true
                }
            },
            rollupOptions: {
                maxParallelFileOps: 5,
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks: {
                        // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
                        plyr: ['plyr'],
                        swiper: ['swiper/vue'],
                        lodash: ['lodash']
                    }
                }
            }
        },
        resolve: {
            // 解决路径问题
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        // 配置代理
        server: {
            host: '127.0.0.1',
            port: 8800,
            open: env.VITE_MODE_NAME === 'development',
            proxy: {
                '/dev-api': {
                    target: 'http://120.48.31.206:3000/',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/dev-api/, '')
                }
            }
        }
    }
})
