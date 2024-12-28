<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;
const { $client } = useNuxtApp();
const { data, error } = await $client.posts.get.useQuery(id);
const author = computed(() => data.value.author);
const style = computed(() => data.value.style);
const timeAgo = "1 week ago";
const upvotes = 0;
const commentsCount = 0;
const isYoutube = computed(() => data.value?.url?.includes("youtu"));
</script>

<template>
  <main class="mt-4 flex flex-col mx-auto max-w-xl bg-white rounded shadow">
    <template v-if="data">
      <WYoutube v-if="isYoutube" :url="data.url" class="rounded-t" />
      <NuxtImg v-else-if="data.image" :src="data.image" class="rounded-t" />

      <div class="flex items-start p-4">
        <div class="w-10 flex-shrink-0">
          <div class="flex items-center space-x-1">
            <div>
              <NuxtLink :to="`/@${author.username}`">
                <img
                  :src="author.photo"
                  :alt="`${author.name} photo`"
                  class="rounded-full w-8 h-8"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="flex-grow">
          <div class="block text-sm leading-none">
            <div class="flex flex-wrap space-x-1 text-xs">
              <div class="flex items-center space-x-1">
                <div>
                  <NuxtLink
                    :to="`/@${author.username}`"
                    class="hover:underline font-bold"
                  >
                    {{ author.name }}
                  </NuxtLink>
                </div>
              </div>
              <span>•</span>
              <div>
                <NuxtLink
                  :to="`/posts/${id}`"
                  class="hover:underline"
                  :title="timeAgo"
                >
                  {{ timeAgo }}
                </NuxtLink>
              </div>
            </div>
            <NuxtLink
              :to="`/styles/${style.hashtag}`"
              class="hover:underline text-xs"
            >
              {{ style.name }}
            </NuxtLink>
          </div>
        </div>
        <Button v-if="data.url && !isYoutube" variant="secondary" as-child>
          <NuxtLink target="_blank" :to="data.url"> Read more </NuxtLink>
        </Button>
      </div>

      <h1 class="font-bold px-4 text-xl">{{ data.title }}</h1>
      <TPreview :content="data.content" class="px-4 pb-4" />

      <div class="flex flex-wrap gap-2 items-center px-4 pb-4">
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
    </template>

    <div v-else-if="error" class="rounded-lg bg-red-50 p-4">
      <div class="text-red-700">Error loading post: {{ error.message }}</div>
    </div>

    <div v-else class="flex justify-center py-12">
      <div class="animate-pulse">Loading...</div>
    </div>
  </main>
</template>
