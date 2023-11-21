module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    extends: [
      '@nuxtjs/eslint-config-typescript',
      'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/no-v-html': 'off',
      semi: [2, 'always']
    }
  };