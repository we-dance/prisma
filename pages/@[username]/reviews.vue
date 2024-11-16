<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { profile } = useProfilePage();
</script>

<template>
  <NuxtLayout name="profile" :profile="profile">
    <Empty message="Not implemented" />
  </NuxtLayout>
</template>
