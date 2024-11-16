<script setup lang="ts">
withDefaults(
  defineProps<{
    dividers?: boolean;
    border?: boolean;
  }>(),
  {
    dividers: true,
    border: true,
  }
);
</script>

<template>
  <nav
    class="isolate flex"
    :class="{
      'divide-x divide-gray-200': dividers,
      'shadow border-t': border,
    }"
    aria-label="Tabs"
  >
    <slot />
  </nav>
</template>
