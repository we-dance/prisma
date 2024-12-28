<script setup lang="ts">
const route = useRoute();
const { $client } = useNuxtApp();
const { data } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const styleD = data?.value?.style;

const style = {
  name: "Casino",
  video: "https://www.youtube.com/watch?v=R7E9cNydevg",
  description:
    "Welcome to Casino Dance Community! Join us to learn Casino, share your experiences and connect with fellow dancers passionate about this vibrant style 💃",
  stats: {
    posts: "1.5K",
    views: "154.5K",
    upvotes: "10.8K",
    members: "7.2K",
  },
  moderators: [
    {
      name: "Alex Razbakov",
      role: "Admin",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F85cc5d77-6212-4707-85e0-24bdf72b1c7c?alt=media&token=2872dc07-fa22-46b7-8f0e-41c935fc6345",
    },
  ],
  popular: true,
  members: [
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
      name: "Aina",
    },
    {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F85cc5d77-6212-4707-85e0-24bdf72b1c7c?alt=media&token=2872dc07-fa22-46b7-8f0e-41c935fc6345",
      name: "Alex Razbakov",
    },
    // ... more members
  ],
};
const tab = ref("news");
const { data: posts } = await $client.posts.list.useQuery({
  styleId: styleD.id,
});
</script>

<template>
  <StyleHero :style="style" class="p-4 bg-white" />

  <div class="p-4 gap-4 flex flex-col">
    <div v-if="false" class="container">
      <Tabs v-model="tab">
        <TabsList>
          <TabsTrigger value="news">Events</TabsTrigger>
          <TabsTrigger value="calendar">Articles</TabsTrigger>
          <TabsTrigger value="artists">Hosts</TabsTrigger>
          <TabsTrigger value="groups">Artists</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <div class="container">
      <PostGrid :posts="posts" />
    </div>
  </div>
</template>
