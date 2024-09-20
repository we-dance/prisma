<script setup>
import WeDanceLogo from "~/public/svg/logo-horizontal-dark.svg?component";

const isMenuOpen = ref(false);
</script>

<template>
  <TBanner
    name="competition"
    desktop="Join WeDance Competition and Win 300€!"
    mobile="Win 300€"
    action="Join Competition"
    to="/competition"
  />

  <div class="bg-white leading-normal tracking-normal min-h-screen">
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

    <header class="flex p-2 gap-2 justify-start items-center border-b">
      <button class="mt-2" title="Open Menu" @click="isMenuOpen = !isMenuOpen">
        <Icon name="heroicons:bars-3" class="w-6 h-6" />
      </button>

      <router-link title="Homepage" to="/">
        <WeDanceLogo />
      </router-link>
      <div class="flex-grow"></div>
      <TQrCodeButton label="Share" />
    </header>

    <div class="mx-auto max-w-2xl">
      <slot />
    </div>
  </div>
</template>
