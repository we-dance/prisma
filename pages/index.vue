<script setup lang="ts">
import { z } from "zod";
const { $client } = useNuxtApp();
const { t } = useI18n();

const schema = z.object({
  style: z.string().optional(),
});

const { style } = schema.parse(useRoute().params);

const { data } = await $client.events.listAll.useQuery({
  style,
  type: "Festival",
});

const view = "global";

useHead({
  title: t(`explore.${view}.title`, {
    style,
  }),
  titleTemplate: t("titleTemplate.calendar"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t(`explore.${view}.description`, {
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
            style,
          })
        }}
      </h1>

      <div class="text-sm">
        {{
          t(`explore.${view}.subheader`, {
            style: style || "",
          })
        }}
      </div>
    </div>
    <EventList :items="data.events" />
  </div>
</template>
