<script setup>
const { items } = defineProps({
  items: Array
})
</script>

<template>
  <div class="flex">
    <EventCardSmall
      v-for="event in items"
      :key="event.id"
      :event="event"
    />
  </div>
</template>
