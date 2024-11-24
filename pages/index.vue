<script setup lang="ts">
const tab = ref("news");
</script>

<template>
  <section
    class="mx-auto max-w-2xl flex w-full flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header pb-8 page-header"
  >
    <h1
      class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-none"
    >
      Prepare for your dance journey
    </h1>
    <span
      class="w-full text-center text-lg font-light text-foreground leading-none"
    >
      Explore events and meet people who can guide you
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
      <TabLink to="/">News</TabLink>
      <TabLink to="/calendar">Calendar</TabLink>
      <TabLink to="/artists">Artists</TabLink>
      <TabLink to="/groups">Groups</TabLink>
      <TabLink to="/about">About</TabLink>
    </TabsContainer>

    <Post3 />
    <Post1 />
    <Post4 />
    <Post2 />
  </div>
</template>
