<script setup>
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);

const { data } = await useFetch("/api/profiles", {
  query: {
    type: "City",
  },
});

const cities = computed(() =>
  data.value.map((city) => ({ label: city.name, value: city.username }))
);
const selected = computed(() =>
  cities.value.find((city) => city.value === props.modelValue)
);
</script>

<template>
  <!-- [ui] USelectMenu -->
  <div
    :model-value="selected"
    searchable
    searchable-placeholder="Select a city..."
    class="w-full lg:w-40"
    placeholder="Select a city..."
    :options="cities"
    @change="(city) => $emit('update:modelValue', city.value)"
  ></div>
</template>
