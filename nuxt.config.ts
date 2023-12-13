// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@huntersofbook/naive-ui-nuxt',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth'
  ],
  auth: {
    provider: {
      type: 'authjs'
    }
    // globalAppMiddleware: {
    //   isEnabled: true
    // }
  },
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  typescript: {
    shim: false
  },
  imports: {
    dirs: ['./stores']
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  }
})
