<script setup lang="ts">
import { toast } from "vue-sonner";

const route = useRoute();
const { $client } = useNuxtApp();
const { data } = await $client.styles.battle.useQuery({
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
    <Card v-if="showBattle" class="w-full">
      <CardHeader>
        <CardTitle class="relative">
          {{ style.name }} Battle
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="ghost" class="absolute top-0 right-0">
                <Icon name="heroicons:question-mark-circle" size="24" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="prose text-xs">
              <p>
                VideoBattle is your chance to help us find the ultimate dance
                videos. We show you two amazing clips—your job is simple: pick
                your favorite!
              </p>
              <p>
                Every vote helps us rank the best videos in the community and
                shapes your personal recommendations. The more you vote, the
                better we understand your style, and the more spot-on your
                suggestions will be. Let’s find the beats that move you!
              </p>
            </PopoverContent>
          </Popover>
        </CardTitle>
        <CardDescription>Two videos. One winner. Your call!</CardDescription>
      </CardHeader>
      <CardContent>
        <VideoBattle :videos="currentPair" @vote="onVote" />
      </CardContent>
    </Card>
  </div>
</template>
