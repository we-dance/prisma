<script setup>
const props = defineProps({
  events: Array,
});

const { d } = useI18n();
</script>

<template>
  <section>
    <ScrollArea class="mt-2 whitespace-nowrap">
      <div class="flex space-x-2 w-max">
        <CardVertical
          v-for="event in events"
          :key="event.id"
          :to="`/e/${event.slug}-${event.shortId}`"
          :image="event.cover"
          :title="event.name"
          :subtitle="d(event.startDate, 'short')"
          :bottom="event.venue?.city?.name || ''"
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </section>
</template>
