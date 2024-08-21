<script setup>
const query = ref("");
const cities = ref([]);
const countries = ref([]);
const { $client } = useNuxtApp();

const search = async () => {
  const { data } = await $client.cities.search.useQuery({
    countryCode: useRoute().query.country,
  });

  countries.value = data.value.countries;
  cities.value = data.value.cities;
};

watchEffect(() => {
  search();
});
</script>

<template>
  <div class="w-full">
    <Input v-model="query" placeholder="Search city" @input="search" />

    <div v-for="city in cities" :key="city.slug" class="border-b flex">
      <NuxtLink
        :to="`/explore/${city.countryCode}/${city.slug}`"
        class="flex-grow text-lg p-4 cursor-pointer hover:bg-red-100"
        @click="$track('explore_result', { label: city.label, query })"
      >
        {{ city.name }}, {{ city.country.name }}
      </NuxtLink>
    </div>
    <div v-for="country in countries" :key="country.slug" class="border-b flex">
      <NuxtLink
        :to="`/explore?country=${country.code}`"
        class="flex-grow text-lg p-4 cursor-pointer hover:bg-red-100"
        @click="$track('explore_result', { label: city.label, query })"
      >
        {{ country.name }}
      </NuxtLink>
    </div>
  </div>
</template>
