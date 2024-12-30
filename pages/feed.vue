<script setup lang="ts">
const { $client } = useNuxtApp();
const { data: posts } = await $client.posts.list.useQuery();
</script>

<template>
  <div class="p-4">
    <PostGrid :posts="posts" />
  </div>
</template>
