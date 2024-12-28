<script setup>
const { $client } = useNuxtApp();

const query = computed(() => useRoute().query.q);
const profiles = ref([]);
const cities = ref([]);
const events = ref([]);

const tab = ref("profiles");

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

const searchQuery = ref("");
watch(searchQuery, () => {
  if (useRoute().path !== "/search") {
    useRouter().push(`/search?q=${searchQuery.value}`);
  } else {
    useRouter().replace(`/search?q=${searchQuery.value}`);
  }
});
</script>

<template>
  <div class="w-full">
    <div class="flex-grow flex justify-center my-4">
      <div class="relative w-full max-w-md items-center">
        <Input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Icon
            name="heroicons:magnifying-glass"
            class="text-muted-foreground"
            size="24"
          />
        </span>
      </div>
    </div>

    <Tabs default-value="profiles" v-model="tab">
      <TabsList class="w-full">
        <TabsTrigger value="profiles"> Profiles </TabsTrigger>
        <TabsTrigger value="cities"> Cities </TabsTrigger>
        <TabsTrigger value="events"> Events </TabsTrigger>
      </TabsList>
    </Tabs>

    <div class="bg-white">
      <ProfileList v-if="tab === 'profiles'" :profiles="profiles" />
      <CityList v-if="tab === 'cities'" :cities="cities" />
      <EventList v-if="tab === 'events'" :events="events" />
    </div>
  </div>
</template>
