<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch('/api/events', {
  query: {
    cityName: route.query.city || '',
    dance: route.query.dance || ''
  }
})
</script>

<template>
  <EventList
    :items="data.events"
  />
</template>
