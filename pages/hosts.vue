<script setup lang="ts">
const { $client } = useNuxtApp();
const profiles = await $client.profiles.hosts.query();
console.log(profiles);
</script>

<template>
  <section
    class="mx-auto max-w-2xl flex w-full flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header pb-8 page-header"
  >
    <h1
      class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-none"
    >
      Where can I dance?
    </h1>
    <span
      class="w-full text-center text-lg font-light text-foreground leading-none"
    >
      We want to list all WhatsApp groups in every city
    </span>
    <section
      class="mt-4 w-full grid max-w-lg md:grid-cols-2 md:shadow bg-white md:rounded-full border gap-2 py-2 px-4"
    >
      <DanceStyleInput v-model="selectedStyle" />
      <CityInput v-model="selectedCity" placeholder="Where" />
    </section>
  </section>

  <div class="p-4 mx-auto max-w-xl flex flex-col gap-4">
    <TabsContainer>
      <TabLink to="/">Hosts</TabLink>
      <TabLink to="/calendar">Venues</TabLink>
      <TabLink to="/artists">Artists</TabLink>
      <TabLink to="/groups">Calendar</TabLink>
    </TabsContainer>

    <div class="flex justify-end">
      <Button>Add host</Button>
    </div>

    <ProfileCard
      v-for="profile in profiles"
      :key="profile.id"
      :profile="profile"
    />
  </div>
</template>
