<script setup lang="ts">
const { data } = useFetch('/api/profiles', {
  query: {
    type: 'City'
  }
})
</script>

<template>
  <div>
    <nuxt-link
      v-for="profile in data"
      :key="profile.id"
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      :to="`/${profile.username}`"
    >
      <span class="flex-grow">
        {{ profile.name }}
      </span>
      <span>
        {{ profile._count.profiles }}
      </span>
    </nuxt-link>
  </div>
</template>
