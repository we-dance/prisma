<script setup lang="ts">
const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
});

const videos = ref(props.videos);

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
