<script setup lang="ts">
const calendar = useCalendar()
onMounted(calendar.load)
</script>

<template>
  <div class="max-w-md m-auto border my-4">
    <EventCard
      v-for="event in calendar.data"
      :key="event.id"
      :event="event"
    />
  </div>
</template>
