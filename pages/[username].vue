<script setup lang="ts">
import { useRoute } from 'vue-router'

const { data: cities } = await useFetch('/api/profiles', {
  query: {
    type: 'City'
  }
})

const cityOptions = cities.value.map(city => ({
  label: city.name,
  value: city.username
}))

const { username } = useRoute().params
const { data: profile } = await useFetch(`/api/profiles/${username}`)

const { data } = await useFetch('/api/events', {
  query: {
    cityName: username
  }
})

const selectedValue = ref(username)

</script>

<template>
  <n-select
    v-model:value="selectedValue"
    filterable
    placeholder="Select a city"
    :options="cityOptions"
  />
  <CityProfile v-if="profile.type === 'City'" :profile="profile" :events="data.events" />
  <pre v-else>{{ profile }}</pre>
</template>
