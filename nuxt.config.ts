// https://nuxt.com/docs/api/configuration/nuxt-config
import functions from './server/socket';

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0',
        },
      ],
    },
  },
  css: ['@/assets/custom.scss'],
  devtools: { enabled: false },
  plugins: [
    { src: '~/plugins/fetch-api.ts', mode: 'client' },
    { src: '~/plugins/vue-awesome-sidebar.ts', mode: 'client' },
  ],
  nitro: {
    plugins: ['~/server/index.ts'],
    output: {
      dir: '../puppet-build'
    }

  },
  runtimeConfig: {
    saltRounds: 10,
    mongodbUri: process.env.NUXT_MONGODB_URI,
    secretKey: process.env.NUXT_SECRET_KEY || 'rahasia',
    browserPath: process.env.NUXT_BROWSER_PATH,
  },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-internal-socket',
  ],
  socketIO: {
    /** Required */
    socketFunctions: functions,
    /** Optional - these are the defaults
     * managerOptions is of type ManagerOptions from the socket.io-client library
     */
    clientOptions: {
      uri: '/', // If you want to connect to a different server than the one created by this plugin
      managerOptions: {},
    },
  },
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
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
    },
    endpoints: {
      getSession: { path: '/api/auth/user' },
    },
  },
  hooks: {
    close: () => {
      process.exit(0)
    },
  },
});

// ngrok http --domain=present-pleasing-vervet.ngrok-free.app 3000
