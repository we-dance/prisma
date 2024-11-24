<script>
export default {
  props: {
    hideWebsite: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "nav",
    },
    profile: {
      type: Object,
      default: () => ({}),
    },
    short: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    fields: [
      "youtube",
      "spotify",
      "tiktok",
      "linkedin",
      "whatsapp",
      "instagram",
      "threads",
      "twitter",
      "facebook",
      "vk",
      "telegram",
      "couchsurfing",
      "airbnb",
      "blablacar",
    ],
    icons: {
      instagram: "ph:instagram-logo",
      facebook: "ic:baseline-facebook",
      twitter: "hugeicons:new-twitter",
      linkedin: "mdi:linkedin",
      youtube: "mdi:youtube",
      spotify: "mdi:spotify",
      tiktok: "ic:baseline-tiktok",
      whatsapp: "ic:baseline-whatsapp",
      telegram: "ic:baseline-telegram",
      vk: "mdi:vk",
      couchsurfing: "tabler:brand-couchsurfing",
      airbnb: "tabler:brand-airbnb",
      blablacar: "mdi:car",
      threads: "ph:threads-logo",
      website: "mdi:web",
      email: "mdi:email",
    },
  }),
  computed: {
    filledFields() {
      return this.fields.filter((f) => this.profile[f]);
    },
  },
};
</script>

<template>
  <div>
    <NuxtLink
      v-if="!hideWebsite && profile.website"
      :to="profile.website"
      class="inline-block p-1"
    >
      <Icon :name="icons.website" class="text-xl" />
    </NuxtLink>
    <NuxtLink
      v-if="profile.email"
      :to="`mailto:${profile.email}`"
      class="inline-block p-1"
    >
      <Icon :name="icons.email" size="24" />
    </NuxtLink>
    <NuxtLink
      v-for="field in filledFields"
      :key="field"
      :to="profile[field]"
      class="inline-block p-1"
    >
      <Icon :name="icons[field]" size="24" />
    </NuxtLink>
  </div>
</template>

<style scoped>
a:hover {
  @apply text-primary;
}
</style>
