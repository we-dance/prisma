<template>
  <div class="max-w-md m-auto">
    <div class="m-4">
      <RouterView :key="$route.fullPath" />
    </div>
  </div>
</template>
