<script setup lang="ts">
const props = defineProps(["profile"]);
const profile = computed(() => props.profile);
</script>

<template>
  <div class="rounded shadow-sm p-4 bg-white border">
    <div class="flex leading-none gap-4 overflow-hidden">
      <NuxtLink :to="`/@${profile.username}`" class="w-16">
        <img
          class="w-16 rounded-full"
          :src="profile.photo"
          :alt="`${profile.name} cover photo`"
          onerror="this.src='https://via.placeholder.com/200';"
        />
      </NuxtLink>

      <div class="flex-1 overflow-hidden">
        <NuxtLink
          :to="`/@${profile.username}`"
          class="truncate font-bold leading-none hover:underline hover:text-primary"
        >
          {{ profile.name }}
        </NuxtLink>
        <div class="text-xs text-gray-500 flex gap-1">
          <span>{{ profile.followersCount }} subscribers</span>
          <span>•</span>
          <span>{{ profile.city.name }}, {{ profile.city.country.name }}</span>
        </div>
        <div>
          <div class="text-sm py-1 leading-none overflow-hidden max-h-16">
            {{ profile.bio }}
          </div>
          <TContactsGrid :profile="profile" class="" />
        </div>
      </div>
    </div>
  </div>
</template>
