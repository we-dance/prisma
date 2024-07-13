<script setup>
definePageMeta({
  layout: "design-system",
});

const data = ref("");
</script>
<template>
  <div>
    <CityInput v-model="data" />
    <pre class="pt-4">{{ data }}</pre>
  </div>
</template>
