<script setup lang="ts">
defineProps({
  register: Boolean,
});

const { login, error } = useAppAuth();

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  acceptTerms: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions.",
    path: ["acceptTerms"],
  }),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = form.handleSubmit((values) => {
  login("register", values);
});
</script>

<template>
  <AutoForm
    class="space-y-4"
    :form="form"
    :schema="schema"
    :field-config="{
      email: { type: 'email' },
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