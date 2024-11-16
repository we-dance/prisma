<script>
import md from "@/utils/markdown";

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
    ctaLabel: {
      type: String,
      default: "",
    },
    ctaLink: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      md,
    };
  },
};
</script>

<template>
  <section
    class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header pb-8 page-header"
  >
    <div>
      <div class="relative sm:overflow-hidden">
        <div class="relative py-10 lg:p-14 px-4 md:px-8">
          <div class="text-center">
            <md
              tag="h1"
              :content="header"
              class="text-center text-3xl font-bold tracking-tighter md:text-5xl leading-tight"
            />
            {{ subheader }}
          </div>

          <div class="max-w-lg mx-auto mt-4">
            <slot>
              <TButton
                allow-guests
                type="primary"
                :label="ctaLabel"
                :to="ctaLink"
              />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
