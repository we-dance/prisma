<script setup>
import WeDanceLogo from "~/public/svg/logo-horizontal-dark.svg?component";

const isMenuOpen = ref(false);

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <TBanner
          name="competition"
          desktop="Join WeDance Competition and Win 300€!"
          mobile="Win 300€"
          action="Join Competition"
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
            <button
              class="mt-2"
              title="Open Menu"
              @click="isMenuOpen = !isMenuOpen"
            >
              <Icon name="heroicons-outline:menu" class="w-6 h-6" />
            </button>

            <router-link title="Homepage" to="/">
              <WeDanceLogo />
            </router-link>
            <div class="flex-grow"></div>
            <TQrCodeButton label="Share" />
          </header>

          <div class="flex">
            <MainNav class="hidden md:block w-52 shrink-0" />
            <slot />
          </div>
        </div>
      </Body>
    </Html>
  </div>
</template>
