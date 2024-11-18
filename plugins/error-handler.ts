import { toast } from "vue-sonner";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    toast.error(error.message);
  };
});
