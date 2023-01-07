/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential', // 使用插件支持vue3
        'eslint:recommended', //使用推荐的eslint
        '@vue/eslint-config-typescript', //支持ts
        '@vue/eslint-config-prettier', //处理prettier和eslint冲突
        './.eslintrc-auto-import.json'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    // 解决prop问题
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    // 配置规则
    rules: {
        semi: ['warn', 'never'], // 禁止尾部使用分号
        eqeqeq: 'warn', // 要求使用 === 和 !==
        indent: ['warn', 4], // 要求使用JS一致缩进4个空格
        'vue/max-attributes-per-line': ['warn', { singleline: 5 }], // 要求每一行标签的最大属性不超五个
        'vue/multi-word-component-names': 'off'
    }
}
