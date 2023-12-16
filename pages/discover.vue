<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const selectedCity = computed({
  get () {
    return route.query.city || ''
  },
  set (city) {
    if (!city) {
      router.push({
        query: {}
      })
    }

    router.push({
      query: {
        city
      }
    })
  }
})

const { data } = await useFetch('/api/events', {
  query: {
    cityName: selectedCity
  }
})
</script>

<template>
  <div>
    <div role="tablist" class="tabs tabs-lifted mb-4">
      <a role="tab" class="tab tab-active">Parties</a>
      <a role="tab" class="tab">Courses</a>
      <a role="tab" class="tab">Organisers</a>
      <a role="tab" class="tab">Locations</a>
      <a role="tab" class="tab">Artists</a>
    </div>

    <NavCitySelector v-model="selectedCity" />
    <template v-if="data">
      <PageSection class="mt-4">
        <div class="carousel w-full">
          <EventCardBig
            v-for="item in data.events"
            :key="item.id"
            class="carousel-item"
            :event="item"
          />
        </div>
      </PageSection>

      <PageSection title="Organisers" class="mt-4">
        <div class="carousel w-full">
          <ProfileCard
            v-for="item in data.organisers"
            :key="item.id"
            class="carousel-item"
            :profile="item"
          />
        </div>
      </PageSection>

      <PageSection title="Venues" class="mt-4">
        <div class="carousel w-full">
          <ProfileCard
            v-for="item in data.venues"
            :key="item.id"
            class="carousel-item"
            :profile="item"
          />
        </div>
      </PageSection>
    </template>
  </div>
</template>
