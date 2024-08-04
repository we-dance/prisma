import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "shadcn-nuxt",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/i18n",
  ],

  auth: {
    provider: {
      type: "authjs",
    },
    // origin: "http://localhost:3000",
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

  vite: {
    plugins: [svgLoader()],
  },

  compatibilityDate: "2024-08-04",

  i18n: {
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.yml" },
      { code: "es", iso: "es-ES", name: "Español", file: "es.yml" },
      { code: "de", iso: "de-DE", name: "Deutsch", file: "de.yml" },
      { code: "fr", iso: "fr-FR", name: "Français", file: "fr.yml" },
      { code: "it", iso: "it-IT", name: "Italiano", file: "it.yml" },
      { code: "pl", iso: "pl-PL", name: "Polski", file: "pl.yml" },
      { code: "pt", iso: "pt-PT", name: "Português", file: "pt.yml" },
      { code: "ro", iso: "ro-RO", name: "Română", file: "ro.yml" },
      { code: "tr", iso: "tr-TR", name: "Türkçe", file: "tr.yml" },
      { code: "ru", iso: "ru-RU", name: "Русский", file: "ru.yml" },
      { code: "sr", iso: "sr-RS", name: "Српски", file: "sr.yml" },
    ],
    defaultLocale: "en",
    langDir: "locales",
  },
});
