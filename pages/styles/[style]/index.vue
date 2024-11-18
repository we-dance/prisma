<script setup lang="ts">
import { toast } from "vue-sonner";

const route = useRoute();
const { $client } = useNuxtApp();
const { data } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const style = data?.value?.style;

const { auth } = useAppAuth();

const videos = ref(data?.value?.style?.videos);
const votes = ref(data?.value?.votes);

const BATTLE_ROUNDS = 5;

const { currentPair, vote, voteCount } = useVoting(videos, votes);

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

    <VideoBattle
      title="Video Battle"
      description="Two videos. One winner. Your call!"
      help="<p>
              VideoBattle is your chance to help us find the ultimate dance
              videos. We show you two amazing clips—your job is simple: pick
              your favorite!
            </p>
            <p>
              Every vote helps us rank the best videos in the community and
              shapes your personal recommendations. The more you vote, the
              better we understand your style, and the more spot-on your
              suggestions will be. Let’s find the beats that move you!
            </p>"
      v-if="showBattle"
      :videos="currentPair"
      @vote="onVote"
    />
  </div>
</template>
