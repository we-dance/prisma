<script setup lang="ts">
import { useAuth } from '#imports'

const { data, status } = useAuth()
</script>

<template>
  <div>
    <div v-if="!data?.user">Loading...</div>
    <div v-else-if="status === 'authenticated'">
      Hello {{ data.user.name }}
    </div>
  </div>
</template>
