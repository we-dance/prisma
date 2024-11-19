// import PostHog from "posthog-js-lite";

export default defineNuxtPlugin((nuxtApp) => {
  // const runtimeConfig = useRuntimeConfig();
  // const posthog = new PostHog(runtimeConfig.public.posthogPublicKey, {
  //   disabled: runtimeConfig.public.posthogDisabled,
  //   api_host: runtimeConfig.public.posthogHost,
  //   person_profiles: "identified_only",
  //   capture_pageview: false, // we add manual pageview capturing below
  //   loaded: (posthog) => {
  //     if (runtimeConfig.public.posthogDebug) posthog.debug();
  //   },
  // });

  // // Make sure that pageviews are captured with each route change
  // const router = useRouter();
  // router.afterEach((to) => {
  //   nextTick(() => {
  //     posthog.capture("$pageview", {
  //       current_url: to.fullPath,
  //     });
  //   });
  // });

  return {
    provide: {
      // posthog: () => posthog,
      track: (...params) => {
        // posthog.capture(...params);
      },
    },
  };
});
