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
</script>

<template>
  <div class="w-full">
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
