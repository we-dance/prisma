<script setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div>
    <WYoutubeThumb :url="url" show-play />
  </div>
</template>
