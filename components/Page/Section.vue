<script setup>
defineProps({
  title: String
})
</script>

<template>
  <div>
    <h3 class="text-lg font-bold">
      {{ title }}
    </h3>
    <div>
      <slot />
    </div>
  </div>
</template>
