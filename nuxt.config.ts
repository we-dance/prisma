// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@bg-dev/nuxt-naiveui',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth'
  ],
  auth: {
    provider: {
      type: 'authjs'
    }
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
  ui: {
    global: true
  }
})
