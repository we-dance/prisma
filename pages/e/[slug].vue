<script setup lang="ts">
const { slug } = useRoute().params;
const { $client } = useNuxtApp();
const shortId = slug.slice(-5);
const { data, error } = await $client.events.get.useQuery({ shortId });
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <pre v-else>{{ data }}</pre>
</template>
