<script setup lang="ts">
interface Moderator {
  name: string;
  role: string;
  avatar?: string;
}

interface SceneStyle {
  name: string;
  description: string;
  video?: string;
  stats?: {
    posts?: string;
    views?: string;
    upvotes?: string;
    members?: string;
  };
  moderators?: Moderator[];
  popular?: boolean;
  members?: {
    avatar: string;
    name: string;
  }[];
}

defineProps({
  style: {
    type: Object as () => SceneStyle,
    required: true,
  },
});
</script>

<template>
  <section class="relative">
    <!-- Background gradient -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -inset-[100px] opacity-50">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(239,68,68,0.15),transparent_25%)]"
        />
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_5%_5%,rgba(239,68,68,0.1),transparent_15%)]"
        />
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,rgba(239,68,68,0.08),transparent_20%)]"
        />
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-4">
      <div class="relative flex flex-col gap-6 lg:w-[50%]">
        <!-- Header section -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center">
            <div class="flex items-center gap-3">
              <h1 class="text-3xl font-bold tracking-tighter md:text-4xl">
                {{ style.name }}
              </h1>
            </div>
          </div>

          <!-- Stats row -->
          <div class="flex gap-4 items-center">
            <div class="flex gap-4 text-xs" v-if="style.stats">
              <span v-if="style.stats.posts" class="font-medium"
                >{{ style.stats.posts }}
                <span class="text-muted-foreground">Posts</span></span
              >
              <span v-if="style.stats.views" class="font-medium"
                >{{ style.stats.views }}
                <span class="text-muted-foreground">Views</span></span
              >
              <span v-if="style.stats.upvotes" class="font-medium"
                >{{ style.stats.upvotes }}
                <span class="text-muted-foreground">Upvotes</span></span
              >
            </div>
          </div>

          <p class="text-base text-muted-foreground">
            {{ style.description }}
          </p>

          <!-- Action buttons and members -->
          <div class="flex items-center gap-4">
            <Button> Join Community </Button>

            <!-- Members count -->
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <img
                  v-for="(member, i) in (style.members || []).slice(0, 5)"
                  :key="i"
                  :src="member.avatar"
                  :alt="member.name"
                  class="w-7 h-7 rounded-full border-2 border-background"
                />
              </div>
              <span class="text-sm font-medium">{{
                style.stats?.members
              }}</span>
            </div>

            <Button variant="ghost">
              <Icon name="i-heroicons-ellipsis-horizontal" size="24" />
            </Button>
          </div>
        </div>

        <!-- Moderators section -->
        <div class="flex flex-col gap-3" v-if="style.moderators">
          <h3 class="text-xs text-muted-foreground">Moderated by</h3>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="mod in style.moderators"
              :key="mod.name"
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 backdrop-blur-sm"
            >
              <img
                v-if="mod.avatar"
                :src="mod.avatar"
                :alt="mod.name"
                class="w-8 h-8 rounded-full"
              />
              <div class="flex flex-col">
                <span class="text-sm font-medium">{{ mod.name }}</span>
                <span class="text-xs text-purple-400">{{ mod.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-[50%]">
        <WYoutube
          v-if="style.video"
          :url="style.video"
          class="w-full aspect-video rounded-md"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-gradient-to-b {
  --tw-gradient-stops: var(--tw-gradient-from) 0%, transparent 100%;
}

.bg-gradient-to-r {
  --tw-gradient-stops: var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%,
    var(--tw-gradient-to) 100%;
}
</style>
