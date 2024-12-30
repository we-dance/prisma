<script setup>
import WeDanceLogo from "~/public/svg/logo-horizontal-dark.svg?component";

const { auth, isLoggedIn, signOut, data } = useAppAuth();
</script>

<template>
  <header
    class="flex bg-white px-4 p-2 gap-2 justify-start items-center border-b"
  >
    <slot />
    <NuxtLink title="Homepage" to="/" class="hidden md:block">
      <WeDanceLogo />
    </NuxtLink>
    <div class="flex-grow"></div>
    <Button variant="ghost">
      <NuxtLink :to="localePath('/search')">
        <Icon name="heroicons:magnifying-glass" size="24" />
      </NuxtLink>
    </Button>
    <TQrCodeButton label="Share" />
    <Button v-if="!isLoggedIn" @click="auth('continue')">Sign in</Button>
    <template v-if="isLoggedIn">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon">
            <img :src="data.photo" class="rounded-full w-8 h-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="signOut">{{
            $t("auth.signout")
          }}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
  </header>
</template>
