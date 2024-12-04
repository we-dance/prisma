<script setup>
defineProps({
  event: {
    type: Object,
    required: false,
    default: () => ({
      image: "",
      type: "",
      styles: [],
      name: "",
      date: "",
      location: "",
    }),
  },
});
</script>
<template>
  <div class="flex flex-col gap-4">
    <NuxtImg v-if="event.image" :src="event.image" class="rounded" />
    <div>
      <p class="text-xs uppercase">
        <span>{{ event.type }}</span> · {{ event.styles.join(" · ") }}
      </p>
      <h2 class="font-bold w-full truncate">{{ event.name }}</h2>
      <p class="text-xs">{{ event.date }}</p>
      <p class="text-xs">{{ event.location }}</p>
    </div>
  </div>
</template>
