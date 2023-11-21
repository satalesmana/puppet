// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0' },
      ],
    },
  },
  css: ['@/assets/custom.scss'],
  devtools: { enabled: false },
  plugins:[
    {src:'~/plugins/vue-awesome-sidebar.ts',  mode: 'client'}
  ],
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  runtimeConfig: {
    saltRounds:10,
    mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://satalesmana:SY1COKkW7A98vSzk@cluster0.oe59k.mongodb.net/puppet',
    secretKey: process.env.SECRET_KEY || 'asdf'
  },
  modules: ['nuxt-quasar-ui'],
  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },
});


