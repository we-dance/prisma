<template>
  <div class="p-4 border rounded-sm gap-2 flex flex-col">
    <div v-if="error" class="text-red-500 p-4">
      {{ error }}
    </div>
    <button class="border" @click="login('google')">
      Sign in with Google
    </button>
    <div>
      <input v-if="register" v-model="name" type="text" class="border px-4 py-2 rounded-sm w-full" placeholder="name">
    </div>
    <div>
      <input v-model="email" type="text" class="border px-4 py-2 rounded-sm w-full" placeholder="email">
    </div>
    <div>
      <input v-model="password" type="password" class="border px-4 py-2 rounded-sm w-full" placeholder="password">
    </div>
    <button v-if="register" class="border" @click="login('register', { name, email, password })">
      Register
    </button>
    <button v-else class="border" @click="login('credentials', { email, password })">
      Log in
    </button>
    <nuxt-link
      v-if="!register"
      class="underline hover:no-underline"
      to="/register"
    >
      Create an account
    </nuxt-link>
    <nuxt-link
      v-if="register"
      class="underline hover:no-underline"
      to="/login"
    >
      Login
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, navigateTo, useAuth } from '#imports'

definePageMeta({ auth: false })

const { register } = defineProps({
  register: Boolean
})

const email = ref('')
const name = ref('')
const password = ref('')
const error = ref('')
const callbackUrl = '/'

const { signIn } = useAuth()

const signInErrors: { [key: string]: string } = {
  default: 'Unable to sign in.',
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallbackError: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
          'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'The e-mail could not be sent.',
  CredentialsSignin:
          'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.'
}

const login = async (provider: string, options?: any) => {
  error.value = ''

  const { error: errorType, url } = await signIn(provider, { ...options, redirect: false, callbackUrl })
  if (errorType) {
    error.value = signInErrors[errorType] ? signInErrors[errorType] : signInErrors.default
  } else {
    navigateTo(url, { external: true })
  }
}
</script>
