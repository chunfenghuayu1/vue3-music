import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' //导入包eslint
import { resolve } from 'path'
// elementplus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 修改title 可进行html的压缩
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname)
    // console.log(env)
    return {
        root: './',
        base: '/',
        publicDir: './public',
        plugins: [
            vue(),
            // 增加下面的配置项,这样在运行时就能检查eslint规范
            eslintPlugin({
                include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
            }),
            AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/ // .md
                ],
                // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
                // dts: 'src/auto-import.d.ts'
                imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core', 'pinia'],
                // 必须声明
                dts: 'auto-import.d.ts',
                eslintrc: {
                    enabled: true, // Default `false`
                    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                    globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
                },
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                // 要搜索组件的目录的相对路径
                dirs: ['src/components', 'src/views', 'src/layout'],
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
            createStyleImportPlugin({
                resolves: [ElementPlusResolve()]
            }),
            // 修改title
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: env.VITE_APP_TITLE
                    }
                }
            }),
            // 增加svg处理插件
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [resolve(process.cwd(), 'src/icons')],
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
        ],
        // 解决路径问题
        resolve: {
            alias: {
                '@': resolve(__dirname, './src')
            }
        },
        // 配置代理
        server: {
            host: '127.0.0.1',
            port: 8800,
            open: env.VITE_MODE_NAME === 'development',
            proxy: {
                '/dev-api': {
                    target: 'http://127.0.0.1:3000/',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/dev-api/, '')
                }
            }
        }
    }
})
