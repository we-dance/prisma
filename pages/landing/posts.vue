<script setup lang="ts">
const tab = ref("news");
const { posts } = usePosts();
</script>

<template>
  <div class="container p-4 gap-4 flex flex-col">
    <PostGrid :posts="posts" />
  </div>
</template>
