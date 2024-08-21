<script setup>
const props = defineProps({
  events: Array,
});
</script>

<template>
  <div v-for="item in events" :key="item.id">
    <EventCard :key="item.id" :event="item" side="date" />
  </div>
</template>
