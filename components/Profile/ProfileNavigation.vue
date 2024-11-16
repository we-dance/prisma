<script setup lang="ts">
defineProps<{
  profile: {
    username: string;
  };
}>();
</script>

<template>
  <TabsContainer>
    <TabLink :to="`/@${profile.username}/`">Events</TabLink>
    <TabLink :to="`/@${profile.username}/stories`">Stories</TabLink>
    <TabLink :to="`/@${profile.username}/reviews`">Reviews</TabLink>
    <TabLink :to="`/@${profile.username}/about`">About</TabLink>
  </TabsContainer>
</template>
