import svgLoader from "vite-svg-loader";
import { z } from "zod";

const envSchema = z.object({
  BASE_URL: z.string().url(),
  GOOGLE_MAPS_API_KEY: z.string().min(1),
  GOOGLE_MAPS_API_KEY_BACKEND: z.string().min(1),
  POSTHOG_PUBLIC_KEY: z.string().min(1),
  POSTHOG_HOST: z.string().min(1),
  POSTHOG_DISABLED: z.preprocess((val) => val === "true", z.boolean()),
  POSTHOG_DEBUG: z.preprocess((val) => val === "true", z.boolean()),
});

const env = envSchema.parse(process.env);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: true,
  ssr: false,

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
    googleMapsApiKeyBackend: env.GOOGLE_MAPS_API_KEY_BACKEND,
    public: {
      baseUrl: env.BASE_URL,
      googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
      posthogPublicKey: env.POSTHOG_PUBLIC_KEY,
      posthogHost: env.POSTHOG_HOST,
      posthogDisabled: env.POSTHOG_DISABLED,
      posthogDebug: env.POSTHOG_DEBUG,
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
