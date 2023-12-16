<template>
  <AuthForm register />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({ auth: false })
</script>
