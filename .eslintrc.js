module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 强制使用箭头函数
    'prefer-arrow-callback': 'error',
    'func-style': ['error', 'expression'],
    // 禁止使用var
    'no-var': 'error',
    // 强制使用const
    'prefer-const': 'error',
    // Vue规则
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off'
  }
}