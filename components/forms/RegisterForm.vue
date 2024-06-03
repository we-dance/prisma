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
    .refine(usernameValidator, "Username must be unique"),
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
  const error = await login("register", values);
  if (error) {
    toast.error(error);
  }
});
</script>

<template>
  <AutoForm
    class="space-y-4"
    :form="form"
    :schema="schema"
    :field-config="{
      username: {
        description: 'Use only letters, numbers, underscores and periods.',
        inputProps: {
          trim: '[^a-z0-9._\-]+',
          lowercase: true,
        },
      },
      email: { inputProps: { type: 'email' } },
      password: { inputProps: { type: 'password' } },
      acceptTerms: {
        label: 'Accept terms and conditions.',
        inputProps: {
          required: true,
        },
      },
    }"
    @submit="onSubmit"
  >
    <template #acceptTerms="slotProps">
      <AutoFormField v-bind="slotProps" />
      <TermsInfo />
    </template>
    <div class="flex justify-end">
      <Button type="submit"> Register </Button>
    </div>
  </AutoForm>
</template>
