<script setup lang="ts">
const { $client } = useNuxtApp();
const { data } = await $client.styles.list.useQuery();
const votes = ref([]);
const videos = computed(() =>
  data.value
    .filter((s) => !!s.video)
    .map((style) => ({
      id: style.hashtag,
      name: style.name,
      url: style.video,
    }))
);

const { currentPair, vote, rankedVideos } = useVoting(videos, votes);
</script>

<template>
  <section
    class="mx-auto flex max-w-md flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header pb-8 page-header"
  >
    <h1
      class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-tight"
    >
      Let’s Find Your Dance!
    </h1>
    <span class="max-w-[750px] text-center text-lg font-light text-foreground">
      Watch and compare videos of different dance styles. Pay attention to the
      music, the moves, and the vibe—choose the ones that make you want to
      dance!
    </span>
    <VideoBattle :videos="currentPair" @vote="vote" />
  </section>

  <div class="mx-auto max-w-xl p-4 flex flex-col gap-4">
    <div class="prose">
      <ul>
        <li v-for="video in rankedVideos" :key="video.id">
          {{ video.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
