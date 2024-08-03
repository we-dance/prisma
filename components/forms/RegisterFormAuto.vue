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
  pronounce: z.enum(["he", "she", "they"]),
  email: z.string().email(),
  password: z.string().min(8),
  emailConsent: z.boolean().refine((value) => value, {
    message: "We need your consent to send you emails.",
  }),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

async function onSubmit(values: Record<string, any>) {
  const error = await login("register", values);

  if (error) {
    toast.error(error);
  }
}
</script>

<template>
  <AutoForm
    class="space-y-4"
    :form="form"
    :schema="schema"
    :field-config="{
      username: {
        inputProps: {
          trim: '[^a-z0-9._\-]+',
          lowercase: true,
        },
      },
      email: { inputProps: { type: 'email' } },
      password: { inputProps: { type: 'password' } },
      emailConsent: {
        label:
          'I agree to receive emails from WeDance. I can unsubscribe from non-essential emails at any time.',
        inputProps: {
          required: true,
        },
      },
    }"
    @submit="onSubmit"
  >
    <template #city>
      <FormField v-slot="{ value, handleChange }" name="city">
        <FormItem>
          <FormLabel>Your city *</FormLabel>
          <FormControl>
            <CityInput :modelValue="value" @update:modelValue="handleChange" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </template>
    <template #emailConsent="slotProps">
      <AutoFormField v-bind="slotProps" />
    </template>
    <TermsInfo />
    <div class="flex justify-end">
      <Button type="submit"> Register </Button>
    </div>
  </AutoForm>
</template>
