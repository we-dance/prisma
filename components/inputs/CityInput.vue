<script setup lang="ts">
import { ref } from "vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const cities = [
  { value: "Munich", label: "Munich, Germany" },
  { value: "Berlin", label: "Berlin, Germany" },
  { value: "Paris", label: "Paris, France" },
  { value: "Havana", label: "Havana, Cuba" },
  { value: "Madrid", label: "Madrid, Spain" },
];

const open = ref(false);
const value = ref("");
</script>

<template>
  <div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[200px] justify-between"
        >
          {{
            value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select city..."
          }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command>
          <CommandInput class="h-9" placeholder="Search framework..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="city in cities"
                :key="city.value"
                :value="city.value"
                @select="
                  (ev) => {
                    if (typeof ev.detail.value === 'string') {
                      value = ev.detail.value;
                    }
                    open = false;
                  }
                "
              >
                {{ city.label }}
                <Check
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      value === city.value ? 'opacity-100' : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
