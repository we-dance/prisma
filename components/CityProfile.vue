<script setup lang="ts">
import type { Profile } from '@prisma/client'

defineProps<{
  profile: Profile,
  events: Array<any>
}>()
</script>

<template>
  <div>
    <div class="flex p-4 space-x-4">
      <div class="w-32">
        <img
          v-if="profile.photo"
          :src="profile.photo"
          :alt="profile.username"
          class="w-full rounded-full"
        >
      </div>

      <div>
        <h1 class="leading-tight font-bold">
          {{ profile.name }}
        </h1>
        <div class="text-sm">
          {{ profile.bio }}
        </div>

        <div class="text-xs text-gray-500">
          {{ profile._count.subscribers }} subscribers
        </div>

        <div class="flex space-x-2 mt-4">
          <button>Subscribe</button>
          <button to="/events/-/edit">
            Add Event
          </button>
        </div>
      </div>
    </div>

    <div class="border-t">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>
