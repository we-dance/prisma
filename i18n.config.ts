export default defineI18nConfig(() => ({
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      },
      long: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      },
    },
    de: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      },
    },
  },
}));
