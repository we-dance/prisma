<script setup>
const { items } = defineProps({
  items: Array
})
</script>

<template>
  <n-carousel
    :slides-per-view="4"
    :space-between="4"
    :loop="false"
    draggable
    mousewheel
  >
    <n-carousel-item
      v-for="item in items"
      :key="item.id"
    >
      <EventCardSmall
        :key="item.id"
        :event="item"
      />
    </n-carousel-item>
  </n-carousel>
</template>
