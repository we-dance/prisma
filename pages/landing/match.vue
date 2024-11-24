<script setup lang="ts">
import { z } from "zod";
import { toast } from "vue-sonner";
import { CalendarDate } from "@internationalized/date";
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

const query = schema.safeParse(route.query);
if (query.error) {
  throw createError({
    statusCode: 404,
    statusMessage: "Wrong query",
  });
}

const { city: cityParam, style, start: startParam, end: endParam } = query.data;

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

const data = ref({} as any);
const loading = ref(false);

const selectedCity = ref<{ placeId: string; label: string } | null>(
  cityParam
    ? { placeId: cityParam, label: data.value?.city?.name || cityParam }
    : null
);

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
        city: citySlug.value ?? undefined,
        style,
        start: dateRange.start,
        end: dateRange.end,
      },
    });
  },
  { deep: true }
);
</script>

<template>
  <Body class="bg-white">
    <div class="mx-auto max-w-4xl">
      <section
        class="mx-auto flex max-w-[980px] min-h-[calc(100dvh-65px)] flex-col gap-2items-center justify-center"
      >
        <h1
          class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-tight"
        >
          Find your dance match!
        </h1>
        <span class="text-center text-lg font-light text-foreground">
          Answer a few fun questions to discover events and meet dancers
        </span>
        <div class="flex justify-center sm:flex-row gap-4 mt-4">
          <Button>I'm New to Dancing</Button>
          <Button variant="secondary">I Already Dance</Button>
        </div>
      </section>
    </div>
  </Body>
</template>
