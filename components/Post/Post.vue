<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
    default: () => ({
      id: "",
      name: "",
      photo: "",
      username: "",
    }),
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
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
});
</script>

<template>
  <div
    class="flex flex-col border-b pb-4 gap-2 bg-white rounded-lg shadow px-4"
  >
    <div class="flex items-start pt-4">
      <div class="w-10 flex-shrink-0">
        <div class="flex items-center space-x-1">
          <div>
            <a :href="`/${author.username}`" class="">
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
        <div class="block text-sm leading-tight">
          <div class="flex flex-wrap space-x-1 text-xs">
            <div class="flex items-center space-x-1">
              <div>
                <a
                  :href="`/${author.username}`"
                  class="hover:underline font-bold"
                >
                  {{ author.name }}
                </a>
              </div>
            </div>
            <span>•</span>
            <div>
              <a :href="`/stories/${id}`" class="hover:underline">
                {{ new Date(createdAt).toLocaleDateString() }}
              </a>
            </div>
          </div>
          <div class="text-xs">{{ type }}</div>
        </div>
      </div>
      <div class="relative">
        <div>
          <Button variant="ghost">
            <Icon name="i-heroicons-ellipsis-horizontal" size="24" />
          </Button>
        </div>
      </div>
    </div>

    <div class="flex-grow">
      <slot />
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
