<script setup lang="ts">
import { useAuth, useRoute, useFetch, useRequestHeaders } from '#imports'

const { data, status, lastRefreshedAt, getCsrfToken, getProviders, signIn, signOut, getSession } = useAuth()

const providers = await getProviders()
const csrfToken = await getCsrfToken()

const headers = useRequestHeaders(['cookie']) as HeadersInit

const route = useRoute()
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
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/login"
    >
      Login
    </nuxt-link>

    <nuxt-link
      class="block px-4 py-2 m-1 hover:bg-gray-200 flex"
      to="/logout"
    >
      Log out
    </nuxt-link>

    <h3>Authentication Overview</h3>
    <pre>Status: {{ status }}</pre>
    <pre>Data: {{ data || 'no session data present, are you logged in?' }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</pre>
    <pre>CSRF Token: {{ csrfToken }}</pre>
    <pre>Providers: {{ providers }}</pre>
    <hr>
  </div>
</template>
