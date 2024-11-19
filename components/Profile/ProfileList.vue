<script>
export default {
  props: {
    profiles: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<template>
  <NuxtLink
    v-for="profile in profiles"
    :key="profile.id"
    :to="localePath(`/@${profile.username}`)"
    class="border-b p-4 flex gap-2 items-start group whitespace-nowrap w-full"
    @click.native="
      $track('search_profile', {
        name: profile.name,
        username: profile.username,
        query,
      })
    "
  >
    <div class="w-12 flex-shrink-0">
      <NuxtImg
        v-if="profile.photo"
        width="68"
        height="68"
        fit="fill"
        :placeholder="[68, 68]"
        loading="lazy"
        class="rounded-full shadow"
        :src="profile.photo"
      />
      <div
        v-else
        class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full shadow"
      >
        <Icon name="heroicons:user-circle" class="text-gray-400" size="30px" />
      </div>
    </div>
    <div class="w-full overflow-hidden">
      <div class="block text-xs font-bold leading-tight">
        {{ profile.name }}
      </div>
      <div
        class="block text-xs text-gray-800 leading-tight max-w-48 overflow-hidden text-ellipsis"
      >
        @{{ profile.username }}
      </div>
      <div class="block text-xs text-gray-500 leading-tight">
        {{ profile.followersCount || 0 }} followers
      </div>
      <EventList v-if="profile.eventsHosted" :events="profile.eventsHosted" />
    </div>
  </NuxtLink>
</template>
