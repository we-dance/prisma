<script setup lang="ts">
const { slug } = useRoute().params;
const { $client } = useNuxtApp();
const shortId = slug.slice(-5);
const { data, error } = await $client.events.get.useQuery({ shortId });
</script>

<template>
  <EventView :event="data" v-if="data" />
  <div v-else>
    {{ error }}
  </div>
</template>
