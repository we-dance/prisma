<script setup lang="ts">
const route = useRoute()
const { $client } = useNuxtApp()

const { data, error } = await $client.profiles.get.useQuery({ username: route.params.username })
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <pre
    v-else
  >
  {{ data }}</pre>
</template>
