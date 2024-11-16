<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { profile } = useProfilePage();
</script>

<template>
  <NuxtLayout name="profile" :profile="profile">
    <TProfileDetails :profile="profile" />
  </NuxtLayout>
</template>
