<script setup lang="ts">
import { toast } from "vue-sonner";

const route = useRoute();
const { $client } = useNuxtApp();
const { data: me } = useAppAuth();

const { data } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const style = data?.value?.style;

const tab = ref("news");
const { data: posts, refresh } = await $client.posts.list.useQuery({
  styleId: style.id,
});
const title = ref("");
const content = ref("");
const link = ref("");
const postModalOpen = ref(false);

async function savePost() {
  if (!style?.id) {
    toast.error("Style is not set");
    return;
  }

  if (!me.value?.profileId) {
    toast.error("Not logged in");
    return;
  }

  await $client.posts.create.mutate({
    title: title.value,
    content: content.value,
    styleId: style.id,
    authorId: me.value.profileId,
    link: link.value,
  });

  await refresh();

  postModalOpen.value = false;
  title.value = "";
  content.value = "";
}
</script>

<template>
  <StyleHero :style="style" class="p-4 bg-white" />

  <TabsContainer>
    <TabLink :to="`/styles/${style.hashtag}`">News</TabLink>
    <TabLink :to="`/styles/${style.hashtag}/artists`">Artists</TabLink>
    <TabLink :to="`/styles/${style.hashtag}/festivals`">Festivals</TabLink>
    <TabLink :to="`/styles/${style.hashtag}/about`">About</TabLink>
  </TabsContainer>

  <div class="p-4 gap-4 flex flex-col">
    <div class="flex justify-center">
      <Dialog v-model:open="postModalOpen">
        <DialogTrigger as-child>
          <Button> New post </Button>
        </DialogTrigger>
        <DialogContent>
          <form @submit.prevent="savePost()">
            <DialogHeader>
              <DialogTitle>New post</DialogTitle>
            </DialogHeader>
            <div class="flex flex-col gap-4 py-4">
              <Input v-model="title" placeholder="Post Title" />
              <Input v-model="link" placeholder="Link" />
              <Textarea v-model="content" placeholder="Share your thoughts" />
            </div>
            <DialogFooter>
              <Button type="submit"> Post </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    <PostGrid :posts="posts" @refresh="refresh" />
  </div>
</template>
