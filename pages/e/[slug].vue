<script setup lang="ts">
const { slug } = useRoute().params;
const { $client } = useNuxtApp();
const shortId = slug.slice(-5);
const { data, error } = await $client.events.get.useQuery({ shortId });
</script>

<template>
  <div v-if="data">
    <EventView :event="data" />
    <pre>{{ data }}</pre>
  </div>

  <div v-else>
    {{ error }}
  </div>
</template>
