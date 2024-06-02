<script setup lang="ts">
const route = useRoute()
const { $client } = useNuxtApp()

const { data, error } = await $client.events.list.useQuery({ city: route.query.city, dance: route.query.dance })
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <EventList
    v-else
    :items="data"
  />
</template>
