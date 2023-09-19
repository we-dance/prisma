<script setup lang="ts">
import { useRoute } from 'vue-router'

const { data: cities } = await useFetch('/api/profiles', {
  query: {
    type: 'City'
  }
})

const selectedCity = useRoute().query.city

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

    <div class="mt-4">
      <div class="text-lg font-bold">
        Events
      </div>
      <n-scrollbar x-scrollable>
        <div class="flex">
          <EventCardSmall
            v-for="event in data.events"
            :key="event.id"
            :event="event"
          />
        </div>
      </n-scrollbar>
    </div>

    <div class="mt-4">
      <div class="text-lg font-bold">
        Organisers
      </div>
      <n-scrollbar x-scrollable>
        <div class="flex">
          <CardSmall
            v-for="organiser in data.organisers"
            :key="organiser.id"
            :link="`/${organiser.username}`"
            :image="organiser.photo"
            :text="organiser.name"
          />
        </div>
      </n-scrollbar>
    </div>

    <div class="mt-4">
      <div class="text-lg font-bold">
        Venues
      </div>
      <n-scrollbar x-scrollable>
        <div class="flex">
          <CardSmall
            v-for="venue in data.venues"
            :key="venue.id"
            :link="`/${venue.username}`"
            :image="venue.photo"
            :text="venue.name"
          />
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>
