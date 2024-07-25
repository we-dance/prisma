<script setup lang="ts">
defineProps({
  register: Boolean,
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "vue-sonner";

const { $client } = useNuxtApp();
const { login } = useAppAuth();

const noMultiplePeriods = (value: string) => !value.includes("..");
const notEndingInPeriod = (value: string) => !value.endsWith(".");

const usernameValidator = async (username: string) => {
  const { data } = await $client.profiles.get.useQuery({ username });

  if (data.value?.id) {
    return false;
  }

  return true;
};

const schema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(30)
    .refine(
      noMultiplePeriods,
      "Username cannot have multiple periods in a row."
    )
    .refine(notEndingInPeriod, "Username cannot end in a period.")
    .refine(usernameValidator, "Username is already taken."),
  city: z.object({
    placeId: z.string(),
    label: z.string(),
  }),
  email: z.string().email().default("elon@musk.com"),
  password: z.string().min(8),
  acceptTerms: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions.",
  }),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values);
  // const error = await login("register", values);
  // if (error) {
  //   toast.error(error);
  // }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input v-bind="componentField" trim="" lowercase />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="city">
      <FormItem>
        <FormLabel>City</FormLabel>
        <FormControl>
          <CityInput v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="acceptTerms">
      <FormItem>
        <FormControl>
          <div class="space-y-0 mb-3 flex items-center gap-3">
            <Switch v-bind="componentField" />
            <AutoFormLabel>Accept terms and conditions</AutoFormLabel>
          </div>
          <TermsInfo />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-end">
      <Button type="submit"> Register </Button>
    </div>
  </form>
</template>
