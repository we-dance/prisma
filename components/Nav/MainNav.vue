<script setup lang="ts">
const localePath = useLocalePath();

const currentCity = "/de/munich";

function isAdmin(force = false) {
  return false;
}
</script>

<template>
  <nav class="p-4 flex flex-col h-screen overflow-y-scroll border-r">
    <Button :to="localePath('/')" variant="ghost" class="justify-start">
      <Icon name="i-heroicons-home" />
      My Feed
    </Button>

    <Button :to="localePath('/explore')" variant="ghost" class="justify-start">
      <Icon name="i-heroicons-fire" />
      Explore
    </Button>

    <Button
      :to="localePath('/bookmarks')"
      variant="ghost"
      class="justify-start"
    >
      <Icon name="i-heroicons-bookmark" />
      Bookmarks
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
