<script setup lang="ts">
import { format } from 'date-fns'
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
  isEmbed?: boolean,
  showRole?: boolean,
  showOrganizer?: boolean
}>(),
{
  isEmbed: false,
  showRole: false,
  showOrganizer: false
})

const startDate = new Date(props.event.startDate)
const eventDay = computed(() => format(startDate, 'd'))
const eventMonth = computed(() => format(startDate, 'MMM'))
const eventTime = computed(() => format(startDate, 'EEE HH:mm'))
const role = ''
const loaded = ref(false)
const error = ref(false)
</script>

<template>
  <NuxtLink
    :to="`/events/${event.id}`"
    :target="isEmbed ? '_blank' : '_self'"
    class="flex border-b p-4 leading-none gap-2"
  >
    <div class="text-center">
      <div class="font-bold leading-none">
        <div class="text-red-500">
          {{ eventDay }}
        </div>
        <div class="text-sm">
          {{ eventMonth }}
        </div>
      </div>
    </div>
    <div class="w-full">
      <div
        class="font-bold leading-none hover:underline hover:text-primary"
      >
        {{ event.name }}
      </div>
      <div>
        <div class="text-sm pt-1 leading-none">
          <template v-if="eventTime">
            {{ eventTime }}
          </template>
          <template v-if="showRole && role">
            · {{ role }}
          </template>
          <template v-if="showOrganizer && event.organizer">
            · {{ event.organizer.name }}
          </template>
          <template v-if="event.venue">
            · {{ event.venue.name }}
          </template>
        </div>
      </div>
      <div class="text-xs text-gray-700 pt-1">
        <span class="text-primary">{{ event.type }}</span>
        <template v-if="event.price">
          · {{ event.price }}
        </template>
        <template v-if="event.styles">
          <span v-for="style in event.styles" :key="style.id">· {{ style.name }}</span>
        </template>
      </div>
    </div>
    <div>
      <img
        :key="event.cover"
        loading="lazy"
        :class="(loaded ? 'bg-gray-500' : 'bg-gray:10')"
        class="w-20 rounded"
        :src="event.cover"
        :alt="`${event.name} cover photo`"
        @load="loaded = true"
        @error="error = true"
      >
    </div>
  </NuxtLink>
</template>
