<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  data() {
    return {
      item: null,
    };
  },
  computed: {
    shownUrl() {
      return this.url.replace(/(^\w+:|^)\/\//, "").replace(/\/.*/, "");
    },
  },
  mounted() {
    if (this.url.includes("facebook.com")) {
      this.item = {
        title: "Facebook",
      };
      return;
    }

    if (this.url.includes("chat.whatsapp.com")) {
      this.item = {
        title: "Whatsapp Group",
      };
      return;
    }

    fetch(
      `https://link-preview-api.nivaldo.workers.dev/preview?url=${this.url}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.item = data;
      });
  },
};
</script>

<template>
  <div class="border rounded shadow hover:bg-gray-100">
    <a
      v-if="item"
      :href="url"
      target="_blank"
      class="flex gap-2 items-start p-4"
    >
      <div v-if="item.image" class="w-[50%]">
        <img :src="item.image" class="w-full object-cover rounded" />
      </div>
      <div>
        <div class="font-bold text-sm leading-none mb-1">{{ item.title }}</div>
        <div class="text-gray-700 leading-tight text-xs mb-1">
          {{ item.description }}
        </div>
        <div class="text-indigo-500 text-xs">{{ shownUrl }}</div>
      </div>
    </a>
    <a
      v-else
      :href="url"
      target="_blank"
      class="block p-4 text-xs text-indigo-500"
      >{{ shownUrl }}</a
    >
  </div>
  <p class="text-xs mt-1">{{ content }}</p>
</template>
