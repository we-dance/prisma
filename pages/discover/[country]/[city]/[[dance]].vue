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

const { data } = await $client.events.list.useQuery({
  country,
  city,
  style,
});

const view = "parties";

useHead({
  title: t(`explore.${view}.title`, { city, style }),
  titleTemplate: t("titleTemplate.calendar"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t(`explore.${view}.description`, {
        city,
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
            city,
            style,
          })
        }}
      </h1>

      <div class="text-sm">
        {{
          t(`explore.${view}.subheader`, {
            city,
            style: style || "dance",
          })
        }}
      </div>
    </div>
    <EventList :items="data.events" />
  </div>
</template>
