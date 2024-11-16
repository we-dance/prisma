<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { d } = useI18n();
const { profile, events } = useProfilePage();
</script>

<template>
  <NuxtLayout name="profile" :profile="profile">
    <EventListHorizontal :events="events" />
    <EventListByDate :events="events" />
  </NuxtLayout>
</template>
