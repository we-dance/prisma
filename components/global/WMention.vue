<script setup>
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const { data: profile, loading } = await $client.profiles.get.useQuery({
  username: props.username,
});

const localePath = useLocalePath();
</script>

<template>
  <span v-if="loading">x{{ username }}</span>
  <span v-else-if="!loading && !profile"
    ><a
      :href="`https://instagram.com/${username}`"
      class="inline-flex items-center gap-1"
      ><TIcon name="instagram" size="4" /> {{ username }}</a
    ></span
  >
  <span v-else class="inline-flex items-center gap-1">
    <TProfilePhoto2 size="xs" :src="profile.photo" />
    <NuxtLink :to="localePath(`/${profile.username}`)">
      {{ profile.name || profile.username }}
    </NuxtLink>
  </span>
</template>
