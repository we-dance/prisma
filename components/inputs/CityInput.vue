<script setup>
import { ref } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { useVModel } from "@vueuse/core";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { loadGoogleMapsApi } from "~/lib/googleMapsApi";

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(["update:modelValue"]);

const modelValue = useVModel(props, "modelValue", emits);

const query = ref("");
const results = ref([]);

const getPlacePredictions = () => {
  loadGoogleMapsApi().then((google) => {
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: query.value,
        types: ["(cities)"],
      },
      (predictions) => {
        results.value = predictions.map((prediction) => ({
          placeId: prediction.place_id,
          label: prediction.description,
        }));
      }
    );
  });
};

watch(query, () => {
  if (query.value.length > 1) {
    getPlacePredictions();
  } else {
    results.value = [];
  }
});
</script>

<template>
  <div>
    <Combobox v-model="modelValue" by="placeId">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :displayValue="(city) => (city ? city.label : '')"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="query.length < 2"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Type at least 2 characters to search.
            </div>
            <div
              v-else-if="results.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="city in results"
              as="template"
              :key="city.id"
              :value="city"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-primary text-primary-foreground': active,
                  'text-primary': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ city.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
