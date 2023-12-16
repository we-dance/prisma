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
      <n-card embedded size="small">
        <template #cover>
          <img v-if="item.photo" :src="item.photo">
          <div v-else class="bg-gray-300 w-full" />
        </template>
        <div class="py-2">
          {{ item.name }}
        </div>
      </n-card>
    </n-carousel-item>
  </n-carousel>
</template>
