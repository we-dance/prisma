<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";

const i18nHead = useLocaleHead();

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
});
</script>

<template>
  <NuxtLayout>
    <Toaster richColors />
    <NuxtPage />
  </NuxtLayout>
</template>
