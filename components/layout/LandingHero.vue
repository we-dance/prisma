<script>
export default {
  props: {
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
  <section
    class="mx-auto flex max-w-md flex-col items-center gap-2 py-8 md:py-12 lg:py-24 lg:pb-20 page-header page-header"
  >
    <h1
      class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-tight"
    >
      {{ header }}
    </h1>
    <span class="max-w-[750px] text-center text-lg font-light text-foreground">
      {{ subheader }}
    </span>
    <slot />
  </section>
</template>
