<template>
  <Select v-model="lang">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="locale in localesDropdown" :value="locale.value">
          {{ locale.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script>
export default {
  computed: {
    lang: {
      get() {
        return this.$i18n.locale;
      },
      set(val) {
        this.$i18n.setLocale(val);
      },
    },
    localesDropdown() {
      return this.$i18n.locales.map((locale) => ({
        value: locale.code,
        label: locale.name,
      }));
    },
  },
};
</script>
