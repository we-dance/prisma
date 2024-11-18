import { toast } from "vue-sonner";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (error) => {
    toast.error(error.message);
  });
});
