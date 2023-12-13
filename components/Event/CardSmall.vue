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
</script>

<template>
  <NuxtLink
    :to="`/events/${event.id}`"
    :target="isEmbed ? '_blank' : '_self'"
    class="p-2 leading-none gap-2 w-20"
  >
    <div>
      <img
        class="w-32 rounded"
        :src="event.cover"
        :alt="`${event.name} cover photo`"
      >
    </div>

    <div class="mt-2 text-center">
      <div class="font-bold leading-none">
        <div class="text-red-500">
          {{ eventDay }}
        </div>
        <div class="text-sm">
          {{ eventMonth }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
