<script setup lang="ts">
defineProps<{
  image?: string,
  link?: string,
  text?: string
}>()
</script>

<template>
  <NuxtLink
    :to="link"
    class="p-2 leading-none gap-2 w-20 overflow-hidden"
  >
    <div>
      <n-image
        class="w-20 rounded"
        lazy
        :src="image"
        :alt="`${text} photo`"
      >
        <template #placeholder>
          <div
            class="bg-gray-500 w-20 h-16 rounded"
          />
        </template>
      </n-image>
    </div>

    <div class="mt-2 text-center">
      <div class="font-bold leading-none">
        <div class="text-sm">
          {{ text }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
