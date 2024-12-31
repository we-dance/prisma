<script setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  title: {
    type: String,
  },
});
</script>
<template>
  <WYoutubeThumb :url="url" show-play />
  <p class="text-xs mt-1">{{ title || content }}</p>
</template>
