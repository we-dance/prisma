<script setup lang="ts">
const route = useRoute();
const { $client } = useNuxtApp();
const { data: style } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});
</script>

<template>
  <div class="mx-auto max-w-xl p-4 flex flex-col gap-4">
    <section v-if="style" class="bg-white p-4 rounded-md">
      <h1 class="text-2xl font-bold">{{ style.name }}</h1>
      <TPreview :content="style.description" excerpt class="text-xs" />
      <NuxtLink
        :to="`/styles/${style.hashtag}/about`"
        class="text-xs text-primary float-end"
      >
        Read more
      </NuxtLink>
    </section>

    <VideoBattleStage :videos="style.videos" />
  </div>
</template>
