<script setup>
import { toast } from "vue-sonner";
import QrcodeVue from "qrcode.vue";

const { $track } = useNuxtApp();

function openURL(url) {
  window.open(url, "_blank");
}

const nativeShareSupported = ref(false);
const router = useRouter();
const uid = "";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});

const url = computed(() => {
  const baseUrl = useRuntimeConfig().public.baseUrl;
  return baseUrl + router.currentRoute.value.fullPath;
});

const platforms = computed(() => {
  const text = props.text;
  const results = [];

  results.push({
    name: "Telegram",
    url: `https://t.me/share/url?url=${getReferralLink(
      "telegram",
      true
    )}&text=${text}`,
    icon: "ic:baseline-telegram",
  });

  results.push({
    name: "Whatsapp",
    url: `whatsapp://send?text=${text} ${getReferralLink("whatsapp", true)}`,
    icon: "ic:baseline-whatsapp",
  });

  results.push({
    name: "Facebook",
    url: `https://www.facebook.com/share.php?display=page&u=${getReferralLink(
      "facebook",
      true
    )}&t=${text}`,
    icon: "ic:baseline-facebook",
  });

  results.push({
    name: "Twitter",
    url: `https://twitter.com/intent/tweet?text=${text} ${getReferralLink(
      "twitter",
      true
    )}`,
    icon: "hugeicons:new-twitter",
  });

  return results;
});

// Add mounted logic using onMounted
onMounted(() => {
  if (navigator.share && navigator.canShare) {
    nativeShareSupported.value = true;
  }
});

// Transform methods to functions
const getReferralLink = (source, encode = false) => {
  const link = `${url.value}?utm_source=${source}&utm_medium=share&r=${uid}`;
  return encode ? encodeURIComponent(link) : link;
};

const copyToClipboard = async () => {
  $track("share", {
    method: "Link",
  });

  await navigator.clipboard.writeText(getReferralLink("link"));
  toast.success("Link copied to clipboard");
};

const shareTo = (platform) => {
  if (!platform) return;

  $track("share", {
    method: platform.name,
  });

  openURL(platform.url);
};

const nativeShare = async () => {
  $track("share", {
    method: "Native",
  });

  try {
    await navigator.share({
      title: props.text,
      url: getReferralLink("native"),
    });
  } catch (e) {}
};
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="sm" title="Share">
        <Icon name="heroicons:share" size="24" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Scan QR Code</DialogTitle>
      </DialogHeader>

      <div class="flex justify-center">
        <qrcode-vue :value="getReferralLink('qr')" :size="300" level="H" />
      </div>

      <div class="flex gap-2">
        <Input v-model="url" />
        <Button variant="ghost" @click="copyToClipboard">
          <Icon name="ic:baseline-content-copy" />
        </Button>
      </div>

      <div class="flex gap-1">
        <Button v-if="nativeShareSupported" @click="nativeShare()">
          Share
        </Button>
        <Button
          v-for="platform in platforms"
          :key="platform.name"
          variant="ghost"
          @click="shareTo(platform)"
        >
          <Icon :name="platform.icon" size="24" />
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
