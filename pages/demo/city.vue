<script setup>
const data = ref("");
</script>
<template>
  <div>
    <CityInput v-model="data" />
    <pre class="pt-4">{{ data }}</pre>
  </div>
</template>
