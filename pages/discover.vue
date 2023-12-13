<script setup lang="ts">
import { useRoute } from 'vue-router'

const selectedCity = useRoute().query.city

const { data } = await useFetch('/api/events', {
  query: {
    cityName: selectedCity
  }
})
</script>

<template>
  <div>
    <NavCitySelector v-model="selectedCity" />

    <PageSection title="Events" class="mt-4">
      <EventCarousel :items="data.events" />
    </PageSection>

    <PageSection title="Organisers" class="mt-4">
      <ProfileCarousel :items="data.organisers" />
    </PageSection>

    <PageSection title="Venues" class="mt-4">
      <ProfileCarousel :items="data.venues" />
    </PageSection>
  </div>
</template>
