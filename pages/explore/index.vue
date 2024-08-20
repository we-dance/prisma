<script setup>
const query = ref("");
const results = ref([]);

const { $client } = useNuxtApp();

const search = async () => {
  const { data } = await $client.cities.search.useQuery({
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
    <Input v-model="query" placeholder="Search city" @input="search" />

    <div v-for="city in results" :key="city.slug" class="border-b flex">
      <NuxtLink
        :to="`/explore/${city.countryCode}/${city.slug}`"
        class="flex-grow text-lg p-4 cursor-pointer hover:bg-red-100"
        @click="$track('explore_result', { label: city.label, query })"
      >
        {{ city.name }}, {{ city.country.name }}
      </NuxtLink>
    </div>
  </div>
</template>
