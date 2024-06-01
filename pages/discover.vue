<script setup lang="ts">
const route = useRoute()

const { data, pending, error } = await useFetch('/api/events', {
  query: {
    cityName: route.query.city || '',
    dance: route.query.dance || ''
  }
})
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <EventList
    v-else
    :items="data.events"
  />
</template>
