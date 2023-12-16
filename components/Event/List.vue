<script setup>
import { getDate, getDay, getYmd } from '~/utils'

const props = defineProps({
  items: Array
})

const items = computed(() => props.items)

const itemsByDate = computed(() => {
  const result = {}

  items.value.forEach((item) => {
    const date = getYmd(item.startDate)
    result[date] = result[date] || []
    result[date].push(item)
  })

  return result
})

const $i18n = {
  locale: 'en'
}
</script>

<template>
  <div>
    <div v-for="(items, date) in itemsByDate" :key="date">
      <h2 class="font-bold text-xl p-4 border-b">
        <span class="text-primary">{{ getDay(date, $i18n.locale) }}</span> ·
        {{ getDate(date, $i18n.locale) }}
      </h2>
      <div v-for="item in items" :key="item.id">
        <EventCard
          :key="item.id"
          :event="item"
          side="time"
        />
      </div>
    </div>
  </div>
</template>
