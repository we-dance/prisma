<script setup>
import { getDate, getDay, getYmd } from "~/utils";

const props = defineProps({
  events: Array,
});

const items = computed(() => props.events);

const groups = computed(() => {
  const result = {};

  items.value.forEach((event) => {
    const venue = event.venue.username;
    result[venue] = result[venue] || {
      venue: event.venue,
      events: [],
    };
    result[venue].events.push(event);
  });

  return result;
});

const $i18n = {
  locale: "en",
};
</script>

<template>
  <div>
    <div v-for="group in groups" :key="group.venue.username">
      <h2 class="font-bold p-4 border-b">
        {{ group.venue.name }}
      </h2>
      <div v-for="event in group.events" :key="event.id">
        <EventCard :key="event.id" :event="event" side="date" />
      </div>
    </div>
  </div>
</template>
