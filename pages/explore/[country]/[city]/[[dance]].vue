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
  city,
  country,
});

const view = "parties";

useHead({
  title: t(`explore.${view}.title`, {
    city: data.value.cityProfile.name,
    style,
  }),
  titleTemplate: t("titleTemplate.calendar"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t(`explore.${view}.description`, {
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
    <div v-if="data.events" class="w-full">
      <EventListByVenue :events="data.events" />
    </div>
  </div>
</template>
