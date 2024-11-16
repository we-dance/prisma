<script setup lang="ts">
import type { addAbortListener } from "events";

const route = useRoute();
const { $client } = useNuxtApp();
const { data: style } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const videos = [
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

  {
    id: 6,
    url: "https://www.youtube.com/watch?v=8Iu8YEAiDMw",
    artists: [
      {
        username: "6",
        name: "Artist 6",
        role: "Leader",
      },
    ],
  },
];

const chosenVideos = ref<typeof videos>([]);

const votes = ref([]);

const rankedVideos = computed(() => {
  let missing = 0;

  const ranked = [...videos].sort((a, b) => {
    // Find direct matchup between a and b
    const directMatch = votes.value.find(
      (vote) =>
        (vote.left === a.id && vote.right === b.id) ||
        (vote.left === b.id && vote.right === a.id)
    );

    if (directMatch) {
      // If there was a direct matchup, winner should be ranked higher
      return directMatch.winner === b.id ? 1 : -1;
    }

    missing++;
    console.log(a.id, b.id);

    // If no direct matchup, fall back to comparing total wins
    const aWins = votes.value.filter((vote) => vote.winner === a.id).length;
    const bWins = votes.value.filter((vote) => vote.winner === b.id).length;
    return bWins - aWins;
  });

  const result = {
    videos: ranked,
    missing,
  };

  console.log(missing);

  return result;
});

function pickVideos() {
  const votedVideoIds = new Set(
    votes.value.flatMap((vote) => [vote.left, vote.right])
  );

  // First get unvoted videos
  const unvotedVideos = videos.filter((video) => !votedVideoIds.has(video.id));

  // Get voted videos sorted by win ratio (wins / total matches)
  const votedVideos = videos
    .filter((video) => votedVideoIds.has(video.id))
    .sort((a, b) => {
      const aMatches = votes.value.filter(
        (vote) => vote.left === a.id || vote.right === a.id
      ).length;
      const bMatches = votes.value.filter(
        (vote) => vote.left === b.id || vote.right === b.id
      ).length;

      const aWins = votes.value.filter((vote) => vote.winner === a.id).length;
      const bWins = votes.value.filter((vote) => vote.winner === b.id).length;

      const aRatio = aWins / aMatches;
      const bRatio = bWins / bMatches;

      return bRatio - aRatio; // Sort by win ratio descending
    });

  // Combine all videos in priority order
  const availableVideos = [...unvotedVideos, ...votedVideos];

  if (availableVideos.length < 2) {
    console.log("Not enough videos to compare");
    return; // Not enough videos to compare
  }

  chosenVideos.value = availableVideos.slice(0, 2);
}

function vote(videoId: number) {
  votes.value.push({
    left: chosenVideos.value[0].id,
    right: chosenVideos.value[1].id,
    winner: videoId,
  });

  pickVideos();
}

pickVideos();
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
          v-for="video in chosenVideos"
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
        <h2>Videos</h2>
        <li v-for="video in videos" :key="video.id">
          {{ video.artists[0].name }}
        </li>
      </div>
      <div class="prose">
        <h2>Ranked</h2>
        <li v-for="video in rankedVideos.videos" :key="video.id + `ranked`">
          {{ video.artists[0].name }}
        </li>
      </div>
    </section>
  </div>
</template>
