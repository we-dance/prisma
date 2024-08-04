// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth", "shadcn-nuxt", "@nuxt/image"],
  auth: {
    provider: {
      type: "authjs",
    },
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  typescript: {
    shim: false,
  },
  imports: {
    dirs: ["./stores"],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
});