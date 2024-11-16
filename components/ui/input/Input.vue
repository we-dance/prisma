<script setup lang="ts">
import { ref, watch } from "vue";
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  trim?: string;
  lowercase?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const input = ref(modelValue.value);

const sanitize = (
  input: string,
  trim: string | undefined,
  target = ""
): string => {
  const val = input || "";
  const expression = new RegExp(trim || "", "gi");

  return val.replace(expression, target).trim();
};

watch(modelValue, (newVal) => {
  input.value = String(newVal);
});

watch(input, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    let sanitizedValue = String(newVal);

    if (props.trim) {
      sanitizedValue = sanitize(sanitizedValue, props.trim);
    }

    if (props.lowercase) {
      sanitizedValue = sanitizedValue.toLowerCase();
    }

    if (sanitizedValue !== newVal) {
      input.value = sanitizedValue;
      return;
    }

    emits("update:modelValue", newVal || "");
  }
});
</script>

<template>
  <input
    v-model="input"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
