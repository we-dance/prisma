<script setup>
const isNavOpen = ref(false);
</script>

<template>
  <AppHeader>
    <Button variant="ghost" class="md:hidden" @click="isNavOpen = !isNavOpen">
      <Icon name="heroicons:bars-3" size="24" />
    </Button>
  </AppHeader>

  <div class="flex">
    <MainNav
      class="md:block bg-white w-40 absolute md:relative z-50"
      :class="{ hidden: !isNavOpen }"
    />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
