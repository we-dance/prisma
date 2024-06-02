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
const eventDay = computed(() => format(startDate, 'd MMM'))
const eventTime = computed(() => format(startDate, 'EEE HH:mm'))
</script>

<template>
  <div>
    <NuxtLink
      :to="`/events/${event.id}`"
      :target="isEmbed ? '_blank' : '_self'"
      class="w-48 leading-none gap-2 m-2 border overflow-hidden rounded shadow-sm"
    >
      <div class="w-48 h-48 bg-gray-500 rounded">
        <img
          class="w-full"
          :src="event.cover"
          :alt="`${event.name} cover photo`"
          onerror="this.src='https://via.placeholder.com/200';"
        >
      </div>

      <div class="p-2">
        <div
          class="truncate font-bold leading-none hover:underline hover:text-primary"
        >
          {{ event.name }}
        </div>
        <div>
          <div class="text-sm pt-1 leading-none">
            {{ eventDay }} · {{ eventTime }}
          </div>
        </div>
        <div class="text-xs text-gray-700 pt-1">
          <span class="text-primary">{{ event.type }}</span>
          <template v-if="event.price">
            · {{ event.price }}
          </template>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
