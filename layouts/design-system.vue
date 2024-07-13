<script setup lang="ts">
import { cn } from "@/lib/utils";

useHead({
  htmlAttrs: {
    class: "h-full",
  },
  bodyAttrs: {
    class: "h-full",
  },
});

interface Item {
  title: string;
  href: string;
}

const $route = useRoute();

const sidebarNavItems: Item[] = [
  {
    title: "CityInput",
    href: "/design-system/CityInput",
  },
];
</script>
<style>
#__nuxt {
  height: 100%;
}
</style>
<template>
  <div class="flex h-full">
    <aside class="w-72 h-full">
      <nav class="flex grow flex-col gap-y-4 overflow-y-auto h-full p-4">
        <Button
          v-for="item in sidebarNavItems"
          :key="item.title"
          as="a"
          :href="item.href"
          variant="ghost"
          :class="
            cn(
              'w-full text-left justify-start',
              $route.path === item.href && 'bg-muted hover:bg-muted'
            )
          "
        >
          {{ item.title }}
        </Button>
      </nav>
    </aside>
    <div class="p-4">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
