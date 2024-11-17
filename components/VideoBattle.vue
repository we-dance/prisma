<script setup>
defineProps({
  videos: {
    type: Array,
    required: true,
  },
  onVote: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle class="relative">
        Video Battle
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
      <CardDescription> Two videos. One winner. Your call! </CardDescription>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2 w-full">
      <div
        v-for="video in videos"
        :key="video.id"
        class="rounded-md m-1 w-full"
      >
        <div>
          <Dialog>
            <DialogTrigger class="w-full aspect-video">
              <WYoutubeThumb :url="video.url" />
            </DialogTrigger>
            <DialogFullscreen>
              <WYoutube :url="video.url" />
            </DialogFullscreen>
          </Dialog>
        </div>
        <div class="text-xs px-1 my-2 text-center">
          <template
            v-for="(artist, index) in video.artists"
            :key="artist.username"
          >
            <NuxtLink :to="`/@${artist.username}`">
              {{ artist.name.split(" ").slice(0, 1).join() }}
            </NuxtLink>
            <span class="p-1" v-if="index < video.artists.length - 1">&</span>
          </template>
        </div>
        <div class="flex justify-center">
          <Button @click="onVote(video.id)">Vote</Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
