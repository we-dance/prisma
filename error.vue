<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex justify-center items-center h-[100vh]">
      <div>
        <h1 class="font-bold">{{ error.statusCode }}</h1>
        <p>{{ error.message }}</p>
      </div>
    </div>
  </NuxtLayout>
</template>
