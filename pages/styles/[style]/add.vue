<script setup lang="ts">
const route = useRoute();
const { $client } = useNuxtApp();
const { data } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});
const style = data?.value?.style;
</script>
<template>
  <div class="mx-auto max-w-xl p-4 flex flex-col gap-4">
    <VideoProposal :style-id="style.id" />
  </div>
</template>
