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
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  help: {
    type: String,
  },
});
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle class="relative">
        {{ title }}
        <Popover v-if="help">
          <PopoverTrigger as-child>
            <Button variant="ghost" class="absolute top-0 right-0">
              <Icon name="heroicons:question-mark-circle" size="24" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="prose text-xs">
            {{ help }}
          </PopoverContent>
        </Popover>
      </CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2 w-full">
      <div
        v-for="video in videos"
        :key="video.id"
        class="rounded-md w-full gap-2 flex flex-col"
      >
        <Dialog>
          <DialogTrigger class="w-full aspect-video">
            <WYoutubeThumb :url="video.url" show-play />
          </DialogTrigger>
          <DialogFullscreen>
            <WYoutube :url="video.url" autoplay />
          </DialogFullscreen>
        </Dialog>
        <div class="text-xs px-1 text-center">
          {{ video.name }}
        </div>
        <div class="flex justify-center">
          <Button @click="onVote(video.id)">Vote</Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
