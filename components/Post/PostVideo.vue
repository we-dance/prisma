<script setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <WYoutubeThumb :url="url" show-play />
</template>
