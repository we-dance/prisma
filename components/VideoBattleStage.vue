<script setup lang="ts">
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
    url: "https://www.youtube.com/watch?v=UCABDb16JcM",
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
    url: "https://www.youtube.com/watch?v=j3sJ0D-1lnA",
    artists: [
      {
        username: "osbanis_deakocan",
        name: "Osbanis",
        role: "Leader",
      },
      {
        username: "anneta_deakocan",
        name: "Anneta",
        role: "Follower",
      },
    ],
  },
  {
    id: 5,
    url: "https://www.youtube.com/watch?v=O_r4WGC4GEw",
    artists: [
      {
        username: "wilmerymariaofficial",
        name: "Wilmer y Maria",
        role: "Couple",
      },
    ],
  },
]);

const BATTLE_PROPOSAL_ROUND = 1;
const BATTLE_ROUNDS = 5;

const votes = ref([]);
const { currentPair, vote, voteCount } = useVoting(videos, votes);
const proposalFinished = ref(false);
const proposalTime = computed(
  () =>
    !currentPair.value ||
    (voteCount.value === BATTLE_PROPOSAL_ROUND && !proposalFinished.value)
);
const showBattle = computed(
  () =>
    (!voteCount.value || currentPair.value) && voteCount.value < BATTLE_ROUNDS
);
</script>
<template>
  <section v-if="showBattle">
    <VideoProposal v-if="proposalTime" v-model="proposalFinished" />
    <VideoBattle v-else :videos="currentPair" @vote="vote" />
  </section>
</template>
