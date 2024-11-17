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
const { currentPair, rankedVideos, vote } = useVoting(videos, votes);
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
  </div>
</template>
