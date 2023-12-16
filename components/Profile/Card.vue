<script setup lang="ts">
const props = defineProps(['profile'])
const profile = computed(() => props.profile)
</script>

<template>
  <div>
    <NuxtLink
      :to="`/${profile.username}`"
      class="w-48 leading-none gap-2 m-2 border overflow-hidden rounded shadow-sm"
    >
      <div class="w-48 h-48 bg-gray-500 rounded">
        <img
          class="w-full"
          :src="profile.photo"
          :alt="`${profile.name} cover photo`"
          onerror="this.src='https://via.placeholder.com/200';"
        >
      </div>

      <div class="p-2">
        <div
          class="truncate font-bold leading-none hover:underline hover:text-primary"
        >
          {{ profile.name }}
        </div>
        <div>
          <div class="text-sm pt-1 leading-none overflow-hidden h-16">
            {{ profile.bio }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
