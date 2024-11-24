<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    header: {
      type: String,
      default: "",
    },
    subheader: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div class="flex items-center gap-2 p-2">
    <div>
      <Icon :name="icon" size="32" />
    </div>
    <div>
      <div class="text-sm font-bold">{{ header }}</div>
      <div class="text-xs text-gray-700">
        {{ subheader }}
      </div>
    </div>
  </div>
</template>
