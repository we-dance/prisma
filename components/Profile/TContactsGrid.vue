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
  <div class="flex gap-4">
    <div class="grid grid-cols-3 border-l border-t flex-shrink-0">
      <TButton
        v-if="!hideWebsite && profile.website"
        :href="profile.website"
        allow-guests
        :track="{ event: 'contact', action: 'website' }"
        type="void"
        class="cursor-pointer border-r border-b p-1"
      >
        <Icon :name="icons.website" class="text-xl" />
      </TButton>
      <TButton
        v-if="profile.email"
        :href="`mailto:${profile.email}`"
        allow-guests
        :track="{ event: 'contact', action: 'email' }"
        type="void"
        class="cursor-pointer border-r border-b p-1"
      >
        <Icon :name="icons.email" class="text-xl" />
      </TButton>
      <TButton
        v-for="field in filledFields"
        :key="field"
        allow-guests
        :href="profile[field]"
        :track="{ event: 'contact', action: field }"
        type="void"
        class="cursor-pointer border-r border-b p-1"
      >
        <Icon :name="icons[field]" class="text-xl" />
      </TButton>
    </div>
    <div v-if="title && filledFields.length" class="text-xs">{{ title }}</div>
  </div>
</template>

<style scoped>
a:hover {
  @apply text-accent;
}
</style>
