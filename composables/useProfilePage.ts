import { z } from "zod";

const schema = z.object({
  username: z.string(),
});

export function useProfilePage() {
  const { $client } = useNuxtApp();
  const route = useRoute();

  const { username } = schema.parse(route.params);

  const profile = ref({});
  const events = ref([]);

  async function execute() {
    const data = await $client.profiles.get.query({
      username,
    });

    profile.value = data?.profile;
    events.value = data?.events;

    console.log({ profile: profile.value, events: events.value });

    if (!profile.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Profile not found",
      });
    }
  }

  execute();

  return {
    username,
    profile,
    events,
  };
}
