<script setup lang="ts">
import { ref } from "vue";

const data = ref({
  name: "",
  description: "",
  startDate: "",
  endDate: "",
});
const addEvent = async () => {
  const { name, description, startDate, endDate } = data.value;
  await useFetch("/api/events", {
    method: "post",
    body: {
      name,
      description,
      startDate,
      endDate,
    },
  });
};
</script>

<template>
  <FormKit type="form" @submit="addEvent">
    <FormKit
      type="text"
      label="Name"
      validation="required|length:5"
      v-model="data.name"
    />
    <FormKit
      type="textarea"
      label="Description"
      validation="required"
      v-model="data.description"
    />
    <FormKit
      type="date"
      label="Start Date"
      validation="required"
      v-model="data.startDate"
    />
    <FormKit
      type="date"
      label="End Date"
      validation="required"
      v-model="data.endDate"
    />
  </FormKit>
</template>
