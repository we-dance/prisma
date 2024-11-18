<script setup>
import WeDanceLogo from "~/public/svg/logo-horizontal-dark.svg?component";

const isMenuOpen = ref(false);

const searchQuery = ref("");

const route = useRoute();
const router = useRouter();

watch(searchQuery, (query) => {
  router.replace({ query: { q: query || undefined } });
});

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q?.toString() || "";
  }
});
</script>

<template>
  <div
    v-if="isMenuOpen"
    class="fixed w-full h-full top-0 left-0 bg-black opacity-50 z-50"
    @click="isMenuOpen = false"
  />
  <transition name="slide">
    <div
      v-if="isMenuOpen"
      class="bg-white fixed left-0 w-56 bottom-0 top-0 z-50 shadow-lg"
    >
      <MainNav />
    </div>
  </transition>

  <header class="flex bg-white p-2 gap-2 justify-start items-center border-b">
    <Button variant="ghost" title="Open Menu" @click="isMenuOpen = !isMenuOpen">
      <Icon name="heroicons:bars-3" size="24" />
    </Button>

    <router-link title="Homepage" to="/">
      <WeDanceLogo />
    </router-link>
    <div class="flex-grow flex justify-center">
      <div class="relative w-full max-w-md items-center">
        <Input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Icon
            name="heroicons:magnifying-glass"
            class="text-muted-foreground"
            size="24"
          />
        </span>
      </div>
    </div>
    <TQrCodeButton label="Share" />
  </header>
</template>
