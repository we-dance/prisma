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
    <div v-if="events" class="grid p-4 border-t">
      <h2 class="text-xl font-bold">Festivals</h2>
      <div class="text-sm">Plan your year and explore the world</div>
      <ScrollArea class="mt-2 whitespace-nowrap">
        <div class="flex space-x-2 w-max">
          <CardVertical
            v-for="event in events"
            :key="event.id"
            :to="`/e/${event.slug}-${event.shortId}`"
            :image="event.cover"
            :title="event.styles.map((style) => style.name).join(', ')"
            :subtitle="d(event.startDate, 'short')"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    <div v-if="events" class="grid p-4 border-t">
      <h2 class="text-xl font-bold">Classes</h2>
      <div class="text-sm">Plan your month and improve your skills</div>
      <ScrollArea class="mt-2 whitespace-nowrap">
        <div class="flex space-x-2 w-max">
          <CardVertical
            v-for="event in events"
            :key="event.id"
            :to="`/e/${event.slug}-${event.shortId}`"
            :image="event.cover"
            :title="event.styles.map((style) => style.name).join(', ')"
            :subtitle="d(event.startDate, 'short')"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    <div v-if="events" class="grid p-4 border-t">
      <h2 class="text-xl font-bold">Parties</h2>
      <div class="text-sm">Plan your week and dance</div>
      <ScrollArea class="mt-2 whitespace-nowrap">
        <div class="flex space-x-2 w-max">
          <CardVertical
            v-for="event in events"
            :key="event.id"
            :to="`/e/${event.slug}-${event.shortId}`"
            :image="event.cover"
            :title="event.styles.map((style) => style.name).join(', ')"
            :subtitle="d(event.startDate, 'short')"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  </div>
</template>
