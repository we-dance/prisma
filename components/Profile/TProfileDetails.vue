<script setup>
import { getLabels } from "~/utils/getLabels";
import languages from "~/assets/languages";
const { t, d } = useI18n();

defineProps({
  profile: {
    type: Object,
    default: () => ({}),
  },
});

const { objectivesList } = useProfile();
</script>

<template>
  <div>
    <div
      v-if="profile.offers && profile.offers.length"
      class="max-w-md mx-auto flex flex-col gap-4 p-4"
    >
      <LandingFeature
        v-for="value in profile.offers"
        :key="value.title"
        :title="value.title"
        :description="value.description"
        :button="value.primaryButton"
        :url="value.primaryUrl"
      />
    </div>

    <TPreview
      v-if="profile.story"
      :content="profile.story"
      class="p-4 border-t"
    />

    <div v-if="profile.amenities" class="space-y-2 p-4 border-t">
      <h3 class="text-xs uppercase font-bold text-gray-500">Amenities</h3>
      <TVenueAmenities :amenities="profile.amenities" />
    </div>

    <div
      v-if="profile.team && profile.team.length"
      class="space-y-2 p-4 border-t"
    >
      <h3 class="text-xs uppercase font-bold px-2 pt-4 text-gray-500">
        {{ t("profile.teammembers.label") }}
      </h3>
      <div
        v-for="(member, memberIndex) in profile.team"
        :key="`artist-${memberIndex}`"
      >
        <WProfile
          v-if="member"
          :username="member.username"
          :fallback="member"
          hide-role
        />
      </div>
    </div>

    <div class="space-y-4 p-4 bg-gray-100">
      <dl v-if="profile.current">
        <dt class="font-bold mr-1">{{ t("profile.current.label") }}:</dt>
        <dd><TCityLink :place="profile.current" /></dd>
      </dl>
      <dl v-if="profile.place">
        <dt class="font-bold mr-1">{{ t("profile.place.label") }}:</dt>
        <dd><TCityLink :place="profile.place" /></dd>
      </dl>
      <dl v-if="profile.hometown">
        <dt class="font-bold mr-1">{{ t("profile.hometown.label") }}:</dt>
        <dd><TCityLink :place="profile.hometown" /></dd>
      </dl>
      <dl v-if="profile.locales">
        <dt class="font-bold mr-1">{{ t("profile.languages") }}:</dt>
        <dd>{{ getLabels(languages, profile.locales) }}</dd>
      </dl>
      <dl v-else-if="profile.languages">
        <dt class="font-bold mr-1">{{ t("profile.languages") }}:</dt>
        <dd>{{ profile.languages }}</dd>
      </dl>
      <div v-if="false">
        <h2 class="font-bold">{{ t("profile.objectives") }}:</h2>
        <div>{{ getLabels(objectivesList, profile.objectives) }}</div>
      </div>
      <div v-if="profile.learning">
        <h2 class="font-bold">{{ t("profile.learning.label") }}</h2>
        <div>{{ profile.learning }}</div>
      </div>
      <div v-if="profile.styles">
        <h2 class="font-bold">{{ t("profile.style") }}:</h2>
        <TStyles :value.sync="profile.styles" />
      </div>
      <div v-else-if="profile.skills">
        <h2 class="font-bold">{{ t("profile.style") }}:</h2>
        <div>{{ profile.skills }}</div>
      </div>
      <div v-if="profile.jobs">
        <h2 class="font-bold">{{ t("profile.jobs.label") }}:</h2>
        <div>{{ profile.jobs }}</div>
      </div>

      <dl class="mt-4 md:flex text-xs">
        <dt class="font-bold mr-1">{{ t("profile.joined") }}:</dt>
        <dd v-if="profile.joinedAt">{{ d(profile.joinedAt, "short") }}</dd>
        <dd v-else>{{ d(profile.createdAt, "short") }}</dd>
      </dl>

      <dl v-if="profile.lastLoginAt" class="mt-4 md:flex text-xs">
        <dt class="font-bold mr-1">
          {{ t("profile.profileSorts.lastSeen") }}:
        </dt>
        <dd>{{ d(profile.lastLoginAt, "short") }}</dd>
      </dl>

      <dl v-if="false" class="mt-4 md:flex">
        <dt class="font-bold mr-1">{{ t("visibility.label") }}:</dt>
        <dd>{{ profile.visibility }}</dd>
      </dl>
    </div>
  </div>
</template>
