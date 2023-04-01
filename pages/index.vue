<script setup lang="ts">
import { useCollection } from '../lib/firebase/events'
const { data: events, refresh, pending, error } = useFetch('/api/events')

async function add () {
  await useFetch('/api/events', {
    method: 'POST',
    body: {
      title: 'test'
    }
  })
  await refresh()
}
</script>

<template>
  <div>
    <div class="p-4">
      <p v-if="pending" class="text-orange-500">
        [Prisma] loading
      </p>
      <p v-else-if="error" class="text-red-500">
        [Prisma] error: {{ error.message }} {{ error.cause }}
      </p>
      <p v-else class="text-green-500">
        [Prisma] loaded {{ events?.length || 0 }} records
      </p>
    </div>
  </div>
</template>
