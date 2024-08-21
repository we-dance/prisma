<script setup lang="ts">
import { format } from "date-fns";
import { Prisma } from "@prisma/client";
type EventDetails = Prisma.EventGetPayload<{
  include: {
    venue: true;
    organizer: true;
    styles: true;
  };
}>;

const props = withDefaults(
  defineProps<{
    event: EventDetails;
    isEmbed?: boolean;
    showRole?: boolean;
    showOrganizer?: boolean;
    side: "date" | "time";
  }>(),
  {
    isEmbed: false,
    showRole: false,
    showOrganizer: false,
    side: "date",
  }
);

const startDate = new Date(props.event.startDate);
const eventDay = computed(() => format(startDate, "d"));
const eventMonth = computed(() => format(startDate, "MMM"));
const dayOfWeek = computed(() => format(startDate, "EEE"));
const eventTime = computed(() => format(startDate, "HH:mm"));
const role = "";

const cover = computed(() => {
  if (!props.event.cover) {
    return "";
  }

  if (props.event.cover.includes("cloudinary.com")) {
    return props.event.cover.replace(
      "https://res.cloudinary.com/djumxevsm/image/upload",
      ""
    );
  } else {
    return "";
  }
});
</script>

<template>
  <NuxtLink
    :to="`/e/${event.slug}-${event.shortId}`"
    :target="isEmbed ? '_blank' : '_self'"
    class="flex border-b p-4 leading-none gap-2 whitespace-nowrap"
  >
    <div class="flex-shrink-0">
      <div class="text-center text-xs bg-gray-100 p-2 rounded">
        <div v-if="side === 'date'" class="font-bold leading-none">
          <div class="text-primary">
            {{ eventDay }}
          </div>
          <div class="text-xs">
            {{ eventMonth }}
          </div>
        </div>
        <div v-if="side === 'time'" class="font-bold leading-none">
          <div class="text-primary">
            {{ eventTime }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow overflow-hidden">
      <div
        class="font-bold text-xs hover:underline hover:text-primary overflow-hidden text-ellipsis"
      >
        {{ event.name }}
      </div>
      <div>
        <div class="text-xs text-gray-600">
          <div v-if="side === 'date' && eventTime" class="flex items-center">
            <Icon name="heroicons-outline:clock" class="h-3 w-3 mr-1" />
            <span class="truncate">{{ dayOfWeek }}, {{ eventTime }}</span>
          </div>
          <div class="flex items-center">
            <Icon name="heroicons:map-pin" class="h-3 w-3 mr-1" />
            <span class="truncate">{{ event.venue.name }}</span>
          </div>
          <div v-if="event.price" class="flex items-center">
            <Icon name="heroicons:ticket" class="h-3 w-3 mr-1" />
            <span class="truncate">{{ event.price }}</span>
          </div>
        </div>
      </div>
      <div class="mt-2 flex flex-wrap gap-1">
        <span
          class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
        >
          {{ event.type }}
        </span>

        <span
          v-for="style in event.styles"
          :key="style.id"
          class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
        >
          {{ style.name }}
        </span>
      </div>
    </div>
    <div class="flex-shrink-0">
      <NuxtImg
        v-if="cover"
        class="w-20 rounded"
        format="webp"
        provider="cloudinary"
        width="68"
        height="68"
        fit="fill"
        :placeholder="[68, 68]"
        loading="lazy"
        :src="cover"
        :alt="`${event.name} cover photo`"
      />
    </div>
  </NuxtLink>
</template>

<style scoped>
[data-error] {
  @apply hidden;
}
</style>
