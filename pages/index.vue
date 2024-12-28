<script setup lang="ts">
const { $client } = useNuxtApp();
const { data: posts } = await $client.posts.list.useQuery();
</script>

<template>
  <div class="container p-4 gap-4 flex flex-col">
    <PostGrid :posts="posts" />
  </div>
</template>
