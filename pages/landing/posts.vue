<script setup lang="ts">
const tab = ref("news");
const posts = [
  {
    id: "1",
    author: {
      name: "Aina Kaiser",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
      username: "Aina",
    },
    content:
      "Comming to Berlin Germany vom 22.11. evening till 26.11. morning looking for SBK (or Salsa or Bachata or Kizomba) socials near Caroline-Michaelis-Straße 8, Mitte, 10115 Berlin",
    type: "request",
    createdAt: "2024-03-19T00:00:00.000Z",
    upvotes: 0,
    commentsCount: 1,
  },
  {
    id: "2",
    author: {
      name: "Aina Kaiser",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
      username: "Aina",
    },
    url: "https://www.youtube.com/watch?v=R7E9cNydevg",
    type: "video",
    createdAt: "2024-03-19T00:00:00.000Z",
    upvotes: 0,
    commentsCount: 1,
  },
  {
    id: "3",
    author: {
      name: "Aina Kaiser",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
      username: "Aina",
    },
    event: {
      image:
        "https://res.cloudinary.com/djumxevsm/image/upload/v1728417958/ewwrfgoz26mjmb1s0rfb.jpg",
      type: "Festival",
      styles: ["Bachata", "Salsa"],
      name: "SALSA CUBAINE - STRASBOURG",
      date: "Thu, 21 Nov 2024, 18:30 — 20:00",
      location: "Strasbourg, France",
    },
    type: "event",
    createdAt: "2024-03-19T00:00:00.000Z",
    upvotes: 0,
    commentsCount: 1,
  },
  {
    id: "4",
    author: {
      name: "Aina Kaiser",
      photo:
        "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
      username: "Aina",
    },
    content: "Changó: Aluya vs A La Metá Steps",
    type: "article",
    createdAt: "2024-03-19T00:00:00.000Z",
    upvotes: 0,
    commentsCount: 1,
  },
];
</script>

<template>
  <div class="container grid grid-cols-4 gap-4 p-4">
    <Post v-for="post in posts" :key="post.id" v-bind="post">
      <PostRequest v-if="post.type == 'request'" v-bind="post" />
      <PostArticle v-if="post.type == 'article'" v-bind="post" />
      <PostEvent v-if="post.type == 'event'" v-bind="post" />
      <PostVideo v-if="post.type == 'video'" v-bind="post" />
    </Post>
  </div>
</template>
