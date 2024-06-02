<script setup lang="ts">
import { ref } from "vue";
import { navigateTo, useAuth } from "#imports";

const { register } = defineProps({
  register: Boolean,
});

const state = reactive({
  email: undefined,
  password: undefined,
  name: undefined,
});

const error = ref("");
const callbackUrl = "/";

const { signIn } = useAuth();

const signInErrors: { [key: string]: string } = {
  default: "Unable to sign in.",
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallbackError: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
};

const login = async (provider: string, options?: any) => {
  error.value = "";

  const { error: errorType, url } = await signIn(provider, {
    ...options,
    redirect: false,
    callbackUrl,
  });
  if (errorType) {
    error.value = signInErrors[errorType]
      ? signInErrors[errorType]
      : signInErrors.default;
  } else {
    navigateTo(url, { external: true });
  }
};
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
