<script setup lang="ts">
import { useAuth } from "#imports";

const { status } = useAuth();
</script>

<template>
  <div class="flex">
    <nuxt-link class="block px-4 py-2 m-1 hover:bg-gray-200 flex" to="/">
      Home
    </nuxt-link>
    <nuxt-link
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/discover/de/Munich"
    >
      Discover
    </nuxt-link>
    <nuxt-link
      v-if="status === 'unauthenticated'"
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/signin"
    >
      Login
    </nuxt-link>
    <nuxt-link
      v-if="status === 'authenticated'"
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/signout"
    >
      Log out
    </nuxt-link>
  </div>
</template>
