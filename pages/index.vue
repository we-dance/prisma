<script setup lang="ts">
import { useAuth } from "#imports";

const { data, status } = useAuth();
</script>

<template>
  <div>Homepage</div>
  <div v-if="status === 'authenticated'">
    <pre>{{ data }}</pre>
  </div>
</template>
