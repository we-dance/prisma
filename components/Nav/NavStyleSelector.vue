<script setup>
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);

const styles = [
  { label: "Salsa", value: "Salsa" },
  { label: "Bachata", value: "Bachata" },
  { label: "Kizomba", value: "Kizomba" },
];
const selected = computed(() =>
  styles.find((city) => city.value === props.modelValue)
);
</script>

<template>
  <!-- [ui] USelectMenu -->
  <div
    :model-value="selected"
    searchable
    searchable-placeholder="Select a style..."
    class="w-full lg:w-40"
    placeholder="Select a style..."
    :options="styles"
    @change="(style) => $emit('update:modelValue', style.value)"
  ></div>
</template>
