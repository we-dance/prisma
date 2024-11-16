<script setup lang="ts">
defineProps<{
  place: any;
}>();
</script>

<template>
  <NuxtLink :to="`/cities/${place.slug}`">{{ place.name }}</NuxtLink>
</template>
