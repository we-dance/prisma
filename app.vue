<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
const { t } = useI18n();

useHead({
  titleTemplate: t("seo.title"),
});

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.baseUrl;
</script>

<template>
  <NuxtLayout>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="`${baseUrl}${link.href}`"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body class="bg-gray-100">
        <Toaster richColors />
        <AuthPopup />
        <NuxtPage />
      </Body>
    </Html>
  </NuxtLayout>
</template>
