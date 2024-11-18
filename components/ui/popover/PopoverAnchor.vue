<script setup lang="ts">
import { PopoverAnchor, type PopoverAnchorProps } from "radix-vue";

const props = defineProps<PopoverAnchorProps>();
</script>

<template>
  <PopoverAnchor v-bind="props">
    <slot />
  </PopoverAnchor>
</template>
