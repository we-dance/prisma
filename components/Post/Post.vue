<script setup>
import { useTimeAgo } from "@vueuse/core";

import PostRequest from "./PostRequest";
import PostArticle from "./PostArticle";
import PostEvent from "./PostEvent";
import PostVideo from "./PostVideo";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  style: {
    type: Object,
    required: false,
  },
  author: {
    type: Object,
    required: false,
    default: () => ({
      id: "",
      name: "",
      photo: "",
      username: "",
    }),
  },
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  event: {
    type: Object,
    required: false,
    default: () => ({
      image: "",
      type: "",
      styles: [],
      name: "",
      date: "",
      location: "",
    }),
  },
});

const timeAgo = useTimeAgo(props.createdAt);
const time = computed(() => new Date(props.createdAt).toLocaleString());

const as = computed(() => {
  const map = {
    article: PostArticle,
    event: PostEvent,
    video: PostVideo,
  };

  if (props.url?.includes("youtu")) {
    return PostVideo;
  }

  if (props.title && (props.content || props.image)) {
    return PostArticle;
  }

  return map[props.type] || PostRequest;
});

const showStyle = false;
</script>

<template>
  <div
    class="flex flex-col border-b pb-4 gap-2 bg-white rounded-lg shadow px-4"
  >
    <div class="flex items-start pt-4">
      <template v-if="!showStyle">
        <div class="w-10 flex-shrink-0">
          <div class="flex items-center space-x-1">
            <div>
              <a :href="`/@${author.username}`" class="">
                <img
                  :src="author.photo"
                  :alt="`${author.name} photo`"
                  class="rounded-full w-8 h-8"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="flex-grow">
          <div class="block text-sm leading-none">
            <div class="flex flex-wrap space-x-1 text-xs">
              <div class="flex items-center space-x-1">
                <div>
                  <a
                    :href="`/@${author.username}`"
                    class="hover:underline font-bold"
                  >
                    {{ author.name }}
                  </a>
                </div>
              </div>
              <span>•</span>
              <div>
                <a :href="`/posts/${id}`" class="hover:underline" :title="time">
                  {{ timeAgo }}
                </a>
              </div>
            </div>
            <a :href="`/${style.hashtag}`" class="hover:underline text-xs">
              {{ style.name }}
            </a>
          </div>
        </div>
      </template>
      <template v-if="showStyle">
        <div class="w-10 flex-shrink-0">
          <div class="flex items-center space-x-1">
            <div>
              <a :href="`/${style.hashtag}`" class="">
                <img
                  v-if="style.image"
                  :src="style.image"
                  :alt="`${style.image} photo`"
                  class="rounded-full w-8 h-8"
                />
                <div v-else class="rounded-full w-8 h-8 bg-gray-200"></div>
              </a>
            </div>
          </div>
        </div>
        <div class="flex-grow">
          <div class="block text-sm leading-tight">
            <div class="flex flex-wrap space-x-1 text-xs">
              <div class="flex items-center space-x-1">
                <div>
                  <a
                    :href="`/${style.hashtag}`"
                    class="hover:underline font-bold"
                  >
                    {{ style.name }}
                  </a>
                </div>
              </div>
              <span>•</span>
              <div>
                <a :href="`/stories/${id}`" class="hover:underline">
                  {{ timeAgo }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="relative">
        <div>
          <Button variant="ghost">
            <Icon name="i-heroicons-ellipsis-horizontal" size="24" />
          </Button>
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-hidden">
      <component :is="as" v-bind="$props" />
    </div>

    <div class="flex flex-wrap gap-2 items-center">
      <div class="flex flex-wrap items-center bg-gray-100 rounded">
        <Button variant="ghost">
          <Icon name="material-symbols:arrow-upward-rounded" size="24" />
        </Button>
        <div class="text-sm font-medium">{{ upvotes }}</div>
        <Button variant="ghost">
          <Icon name="material-symbols:arrow-downward-rounded" size="24" />
        </Button>
      </div>
      <Button variant="ghost">
        <Icon name="i-heroicons-chat-bubble-left" size="24" />
        <span>{{ commentsCount }}</span>
      </Button>
    </div>
  </div>
</template>
