<script setup>
const { data: cities } = await useFetch('/api/profiles', {
  query: {
    type: 'City'
  }
})
</script>

<template>
  <!-- <n-select
    v-model:value="selectedCity"
    filterable
    placeholder="Select a city"
    label-field="name"
    value-field="username"
    :options="cities"
    @update:value="val => $router.push({ query: { city: val}})"
  /> -->
  <div class="border p-2">
    select from {{ cities.length }} cities
  </div>
</template>
