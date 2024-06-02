<script setup lang="ts">
import { useAuth } from "#imports";

const { data, status } = useAuth();
</script>

<template>
  <div class="max-w-lg mx-auto">
    <div v-if="status === 'authenticated'">
      <div>Hello {{ data.user.name }}</div>
      <nuxt-link to="/signout">Logout</nuxt-link>
    </div>
    <div v-else>
      <nuxt-link to="/signin">Login</nuxt-link>
    </div>
    <slot />
  </div>
</template>
