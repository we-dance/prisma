<script setup lang="ts">
import { z } from "zod";
const { $client } = useNuxtApp();
const { t } = useI18n();

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
  <div>
    <div class="p-4">
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
    </div>
    <div v-if="events" class="w-full">
      <div class="border-t">
        <EventCard2Cols
          v-for="event in events"
          :key="event.id"
          :event="event"
          side="time"
        />
      </div>
    </div>
  </div>
</template>
