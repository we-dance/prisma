<script setup lang="ts">
const { data: events, refresh } = useFetch('/api/events')

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
    <p>Prisma ORM Data from the database, received {{ events?.length || 0 }} records: <pre>{{ events }}</pre></p>
    <button @click="add">
      Add
    </button>
  </div>
</template>
