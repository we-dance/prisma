<script setup>
import WeDanceLogo from "~/public/svg/logo-horizontal-dark.svg?component";

const { auth } = useAppAuth();
const isMenuOpen = ref(false);

const searchQuery = ref("");
watch(searchQuery, () => {
  if (useRoute().path !== "/search") {
    useRouter().push(`/search?q=${searchQuery.value}`);
  } else {
    useRouter().replace(`/search?q=${searchQuery.value}`);
  }
});
</script>

<template>
  <header
    class="flex bg-white px-4 p-2 gap-2 justify-start items-center border-b"
  >
    <router-link title="Homepage" to="/">
      <WeDanceLogo />
    </router-link>
    <div class="flex-grow"></div>
    <Button variant="ghost">
      <Icon name="heroicons:magnifying-glass" size="24" />
    </Button>
    <TQrCodeButton label="Share" />
    <Button @click="auth('continue')">Sign in</Button>
    <template v-if="status === 'authenticated'">
      <Button @click="signOut" variant="ghost">
        {{ $t("auth.signout") }}
      </Button>
    </template>
  </header>
  <div v-if="false" class="flex-grow flex justify-center">
    <div class="relative w-full max-w-md items-center">
      <Input
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        class="pl-10"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon
          name="heroicons:magnifying-glass"
          class="text-muted-foreground"
          size="24"
        />
      </span>
    </div>
  </div>
</template>
