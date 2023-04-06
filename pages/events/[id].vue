<script setup lang="ts">
const { id } = useRoute().params
const { data } = useFetch(`/api/events/${id}`)
</script>

<template>
  <div class="max-w-md m-auto border my-4">
    <pre>{{ data }}</pre>
  </div>
</template>
