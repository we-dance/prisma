<script setup lang="ts">
import type { addAbortListener } from "events";

const route = useRoute();
const { $client } = useNuxtApp();
const { data } = await $client.styles.get.useQuery({
  hashtag: route.params.style as string,
});

const style = data?.value?.style;
</script>

<template>
  <div class="px-4 mx-auto max-w-xl">
    <Breadcrumb class="my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"> WeDance </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ style.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>

  <div class="px-4 mx-auto max-w-xl flex flex-col gap-4">
    <LandingHero
      :header="style.name"
      subheader="Get inspired, find events, and share your dance journey with a vibrant community"
    >
      <div class="bg-white rounded-md shadow p-2 mb-4">
        <LandingFeature
          icon="i-heroicons-sparkles"
          header="Stay Inspired"
          subheader="Get tips, stories, and advice from passionate dancers"
        />

        <LandingFeature
          icon="i-heroicons-calendar"
          header="Find Events"
          subheader="Stay in the loop with festivals, socials, and workshops"
        />

        <LandingFeature
          icon="i-heroicons-video-camera"
          header="Share Your Journey"
          subheader="Post your thoughts, videos, and experiences to inspire and engage others"
        />
      </div>
      <Button>Join Community</Button>
    </LandingHero>

    <Card>
      <CardHeader>
        <CardTitle>What is {{ style.name }}?</CardTitle>
        <CardDescription v-if="style.synonyms"
          >Also known as {{ style.synonyms }}</CardDescription
        >
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <WYoutube :url="style.video" class="rounded-md" />

        <TPreview :content="style.description" />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>History of {{ style.name }}</CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <TPreview :content="style.history" />
      </CardContent>
    </Card>
  </div>
</template>
