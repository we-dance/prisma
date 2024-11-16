<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { profile, events } = useProfilePage();
</script>

<template>
  <NuxtLayout name="profile" :profile="profile">
    <EventListHorizontal :events="events" />
    <EventListByDate :events="events" />
  </NuxtLayout>
</template>
