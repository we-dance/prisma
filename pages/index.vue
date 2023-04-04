<script setup lang="ts">
const { data } = useFetch('/api/events')
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
