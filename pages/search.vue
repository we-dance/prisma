<script setup>
const { $client } = useNuxtApp();

const query = ref("");
const results = ref([]);

const search = async () => {
  const { data } = await $client.profiles.search.useQuery({
    query: query.value,
  });

  results.value = data.value;
};

onMounted(() => {
  search();
});
</script>

<template>
  <div class="w-full">
    <Input
      v-model="query"
      auto-focus
      placeholder="Search profiles and events"
      @input="search"
    />

    <div class="text-xs p-4 border-b">
      Searching a city?
      <NuxtLink
        class="underline hover:no-underline font-bold"
        :to="`/explore?q=${query}`"
        @click.native="$track('search_city', { label: query })"
        >Choose City</NuxtLink
      >
    </div>

    <NuxtLink
      v-for="item in results"
      :key="item.id"
      :to="
        $route.query.debug || item.username.includes('/')
          ? localePath(`/id@${item.id}`)
          : localePath(`/${item.username}`)
      "
      class="border-b p-4 flex gap-2 items-center hover:bg-blue-200"
      @click.native="
        $track('search_profile', {
          name: item.name,
          username: item.username,
          query,
        })
      "
    >
      <div class="w-12 flex-shrink-0">
        <NuxtImg
          width="68"
          height="68"
          fit="fill"
          :placeholder="[68, 68]"
          loading="lazy"
          :src="item.photo"
        />
      </div>
      <div class="flex-grow">
        <div class="block leading-tight">{{ item.name }}</div>
        <div class="block text-xs leading-tight">
          {{ item.type }} • @{{ item.username }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
