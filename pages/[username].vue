<script setup lang="ts">
const { username, lng, lat, distance } = useRoute().params;
const { data: profile } = useFetch(`/api/profiles/${username}`);

const { data: events } = useFetch("/api/events", {
  query: {
    username,
    distance,
    lng: lng || null,
    lat: lat || null,
  },
});
</script>

<template>
  <CityProfile
    v-if="profile.type === 'City'"
    :profile="profile"
    :events="events"
  />
  <pre v-else>{{ profile }}</pre>
</template>
