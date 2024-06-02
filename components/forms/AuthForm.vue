<script setup lang="ts">
defineProps({
  register: Boolean,
});

const { login, error } = useAppAuth();

const state = reactive({
  email: undefined,
  password: undefined,
  name: undefined,
});
</script>

<template>
  <!-- [ui] UCard -->
  <div class="max-w-sm">
    <!-- [ui] UForm -->
    <div class="space-y-4" :state="state">
      <div v-if="error" class="text-red-500 p-4">
        {{ error }}
      </div>
      <button class="btn w-full" @click="login('google')">
        Sign in with Google
      </button>
      <!-- [ui] UDivider -->
      <div label="OR" />
      <div>
        <input
          v-if="register"
          v-model="state.name"
          class="input input-bordered w-full"
          type="text"
          placeholder="Name"
        />
      </div>
      <div>
        <input
          v-model="state.email"
          type="text"
          class="input input-bordered w-full"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          v-model="state.password"
          type="password"
          class="input input-bordered w-full"
          placeholder="Password"
        />
      </div>
      <button
        v-if="register"
        class="btn"
        @click="
          login('register', {
            name: state.name,
            email: state.email,
            password: state.password,
          })
        "
      >
        Register
      </button>
      <button
        v-else
        class="btn"
        @click="
          login('credentials', { email: state.email, password: state.password })
        "
      >
        Log in
      </button>
      <div>
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
          to="/signout"
        >
          Login
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
