<script setup lang="ts">
import { useRoute } from 'vue-router'

const { data: cities } = await useFetch('/api/profiles', {
  query: {
    type: 'City'
  }
})

const selectedCity = useRoute().query.city

const { data: profile } = await useFetch(`/api/profiles/${selectedCity}`)

const { data } = await useFetch('/api/events', {
  query: {
    cityName: selectedCity
  }
})
</script>

<template>
  <div>
    <n-select
      v-model:value="selectedCity"
      filterable
      placeholder="Select a city"
      label-field="name"
      value-field="username"
      :options="cities"
      @update:value="val => $router.push({ query: { city: val}})"
    />

    <div v-for="group in data.groups" :key="group.style.hashtag" class="mt-4">
      <div class="text-lg font-bold">
        {{ group.style.name }}
      </div>
      <n-scrollbar x-scrollable>
        <div class="flex">
          <EventCardSmall
            v-for="event in group.events"
            :key="event.id"
            :event="event"
          />
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>
