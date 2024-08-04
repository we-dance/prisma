<script>
import { useElementVisibility } from "@vueuse/core";

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    desktop: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
  },
  setup(props, { root, emit }) {
    const target = ref(null);
    const targetIsVisible = useElementVisibility(target);

    const value = ref(true);

    const $track = function (event, data) {};

    watch(targetIsVisible, (isVisible) => {
      if (isVisible) {
        emit("visible", isVisible);
        $track("banner_shown", { name: props.name });
      }
    });

    return {
      value,
      target,
      targetIsVisible,
    };
  },
};
</script>

<template>
  <div v-show="value" class="bg-light">
    <div
      ref="target"
      class="mx-auto max-w-2xl text-sm py-3 px-3 sm:px-6 lg:px-8"
    >
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <span class="flex p-2 rounded-lg bg-light">
            <Icon name="heroicons:megaphone" class="h-6 w-6" />
          </span>
          <p class="ml-3 font-medium truncate">
            <span class="md:hidden">
              {{ mobile }}
            </span>
            <span class="hidden md:inline">
              {{ desktop }}
            </span>
          </p>
        </div>
        <div
          class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
        >
          <TButton
            :href="link"
            :to="to"
            allow-guests
            type="primary"
            :label="action"
            @click.native="
              $track('banner_yes', { banner: name });
              $emit('input', 'yes');
            "
          />
        </div>
        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button
            type="button"
            class="-mr-1 flex p-2 rounded-md sm:-mr-2"
            @click="
              $track('banner_no', { banner: name });
              $emit('input', 'no');
            "
          >
            <span class="sr-only">Dismiss</span>
            <Icon name="heroicons:x-mark-solid" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
