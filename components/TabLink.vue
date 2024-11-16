<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  to: string;
}>();

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
  <NuxtLink
    :to="to"
    class="group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
  >
    <slot />
    <span
      aria-hidden="true"
      :class="[
        isActive ? 'bg-primary' : 'bg-transparent',
        'absolute inset-x-0 bottom-0 h-0.5',
      ]"
    />
  </NuxtLink>
</template>
