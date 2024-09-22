<script setup lang="ts">
import { z } from "zod";
const { $client } = useNuxtApp();

const schema = z.object({
  username: z.string(),
});

const { username } = schema.parse(useRoute().params);

const { data, error } = await $client.profiles.get.useQuery({
  username,
});

if (!data.value?.profile) {
  throw createError({
    statusCode: 404,
    statusMessage: error.message,
  });
}

const profile = computed(() => data.value?.profile);
const events = computed(() => data.value?.events);

const localePath = useLocalePath();

const uid = "";
const isAdmin = () => false;
const can = () => false;
const remove = () => {};
const softUpdate = () => {};
const profileFields: any = [];

const view = computed(() => useRoute().query.view || "about");

const tabs = computed(() => [
  {
    name: "About",
    to: `/${profile.value.username}#tabs`,
    value: "about",
  },
  {
    name: "Events",
    to: `/${profile.value.username}?view=events#tabs`,
    value: "events",
  },
  {
    name: "Stories",
    to: `/${profile.value.username}?view=stories#tabs`,
    value: "stories",
  },
  {
    name: "Reviews",
    to: `/${profile.value.username}?view=reviews#tabs`,
    hidden: profile.value.type === "Dancer",
    value: "reviews",
  },
]);
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col items-center">
      <div class="bg-accent h-32 w-full"></div>
      <div class="w-32 -mt-16">
        <NuxtImg
          v-if="profile.photo"
          :src="profile.photo"
          :alt="profile.username"
          class="w-full rounded-full border-4 border-white"
        />
        <div
          v-else
          class="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-full shadow"
        >
          <Icon
            name="heroicons:user-circle"
            class="text-gray-400"
            size="30px"
          />
        </div>
      </div>
      <div class="mt-2 mb-2 px-4 text-center">
        <div class="text-xs uppercase">{{ profile.venueType }}</div>
        <h1 class="leading-none text-center font-bold text-3xl">
          {{ profile.name || profile.username }}
        </h1>
      </div>
      <a
        v-if="profile.address"
        :href="profile.address.url"
        target="_blank"
        class="block py-2 px-4 hover:underline"
      >
        <div class="flex items-center justify-start leading-tight">
          <Icon name="heroicons:map-pin" size="16px" />
          <div>
            <div class="text-gray-700">
              {{ profile.address.formatted_address }}
            </div>
          </div>
        </div>
      </a>
      <TProfileStats :profile="profile" />
      <TPreview class="text-sm text-center px-4" :content="profile.bio" />
      <div class="flex space-x-2 justify-center my-2 px-4">
        <TReaction
          v-if="uid !== profile.id"
          :label="$t('Subscribe')"
          :toggled-label="$t('Subscribed')"
          toggled-class="bg-green-500"
          field="watch"
          type="primary"
          hide-count
          :item="profile"
          collection="profiles"
        />
        <TButton
          v-if="profile.type == 'Venue'"
          label="Book Venue"
          :to="`/events/-/edit?venue=${profile.username}`"
        />
        <TButton
          v-if="uid !== profile.id && profile.id === profile.createdBy"
          label="Message"
          :to="`/chat/${profile.username}`"
        />
        <TButton
          v-if="uid === profile.id"
          type="primary"
          :label="$t('myprofile.edit')"
          :to="localePath('/settings?tab=profile')"
        />
        <TDropdown>
          <TPopupEdit
            v-if="can('edit', profile)"
            type="context"
            :fields="profileFields"
            :label="$t('Edit')"
            collection="profiles"
            singular="profile"
            :item="profile"
          />
          <TCardActions
            :id="profile.id"
            collection="profiles"
            :item="profile"
            type="context"
          />
          <TShowAccount v-if="isAdmin()" :id="profile.id" type="context" />
          <TButton
            v-if="isAdmin()"
            type="context"
            icon="delete"
            :label="$t('Delete')"
            @click="remove(profile.id)"
          />
          <TButton
            v-if="isAdmin()"
            type="context"
            icon="upload"
            label="Instagram"
            @click="softUpdate(profile.id, { import: 'requested' })"
          />
        </TDropdown>
      </div>
      <TContactsGrid :profile="profile" class="my-4 justify-center" />
    </div>

    <TabsLinks id="tabs" track="profile" :tabs="tabs" :value="view" />

    <div class="min-h-screen">
      <TProfileDetails v-if="view === 'about'" :profile="profile" />
      <EventListByDate v-if="view === 'events'" :events="events" />
    </div>
  </div>
</template>
