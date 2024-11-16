<script setup lang="ts">
defineProps<{
  profile: any;
}>();
</script>

<template>
  <AppHeader />

  <div v-if="profile" class="max-w-screen-lg mx-auto">
    <ProfileBio :profile="profile" />
    <ProfileNavigation :profile="profile" />

    <div class="bg-white p-4">
      <slot />
    </div>
  </div>
</template>
