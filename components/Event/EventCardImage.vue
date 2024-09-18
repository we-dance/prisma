<script setup lang="ts">
import { format } from "date-fns";
import { Prisma } from "@prisma/client";

const { d } = useI18n();

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

const coverCloudinary = computed(() => {
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

const cover = computed(() => {
  return props.event.cover;
});

const size = 150;
</script>

<template>
  <NuxtLink
    :to="`/e/${event.slug}-${event.shortId}`"
    :target="isEmbed ? '_blank' : '_self'"
    class="block border overflow-hidden"
    :style="`width: ${size}px;`"
  >
    <div class="bg-gray-100" :style="`width: ${size}px; height: ${size}px;`">
      <NuxtImg
        v-if="cover"
        :width="size"
        :height="size"
        fit="cover"
        loading="lazy"
        :src="cover"
        :alt="`${event.name} cover photo`"
      />
    </div>
    <div class="p-2 overflow-hidden">
      <div
        class="font-bold text-xs hover:underline hover:text-primary overflow-hidden text-ellipsis"
      >
        {{ event.styles.map((style) => style.name).join(", ") }}
      </div>
      <div class="overflow-hidden">
        <div class="text-xs text-gray-600">
          <div class="flex items-center">
            <span class="truncate">{{ d(event.startDate, "short") }}</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
[data-error] {
  @apply hidden;
}
</style>
