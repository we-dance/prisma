<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
const { t } = useI18n();

useHead({
  titleTemplate: t("seo.title"),
});
</script>

<template>
  <NuxtLayout>
    <Toaster richColors />
    <NuxtPage />
  </NuxtLayout>
</template>
