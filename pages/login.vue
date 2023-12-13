<template>
  <div class="p-4 border rounded-sm gap-2 flex flex-col">
    <button class="border" @click="signIn('google', { callbackUrl: '/' })">
      Sign in with Google
    </button>
    <div>
      <input v-model="email" type="text" class="border px-4 py-2 rounded-sm w-full" placeholder="email">
    </div>
    <div>
      <input v-model="password" type="password" class="border px-4 py-2 rounded-sm w-full" placeholder="password">
    </div>
    <button class="border" @click="signIn('credentials', { email, password, callbackUrl: '/' })">
      Sign in with username and password
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, useAuth } from '#imports'

definePageMeta({ auth: false })

const email = ref('')
const password = ref('')

const { signIn } = useAuth()
</script>
