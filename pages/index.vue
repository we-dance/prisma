<script setup lang="ts">
const { $client } = useNuxtApp();
const { data: styles } = await $client.styles.list.useQuery();
const searchQuery = ref("");
const count = ref(10);

const visibleStyles = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return styles.value
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
      <Input
        v-model="searchQuery"
        placeholder="Search dance style"
        class="w-full md:w-auto"
      />
      <div></div>
    </div>
    <section>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="style in visibleStyles"
          :key="style.id"
          :to="`/styles/${style.hashtag}`"
          class="rounded-md"
        >
          <div class="aspect-video">
            <WYoutubeThumb
              v-if="style.video"
              :url="style.video"
              class="rounded-md"
            />
            <div v-else class="bg-gray-200 rounded-md w-full h-full" />
          </div>
          <div class="p-2">
            <div class="text-sm font-bold">
              {{ style.name }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ style.region }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ style.membersCount }} members • {{ style.eventsCount }} events
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
    <div class="container py-8">
      <div class="flex justify-center">
        <Button variant="outline" @click="showMore">Show more</Button>
      </div>
    </div>
  </div>
</template>
