<script setup>
defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Post v-for="post in posts" :key="post.id" v-bind="post" class="h-80" />
  </div>
</template>
