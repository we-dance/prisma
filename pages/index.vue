<script setup lang="ts">
import { z } from "zod";
import { toast } from "vue-sonner";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
const { $client } = useNuxtApp();
const { t, d } = useI18n();
const route = useRoute();
const router = useRouter();

const schema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  style: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
});

const {
  city: cityParam,
  style,
  start: startParam,
  end: endParam,
} = schema.parse(route.query);

const citySlug = ref<string | null>(null);

async function getCitySlug(city: any): Promise<string> {
  try {
    const response = await $client.cities.getOrCreateSlug.mutate(city);
    return response.slug;
  } catch (error) {
    toast.error("Failed to get city information. Please try again.");
    return "";
  }
}

const selectedStyle = ref(style);

// const todayDate = today(getLocalTimeZone());
const todayDate = new CalendarDate(2024, 7, 1);
const sixDaysLater = todayDate.add({ days: 6 });

const formatDate = (date: any) => date.toString().split("T")[0];

const selectedDateRange = ref({
  start: startParam || formatDate(todayDate),
  end: endParam || formatDate(sixDaysLater),
});

const { data, error } = await $client.events.overview.useQuery({
  city: citySlug.value || cityParam,
  style: selectedStyle.value,
  start: `${selectedDateRange.value.start}T00:00:00Z`,
});

const view = "parties";
const city = data.value?.city?.name;
const selectedCity = ref<{ placeId: string; label: string } | null>(
  cityParam ? { placeId: cityParam, label: city || cityParam } : null
);
const festivals = computed(() => data.value?.festivals);
const classes = computed(() => data.value?.classes);
const parties = computed(() => data.value?.parties);

watch(
  [selectedCity, selectedStyle, selectedDateRange],
  async ([city, style, dateRange]) => {
    if (city) {
      citySlug.value = await getCitySlug(city);
    } else {
      citySlug.value = null;
    }

    router.push({
      query: {
        ...route.query,
        city: citySlug.value,
        style,
        start: dateRange.start,
        end: dateRange.end,
      },
    });

    refresh();
  },
  { deep: true }
);

useHead({
  title: t(`explore.${view}.header`, {
    city,
    style,
  }),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t(`explore.${view}.subheader`, {
        city,
        style,
        referenceStyle: style || "Salsa",
      }),
    },
  ],
});
</script>

<template>
  <div>
    <div class="p-4">
      <h1 class="text-2xl font-bold">Plan your dance adventure</h1>

      <div class="text-sm">
        Find events and people who would like to meet and show you around
      </div>

      <div class="grid md:grid-cols-3 shadow rounded border mt-4 p-2 gap-2">
        <CityInput v-model="selectedCity" placeholder="Where" />
        <DateRangeInput v-model="selectedDateRange" />
        <DanceStyleInput v-model="selectedStyle" />
      </div>
    </div>
    <div v-if="festivals" class="grid p-4 border-t">
      <h2 class="text-xl font-bold">Festivals</h2>
      <div class="text-sm">Plan your year and explore the world</div>
      <ScrollArea class="mt-2 whitespace-nowrap">
        <div class="flex space-x-2 w-max">
          <CardVertical
            v-for="event in festivals"
            :key="event.id"
            :to="`/e/${event.slug}-${event.shortId}`"
            :image="event.cover"
            :title="event.name"
            :subtitle="d(event.startDate, 'short')"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    <div v-if="classes" class="grid p-4 border-t">
      <h2 class="text-xl font-bold">Classes</h2>
      <div class="text-sm">Plan your month and improve your skills</div>
      <ScrollArea class="mt-2 whitespace-nowrap">
        <div class="flex space-x-2 w-max">
          <CardVertical
            v-for="event in classes"
            :key="event.id"
            :to="`/e/${event.slug}-${event.shortId}`"
            :image="event.cover"
            :title="event.name"
            :subtitle="d(event.startDate, 'short')"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    <div v-if="parties" class="grid p-4 border-t">
      <h2 class="text-xl font-bold">Parties</h2>
      <div class="text-sm">Plan your week and dance</div>
      <ScrollArea class="mt-2 whitespace-nowrap">
        <div class="flex space-x-2 w-max">
          <CardVertical
            v-for="event in parties"
            :key="event.id"
            :to="`/e/${event.slug}-${event.shortId}`"
            :image="event.cover"
            :title="event.name"
            :subtitle="d(event.startDate, 'short')"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  </div>
</template>
