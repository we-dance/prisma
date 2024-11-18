<script setup lang="ts">
import type { addAbortListener } from "events";

const route = useRoute();
const { $client } = useNuxtApp();
const { data } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const style = data?.value?.style;
</script>

<template>
  <div class="mx-auto max-w-xl">
    <Breadcrumb class="my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"> WeDance </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink :href="`/styles/${style.hashtag}`">
            {{ style.name }}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>About</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div class="flex flex-col gap-4 bg-white rounded-md p-4">
      <div>
        <h1 class="text-2xl font-bold">{{ style.name }}</h1>
        <p class="text-sm text-gray-500">Also known as {{ style.synonyms }}</p>
      </div>

      <section v-if="style.video">
        <WYoutube :url="style.video" class="rounded-md" />
      </section>

      <section>
        <TPreview :content="style.description" />
      </section>

      <section>
        <h2 class="text-xs uppercase font-bold">History</h2>
        <TPreview :content="style.history" />
        <NuxtLink
          :to="style.source"
          target="_blank"
          class="text-xs text-primary"
        >
          Source
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
