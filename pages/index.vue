<script setup lang="ts">
const { $client } = useNuxtApp();
const { data: allDanceStyles } = await $client.styles.list.useQuery();
const searchQuery = ref("");
const count = ref(10);

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return allDanceStyles.value
    .filter((item) => item.name.toLowerCase().includes(query))
    .slice(0, count.value);
});

const showMore = function () {
  count.value += 10;
};
</script>

<template>
  <div class="bg-white p-4 flex flex-col gap-4">
    <div class="flex">
      <Input v-model="searchQuery" placeholder="Search dance style" />
      <div></div>
    </div>
    <section>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="danceStyle in filteredItems"
          :key="danceStyle.id"
          class="rounded-md"
        >
          <div class="aspect-video">
            <WYoutube
              v-if="danceStyle.video"
              :url="danceStyle.video"
              class="rounded-md"
            />
            <div v-else class="bg-gray-200 rounded-md w-full h-full" />
          </div>
          <div class="p-2">
            <NuxtLink
              :to="`/styles/${danceStyle.hashtag}`"
              class="text-sm font-bold"
            >
              {{ danceStyle.name }}
            </NuxtLink>
            <div class="text-xs text-muted-foreground">
              {{ danceStyle.region }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ danceStyle.membersCount }} members •
              {{ danceStyle.eventsCount }} events
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container py-8">
      <div class="flex justify-center">
        <Button variant="outline" @click="showMore">Show more</Button>
      </div>
    </div>
  </div>
</template>
