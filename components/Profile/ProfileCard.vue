<script setup lang="ts">
const props = defineProps(['profile'])
const profile = computed(() => props.profile)
</script>

<template>
  <div>
    <NuxtLink
      :to="`/${profile.username}`"
      class="flex leading-none gap-4 border overflow-hidden rounded shadow-sm p-4"
    >
      <div class="w-16">
        <img
          class="w-16 rounded-full"
          :src="profile.photo"
          :alt="`${profile.name} cover photo`"
          onerror="this.src='https://via.placeholder.com/200';"
        >
      </div>

      <div class="flex-1 overflow-hidden">
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
