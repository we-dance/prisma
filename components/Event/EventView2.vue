<script setup>
const { t, d } = useI18n();

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const primaryUrl = "#";
const primaryLabel = "Buy Ticket";

const secondaryUrl = "#";
const secondaryLabel = "Subscribe";
</script>

<template>
  <div>
    <div class="grid grid-cols-2">
      <div class="p-4">
        <h1 class="text-5xl font-bold tracking-tight">
          {{ event.name }}
        </h1>
        <div class="mt-2 border rounded-md shadow divide-y text-sm max-w-96">
          <div class="pl-4 flex items-center justify-start gap-1">
            <Icon name="heroicons-outline:calendar" class="h-4 w-4" />
            <div class="flex-1">
              {{ d(event.startDate, "long") }}
            </div>
            <Button variant="ghost">Add to Calendar</Button>
          </div>
          <div class="pl-4 flex items-center justify-start gap-1">
            <Icon name="heroicons-outline:location-marker" class="h-4 w-4" />
            <div class="flex-1">
              <div>
                {{ event.venue?.name
                }}<span v-if="event.venue?.room">
                  • {{ event.venue.room }}</span
                >
              </div>
              <div class="text-gray-700">
                {{ event.venue?.formatted_address }}
              </div>
            </div>
            <Button variant="ghost">Show on Map</Button>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <Button v-if="primaryUrl" as-child>
            <NuxtLink :to="primaryUrl">{{ primaryLabel }}</NuxtLink>
          </Button>
          <Button v-if="secondaryUrl" as-child variant="secondary">
            <NuxtLink :to="secondaryUrl">{{ secondaryLabel }}</NuxtLink>
          </Button>
        </div>
        <TPreview :content="event.description" class="mt-4" />
      </div>
      <div v-if="event.cover">
        <NuxtImg
          class="object-cover w-full"
          width="713"
          height="1029"
          sizes="713"
          :src="event.cover"
          :alt="event.name + ' cover'"
        />
      </div>
    </div>
  </div>
</template>
