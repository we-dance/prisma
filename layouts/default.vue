<script setup>
import { MenuIcon } from "@heroicons/vue/24/outline";

const isMenuOpen = ref(false);
</script>

<template>
  <div>
    <Banner
      name="competition"
      desktop="Join WeDance Competition and Win 300€!"
      mobile="Win 300€"
      action="Learn More"
      to="/competition"
    />

    <div
      class="font-sans leading-normal tracking-normal antialiased min-h-screen mx-auto max-w-2xl border-r"
    >
      <div
        v-if="isMenuOpen"
        class="fixed w-full h-full top-0 left-0 bg-black opacity-50 z-50"
        @click="isMenuOpen = false"
      />
      <transition name="slide">
        <div
          v-if="isMenuOpen"
          class="bg-white fixed left-0 w-56 bottom-0 top-0 z-50 shadow-lg md:hidden"
        >
          <MainNav />
        </div>
      </transition>

      <header
        class="md:hidden flex p-2 gap-2 justify-start items-center border-b"
      >
        <button class="mt-2" @click="isMenuOpen = !isMenuOpen">
          <MenuIcon class="w-6 h-6" />
        </button>

        <router-link to="/">
          <NuxtImg src="/svg/logo-horizontal-dark.svg" alt="WeDance" />
        </router-link>
        <div class="flex-grow"></div>
        <QrCodeButton label="Share" />
      </header>

      <div class="flex">
        <MainNav class="hidden md:block w-52 shrink-0" />
        <slot />
      </div>
    </div>
  </div>
</template>
