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
  <div class="relative flex flex-col gap-4 rounded h-48 overflow-hidden">
    <NuxtImg
      v-if="event.image"
      :src="event.image"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div
      class="relative flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black/80 to-transparent"
    >
      <p class="text-xs uppercase text-white">
        <span>{{ event.type }}</span> · {{ event.styles.join(" · ") }}
      </p>
      <h2 class="font-bold w-full truncate text-white">{{ event.name }}</h2>
      <p class="text-xs text-white">{{ event.date }}</p>
      <p class="text-xs text-white">{{ event.location }}</p>
    </div>
  </div>
</template>
