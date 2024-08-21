<script setup>
const { $client } = useNuxtApp();

const query = ref("");
const profiles = ref([]);
const cities = ref([]);
const events = ref([]);

const tab = computed(() => useRoute().query.type || "profiles");
const tabs = computed(() => [
  {
    name: "Profiles",
    value: "profiles",
    to: "/search",
  },
  {
    name: "Cities",
    value: "cities",
    to: "/search?type=cities",
  },
  {
    name: "Events",
    value: "events",
    to: "/search?type=events",
  },
]);

const search = async () => {
  if (tab.value === "profiles") {
    const data = await $client.profiles.search.query({
      query: query.value,
    });

    profiles.value = data;
  }
  if (tab.value === "cities") {
    const data = await $client.cities.search.query({
      query: query.value,
    });

    cities.value = data.cities;
  }
  if (tab.value === "events") {
    const data = await $client.events.search.query({
      query: query.value,
    });

    events.value = data;
  }
};

watchEffect(() => {
  search();
});

watch(tab, () => {
  search();
});
</script>

<template>
  <div class="w-full">
    <div class="relative px-4 py-2">
      <Input
        id="search"
        type="search"
        v-model="query"
        placeholder="Search"
        class="pl-10 rounded-full"
        @input="search"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2 pl-8"
      >
        <Icon
          name="heroicons:magnifying-glass"
          size="20px"
          class="text-gray-500"
        />
      </span>
    </div>

    <TabsLinks :tabs="tabs" :value="tab" />

    <ProfileList v-if="tab === 'profiles'" :profiles="profiles" />
    <CityList v-if="tab === 'cities'" :cities="cities" />
    <EventList v-if="tab === 'events'" :events="events" />
  </div>
</template>
