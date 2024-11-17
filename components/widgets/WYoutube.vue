<script>
const getYoutubeId = (url) => {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
};

export default {
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  computed: {
    src() {
      if (!this.url) {
        return "";
      }

      const videoId = getYoutubeId(this.url);

      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    },
  },
};
</script>

<template>
  <iframe
    :src="src"
    frameborder="0"
    allowfullscreen
    allow="autoplay"
    class="w-full aspect-video"
  ></iframe>
</template>
