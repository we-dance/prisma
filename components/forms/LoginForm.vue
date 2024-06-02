<script setup lang="ts">
defineProps({
  register: Boolean,
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const { login, error } = useAppAuth();

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = form.handleSubmit(async (values) => {
  console.log("onSubmit", values);
  await login("login", values);
  console.log("error", error.value);
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
    }"
    @submit="onSubmit"
  >
    <TermsInfo />
    <div class="flex justify-end">
      <Button type="submit"> Login </Button>
    </div>
  </AutoForm>
</template>
