<script setup lang="ts">
const localePath = useLocalePath();

const currentCity = "/de/munich";

function isAdmin(force = false) {
  return false;
}
</script>

<template>
  <nav class="p-4 flex flex-col h-screen overflow-y-scroll border-r">
    <Button variant="ghost" as-child class="justify-start">
      <NuxtLink :to="localePath('/feed')">
        <Icon name="i-heroicons-home" />
        Feed
      </NuxtLink>
    </Button>

    <Button variant="ghost" as-child class="justify-start">
      <NuxtLink :to="localePath('/explore')">
        <Icon name="i-heroicons-calendar" />
        Events
      </NuxtLink>
    </Button>

    <Button variant="ghost" as-child class="justify-start">
      <NuxtLink :to="localePath('/hosts')">
        <Icon name="i-heroicons-users" />
        Hosts
      </NuxtLink>
    </Button>

    <Button variant="ghost" as-child class="justify-start">
      <NuxtLink :to="localePath('/hosts')">
        <Icon name="i-heroicons-musical-note" />
        Artists
      </NuxtLink>
    </Button>

    <Button variant="ghost" as-child class="justify-start">
      <NuxtLink :to="localePath('/hosts')">
        <Icon name="i-heroicons-building-storefront" />
        Venues
      </NuxtLink>
    </Button>

    <div class="flex justify-start mt-4">
      <TLanguageSwitcher />
    </div>

    <div class="h-8 mt-4"></div>

    <div v-if="isAdmin(true)" class="border-b pt-2 text-xs font-bold uppercase">
      Administration
    </div>

    <Button v-if="isAdmin(true)" variant="ghost">
      Admin {{ isAdmin() ? "ON" : "OFF" }}
    </Button>

    <Button v-if="isAdmin()" :to="localePath('/admin/nfc')" variant="ghost">
      NFC
    </Button>

    <Button v-if="isAdmin()" :to="localePath('/admin/cities')" variant="ghost">
      Cities
    </Button>

    <Button v-if="isAdmin()" :to="localePath('/admin/reports')" variant="ghost">
      Reports
    </Button>

    <Button
      v-if="isAdmin()"
      :to="localePath('/admin/suspended')"
      variant="ghost"
    >
      Suspended
    </Button>

    <Button v-if="isAdmin()" :to="localePath('/admin/emails')" variant="ghost">
      Emails
    </Button>

    <Button
      v-if="isAdmin()"
      :to="localePath('/admin/templates')"
      variant="ghost"
    >
      Templates
    </Button>

    <TFooter />
  </nav>
</template>
