<script setup lang="ts">
const route = useRoute();
const { $client } = useNuxtApp();

const { data, error } = await $client.events.list.useQuery({
  country: route.params.country,
  city: route.params.city,
  dance: route.params.dance,
});
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <EventList v-else :items="data" />
</template>
