<script setup lang="ts">
import { useAuth } from '#imports'

const { data, status } = useAuth()
</script>

<template>
  <div>
    <nuxt-link
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/discover"
    >
      Discover as guest
    </nuxt-link>

    <nuxt-link
      v-if="status === 'unauthenticated'"
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/login"
    >
      Login
    </nuxt-link>

    <nuxt-link
      v-if="status === 'authenticated'"
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/logout"
    >
      Log out
    </nuxt-link>

    <div v-if="status === 'authenticated'">
      Hello {{ data.user.name }}
    </div>
  </div>
</template>
