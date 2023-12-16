<script setup>
const { items } = defineProps({
  items: Array
})
</script>

<template>
  <div>
    <EventCard
      v-for="item in items"
      :key="item.id"
      :event="item"
    />
  </div>
</template>
