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
  <div class="bg-white">
    <section
      class="mx-auto flex max-w-md flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header pb-8 page-header"
    >
      <h1
        class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-tight"
      >
        Choose Your Dance
      </h1>
      <span
        class="max-w-[750px] text-center text-lg font-light text-foreground"
      >
        Discover the most popular dances and join community
      </span>

      <div class="flex items-center border-b px-3 w-full">
        <Icon name="lucide:search" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          v-model="searchQuery"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls=""
          aria-disabled="false"
          aria-autocomplete="list"
          autocomplete="off"
          placeholder="Search dance style"
          class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </section>
    <section class="container">
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
              :to="`/styles/${danceStyle.id}`"
              class="text-sm font-bold"
            >
              {{ danceStyle.name }}
            </NuxtLink>
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
