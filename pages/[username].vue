<script setup lang="ts">
const { username } = useRoute().params
const { data } = useFetch(`/api/profiles/${username}`)
</script>

<template>
  <div class="max-w-md m-auto border my-4">
    <pre>{{ data }}</pre>
  </div>
</template>
