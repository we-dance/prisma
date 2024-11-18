<script setup lang="ts">
import WeDanceLogo from "~/public/svg/logo-horizontal-dark.svg?component";
const localePath = useLocalePath();

const { data, status, signOut } = useAuth();
const featureFindPartner = false;
const currentCity = "/de/munich";

function isAdmin(force = false) {
  return false;
}
</script>

<template>
  <nav
    class="p-4 flex flex-col space-y-2 text-dark h-screen overflow-y-scroll sticky top-0 border-r"
  >
    <TButton
      allow-guests
      :to="localePath('/')"
      type="void"
      title="Homepage"
      :track="{ event: 'main_menu', action: 'logo' }"
    >
      <WeDanceLogo />
    </TButton>

    <TButton
      allow-guests
      :to="localePath('/start')"
      label="Start Here"
      type="nav"
      :track="{ event: 'main_menu', action: 'start' }"
    />

    <TButton
      allow-guests
      :to="localePath('/')"
      icon="heroicons:arrow-trending-up"
      :label="$t('nav.global')"
      type="nav"
      :track="{ event: 'main_menu', action: 'global' }"
    />

    <TButton
      allow-guests
      :to="
        currentCity
          ? localePath(`/explore${currentCity}`)
          : localePath('/explore')
      "
      :label="$t('nav.local')"
      icon="heroicons:map-pin"
      type="nav"
      :track="{ event: 'main_menu', action: currentCity ? 'local' : 'explore' }"
    />

    <TButton
      v-if="featureFindPartner"
      allow-guests
      :to="localePath('/find-partner/start')"
      icon="heroicons:users-solid"
      :label="$t('nav.partner')"
      type="nav"
      :track="{ event: 'main_menu', action: 'find_partner' }"
    />

    <TButton
      allow-guests
      :to="localePath('/search')"
      icon="heroicons:magnifying-glass"
      :label="$t('nav.search')"
      type="nav"
      :track="{ event: 'main_menu', action: 'search' }"
    />

    <div class="border-b pt-2 text-xs font-bold uppercase">
      {{ $t("nav.contribute") }}
    </div>
    <TButton
      v-if="uid"
      :to="localePath('/events/-/import')"
      icon="heroicons:plus"
      :label="$t('nav.addEvent')"
      type="nav"
      :track="{ event: 'main_menu', action: 'add_event' }"
    />
    <TButton
      v-else
      allow-guests
      :to="localePath('/organize')"
      icon="heroicons:plus"
      :label="$t('nav.addEvent')"
      type="nav"
      :track="{ event: 'main_menu', action: 'organize' }"
    />

    <TButton
      :to="localePath('/reviews/add')"
      :label="$t('nav.addReview')"
      type="nav"
      icon="heroicons:star"
      :track="{ event: 'main_menu', action: 'add_review' }"
    />

    <template v-if="status === 'authenticated'">
      <div class="border-b pt-2 text-xs font-bold uppercase">
        {{ $t("nav.myProfile") }}
      </div>
      <TButton
        :to="localePath('/chat')"
        icon="heroicons:chat-bubble-left-right-solid"
        :label="$t('nav.chat')"
        type="nav"
        :track="{ event: 'main_menu', action: 'chat' }"
      />
      <TButton
        :to="localePath(`/${username}`)"
        type="nav"
        :track="{ event: 'main_menu', action: 'my_profile' }"
      >
        <TProfilePhoto size="xs" :uid="uid" class="mr-1" />
        <span>{{ $t("nav.myProfile") }}</span>
      </TButton>
      <TButton
        :to="localePath('/settings')"
        type="nav"
        icon="heroicons:cog-6-tooth"
        :label="$t('nav.settings')"
        :track="{ event: 'main_menu', action: 'settings' }"
      />
      <TButton
        @click="signOut()"
        type="nav"
        :label="$t('auth.signout')"
        :track="{ event: 'main_menu', action: 'sign_out' }"
      />
    </template>
    <template v-else>
      <TButton
        allow-guests
        :to="localePath('/signin')"
        type="nav"
        :label="$t('auth.signin')"
        class="bg-primary border-none text-white hover:bg-dark"
        :track="{ event: 'main_menu', action: 'sign_in' }"
      />
    </template>

    <div class="flex justify-start">
      <TLanguageSwitcher />
    </div>

    <div class="h-8"></div>

    <div v-if="isAdmin(true)" class="border-b pt-2 text-xs font-bold uppercase">
      Administration
    </div>
    <TButton
      v-if="isAdmin(true)"
      :label="`Admin ${isAdmin() ? 'ON' : 'OFF'}`"
      type="nav"
      @click="toggleAdmin()"
    />

    <TButton
      v-if="isAdmin()"
      to="/admin/nfc"
      type="nav"
      class="text-gray-700"
      label="NFC"
    />

    <TButton
      v-if="isAdmin()"
      to="/admin/cities"
      type="nav"
      class="text-gray-700"
      label="Cities"
    />
    <TButton
      v-if="isAdmin()"
      to="/admin/reports"
      type="nav"
      class="text-gray-700"
      label="Reports"
    />
    <TButton
      v-if="isAdmin()"
      to="/admin/suspended"
      type="nav"
      class="text-gray-700"
      label="Suspended"
    />
    <TButton
      v-if="isAdmin()"
      to="/admin/emails"
      type="nav"
      class="text-gray-700"
      label="Emails"
    />
    <TButton
      v-if="isAdmin()"
      to="/admin/templates"
      type="nav"
      class="text-gray-700"
      label="Templates"
    />

    <TFooter />
  </nav>
</template>

<style scoped>
nav .router-link-exact-active {
  @apply text-brand;
}
</style>
