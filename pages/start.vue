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

const { currentPair, vote, rankedVideos, voteCount, uniqueVideos } = useVoting(
  videos,
  votes
);

const progress = computed(
  () => (uniqueVideos.value.length / videos.value.length) * 100
);

const card = computed(() => {
  const map = [
    {
      title: "Let’s Find Your Dance!",
      description:
        "Watch and compare videos of different dance styles. Pay attention to the music, the moves, and the vibe—choose the ones that make you want to dance!",
    },
    {
      title: "Keep Going!",
      description:
        "You’re just getting started! Compare more styles to find the one that moves you.",
    },
    {
      title: "You’re Getting Closer!",
      description:
        "Your choices are shaping up. Keep voting to discover the perfect dance for you!",
    },
    {
      title: "Almost There!",
      description:
        "You’re starting to groove! A few more comparisons, and we’ll find your match.",
    },
    {
      title: "One Step Away!",
      description:
        "You’ve got an eye for great moves! Just a couple more to reveal your ideal style.",
    },
    {
      title: "Not sure yet?",
      description: `Let’s keep exploring! You've seen ${uniqueVideos.value.length} of ${videos.value.length} dance styles.`,
    },
  ];

  let current = voteCount.value;
  if (current >= map.length) {
    current = map.length - 1;
  }

  return map[current];
});
</script>

<template>
  <div class="mx-auto max-w-xl p-4 flex flex-col gap-4">
    <Card v-if="voteCount > 4">
      <CardHeader>
        <CardTitle>Ready to Dance?</CardTitle>
        <CardDescription
          >Here’s how your choices stack up so far. Your top match is
          {{ rankedVideos[0].name }}, but feel free to explore the others
          too!</CardDescription
        >
      </CardHeader>
      <CardContent>
        <div class="prose">
          <ul>
            <li v-for="video in rankedVideos" :key="video.id">
              <NuxtLink :to="`/styles/${video.id}`">{{ video.name }}</NuxtLink>
              <span
                v-if="!uniqueVideos.includes(video.id)"
                class="text-gray-500 text-xs"
                >(not watched yet)</span
              >
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>

    <Card v-if="currentPair">
      <CardHeader>
        <CardTitle> {{ card.title }}</CardTitle>
        <CardDescription>{{ card.description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <VideoBattle :videos="currentPair" @vote="vote" />
      </CardContent>
      <CardFooter>
        <Progress :model-value="progress" />
      </CardFooter>
    </Card>
  </div>
</template>
