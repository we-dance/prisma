import posthog from "posthog-js-lite";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost,
    person_profiles: "identified_only",
    capture_pageview: false, // we add manual pageview capturing below
    loaded: (posthog) => {
      if (import.meta.env.MODE === "development") posthog.debug();
    },
  });

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture("$pageview", {
        current_url: to.fullPath,
      });
    });
  });

  return {
    provide: {
      posthog: () => posthogClient,
      track: (...params) => {
        posthogClient.capture(...params);
      },
    },
  };
});
