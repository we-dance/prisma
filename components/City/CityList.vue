<script>
export default {
  props: {
    cities: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<template>
  <NuxtLink
    v-for="city in cities"
    :key="city.id"
    :to="localePath(`/explore/${city.countryCode}/${city.slug}`)"
    class="border-b p-4 flex gap-2 items-center grou"
    @click.native="$emit('click', city)"
  >
    <div class="w-12 flex-shrink-0">
      <NuxtImg
        v-if="city.photo"
        width="68"
        height="68"
        fit="fill"
        :placeholder="[68, 68]"
        loading="lazy"
        class="rounded-full shadow"
        :src="city.photo"
      />
      <div
        v-else
        class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full shadow"
      >
        <Icon
          name="heroicons:building-office-2-20-solid"
          class="text-gray-400"
          size="30px"
        />
      </div>
    </div>
    <div class="flex-grow">
      <div class="block text-xs font-bold leading-tight">
        {{ city.name }}
      </div>
      <div class="block text-xs text-gray-800 leading-tight">
        {{ city.region }}, {{ city.country.name }}
      </div>
      <div class="block text-xs text-gray-500 leading-tight">
        {{ city.membersCount }} members •
        {{ city.subscribersCount }} subscribers
      </div>
    </div>
  </NuxtLink>
</template>
