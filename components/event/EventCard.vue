<script setup lang="ts">
import format from 'date-fns/format'
// import type { DanceEvent } from 'schema-dts'
import { Prisma } from '@prisma/client'
type EventDetails = Prisma.EventGetPayload<{
  include: {
    venue: true,
    organizer: true,
    styles: true
  }
}>

const props = withDefaults(defineProps<{
  event: EventDetails
  isEmbed?: boolean
}>(),
{
  isEmbed: false
})

const startDate = new Date(props.event.startDate)
const eventTime = computed(() => format(startDate, 'HH:mm'))
const role = ''
</script>

<template>
  <NuxtLink
    :to="`/events/${event.id}`"
    :target="isEmbed ? '_blank' : '_self'"
    class="flex border-b p-4 leading-none gap-2"
  >
    <div class="text-center">
      <div class="font-bold text-sm leading-none">
        {{ eventTime }}
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
          <template v-if="role">
            {{ role }} ·
          </template>
          <template v-if="event.organizer">
            {{ event.organizer.name }}
          </template>
          <template v-if="event.venue">
            · {{ event.venue.name }}
          </template>
        </div>
      </div>
      <div class="text-xs text-gray-700 pt-1">
        <span class="text-primary">{{ event.type }}</span>
        ·
        <template v-if="event.styles">
          <span v-for="style in event.styles" :key="style.id">{{ style.name }}</span>
        </template>
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
