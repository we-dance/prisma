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
const resolved = ref(new Map());

const updateResolvedGraph = () => {
  resolved.value = new Map(videos.value.map((v) => [v.id, new Set()]));
  votes.value.forEach(({ winner, loser }) => {
    resolved.value.get(winner)?.add(loser);
  });

  const propagate = (winner) => {
    const losers = resolved.value.get(winner);
    if (!losers) return;

    losers.forEach((loser) => {
      const winnerSet = resolved.value.get(winner);
      const loserSet = resolved.value.get(loser);
      if (winnerSet && loserSet) {
        loserSet.forEach((l) => winnerSet.add(l));
      }
    });
  };

  videos.value.forEach((v) => propagate(v.id));
};

const rankedVideos = computed(() => {
  const scores = new Map(videos.value.map((v) => [v.id, 0]));

  // Calculate scores based on wins (direct + transitive)
  resolved.value.forEach((losers, winner) => {
    scores.set(winner, losers.size);
  });

  // Sort by score
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id)
    .map((id) => videos.value.find((v) => v.id === id));
});

const generateNextPair = () => {
  const unresolvedPairs = [];

  // Generate pairs for unresolved relationships
  videos.value.forEach((v1) => {
    videos.value.forEach((v2) => {
      if (
        v1.id !== v2.id &&
        !resolved.value.get(v1.id)?.has(v2.id) &&
        !resolved.value.get(v2.id)?.has(v1.id)
      ) {
        unresolvedPairs.push([v1.id, v2.id]);
      }
    });
  });

  // Get the last two shown videos
  const lastVote = votes.value[votes.value.length - 1] || {};
  const lastShownVideos = [lastVote.winner, lastVote.loser];

  // Filter pairs to avoid the last two shown videos
  const filteredPairs = unresolvedPairs.filter(
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
  const [left, right] = currentPair.value.map((v) => v.id);
  const loser = left === winner ? right : left;

  votes.value.push({ winner, loser });
  updateResolvedGraph();
  currentPair.value = generateNextPair();
};
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
            <template
              v-for="(artist, index) in video.artists"
              :key="artist.username"
            >
              <NuxtLink :to="`/@${artist.username}`">
                {{ artist.name }}
              </NuxtLink>
              <span class="p-1" v-if="index < video.artists.length - 1">&</span>
            </template>
          </div>
          <div class="flex justify-center">
            <Button @click="vote(video.id)">Vote</Button>
          </div>
        </div>
      </div>
    </section>

    <section class="flex gap-4">
      <div class="prose">
        <li v-for="video in rankedVideos" :key="video.id + `ranked`">
          {{ video.artists.map((a) => a.name).join(", ") }}
        </li>
      </div>
    </section>
  </div>
</template>
