<script setup lang="ts">
const { data } = useFetch('/api/events', {
  query: {
    startDate: '2023-04-03',
    endDate: '2023-04-09'
  }
})
</script>

<template>
  <div class="max-w-md m-auto border my-4">
    <EventCard
      v-for="event in data"
      :key="event.id"
      :event="event"
    />
  </div>
</template>
