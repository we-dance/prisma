<script setup lang="ts">
const route = useRoute()

const { data } = await useFetch('/api/events', {
  query: {
    cityName: route.query.city || ''
  }
})
</script>

<template>
  <UContainer class="max-w-xl">
    <div class="space-y-4">
      <ProfileCard
        v-for="item in data.organisers"
        :key="item.id"
        :profile="item"
      />
    </div>
  </UContainer>
</template>
