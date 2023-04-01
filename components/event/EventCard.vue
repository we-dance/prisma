<script setup lang="ts">
import format from 'date-fns/format'

interface Profile {
  name: string
  username: string
}

interface Event {
  id: string
  createdAt: Date
  startDate: Date
  name: string
  role?: string
  org?: Profile
  venue?: Profile
  type: string
  styles: string[]
  cover: string
  price: string
}

function formatDate (val: Date, formatStr: string) {
  return format(val, formatStr)
}

defineProps<{
  event: Event
  isEmbed?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="`/events/${event.id}`"
    :target="isEmbed ? '_blank' : '_self'"
    class="flex border-b p-4 leading-none gap-2"
  >
    <div class="text-center">
      <div class="font-bold text-sm leading-none">
        {{ formatDate(event.startDate, 'HH:mm') }}
      </div>
    </div>
    <div class="w-full">
      <div
        class="font-bold text-sm leading-none hover:underline hover:text-primary"
      >
        {{ event.name }}
      </div>
      <div>
        <div class="text-xs pt-1 leading-none">
          <template v-if="event.role">
            {{ event.role }} ·
          </template>
          {{ event.org ? event.org.username : '' }}
          <template v-if="event.venue">
            · {{ event.venue.name }}
          </template>
        </div>
      </div>
      <div class="text-xs text-gray-700 pt-1">
        <span class="text-primary">{{ event.type }}</span>
        ·
        {{
          event.styles.join(' · ')
        }}
        <template v-if="event.price">
          · {{ event.price }}
        </template>
      </div>
    </div>
    <div>
      <img class="w-20 rounded" :src="event.cover">
    </div>
  </NuxtLink>
</template>
