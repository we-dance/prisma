<script setup lang="ts">
import type { addAbortListener } from "events";

const route = useRoute();
const { $client } = useNuxtApp();
const { data: style } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const videos = ref([
  {
    id: 1,
    artists: [
      {
        username: "alocubanolisandra",
        name: "Lisandra Garcia",
        role: "Follower",
      },
    ],
    url: "https://www.youtube.com/watch?v=R7E9cNydevg",
  },
  {
    id: 2,
    artists: [
      {
        username: "maykel_fonts",
        name: "Maykel Fonts",
        role: "Leader",
      },
      {
        username: "indiramora_cueto_",
        name: "Indira Mora Cueto",
        role: "Follower",
      },
    ],
    url: "https://www.youtube.com/watch?v=6ZTgUsJt5z8",
    event: {
      name: "Croatian Summer Salsa Festival",
      year: 2023,
    },
    location: {
      city: "Rovinj",
      country: "Croatia",
    },
    videographer: {
      username: "SocialDanceTV",
      name: "Social Dance TV",
    },
  },
  {
    id: 3,
    url: "https://www.youtube.com/watch?v=8Iu8YEAiDMw",
    artists: [
      {
        username: "seofernandez_official",
        name: "Seo Fernandez",
        role: "Leader",
      },
      {
        username: "enerismulgado",
        name: "Eneris Mulgado Veitia",
        role: "Follower",
      },
    ],
    event: {
      name: "Festival de Cuba",
      year: 2023,
    },
    location: {
      city: "Stuttgart",
      country: "Germany",
    },
    videographer: {
      username: "Cuban-Salsa-Hiro",
      name: "Cuban Salsa HIRO",
    },
  },
  {
    id: 4,
    url: "https://www.youtube.com/watch?v=8Iu8YEAiDMw",
    artists: [
      {
        username: "4",
        name: "Artist 4",
        role: "Leader",
      },
    ],
  },

  {
    id: 5,
    url: "https://www.youtube.com/watch?v=8Iu8YEAiDMw",
    artists: [
      {
        username: "5",
        name: "Artist 5",
        role: "Leader",
      },
    ],
  },
]);

const votes = ref([]);

const rankedVideos = computed(() => {
  const calculateRankings = () => {
    const videoIds = videos.value.map((v) => v.id);

    // Initialize pairwise comparison matrix
    const wins = new Map();
    videoIds.forEach((id) => wins.set(id, new Set()));

    // Populate the wins map
    votes.value.forEach(({ winner, loser }) => {
      wins.get(winner).add(loser);
    });

    // Sort videos using a recursive dominance approach
    const calculateScore = (videoId, visited = new Set()) => {
      if (visited.has(videoId)) return 0; // Avoid cycles
      visited.add(videoId);

      // Count direct wins + recursive wins
      return Array.from(wins.get(videoId) || []).reduce(
        (score, opponent) => score + 1 + calculateScore(opponent, visited),
        0
      );
    };

    // Compute scores for all videos
    const scores = videoIds.map((id) => ({
      id,
      score: calculateScore(id),
    }));

    // Sort by score in descending order
    const rankedIds = scores
      .sort((a, b) => b.score - a.score)
      .map((item) => item.id);

    return rankedIds.map((id) => videos.value.find((v) => v.id === id));
  };

  return calculateRankings();
});

const getLastShownVideos = () => {
  if (votes.value.length === 0) return [];
  const lastVote = votes.value[votes.value.length - 1];
  return [lastVote.winner, lastVote.loser];
};

const generateNextPair = () => {
  const videoIds = videos.value.map((v) => v.id);
  const pairs = [];

  for (let i = 0; i < videoIds.length; i++) {
    for (let j = i + 1; j < videoIds.length; j++) {
      const isAlreadyShown = votes.value.some(
        (vote) =>
          (vote.winner === videoIds[i] && vote.loser === videoIds[j]) ||
          (vote.winner === videoIds[j] && vote.loser === videoIds[i])
      );
      if (!isAlreadyShown) pairs.push([videoIds[i], videoIds[j]]);
    }
  }

  const lastShownVideos = getLastShownVideos();

  const filteredPairs = pairs.filter(
    (pair) =>
      !lastShownVideos.includes(pair[0]) && !lastShownVideos.includes(pair[1])
  );

  if (filteredPairs.length > 0) {
    const nextPair = filteredPairs[0];
    return nextPair.map((id) => videos.value.find((v) => v.id === id));
  }
  return null; // No pairs left
};

const currentPair = ref(generateNextPair());

const vote = (winner) => {
  const [video1, video2] = currentPair.value.map((v) => v.id);
  const loser = video1 === winner ? video2 : video1;

  votes.value.push({ winner, loser });

  // Generate the next pair
  currentPair.value = generateNextPair();
};
</script>

<template>
  <div class="mx-auto max-w-xl p-4 flex flex-col gap-4">
    <section class="bg-white p-4 rounded-md">
      <h1 class="text-2xl font-bold">{{ style.name }}</h1>
      <TPreview :content="style.description" excerpt class="text-xs" />
      <NuxtLink
        :to="`/styles/${style.hashtag}/about`"
        class="text-xs text-primary float-end"
      >
        Read more
      </NuxtLink>
    </section>

    <section>
      <h2 class="text-xs uppercase font-bold text-center">VS</h2>
      <div class="flex justify-between w-full">
        <div
          v-for="video in currentPair"
          :key="video.id"
          class="rounded-md m-1 flex flex-col"
        >
          <div class="aspect-video">
            <WYoutube v-if="video.url" :url="video.url" class="rounded-md" />
            <div v-else class="bg-gray-200 rounded-md w-full h-full" />
          </div>
          <div class="text-xs px-1 my-2 text-center">
            {{ video.id }}
          </div>
          <div class="flex justify-center">
            <Button @click="vote(video.id)">Vote</Button>
          </div>
        </div>
      </div>
    </section>

    <section class="flex gap-4">
      <div class="prose">
        <h2>Videos</h2>
        <li v-for="video in videos" :key="video.id">
          {{ video.id }}
        </li>
      </div>
      <div class="prose">
        <h2>Ranked</h2>
        <li v-for="video in rankedVideos" :key="video.id + `ranked`">
          {{ video.id }}
        </li>
      </div>
    </section>
  </div>
</template>
