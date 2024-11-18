<script setup lang="ts">
import { toast } from "vue-sonner";
const { $client } = useNuxtApp();
const { auth } = useAppAuth();

const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
  votes: {
    type: Array,
    required: true,
  },
  styleId: {
    type: Number,
    required: true,
  },
});

const videos = ref(props.videos);

const BATTLE_PROPOSAL_ROUND = 1;
const BATTLE_ROUNDS = 5;

const votes = ref(props.votes);
const { currentPair, vote, voteCount } = useVoting(videos, votes);
const { skipProposal } = useProposal();

const showProposal = computed(
  () => !skipProposal.value && voteCount.value >= BATTLE_ROUNDS
);
const showBattle = computed(
  () => currentPair.value && voteCount.value < BATTLE_ROUNDS
);

async function onVote(winner: string) {
  const { profileId } = await auth("vote");

  const loser = currentPair.value?.find((v) => v.id !== winner)?.id;

  await $client.videos.vote.mutate({
    winnerId: winner,
    loserId: loser,
    createdById: profileId,
  });

  vote(winner);
  toast.success("Vote submitted");
}
</script>
<template>
  <VideoBattle v-if="showBattle" :videos="currentPair" @vote="onVote" />
  <VideoProposal v-if="showProposal" :style-id="styleId" />
</template>
