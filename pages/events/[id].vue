<script setup lang="ts">
const { id } = useRoute().params
const { data } = useFetch(`/api/events/${id}`)
</script>

<template>
  <pre>{{ data }}</pre>
</template>
