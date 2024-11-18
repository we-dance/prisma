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
  <div class="mx-auto max-w-xl p-4 flex flex-col gap-4">
    <VideoBattle
      title="Let’s Find Your Dance!"
      description="Watch and compare videos of different dance styles. Pay attention to the music, the moves, and the vibe—choose the ones that make you want to dance!"
      :videos="currentPair"
      @vote="vote"
    />

    <div class="prose">
      <ul>
        <li v-for="video in rankedVideos" :key="video.id">
          {{ video.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
