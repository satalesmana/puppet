module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 'off',
    semi: [2, 'always'],
  },
};
