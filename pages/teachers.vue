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
  <div class="space-y-4">
    <ProfileCard
      v-for="item in data.teachers"
      :key="item.id"
      :profile="item"
    />
  </div>
</template>
