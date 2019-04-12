module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  plugins: ['vue', 'html'],
  rules: {
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    'strict': 0,
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-unused-vars': 'error',
    'one-var': 0
  }
}