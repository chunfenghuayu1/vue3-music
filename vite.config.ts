import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname)
    return {
        root: './', //项目根目录
        base: '/', //项目基础路径
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
                    enabled: false, // Default `false`
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
        ],
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
