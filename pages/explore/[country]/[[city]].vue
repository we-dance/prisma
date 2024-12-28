<script setup lang="ts">
import { z } from "zod";
const { $client } = useNuxtApp();
const { t, d } = useI18n();

const schema = z.object({
  city: z.string(),
  country: z.string(),
  style: z.string().optional(),
});

const { country, city, style } = schema.parse(useRoute().params);

const { data, error } = await $client.events.list.useQuery({
  city,
  country,
  start: "2024-07-01T00:00:00Z",
});

const events = computed(() => data.value?.events);

if (!data?.value || error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: error.value?.message,
  });
}

const view = "parties";

useHead({
  title: t(`explore.${view}.header`, {
    city: data.value.cityProfile.name,
    style,
  }),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t(`explore.${view}.subheader`, {
        city: data.value.cityProfile.name,
        style,
        referenceStyle: style || "Salsa",
      }),
    },
  ],
});
</script>

<template>
  <div class="container bg-white max-w-lg my-4 p-4 rounded">
    <h1 class="text-2xl font-bold">
      {{
        t(`explore.${view}.header`, {
          city: data.cityProfile.name,
          style,
        })
      }}
    </h1>

    <div class="text-sm">
      {{
        t(`explore.${view}.subheader`, {
          city: data.cityProfile.name,
          style: style || "dance",
        })
      }}
    </div>
    <EventListByDate v-if="events" :events="events" class="border-t mt-4" />
  </div>
</template>
