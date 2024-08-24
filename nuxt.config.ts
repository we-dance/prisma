import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // debug: true,
  // ssr: false,

  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "shadcn-nuxt",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "nuxt-purgecss",
  ],

  robots: {
    disallow: ["/signin", "/admin"],
  },

  auth: {
    provider: {
      type: "authjs",
    },
    // origin: "http://localhost:3000",
  },

  sourcemap: {
    server: true,
    client: true,
  },

  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/djumxevsm/image/upload/",
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
      baseUrl: process.env.BASE_URL,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      posthogPublicKey: "phc_N7rtjDNLzyAGTOkhwhPBrEPybpxBwLlMpfPI9j1xZWB",
      posthogHost: "https://eu.i.posthog.com",
      posthogDisabled: true,
      posthogDebug: false,
    },
  },

  vite: {
    plugins: [svgLoader()],
  },

  compatibilityDate: "2024-08-04",

  i18n: {
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.yml" },
      { code: "es", language: "es-ES", name: "Español", file: "es.yml" },
      { code: "de", language: "de-DE", name: "Deutsch", file: "de.yml" },
      { code: "fr", language: "fr-FR", name: "Français", file: "fr.yml" },
      { code: "it", language: "it-IT", name: "Italiano", file: "it.yml" },
      { code: "pl", language: "pl-PL", name: "Polski", file: "pl.yml" },
      { code: "pt", language: "pt-PT", name: "Português", file: "pt.yml" },
      { code: "ro", language: "ro-RO", name: "Română", file: "ro.yml" },
      { code: "tr", language: "tr-TR", name: "Türkçe", file: "tr.yml" },
      { code: "ru", language: "ru-RU", name: "Русский", file: "ru.yml" },
      { code: "sr", language: "sr-RS", name: "Српски", file: "sr.yml" },
    ],
    defaultLocale: "en",
    langDir: "locales",
  },
});
