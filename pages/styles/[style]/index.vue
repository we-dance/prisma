<script setup lang="ts">
const route = useRoute();
const { $client } = useNuxtApp();
const { data } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const style = data?.value?.style;

const tab = ref("news");
const { data: posts } = await $client.posts.list.useQuery({
  styleId: style.id,
});
</script>

<template>
  <StyleHero :style="style" class="p-4 bg-white" />

  <div class="flex justify-center mt-4">
    <Button>New post</Button>
  </div>

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
